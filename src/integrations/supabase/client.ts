// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rcituexmjwkwevqcsxmc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjaXR1ZXhtandrd2V2cWNzeG1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NDk3NTQsImV4cCI6MjA1MTMyNTc1NH0.rSzdoKLvpfDlN198vKsF6xyLsSD4aqE9_8Y51rl4AP8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);