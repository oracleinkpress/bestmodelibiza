import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://stqkzcoedgkpweebbqjy.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0cWt6Y29lZGdrcHdlZWJicWp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzMDU1NzYsImV4cCI6MjEwNjg4MTU3Nn0.SbDf0siQTGd-TMQjhzREgbLnw6-2vwjcRkJ65LykOC8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getServiceSupabase = () => {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0cWt6Y29lZGdrcHdlZWJicWp5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTMwNTU3NiwiZXhwIjoyMTA2ODgxNTc2fQ.RjXpoYfbmgpaDrDi4xr6UxXzMs9_eaufD75aE182w18';
  return createClient(supabaseUrl, serviceKey);
};
