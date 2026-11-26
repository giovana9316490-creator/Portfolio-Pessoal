
const SUPABASE_URL = "https://qjuieeosgukjosqetyxy.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_5JVWLhvVqlPZbwtTPWKiaw_3v0a9eJd";

window.supabaseClient = null;

window.supabaseReady = false;

if (
    window.supabase &&
    SUPABASE_URL.startsWith("https://") &&
    SUPABASE_ANON_KEY.length > 20
) {

    window.supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );

    window.supabaseReady = true;

}
