const { Client } = require("pg");
const Scrypt = require("scrypt-kdf");

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://postgres.plltvinvmifjxotzalis:Tt2khyJ7OGwjk1H2@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres";

async function seed() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  console.log("Connected to Supabase PostgreSQL for Seeding...");

  // 1. Insert Payment & Fulfillment Providers
  await client.query(`
    INSERT INTO "payment_provider" ("id", "is_installed")
    VALUES ('manual', true)
    ON CONFLICT ("id") DO UPDATE SET "is_installed" = true;
  `);

  await client.query(`
    INSERT INTO "fulfillment_provider" ("id", "is_installed")
    VALUES ('manual', true)
    ON CONFLICT ("id") DO UPDATE SET "is_installed" = true;
  `);
  console.log("✔ Providers seeded (manual payment & fulfillment)");

  // 2. Currencies
  await client.query(`
    INSERT INTO "currency" ("code", "symbol", "symbol_native", "name")
    VALUES 
      ('usd', '$', '$', 'US Dollar'),
      ('eur', '€', '€', 'Euro'),
      ('gbp', '£', '£', 'British Pound')
    ON CONFLICT ("code") DO NOTHING;
  `);
  console.log("✔ Currencies seeded");

  // 3. Store
  await client.query(`
    INSERT INTO "store" ("id", "name", "default_currency_code")
    VALUES ('store_01', 'BookHub Multi-Store Marketplace', 'usd')
    ON CONFLICT ("id") DO NOTHING;
  `);
  console.log("✔ Store seeded");

  // 4. Admin User (Password: supersecret)
  const passwordHash = (await Scrypt.kdf("supersecret", { logN: 15 })).toString("base64");
  await client.query(`DELETE FROM "user" WHERE "email" = 'admin@medusa-test.com';`);
  await client.query(`
    INSERT INTO "user" ("id", "email", "first_name", "last_name", "password_hash")
    VALUES ('usr_admin_01', 'admin@medusa-test.com', 'BookHub', 'Admin', $1);
  `, [passwordHash]);
  console.log("✔ Admin User seeded (admin@medusa-test.com / supersecret)");

  await client.end();
  console.log("\n🎉 Supabase Database Seeded Successfully!");
}

seed().catch(err => {
  console.error("Seeding Error:", err);
  process.exit(1);
});

