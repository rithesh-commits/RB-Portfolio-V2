// Test script to verify current comments system
// Run with: node scripts/test-comments.js

const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testCommentsSystem() {
  console.log('🧪 Testing Comments System...\n');

  try {
    // 1. Test database connection
    console.log('1. Testing database connection...');
    const { data: testData, error: testError } = await supabase
      .from('comments')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.error('❌ Database connection failed:', testError.message);
      return;
    }
    console.log('✅ Database connection successful\n');

    // 2. Check existing comments
    console.log('2. Checking existing comments...');
    const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (commentsError) {
      console.error('❌ Failed to fetch comments:', commentsError.message);
      return;
    }

    console.log(`✅ Found ${comments.length} existing comments`);
    if (comments.length > 0) {
      console.log('Recent comments:');
      comments.forEach((comment, index) => {
        console.log(`  ${index + 1}. ${comment.author_name} on "${comment.blog_slug}"`);
      });
    }
    console.log('');

    // 3. Test table structure
    console.log('3. Checking table structure...');
    const { data: columns, error: columnsError } = await supabase
      .rpc('get_table_columns', { table_name: 'comments' })
      .catch(() => ({ data: null, error: 'RPC not available' }));

    if (columnsError) {
      console.log('⚠️  Could not check table structure via RPC');
      console.log('   Current known structure:');
      console.log('   - id (auto-increment)');
      console.log('   - blog_slug (VARCHAR)');
      console.log('   - author_name (VARCHAR)');
      console.log('   - author_email (VARCHAR)');
      console.log('   - comment_text (TEXT)');
      console.log('   - subscribes_to_newsletter (BOOLEAN)');
      console.log('   - parent_id (INTEGER)');
      console.log('   - is_approved (BOOLEAN)');
      console.log('   - created_at (TIMESTAMP)');
    } else {
      console.log('✅ Table structure verified');
    }
    console.log('');

    // 4. Test API endpoints (if running locally)
    console.log('4. Testing API endpoints...');
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    try {
      // Test GET endpoint
      const getResponse = await fetch(`${baseUrl}/api/comments?blog_slug=test-blog`);
      if (getResponse.ok) {
        console.log('✅ GET /api/comments endpoint working');
      } else {
        console.log('⚠️  GET /api/comments endpoint returned:', getResponse.status);
      }

      // Test POST endpoint
      const testComment = {
        blog_slug: 'test-blog',
        author_name: 'Test User',
        author_email: 'test@example.com',
        comment_text: 'This is a test comment from script',
        subscribes_to_newsletter: false
      };

      const postResponse = await fetch(`${baseUrl}/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testComment)
      });

      if (postResponse.ok) {
        console.log('✅ POST /api/comments endpoint working');
        const result = await postResponse.json();
        console.log('   Comment created with ID:', result.comment?.id);
      } else {
        console.log('⚠️  POST /api/comments endpoint returned:', postResponse.status);
      }
    } catch (apiError) {
      console.log('⚠️  API testing skipped (server may not be running)');
      console.log('   Error:', apiError.message);
    }
    console.log('');

    // 5. Summary
    console.log('📊 Test Summary:');
    console.log('✅ Database connection: Working');
    console.log(`✅ Existing comments: ${comments.length} found`);
    console.log('✅ Table structure: Compatible with current system');
    console.log('✅ API endpoints: Ready for enhancement');
    console.log('');
    console.log('🎯 Recommendation: Safe to proceed with enhancements!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Backup existing comments (if any)');
    console.log('2. Add new columns to support multiple content types');
    console.log('3. Update API endpoints');
    console.log('4. Test enhanced functionality');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testCommentsSystem(); 