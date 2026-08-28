# Supabase Cloud Directory

This directory contains the Supabase configuration, schema definitions, and SQL seeds for the **BookHub Multi-Store Marketplace**.

---

## 📁 Directory Structure

* `config.toml`: Supabase project configuration (ports, auth settings, storage policies).
* `seed.sql`: Initial seed data including verified publisher bookstores, store settings, currencies, and admin user credentials.
* `migrations/`: Schema migration files.

---

## 🛠️ Managing with Supabase CLI

### 1. Link to Remote Supabase Cloud Project
```bash
npx supabase link --project-ref plltvinvmifjxotzalis
```

### 2. Push Schema & Migrations to Cloud
```bash
npx supabase db push
```

### 3. Run Local Database with Supabase CLI (Docker)
```bash
npx supabase start
```

### 4. Reset & Reseed Database
```bash
npx supabase db reset
```

---

## 🔑 Cloud Project Info
* **Project ID**: `plltvinvmifjxotzalis`
* **API URL**: `https://plltvinvmifjxotzalis.supabase.co`
* **Pooler Host**: `aws-0-ap-southeast-1.pooler.supabase.com:5432`
