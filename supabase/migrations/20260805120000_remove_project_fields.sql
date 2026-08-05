-- Drop unused columns from projects table
ALTER TABLE public.projects 
  DROP COLUMN IF EXISTS categories,
  DROP COLUMN IF EXISTS technologies,
  DROP COLUMN IF EXISTS github_url,
  DROP COLUMN IF EXISTS demo_url,
  DROP COLUMN IF EXISTS sort_order;
