import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  const userId = '3c002f89-01bf-4986-949a-3172f432dd37';
  
  console.log(`Adding user ${userId} to admin_users table...`);
  
  const { error } = await supabase
    .from('admin_users')
    .upsert({ user_id: userId, active: true }, { onConflict: 'user_id' });
    
  if (error) {
    console.error("Error inserting into admin_users:", error.message);
  } else {
    console.log("Successfully added user to admin_users table!");
  }
}

main();
