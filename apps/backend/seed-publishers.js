const { Client } = require("pg");
const crypto = require("crypto");

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://postgres.plltvinvmifjxotzalis:Tt2khyJ7OGwjk1H2@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres";

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return salt + ":" + hash;
}

async function run() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  console.log("Connected to Supabase...");

  const publishers = [
    {
      id: "pub_oreilly",
      name: "O'Reilly Media & Tech",
      email: "oreilly@media.com",
      handle: "oreilly-media",
      store_name: "O'Reilly Media & Tech",
      description: "World-renowned publisher of definitive technology, programming, and system architecture books.",
      location: "Sebastopol, CA, USA",
      logo_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&h=150&fit=crop",
      banner_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop",
    },
    {
      id: "pub_oxford",
      name: "Oxford Academic Press",
      email: "oxford@press.com",
      handle: "oxford-press",
      store_name: "Oxford Academic Press",
      description: "Scholarly publications, peer-reviewed science textbooks, and historical encyclopedias.",
      location: "Oxford, United Kingdom",
      logo_url: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=150&h=150&fit=crop",
      banner_url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200&h=400&fit=crop",
    },
    {
      id: "pub_penguin",
      name: "Penguin Classics & Fiction",
      email: "penguin@classics.com",
      handle: "penguin-classics",
      store_name: "Penguin Classics & Fiction",
      description: "Curated literary fiction, timeless worldwide classics, and poetry anthologies.",
      location: "London, United Kingdom",
      logo_url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=150&h=150&fit=crop",
      banner_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=400&fit=crop",
    },
  ];

  const defaultPasswordHash = hashPassword("publisher123");

  for (const p of publishers) {
    await client.query(`DELETE FROM "publisher" WHERE "email" = $1;`, [p.email]);
    await client.query(
      `INSERT INTO "publisher" ("id", "name", "email", "password_hash", "handle", "store_name", "description", "location", "logo_url", "banner_url")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
      [p.id, p.name, p.email, defaultPasswordHash, p.handle, p.store_name, p.description, p.location, p.logo_url, p.banner_url]
    );
  }

  console.log("✔ All 3 verified publishers seeded successfully in Supabase!");
  await client.end();
}

run().catch((err) => {
  console.error("Error seeding publishers:", err);
  process.exit(1);
});

