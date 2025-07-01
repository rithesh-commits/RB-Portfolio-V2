const { createClient } = require('@supabase/supabase-js');

// Load environment variables from .env.local
require('fs').readFileSync('.env.local', 'utf8').split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    process.env[key.trim()] = value.trim();
  }
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkDatabase() {
  console.log('🔍 Checking Supabase Database Structure...\n');

  // List of tables to check
  const tablesToCheck = [
    'blog_posts',
    'comments', 
    'stories',
    'novels',
    'poems',
    'categories',
    'pages',
    'media',
    'subscribers'
  ];

  for (const tableName of tablesToCheck) {
    try {
      console.log(`📋 Checking table: ${tableName}`);
      
      // Try to select one row to see if table exists
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);

      if (error) {
        if (error.code === '42P01') {
          console.log(`   ❌ Table does NOT exist: ${tableName}`);
        } else {
          console.log(`   ⚠️  Error accessing ${tableName}: ${error.message}`);
        }
      } else {
        console.log(`   ✅ Table exists: ${tableName}`);
        
        // If we got data, show the column names
        if (data && data.length > 0) {
          const columns = Object.keys(data[0]);
          console.log(`   📝 Columns: ${columns.join(', ')}`);
        }
        
        // Get count
        const { count } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true });
        
        console.log(`   📊 Row count: ${count || 0}`);
      }
      
    } catch (err) {
      console.log(`   ❌ Failed to check ${tableName}: ${err.message}`);
    }
    
    console.log('');
  }

  console.log('🎯 Recommendations:');
  console.log('1. If blog_posts exists → You can start using the admin dashboard');
  console.log('2. If comments exists → Comment system is ready');
  console.log('3. Missing tables → We can create them step by step as needed');
  console.log('4. RLS policies → We can add them after confirming table structure');
}

checkDatabase().catch(console.error); 