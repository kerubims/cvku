-- Migration: Separate CV Examples from Blog Articles
-- Run this ONCE on the database server
-- Use psql -U cvku -d cvku -f this_file.sql

BEGIN;

-- Add 'type' column if not exists
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'cv_example'
  CHECK (type IN ('cv_example', 'article'));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_type ON public.articles (type);
CREATE INDEX IF NOT EXISTS idx_articles_slug_type ON public.articles (slug, type);
CREATE INDEX IF NOT EXISTS idx_articles_status_type ON public.articles (status, type);

-- Optional: Set existing articles to correct type based on slug pattern
-- (update after verifying existing data)
-- UPDATE public.articles SET type = 'article' WHERE slug LIKE '%tips%' OR slug LIKE '%tutorial%' OR slug LIKE '%berita%';
-- UPDATE public.articles SET type = 'cv_example' WHERE slug NOT LIKE '%tips%' AND slug NOT LIKE '%tutorial%' AND slug NOT LIKE '%berita%';

COMMIT;