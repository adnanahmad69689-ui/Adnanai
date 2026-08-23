# Supabase Migration Assets

`migrations/20260823180000_initial_portfolio.sql` creates the independent PostgreSQL schema, Supabase Auth profile trigger, Row Level Security policies, and Storage buckets for the Adnan Ai portfolio.

The migration creates no user account and does not import production content by itself. After the owner signs in to Supabase for the first time, promote that verified `profiles` row to `admin` using a one-time controlled SQL update. Import the current Websites and AI Systems only after their images have been copied to the matching Supabase Storage buckets.

Never place a Supabase service-role/secret key in the browser application or in a committed `.env` file.
