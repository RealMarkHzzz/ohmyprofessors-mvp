#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zepsfjahbhavqxrfcheg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplcHNmamFoYmhhdnF4cmZjaGVnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDcwOTIwOSwiZXhwIjoyMDg2Mjg1MjA5fQ.W88sd0jwez6Bj5qn5auz0Gzh5Bz44iHkjEHmnJFxuTY'

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedData() {
  console.log('🌱 开始插入测试数据...\n')

  // 1. 插入 Adelaide 大学
  console.log('📚 插入 University of Adelaide...')
  const { data: university, error: uniError } = await supabase
    .from('universities')
    .upsert({
      name: 'University of Adelaide',
      slug: 'university-of-adelaide',
      location: 'Adelaide, South Australia',
      website: 'https://www.adelaide.edu.au'
    }, { onConflict: 'slug' })
    .select()
    .single()

  if (uniError) {
    console.error('❌ 大学插入失败:', uniError.message)
    // 尝试查询已存在的
    const { data: existing } = await supabase
      .from('universities')
      .select()
      .eq('slug', 'university-of-adelaide')
      .single()
    
    if (existing) {
      console.log('✅ 大学已存在，使用现有记录')
      university = existing
    } else {
      process.exit(1)
    }
  } else {
    console.log('✅ 大学插入成功')
  }

  // 获取大学 ID
  const { data: uniData } = await supabase
    .from('universities')
    .select('id')
    .eq('slug', 'university-of-adelaide')
    .single()

  const universityId = uniData.id
  console.log(`   University ID: ${universityId}\n`)

  // 2. 插入教授
  const professors = [
    {
      name: 'Dr. Sarah Johnson',
      slug: 'dr-sarah-johnson',
      department: 'Computer Science',
      email: 'sarah.johnson@adelaide.edu.au'
    },
    {
      name: 'Prof. Michael Chen',
      slug: 'prof-michael-chen',
      department: 'Mathematics',
      email: 'michael.chen@adelaide.edu.au'
    },
    {
      name: 'Dr. Emma Williams',
      slug: 'dr-emma-williams',
      department: 'Physics',
      email: 'emma.williams@adelaide.edu.au'
    },
    {
      name: 'Prof. David Brown',
      slug: 'prof-david-brown',
      department: 'Engineering',
      email: 'david.brown@adelaide.edu.au'
    },
    {
      name: 'Dr. Lisa Anderson',
      slug: 'dr-lisa-anderson',
      department: 'Chemistry',
      email: 'lisa.anderson@adelaide.edu.au'
    }
  ]

  console.log('👨‍🏫 插入 5 位教授...')
  let successCount = 0

  for (const prof of professors) {
    const { error } = await supabase
      .from('professors')
      .upsert({
        ...prof,
        university_id: universityId
      }, { onConflict: 'slug' })

    if (error) {
      console.log(`   ⚠️  ${prof.name}: 已存在或失败`)
    } else {
      successCount++
      console.log(`   ✅ ${prof.name}: 插入成功`)
    }
  }

  console.log(`\n📊 数据插入完成: ${successCount}/5 位教授\n`)

  // 3. 验证数据
  console.log('🔍 验证数据...')
  const { count: uniCount } = await supabase
    .from('universities')
    .select('*', { count: 'exact', head: true })

  const { count: profCount } = await supabase
    .from('professors')
    .select('*', { count: 'exact', head: true })

  console.log(`   Universities: ${uniCount}`)
  console.log(`   Professors: ${profCount}`)

  console.log('\n✅ 数据导入完成！\n')
}

seedData().catch(console.error)
