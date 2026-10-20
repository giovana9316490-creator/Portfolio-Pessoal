
const SUPABASE_URL = "https://qjuieeosgukjosqetyxy.supabase.co/rest/v1/";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_5JVWLhvVqlPZbwtTPWKiaw_3v0a9eJd";

const { createClient } = window.supabase;

const supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


