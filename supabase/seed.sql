-- =========================================================
-- Supabase SQL Seed Script for BookHub Marketplace
-- =========================================================

-- 1. Payment and Fulfillment Providers
INSERT INTO "payment_provider" ("id", "is_installed")
VALUES ('manual', true)
ON CONFLICT ("id") DO UPDATE SET "is_installed" = true;

INSERT INTO "fulfillment_provider" ("id", "is_installed")
VALUES ('manual', true)
ON CONFLICT ("id") DO UPDATE SET "is_installed" = true;

-- 2. Supported Currencies
INSERT INTO "currency" ("code", "symbol", "symbol_native", "name")
VALUES 
  ('usd', '$', '$', 'US Dollar'),
  ('eur', '€', '€', 'Euro'),
  ('gbp', '£', '£', 'British Pound')
ON CONFLICT ("code") DO NOTHING;

-- 3. Store Defaults
INSERT INTO "store" ("id", "name", "default_currency_code")
VALUES ('store_01', 'BookHub Multi-Store Marketplace', 'usd')
ON CONFLICT ("id") DO NOTHING;

-- 4. Admin User (admin@medusa-test.com / supersecret)
DELETE FROM "user" WHERE "email" = 'admin@medusa-test.com';
INSERT INTO "user" ("id", "email", "first_name", "last_name", "password_hash")
VALUES (
  'usr_admin_01',
  'admin@medusa-test.com',
  'BookHub',
  'Admin',
  'c2NyeXB0AA8AAAAIAAAAAcliLkZuWtmX9J0X4VP/m8IziBdR3qeTYliZwcDsGYzEDT19nLbBsVxj+km6APfRVKu4hOXYS7oIRylE5rCqgK+K+IoWocaQYCNKNFh95xg0'
);

-- 5. Verified Publishers
CREATE TABLE IF NOT EXISTS "publisher" (
  "id" character varying NOT NULL PRIMARY KEY,
  "name" character varying NOT NULL,
  "email" character varying NOT NULL UNIQUE,
  "password_hash" character varying,
  "handle" character varying NOT NULL UNIQUE,
  "store_name" character varying NOT NULL,
  "description" text,
  "logo_url" character varying,
  "banner_url" character varying,
  "stripe_connect_id" character varying,
  "is_verified" boolean DEFAULT true,
  "status" character varying DEFAULT 'active',
  "location" character varying,
  "metadata" jsonb,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "deleted_at" TIMESTAMP WITH TIME ZONE
);

INSERT INTO "publisher" ("id", "name", "email", "password_hash", "handle", "store_name", "description", "location", "logo_url", "banner_url")
VALUES 
  (
    'pub_oreilly',
    'O''Reilly Media & Tech',
    'oreilly@media.com',
    '8e329f6354fa89bb82cfc05574dc6ca1:84eb6375bc9b5314a480d19642531e21b8b2111d4e7da10403328e1d528eb19d4ba8bc97ff2f6ea5c90b6387088b939e8ad5db85b3992b450719853a47da2fec',
    'oreilly-media',
    'O''Reilly Media & Tech',
    'World-renowned publisher of definitive technology, programming, and system architecture books.',
    'Sebastopol, CA, USA',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop'
  ),
  (
    'pub_oxford',
    'Oxford Academic Press',
    'oxford@press.com',
    '8e329f6354fa89bb82cfc05574dc6ca1:84eb6375bc9b5314a480d19642531e21b8b2111d4e7da10403328e1d528eb19d4ba8bc97ff2f6ea5c90b6387088b939e8ad5db85b3992b450719853a47da2fec',
    'oxford-press',
    'Oxford Academic Press',
    'Scholarly publications, peer-reviewed science textbooks, and historical encyclopedias.',
    'Oxford, United Kingdom',
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200&h=400&fit=crop'
  ),
  (
    'pub_penguin',
    'Penguin Classics & Fiction',
    'penguin@classics.com',
    '8e329f6354fa89bb82cfc05574dc6ca1:84eb6375bc9b5314a480d19642531e21b8b2111d4e7da10403328e1d528eb19d4ba8bc97ff2f6ea5c90b6387088b939e8ad5db85b3992b450719853a47da2fec',
    'penguin-classics',
    'Penguin Classics & Fiction',
    'Curated literary fiction, timeless worldwide classics, and poetry anthologies.',
    'London, United Kingdom',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=400&fit=crop'
  )
ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED.name;
