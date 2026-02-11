#!/usr/bin/env tsx
/**
 * Adelaide Professors Data Import Script
 * 
 * Purpose: Import scraped Adelaide professor data from JSON into Supabase
 * Input: data/adelaide-professors.json
 * Output: Data in universities + professors tables
 * 
 * Usage:
 *   npm run import:adelaide
 *   or
 *   tsx scripts/import-adelaide-data.ts
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

// Load environment variables from .env.local
config({ path: join(process.cwd(), '.env.local') })

// ============================================================================
// TYPES
// ============================================================================
interface AdelaideProfessor {
  name: string
  title: string
  department: string
  email: string
  office_location: string
  courses: string[]
  profile_url: string
  phone: string
  researcher_profile_url: string
}

interface ImportStats {
  total: number
  inserted: number
  updated: number
  skipped: number
  failed: number
  errors: Array<{ professor: string; error: string }>
}

// ============================================================================
// CONFIGURATION
// ============================================================================
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Error: Missing required environment variables')
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', SUPABASE_URL ? '✓' : '✗')
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', SUPABASE_SERVICE_KEY ? '✓' : '✗')
  console.error('')
  console.error('💡 Create .env.local with:')
  console.error('   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co')
  console.error('   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate URL-safe slug from professor name
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/^(a\/prof|professor|associate professor|dr|ms|mrs|mr)\s+/i, '') // Remove titles
    .replace(/[^a-z0-9\s]/g, '') // Remove special chars
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
}

/**
 * Clean office location string (remove extra whitespace)
 */
function cleanOfficeLocation(location: string): string {
  return location
    .replace(/\s+/g, ' ')
    .replace(/Floor\/Room\s+/g, 'Room ')
    .trim()
}

/**
 * Extract researcher profile ID from URL
 */
function extractResearcherUrl(url: string): string | null {
  if (!url || url === '//researchers.adelaide.edu.au') return null
  if (url.startsWith('//')) {
    return 'https:' + url
  }
  return url
}

/**
 * Check if professor exists by source_id
 */
async function professorExists(
  universityId: string,
  sourceId: string
): Promise<{ exists: boolean; id?: string }> {
  const { data, error } = await supabase
    .from('professors')
    .select('id')
    .eq('university_id', universityId)
    .eq('source_id', sourceId)
    .maybeSingle()

  if (error && error.code !== 'PGRST116') {
    // PGRST116 = not found
    console.error('Error checking professor existence:', error)
    return { exists: false }
  }

  return {
    exists: !!data,
    id: data?.id,
  }
}

// ============================================================================
// MAIN IMPORT LOGIC
// ============================================================================

async function importAdelaideProfessors() {
  console.log('🚀 Starting Adelaide Professors Import\n')

  // Step 1: Load JSON data
  console.log('📂 Loading data from data/adelaide-professors.json...')
  const dataPath = join(process.cwd(), 'data', 'adelaide-professors.json')
  let professors: AdelaideProfessor[]

  try {
    const rawData = readFileSync(dataPath, 'utf-8')
    professors = JSON.parse(rawData)
    console.log(`   ✓ Loaded ${professors.length} professors\n`)
  } catch (error) {
    console.error('❌ Failed to load JSON file:', error)
    process.exit(1)
  }

  // Step 2: Get or create University of Adelaide
  console.log('🏛️  Ensuring University of Adelaide exists...')
  const { data: university, error: uniError } = await supabase
    .from('universities')
    .select('id, name')
    .eq('slug', 'university-of-adelaide')
    .single()

  if (uniError) {
    console.error('❌ Failed to fetch university:', uniError)
    process.exit(1)
  }

  console.log(`   ✓ University: ${university.name} (${university.id})\n`)

  // Step 3: Import professors
  console.log('👨‍🏫 Importing professors...\n')

  const stats: ImportStats = {
    total: professors.length,
    inserted: 0,
    updated: 0,
    skipped: 0,
    failed: 0,
    errors: [],
  }

  for (const [index, prof] of professors.entries()) {
    const progressPrefix = `[${index + 1}/${professors.length}]`

    try {
      // Generate unique source_id from profile URL
      const sourceId = prof.profile_url
        .replace('https://www.adelaide.edu.au/directory/', '')
        .replace(/\//g, '-')

      // Check if professor already exists
      const { exists, id: existingId } = await professorExists(
        university.id,
        sourceId
      )

      const slug = generateSlug(prof.name)
      const cleanLocation = cleanOfficeLocation(prof.office_location)
      const researcherUrl = extractResearcherUrl(prof.researcher_profile_url)

      const professorData = {
        university_id: university.id,
        name: prof.name.trim(),
        slug: slug,
        title: prof.title || null,
        department: prof.department || null,
        email: prof.email || null,
        office_location: cleanLocation || null,
        phone: prof.phone || null,
        profile_url: prof.profile_url,
        source_system: 'adelaide_scraper',
        source_id: sourceId,
        source_url: prof.profile_url,
        last_synced_at: new Date().toISOString(),
      }

      if (exists && existingId) {
        // Update existing professor
        const { error } = await supabase
          .from('professors')
          .update(professorData)
          .eq('id', existingId)

        if (error) {
          throw error
        }

        console.log(`${progressPrefix} ✓ Updated: ${prof.name}`)
        stats.updated++
      } else {
        // Insert new professor
        const { error } = await supabase
          .from('professors')
          .insert(professorData)

        if (error) {
          // Check if it's a unique constraint violation on slug
          if (error.code === '23505' && error.message.includes('slug')) {
            // Try with a numbered suffix
            const { error: retryError } = await supabase
              .from('professors')
              .insert({
                ...professorData,
                slug: `${slug}-${Date.now().toString(36)}`,
              })

            if (retryError) {
              throw retryError
            }

            console.log(`${progressPrefix} ✓ Inserted: ${prof.name} (slug conflict resolved)`)
            stats.inserted++
          } else {
            throw error
          }
        } else {
          console.log(`${progressPrefix} ✓ Inserted: ${prof.name}`)
          stats.inserted++
        }
      }
    } catch (error: any) {
      console.error(`${progressPrefix} ✗ Failed: ${prof.name}`)
      console.error(`   Error: ${error.message}`)
      stats.failed++
      stats.errors.push({
        professor: prof.name,
        error: error.message,
      })
    }
  }

  // Step 4: Print summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 Import Summary')
  console.log('='.repeat(60))
  console.log(`Total Professors: ${stats.total}`)
  console.log(`✅ Inserted:      ${stats.inserted}`)
  console.log(`🔄 Updated:       ${stats.updated}`)
  console.log(`⏭️  Skipped:       ${stats.skipped}`)
  console.log(`❌ Failed:        ${stats.failed}`)
  console.log('='.repeat(60))

  if (stats.errors.length > 0) {
    console.log('\n⚠️  Errors:\n')
    stats.errors.forEach(({ professor, error }) => {
      console.log(`  • ${professor}`)
      console.log(`    ${error}\n`)
    })
  }

  // Step 5: Verify import
  console.log('\n🔍 Verifying import...')
  const { count, error: countError } = await supabase
    .from('professors')
    .select('*', { count: 'exact', head: true })
    .eq('university_id', university.id)

  if (countError) {
    console.error('❌ Failed to verify:', countError)
  } else {
    console.log(`   ✓ Total professors in database: ${count}`)
  }

  console.log('\n✅ Import completed!\n')

  // Exit with error code if there were failures
  if (stats.failed > 0) {
    process.exit(1)
  }
}

// ============================================================================
// RUN IMPORT
// ============================================================================

importAdelaideProfessors().catch((error) => {
  console.error('\n💥 Fatal error:', error)
  process.exit(1)
})
