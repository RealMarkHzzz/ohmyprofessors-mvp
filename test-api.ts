/**
 * Test script for Task 3 API layer
 * 验证 Supabase API 是否正确实现
 */

import { getProfessors, getProfessorBySlug, getAllDepartments, getAllTags } from './lib/api/professors';
import { getReviewsByProfessorId, getRatingDistribution, getAllReviews } from './lib/api/reviews';

async function testAPIs() {
  console.log('🧪 Testing Task 3 - Frontend Data Layer\n');

  try {
    // Test 1: Get all professors
    console.log('1️⃣ Testing getProfessors()...');
    const professors = await getProfessors();
    console.log(`   ✅ Fetched ${professors.length} professors`);
    if (professors.length > 0) {
      console.log(`   📊 Sample: ${professors[0].name} - ${professors[0].department}`);
    }

    // Test 2: Get professor by slug
    if (professors.length > 0) {
      console.log('\n2️⃣ Testing getProfessorBySlug()...');
      const prof = await getProfessorBySlug(professors[0].slug);
      if (prof) {
        console.log(`   ✅ Found: ${prof.name}`);
        console.log(`   📊 Rating: ${prof.overall_rating}/5, Reviews: ${prof.total_reviews}`);
      } else {
        console.log('   ⚠️ Professor not found');
      }
    }

    // Test 3: Get departments
    console.log('\n3️⃣ Testing getAllDepartments()...');
    const departments = await getAllDepartments();
    console.log(`   ✅ Found ${departments.length} departments: ${departments.join(', ')}`);

    // Test 4: Get tags
    console.log('\n4️⃣ Testing getAllTags()...');
    const tags = await getAllTags();
    console.log(`   ✅ Found ${tags.length} tags`);
    if (tags.length > 0) {
      console.log(`   📊 Sample: ${tags.slice(0, 5).join(', ')}`);
    }

    // Test 5: Get reviews
    if (professors.length > 0) {
      console.log('\n5️⃣ Testing getReviewsByProfessorId()...');
      const reviews = await getReviewsByProfessorId(professors[0].id);
      console.log(`   ✅ Found ${reviews.length} reviews for ${professors[0].name}`);
      if (reviews.length > 0) {
        console.log(`   📊 Sample rating: ${reviews[0].rating}/5`);
      }

      console.log('\n6️⃣ Testing getRatingDistribution()...');
      const distribution = await getRatingDistribution(professors[0].id);
      console.log(`   ✅ Distribution:`, distribution);
    }

    // Test 6: Get all reviews (for stats)
    console.log('\n7️⃣ Testing getAllReviews()...');
    const allReviews = await getAllReviews();
    console.log(`   ✅ Total reviews in system: ${allReviews.length}`);

    console.log('\n✅ All API tests completed successfully!\n');

    // Summary
    console.log('📋 Summary:');
    console.log(`   - Professors: ${professors.length}`);
    console.log(`   - Departments: ${departments.length}`);
    console.log(`   - Tags: ${tags.length}`);
    console.log(`   - Total Reviews: ${allReviews.length}`);
    console.log('\n✅ Task 3 API Layer Implementation: READY\n');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    console.error('\n⚠️ Make sure:');
    console.error('   1. Supabase is configured (.env.local)');
    console.error('   2. Database tables exist (run migrations)');
    console.error('   3. Data is imported');
    process.exit(1);
  }
}

testAPIs();
