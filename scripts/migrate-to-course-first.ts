/**
 * Course-First Migration Script
 * 从现有教授数据反向生成课程数据
 * 
 * 使用方法：
 * npx tsx scripts/migrate-to-course-first.ts
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

interface Professor {
  id: string
  name: string
  slug: string
  university: string
  department: string
  courses?: string[]
  avg_rating?: number
  total_reviews?: number
}

interface CourseData {
  code: string
  name: string
  department: string
  university: string
  professorIds: string[]
}

async function main() {
  console.log('🚀 Starting Course-First Migration...\n')
  
  // Step 1: Fetch all professors
  console.log('📚 Step 1: Fetching all professors...')
  const { data: professors, error: profError } = await supabase
    .from('professors')
    .select('*')
  
  if (profError) {
    console.error('❌ Error fetching professors:', profError)
    process.exit(1)
  }
  
  console.log(`✅ Found ${professors?.length || 0} professors\n`)
  
  // Step 2: Extract unique courses
  console.log('📊 Step 2: Extracting courses from professor data...')
  const courseMap = new Map<string, CourseData>()
  
  for (const prof of professors as Professor[]) {
    if (!prof.courses || prof.courses.length === 0) continue
    
    for (const courseName of prof.courses) {
      // Extract course code (假设格式: "COMP 1012: Computer Science I")
      const match = courseName.match(/^([A-Z]+\s*\d+)(?:\s*:\s*(.+))?/)
      if (!match) {
        console.warn(`⚠️  Could not parse course: ${courseName}`)
        continue
      }
      
      const code = match[1].trim()
      const name = match[2]?.trim() || courseName
      const key = `${prof.university}-${code}`
      
      if (!courseMap.has(key)) {
        courseMap.set(key, {
          code,
          name,
          department: prof.department,
          university: prof.university,
          professorIds: []
        })
      }
      
      courseMap.get(key)!.professorIds.push(prof.id)
    }
  }
  
  console.log(`✅ Extracted ${courseMap.size} unique courses\n`)
  
  // Step 3: Insert courses into database
  console.log('💾 Step 3: Inserting courses into database...')
  let insertedCount = 0
  let skippedCount = 0
  
  for (const [key, courseData] of courseMap) {
    const { data: existingCourse } = await supabase
      .from('courses')
      .select('id')
      .eq('university', courseData.university)
      .eq('code', courseData.code)
      .single()
    
    if (existingCourse) {
      console.log(`⏭️  Skipping existing course: ${courseData.code}`)
      skippedCount++
      continue
    }
    
    const { data: newCourse, error: insertError } = await supabase
      .from('courses')
      .insert({
        code: courseData.code,
        name: courseData.name,
        department: courseData.department,
        university: courseData.university,
        professor_count: courseData.professorIds.length,
        avg_rating: 0,
        total_reviews: 0
      })
      .select()
      .single()
    
    if (insertError) {
      console.error(`❌ Error inserting course ${courseData.code}:`, insertError)
      continue
    }
    
    console.log(`✅ Inserted: ${courseData.code} - ${courseData.name}`)
    insertedCount++
    
    // Step 4: Create course-professor associations
    if (newCourse) {
      for (const profId of courseData.professorIds) {
        const { error: assocError } = await supabase
          .from('course_professors')
          .insert({
            course_id: newCourse.id,
            professor_id: profId,
            semester: null,
            rating: 0,
            review_count: 0,
            difficulty: 'Medium',
            top_tags: []
          })
        
        if (assocError) {
          console.error(`❌ Error creating association:`, assocError)
        }
      }
    }
  }
  
  console.log('\n📈 Migration Summary:')
  console.log(`✅ Inserted: ${insertedCount} courses`)
  console.log(`⏭️  Skipped: ${skippedCount} courses (already exist)`)
  console.log('\n🎉 Migration complete!')
}

main().catch(console.error)
