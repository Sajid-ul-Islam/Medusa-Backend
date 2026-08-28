const { Client } = require("pg");
const crypto = require("crypto");

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://postgres.plltvinvmifjxotzalis:Tt2khyJ7OGwjk1H2@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres";

async function enrichDatabase() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  console.log("Connected to Supabase PostgreSQL for Catalog Enrichment...");

  // 1. Enrich Publishers
  const publishers = [
    {
      id: "pub_oreilly",
      name: "O'Reilly Media & Tech",
      email: "oreilly@media.com",
      handle: "oreilly-media",
      store_name: "O'Reilly Media & Tech",
      description: "World-renowned publisher of definitive technology, programming, and distributed systems books.",
      location: "Sebastopol, California, USA",
      logo_url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=300&q=80",
      banner_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      is_verified: true,
      status: "active",
    },
    {
      id: "pub_oxford",
      name: "Oxford Academic Press",
      email: "oxford@press.com",
      handle: "oxford-press",
      store_name: "Oxford Academic Press",
      description: "Prestigious academic publications, computer science literature, and higher education textbooks since 1586.",
      location: "Oxford, United Kingdom",
      logo_url: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=300&q=80",
      banner_url: "https://images.unsplash.com/photo-1507842229451-2b0e6c51804b?auto=format&fit=crop&w=1200&q=80",
      is_verified: true,
      status: "active",
    },
    {
      id: "pub_penguin",
      name: "Penguin Classics & Fiction",
      email: "penguin@classics.com",
      handle: "penguin-classics",
      store_name: "Penguin Classics & Fiction",
      description: "Timeless fiction, contemporary novels, poetry collections, and modern bestsellers worldwide.",
      location: "London, United Kingdom",
      logo_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=300&q=80",
      banner_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80",
      is_verified: true,
      status: "active",
    },
    {
      id: "pub_batighar",
      name: "Batighar Publications (বাতিঘর)",
      email: "info@batighar.com",
      handle: "batighar-publications",
      store_name: "Batighar Publications",
      description: "Premier Bangladeshi publishing house celebrating rich Bengali literature, world translations, and modern poetry.",
      location: "Dhaka & Chattogram, Bangladesh",
      logo_url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=300&q=80",
      banner_url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
      is_verified: true,
      status: "active",
    },
    {
      id: "pub_prothoma",
      name: "Prothoma Prokashan (প্রথমা)",
      email: "sales@prothoma.com",
      handle: "prothoma-prokashan",
      store_name: "Prothoma Prokashan",
      description: "Leading Bangladeshi non-fiction, political history, memoirs, and investigative journalism publisher.",
      location: "Karwan Bazar, Dhaka, Bangladesh",
      logo_url: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=300&q=80",
      banner_url: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80",
      is_verified: true,
      status: "active",
    },
    {
      id: "pub_mawla",
      name: "Mawla Brothers (মাওলা ব্রাদার্স)",
      email: "contact@mawlabrothers.com",
      handle: "mawla-brothers",
      store_name: "Mawla Brothers",
      description: "Historic Bangladeshi publisher of classic novels, critical essays, academic journals, and Amar Ekushey Boi Mela editions.",
      location: "Banglabazar, Dhaka, Bangladesh",
      logo_url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=300&q=80",
      banner_url: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=1200&q=80",
      is_verified: true,
      status: "active",
    },
  ];

  // Hash password for publishers (publisher123)
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync("publisher123", salt, 1000, 64, "sha512").toString("hex");
  const password_hash = `${salt}:${hash}`;

  for (const pub of publishers) {
    await client.query(
      `
      INSERT INTO "publisher" (
        "id", "name", "email", "password_hash", "handle", "store_name", 
        "description", "location", "logo_url", "banner_url", "is_verified", "status"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT ("id") DO UPDATE SET
        "name" = EXCLUDED."name",
        "description" = EXCLUDED."description",
        "location" = EXCLUDED."location",
        "logo_url" = EXCLUDED."logo_url",
        "banner_url" = EXCLUDED."banner_url",
        "is_verified" = EXCLUDED."is_verified";
    `,
      [
        pub.id,
        pub.name,
        pub.email,
        password_hash,
        pub.handle,
        pub.store_name,
        pub.description,
        pub.location,
        pub.logo_url,
        pub.banner_url,
        pub.is_verified,
        pub.status,
      ]
    );
  }
  console.log("✔ 6 Verified Publishers Seeded!");

  // 2. Enrich Book Catalog (Medusa Products + Variants + BDT Prices)
  const books = [
    {
      id: "prod_ddia",
      title: "Designing Data-Intensive Applications",
      subtitle: "The Big Ideas Behind Reliable, Scalable, and Maintainable Systems",
      handle: "designing-data-intensive-applications",
      description: "The definitive guide to distributed data systems, storage engines, stream processing, and architectural reliability under extreme scale.",
      thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_oreilly",
      author: "Martin Kleppmann",
      isbn: "978-1449373320",
      categories: ["Technology", "Databases", "Distributed Systems"],
      hardcover_price: 120000, // ৳1,200.00
      ebook_price: 65000,      // ৳650.00
    },
    {
      id: "prod_clean_arch",
      title: "Clean Architecture: A Craftsman's Guide",
      subtitle: "Software Structure and Design Patterns",
      handle: "clean-architecture-craftsmans-guide",
      description: "Essential rules and patterns of software architecture and craftsmanship from Uncle Bob.",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_oreilly",
      author: "Robert C. Martin",
      isbn: "978-0134494166",
      categories: ["Technology", "Software Engineering"],
      hardcover_price: 95000,  // ৳950.00
      ebook_price: 50000,      // ৳500.00
    },
    {
      id: "prod_ai_modern",
      title: "Artificial Intelligence: A Modern Approach (4th Ed)",
      subtitle: "The Authoritative introduction to AI theory and neural systems",
      handle: "artificial-intelligence-a-modern-approach",
      description: "The authoritative, most widely used introduction to AI theory and practice in university programs worldwide.",
      thumbnail: "https://images.unsplash.com/photo-1532012164546-f432f2e37b73?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_oxford",
      author: "Stuart Russell & Peter Norvig",
      isbn: "978-0134610993",
      categories: ["Academic", "Artificial Intelligence", "Computer Science"],
      hardcover_price: 185000, // ৳1,850.00
      ebook_price: 85000,      // ৳850.00
    },
    {
      id: "prod_quantum",
      title: "Principles of Quantum Mechanics",
      subtitle: "Mathematical Foundations & Dirac Notation",
      handle: "principles-of-quantum-mechanics",
      description: "Comprehensive textbook on the mathematical foundations and physical principles of quantum theory.",
      thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_oxford",
      author: "R. Shankar",
      isbn: "978-0306447908",
      categories: ["Academic", "Physics", "Science"],
      hardcover_price: 140000, // ৳1,400.00
      ebook_price: 70000,      // ৳700.00
    },
    {
      id: "prod_sapiens",
      title: "Sapiens: A Brief History of Humankind",
      subtitle: "From the Cognitive Revolution to Artificial Intelligence",
      handle: "sapiens-brief-history-of-humankind",
      description: "100,000 years of human evolution, cognition, agricultural revolution, and the future of Homo sapiens.",
      thumbnail: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_penguin",
      author: "Yuval Noah Harari",
      isbn: "978-0062316097",
      categories: ["History", "Anthropology", "Non-Fiction"],
      hardcover_price: 85000,  // ৳850.00
      ebook_price: 45000,      // ৳450.00
    },
    {
      id: "prod_great_gatsby",
      title: "The Great Gatsby (Collector's Hardcover)",
      subtitle: "The Timeless Jazz Age Masterpiece",
      handle: "the-great-gatsby-collectors-edition",
      description: "The iconic Jazz Age masterpiece capturing romance, ambition, and tragedy in 1920s Long Island.",
      thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_penguin",
      author: "F. Scott Fitzgerald",
      isbn: "978-0743273565",
      categories: ["Fiction", "Classics", "Literature"],
      hardcover_price: 55000,  // ৳550.00
      ebook_price: 25000,      // ৳250.00
    },
    {
      id: "prod_debipak",
      title: "দেবী (Devi)",
      subtitle: "কালজয়ী মিসির আলি রহস্য উপন্যাস",
      handle: "devi-humayun-ahmed",
      description: "হুমায়ূন আহমেদের কালজয়ী মনস্তাত্ত্বিক ও রহস্য উপন্যাস। মিসির আলি চরিত্রের অনবদ্য প্রথম বই।",
      thumbnail: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_batighar",
      author: "হুমায়ূন আহমেদ (Humayun Ahmed)",
      isbn: "978-9848765432",
      categories: ["Bengali Literature", "Mystery", "Fiction"],
      hardcover_price: 35000,  // ৳350.00
      ebook_price: 15000,      // ৳150.00
    },
    {
      id: "prod_ekattor",
      title: "একাত্তরের দিনগুলি (Ekattorer Dinguli)",
      subtitle: "মুক্তিযুদ্ধের অমর দিনলিপি ও শহীদ জননীর দলিল",
      handle: "ekattorer-dinguli-jahanara-imam",
      description: "শহীদ জননী জাহানারা ইমামের ১৯৭১ সালের মুক্তিযুদ্ধের প্রত্যক্ষ দিনলিপি। বাংলাদেশের ইতিহাসের অবিস্মরণীয় দলিল।",
      thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_prothoma",
      author: "জাহানারা ইমাম (Jahanara Imam)",
      isbn: "978-9844650012",
      categories: ["History", "Liberation War", "Memoirs"],
      hardcover_price: 45000,  // ৳450.00
      ebook_price: 20000,      // ৳200.00
    },
    {
      id: "prod_padma_nodir_majhi",
      title: "পদ্মা নদীর মাঝি (Padma Nadir Majhi)",
      subtitle: "বাংলা সাহিত্যের কালজয়ী ধ্রুপদী উপন্যাস",
      handle: "padma-nadir-majhi-manik-bandopadhyay",
      description: "মানিক বন্দ্যোপাধ্যায়ের অবিস্মরণীয় নদীকেন্দ্রিক জীবনগাথা ও পদ্মার জেলেদের জীবন সংগ্রামের চিত্র।",
      thumbnail: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_mawla",
      author: "মানিক বন্দ্যোপাধ্যায় (Manik Bandopadhyay)",
      isbn: "978-9844101123",
      categories: ["Bengali Classics", "Novels", "Literature"],
      hardcover_price: 38000,  // ৳380.00
      ebook_price: 18000,      // ৳180.00
    },
  ];

  for (const book of books) {
    // 1. Insert Product
    await client.query(
      `
      INSERT INTO "product" (
        "id", "title", "subtitle", "description", "handle", "is_giftcard", 
        "status", "thumbnail", "discountable", "metadata"
      ) VALUES ($1, $2, $3, $4, $5, false, 'published', $6, true, $7)
      ON CONFLICT ("id") DO UPDATE SET
        "title" = EXCLUDED."title",
        "subtitle" = EXCLUDED."subtitle",
        "description" = EXCLUDED."description",
        "thumbnail" = EXCLUDED."thumbnail",
        "metadata" = EXCLUDED."metadata";
    `,
      [
        book.id,
        book.title,
        book.subtitle,
        book.description,
        book.handle,
        book.thumbnail,
        JSON.stringify({
          author: book.author,
          isbn: book.isbn,
          publisher_id: book.publisher_id,
          categories: book.categories,
        }),
      ]
    );

    // 2. Insert Option (Format)
    const optId = `opt_${book.id}_format`;
    await client.query(
      `
      INSERT INTO "product_option" ("id", "title", "product_id")
      VALUES ($1, 'Format', $2)
      ON CONFLICT ("id") DO NOTHING;
    `,
      [optId, book.id]
    );

    // 3. Insert Variants (Physical Hardcover & Instant eBook)
    const variants = [
      {
        id: `var_${book.id}_physical`,
        title: "Physical Print Edition (Hardcover)",
        sku: `SKU-${book.id.toUpperCase()}-PHY`,
        inventory: 150,
        price: book.hardcover_price,
        format_val: "Physical",
      },
      {
        id: `var_${book.id}_ebook`,
        title: "Instant Digital eBook (PDF & ePub)",
        sku: `SKU-${book.id.toUpperCase()}-EBK`,
        inventory: 99999,
        price: book.ebook_price,
        format_val: "Digital",
      },
    ];

    for (const v of variants) {
      await client.query(
        `
        INSERT INTO "product_variant" (
          "id", "title", "product_id", "sku", "inventory_quantity", 
          "allow_backorder", "manage_inventory"
        ) VALUES ($1, $2, $3, $4, $5, true, true)
        ON CONFLICT ("id") DO UPDATE SET
          "title" = EXCLUDED."title",
          "sku" = EXCLUDED."sku",
          "inventory_quantity" = EXCLUDED."inventory_quantity";
      `,
        [v.id, v.title, book.id, v.sku, v.inventory]
      );

      // Insert Option Value
      const optValId = `optval_${v.id}`;
      await client.query(
        `
        INSERT INTO "product_option_value" ("id", "value", "option_id", "variant_id")
        VALUES ($1, $2, $3, $4)
        ON CONFLICT ("id") DO NOTHING;
      `,
        [optValId, v.format_val, optId, v.id]
      );

      // 4. Insert Money Amount (BDT ৳ price)
      const moneyBdtId = `ma_${v.id}_bdt`;
      await client.query(
        `
        INSERT INTO "money_amount" ("id", "currency_code", "amount")
        VALUES ($1, 'bdt', $2)
        ON CONFLICT ("id") DO UPDATE SET "amount" = EXCLUDED."amount";
      `,
        [moneyBdtId, v.price]
      );

      // Join to variant
      const pvmaBdtId = `pvma_${v.id}_bdt`;
      await client.query(
        `
        INSERT INTO "product_variant_money_amount" ("id", "money_amount_id", "variant_id")
        VALUES ($1, $2, $3)
        ON CONFLICT ("id") DO NOTHING;
      `,
        [pvmaBdtId, moneyBdtId, v.id]
      );

      // USD Price for multi-currency
      const moneyUsdId = `ma_${v.id}_usd`;
      await client.query(
        `
        INSERT INTO "money_amount" ("id", "currency_code", "amount")
        VALUES ($1, 'usd', $2)
        ON CONFLICT ("id") DO UPDATE SET "amount" = EXCLUDED."amount";
      `,
        [moneyUsdId, Math.round(v.price / 120)]
      );

      const pvmaUsdId = `pvma_${v.id}_usd`;
      await client.query(
        `
        INSERT INTO "product_variant_money_amount" ("id", "money_amount_id", "variant_id")
        VALUES ($1, $2, $3)
        ON CONFLICT ("id") DO NOTHING;
      `,
        [pvmaUsdId, moneyUsdId, v.id]
      );
    }
  }

  console.log(`✔ Successfully seeded ${books.length} Books with Physical Hardcovers & eBooks in BDT (৳)!`);
  await client.end();
}

enrichDatabase().catch((err) => {
  console.error("Seeding Error:", err);
  process.exit(1);
});
