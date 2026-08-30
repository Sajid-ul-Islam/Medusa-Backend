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

  // 1. Enrich Publishers (General, Academic, Bengali Literature, and Islamic)
  const publishers = [
    {
      id: "pub_guardian",
      name: "Guardian Publications (গার্ডিয়ান পাবলিকেশন)",
      email: "contact@guardianpubs.com",
      handle: "guardian-publications",
      store_name: "Guardian Publications",
      description: "Leading publisher of contemporary Islamic research, Seerah literature, spiritual purification, and youth development books.",
      location: "Banglabazar, Dhaka, Bangladesh",
      logo_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80",
      banner_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
      is_verified: true,
      status: "active",
    },
    {
      id: "pub_somokalin",
      name: "Somokalin Prokashon (সমকালীন প্রকাশন)",
      email: "info@somokalin.com",
      handle: "somokalin-prokashon",
      store_name: "Somokalin Prokashon",
      description: "Celebrated publisher of Arif Azad's bestsellers (Paradoxical Sajid), youth motivation, and modern lifestyle literature.",
      location: "Banglabazar, Dhaka, Bangladesh",
      logo_url: "https://images.unsplash.com/photo-1532012164546-f432f2e37b73?auto=format&fit=crop&w=300&q=80",
      banner_url: "https://images.unsplash.com/photo-1507842229451-2b0e6c51804b?auto=format&fit=crop&w=1200&q=80",
      is_verified: true,
      status: "active",
    },
    {
      id: "pub_islamic_foundation",
      name: "Islamic Foundation Bangladesh (ইসলামিক ফাউন্ডেশন)",
      email: "info@islamicfoundation.gov.bd",
      handle: "islamic-foundation",
      store_name: "Islamic Foundation Bangladesh",
      description: "Official statutory authority publishing authentic Quranic exegesis (Tafsir), Sahih Hadith encyclopedias, and Islamic jurisprudence.",
      location: "Agargaon, Dhaka, Bangladesh",
      logo_url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=300&q=80",
      banner_url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
      is_verified: true,
      status: "active",
    },
    {
      id: "pub_shian",
      name: "Shian Publications (শিয়ান পাবলিকেশন)",
      email: "sales@shian.com",
      handle: "shian-publications",
      store_name: "Shian Publications",
      description: "Prestigious publisher of Islamic history, spirituality, classical Arabic translations, and Tazkiyah literature.",
      location: "Purana Paltan, Dhaka, Bangladesh",
      logo_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=300&q=80",
      banner_url: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80",
      is_verified: true,
      status: "active",
    },
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
    {
      id: "pub_somoy",
      name: "Somoy Prokashon (সময় প্রকাশন)",
      email: "info@somoyprokashon.com",
      handle: "somoy-prokashon",
      store_name: "Somoy Prokashon",
      description: "Pioneering publisher of iconic science fiction, popular thrillers, and Ekushey Boi Mela bestsellers.",
      location: "Banglabazar, Dhaka, Bangladesh",
      logo_url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=300&q=80",
      banner_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
      is_verified: true,
      status: "active",
    },
    {
      id: "pub_anyaprokash",
      name: "Anyaprokash (অন্যপ্রকাশ)",
      email: "contact@anyaprokash.com",
      handle: "anyaprokash",
      store_name: "Anyaprokash",
      description: "Historic prestigious home of Humayun Ahmed masterpieces, contemporary novels, and Bengali cultural literature.",
      location: "Purana Paltan, Dhaka, Bangladesh",
      logo_url: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=300&q=80",
      banner_url: "https://images.unsplash.com/photo-1507842229451-2b0e6c51804b?auto=format&fit=crop&w=1200&q=80",
      is_verified: true,
      status: "active",
    },
    {
      id: "pub_tamralipi",
      name: "Tamralipi (তাম্রলিপি)",
      email: "sales@tamralipi.com",
      handle: "tamralipi",
      store_name: "Tamralipi",
      description: "Leading publisher of children's literature, young adult fiction, translations, and science encyclopedias.",
      location: "Purana Paltan, Dhaka, Bangladesh",
      logo_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=300&q=80",
      banner_url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80",
      is_verified: true,
      status: "active",
    },
    {
      id: "pub_mit_press",
      name: "MIT Press & Computing",
      email: "info@mitpress.mit.edu",
      handle: "mit-press",
      store_name: "MIT Press & Computing",
      description: "World authority in Algorithms, Deep Learning, Cryptography, Computational Theory, and Open Science.",
      location: "Cambridge, Massachusetts, USA",
      logo_url: "https://images.unsplash.com/photo-1532012164546-f432f2e37b73?auto=format&fit=crop&w=300&q=80",
      banner_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      is_verified: true,
      status: "active",
    },
    {
      id: "pub_harpercollins",
      name: "HarperCollins Classics",
      email: "contact@harpercollins.com",
      handle: "harpercollins-classics",
      store_name: "HarperCollins Classics",
      description: "One of the world's greatest publishing houses bringing inspiring fiction, biographies, and timeless wisdom.",
      location: "New York, USA",
      logo_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80",
      banner_url: "https://images.unsplash.com/photo-1507842229451-2b0e6c51804b?auto=format&fit=crop&w=1200&q=80",
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
  console.log(`✔ ${publishers.length} Verified Publishing Houses Seeded!`);

  // 2. Enrich Book Catalog (Medusa Products + Variants + BDT Prices)
  const books = [
    // --- Islamic Publications ---
    {
      id: "prod_paradoxical_sajid",
      title: "প্যারাডক্সিক্যাল সাজিদ (Paradoxical Sajid 1 & 2)",
      subtitle: "বিশ্বাসের পক্ষে যুক্তি ও আধুনিক মনস্তত্ত্বের কথোপকথন",
      handle: "paradoxical-sajid-arif-azad",
      description: "আরিফ আজাদের সর্বাধিক বিক্রিত অনুপ্রেরণাদায়ী বই। বিশ্বাস, বিজ্ঞান, দর্শন ও সংশয়বাদের বিরুদ্ধে যৌক্তিক ও সাবলীল সংলাপ।",
      thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_somokalin",
      author: "আরিফ আজাদ (Arif Azad)",
      isbn: "978-9849312211",
      categories: ["Islamic Literature", "Faith & Philosophy", "Youth Inspiration"],
      hardcover_price: 38000, // ৳380.00
      ebook_price: 18000,     // ৳180.00
    },
    {
      id: "prod_bela_phurabar_age",
      title: "বেলা ফুরাবার আগে (Bela Phurabar Age)",
      subtitle: "জীবনের মোড় ঘুরিয়ে দেওয়ার মতো আত্মশুদ্ধির ডাক",
      handle: "bela-phurabar-age-arif-azad",
      description: "আরিফ আজাদের হৃদয়স্পর্শী আধ্যাত্মিক জাগরণের বই। সময়ের মূল্য, তাকওয়া ও জীবনের আসল উদ্দেশ্যের সন্ধান।",
      thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_somokalin",
      author: "আরিফ আজাদ (Arif Azad)",
      isbn: "978-9849312255",
      categories: ["Islamic Literature", "Spirituality", "Self-Development"],
      hardcover_price: 32000, // ৳320.00
      ebook_price: 15000,     // ৳150.00
    },
    {
      id: "prod_raheeq_makhtum",
      title: "আর-রাহীকুল মাখতূম (Ar-Raheeq Al-Makhtum)",
      subtitle: "বিশ্ব মুসলিম রাবেতায়ে আলম কর্তৃক প্রথম পুরস্কারপ্রাপ্ত সীরাত গ্রন্থ",
      handle: "ar-raheeq-al-makhtum-sirat-nabi",
      description: "রাসূলুল্লাহ ﷺ-এর প্রামাণ্য ও পূর্ণাঙ্গ জীবনচরিত। বিশ্বব্যাপী আন্তর্জাতিক সীরাত প্রতিযোগিতায় প্রথম স্থান অধিকারী অনন্য গ্রন্থ।",
      thumbnail: "https://images.unsplash.com/photo-1532012164546-f432f2e37b73?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_guardian",
      author: "আল্লামা সফিউর রহমান মোবারকপুরী (Safiur Rahman Mubarakpuri)",
      isbn: "978-9848761109",
      categories: ["Sirat un-Nabi", "Islamic History", "Biographies"],
      hardcover_price: 65000, // ৳650.00
      ebook_price: 28000,     // ৳280.00
    },
    {
      id: "prod_tafsir_maariful_quran",
      title: "তাফসীরে মা'আরিফুল কুরআন (Tafsir Maariful Quran)",
      subtitle: "পূর্ণাঙ্গ ৮ খণ্ড সংস্করণ - কুরআনুল কারীমের নির্ভরযোগ্য ব্যাখ্যা",
      handle: "tafsir-maariful-quran-complete-shafi",
      description: "মুফতী মুহাম্মদ শফী রহ.-এর কালজয়ী তাফসীর গ্রন্থ। সাধারণ ও গবেষক উভয়ের জন্য কুরআনের অর্থ, শানে নুযুল ও জীবনঘনিষ্ঠ ব্যাখ্যা।",
      thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_islamic_foundation",
      author: "মুফতী মুহাম্মদ শফী রহ. (Mufti Muhammad Shafi)",
      isbn: "978-9840602214",
      categories: ["Quran Exegesis", "Tafsir", "Islamic Academic"],
      hardcover_price: 360000, // ৳3,600.00
      ebook_price: 120000,     // ৳1,200.00
    },
    {
      id: "prod_sahih_bukhari",
      title: "সহীহ বুখারী শরীফ পূর্ণাঙ্গ সংকলন (Sahih Al-Bukhari)",
      subtitle: "বিশুদ্ধ হাদীসের সর্বশ্রেষ্ঠ গ্রন্থ - ইসলামিক ফাউন্ডেশন সংস্করণ",
      handle: "sahih-al-bukhari-islamic-foundation",
      description: "কুরআনের পর সর্বাধিক বিশুদ্ধ গ্রন্থ। ইমাম বুখারী রহ. কর্তৃক সংকলিত রাসূলুল্লাহ ﷺ-এর নির্ভরযোগ্য হাদীস ও শরীয়তের বিধান।",
      thumbnail: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_islamic_foundation",
      author: "ইমাম মুহাম্মদ ইবনে ইসমাইল বুখারী রহ. (Imam Bukhari)",
      isbn: "978-9840611002",
      categories: ["Hadith Collections", "Islamic Law", "Scriptures"],
      hardcover_price: 450000, // ৳4,500.00
      ebook_price: 150000,     // ৳1,500.00
    },
    {
      id: "prod_return_allah",
      title: "রিটার্ন: জীবনের নতুন বাঁকে (Return: To the Creator)",
      subtitle: "তরুণ প্রজন্মের আত্মপরিচয় ও আত্মজিজ্ঞাসার উত্তর",
      handle: "return-jiboner-notun-baanke-asif-adnan",
      description: "আধুনিক জীবনের দ্বিধা-দ্বন্দ্ব ও বিভ্রান্তির মাঝে ঈমানী স্থিরতা এবং আল্লাহর পথে ফিরে আসার অনন্য গাইড।",
      thumbnail: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_guardian",
      author: "আসিফ আদনান (Asif Adnan)",
      isbn: "978-9848761445",
      categories: ["Islamic Literature", "Youth Guidance", "Ethics"],
      hardcover_price: 35000, // ৳350.00
      ebook_price: 16000,     // ৳160.00
    },
    {
      id: "prod_ihya_ulum",
      title: "এহইয়াউ উলুমিদ্দীন (Ihya Ulum al-Din: The Revival)",
      subtitle: "দ্বীনী জ্ঞানের পুনরুজ্জীবন ও আত্মশুদ্ধির মহাকাব্য",
      handle: "ihya-ulum-al-din-imam-al-ghazali",
      description: "হুজ্জাতুল ইসলাম ইমাম গাজ্জালী রহ.-এর অমর সৃষ্টি। অন্তরের রোগমুক্তি, ইখলাস ও স্রষ্টার নৈকট্য অর্জনের পথনির্দেশ।",
      thumbnail: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_shian",
      author: "ইমাম আবু হামিদ আল-গাজ্জালী রহ. (Imam Al-Ghazali)",
      isbn: "978-9849201123",
      categories: ["Tazkiyah", "Spirituality", "Islamic Classics"],
      hardcover_price: 85000, // ৳850.00
      ebook_price: 38000,     // ৳380.00
    },
    {
      id: "prod_hidayah_fiqh",
      title: "আল-হেদায়াহ: ইসলামী আইন ও ফিকহের মূল গ্রন্থ (Al-Hidayah)",
      subtitle: "হানাফী মাযহাবের প্রামাণ্য ও ঐতিহাসিক ফিকহ বিশ্বকোষ",
      handle: "al-hidayah-hanafi-fiqh-classic",
      description: "ইসলামী আইন ও ব্যবহারিক ফিকহের সর্বাধিক সমাদৃত টেক্সটবুক। ইবাদত, মুয়ামালাত ও সমাজনীতির বিস্তারিত সমাধান।",
      thumbnail: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_islamic_foundation",
      author: "বুরহানুদ্দীন আল-মারগিনানী রহ. (Burhan al-Din al-Marghinani)",
      isbn: "978-9840608899",
      categories: ["Islamic Law", "Fiqh", "Academic"],
      hardcover_price: 140000, // ৳1,400.00
      ebook_price: 60000,      // ৳600.00
    },

    // --- Tech & Academic Catalog ---
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
      id: "prod_grokking_algo",
      title: "Grokking Algorithms: An Illustrated Guide",
      subtitle: "For Programmers and Other Curious People",
      handle: "grokking-algorithms-illustrated-guide",
      description: "A friendly, fully illustrated guide that teaches you how to apply common algorithms to practical programming problems.",
      thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_oreilly",
      author: "Aditya Y. Bhargava",
      isbn: "978-1617292231",
      categories: ["Technology", "Algorithms", "Computer Science"],
      hardcover_price: 85000,  // ৳850.00
      ebook_price: 45000,      // ৳450.00
    },
    {
      id: "prod_clrs_algo",
      title: "Introduction to Algorithms (CLRS 4th Edition)",
      subtitle: "The Comprehensive Standard Algorithms Textbook",
      handle: "introduction-to-algorithms-clrs-4th-edition",
      description: "The leading algorithms text in universities worldwide, covering graph theory, dynamic programming, and greedy heuristics.",
      thumbnail: "https://images.unsplash.com/photo-1532012164546-f432f2e37b73?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_mit_press",
      author: "Cormen, Leiserson, Rivest & Stein",
      isbn: "978-0262046305",
      categories: ["Academic", "Algorithms", "Computer Science"],
      hardcover_price: 220000, // ৳2,200.00
      ebook_price: 95000,      // ৳950.00
    },
    {
      id: "prod_deep_learning_mit",
      title: "Deep Learning (Adaptive Computation and Machine Learning)",
      subtitle: "The definitive mathematical and algorithmic reference on neural networks",
      handle: "deep-learning-mit-press-goodfellow",
      description: "The seminal textbook on deep learning by Yoshua Bengio, Ian Goodfellow, and Aaron Courville.",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_mit_press",
      author: "Ian Goodfellow & Yoshua Bengio",
      isbn: "978-0262035613",
      categories: ["Academic", "Artificial Intelligence", "Deep Learning"],
      hardcover_price: 195000, // ৳1,950.00
      ebook_price: 85000,      // ৳850.00
    },
    {
      id: "prod_atomic_habits",
      title: "Atomic Habits: Tiny Changes, Remarkable Results",
      subtitle: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      handle: "atomic-habits-james-clear",
      description: "Over 15 million copies sold. The definitive framework for improving 1% every day by James Clear.",
      thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_penguin",
      author: "James Clear",
      isbn: "978-0735211292",
      categories: ["Self-Improvement", "Productivity", "Non-Fiction"],
      hardcover_price: 75000,  // ৳750.00
      ebook_price: 38000,      // ৳380.00
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
      id: "prod_alchemist",
      title: "The Alchemist (Collector's Illustrated Edition)",
      subtitle: "A Fable About Following Your Dream",
      handle: "the-alchemist-paulo-coelho",
      description: "Paulo Coelho's masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of worldly treasure.",
      thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_harpercollins",
      author: "Paulo Coelho",
      isbn: "978-0062315007",
      categories: ["Fiction", "Philosophy", "Classics"],
      hardcover_price: 48000,  // ৳480.00
      ebook_price: 22000,      // ৳220.00
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
      id: "prod_jochhona",
      title: "জোছনা ও জননীর গল্প (Jochhona O Jononir Golpo)",
      subtitle: "মুক্তিযুদ্ধের অমর ও মহাকাব্যিক আখ্যান",
      handle: "jochhona-o-jononir-golpo-humayun-ahmed",
      description: "হুমায়ূন আহমেদের জীবনের সর্বশ্রেষ্ঠ উপন্যাস। ১৯৭১ সালের মুক্তিযুদ্ধের লোমহর্ষক ও বীরত্বপূর্ণ মহাকাব্যিক চিত্র।",
      thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_anyaprokash",
      author: "হুমায়ূন আহমেদ (Humayun Ahmed)",
      isbn: "978-9848682211",
      categories: ["Liberation War", "Bengali Literature", "Epic Novels"],
      hardcover_price: 75000,  // ৳750.00
      ebook_price: 35000,      // ৳350.00
    },
    {
      id: "prod_brishti_scifi",
      title: "বৃষ্টি ও মেঘমালা (Sci-Fi Classic)",
      subtitle: "ভবিষ্যত পৃথিবীর রোমাঞ্চকর বৈজ্ঞানিক কল্পকাহিনী",
      handle: "brishti-o-meghmala-zafar-iqbal",
      description: "মুহম্মদ জাফর ইকবালের অমর সায়েন্স ফিকশন উপন্যাস। ভবিষ্যত পৃথিবী, কৃত্রিম বুদ্ধিমত্তা ও মহাজাগতিক রহস্য।",
      thumbnail: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_somoy",
      author: "মুহম্মদ জাফর ইকবাল (Muhammad Zafar Iqbal)",
      isbn: "978-9844583321",
      categories: ["Science Fiction", "Bengali Literature", "Thriller"],
      hardcover_price: 28000,  // ৳280.00
      ebook_price: 14000,      // ৳140.00
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

  console.log(`✔ Successfully seeded ${books.length} Books including Islamic Classics, Hadith, Tafsir, Tech & Literature in BDT (৳)!`);
  await client.end();
}

enrichDatabase().catch((err) => {
  console.error("Seeding Error:", err);
  process.exit(1);
});
