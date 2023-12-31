interface Config {
  nextauth_url: string;
  nextauth_secret: string;
  google_client_id: string;
  google_client_secret: string;
  supabaseUrl: string;
  supabaseKey: string;
}

export const config: Config = {
  nextauth_url: process.env.NEXTAUTH_URL || "",
  nextauth_secret: process.env.NEXTAUTH_SECRET || "",
  google_client_id: process.env.GOOGLE_CLIENT_ID || "",
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
};
