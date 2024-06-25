import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

if (!process.env.SUPABASE_URL)
  throw new Error(
    "Cannot perform Supabase CRUD operations as project url is not provided"
  );

if (!process.env.SUPABASE_KEY)
  throw new Error(
    "Cannot perform Supabase CRUD operations as API Key is not provided"
  );

// Create a single supabase client for interacting with database
export const supabaseClient = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
