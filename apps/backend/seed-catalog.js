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
      id: "prod_dipaboli",
      title: "দীপাবলি (Dipaboli Trilogy)",
      subtitle: "গর্ভধারিণী, উত্তরাধিকার ও কালবেলা সংকলন",
      handle: "dipaboli-samaresh-majumdar",
      description: "সমরেশ মজুমদারের অমর উপন্যাস সংকলন। অনিমেষ ও মাধবীলতার অবিস্মরণীয় জীবনের আখ্যান।",
      thumbnail: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_batighar",
      author: "সমরেশ মজুমদার (Samaresh Majumdar)",
      isbn: "978-9848981123",
      categories: ["Bengali Literature", "Classics", "Fiction"],
      hardcover_price: 65000,  // ৳650.00
      ebook_price: 30000,      // ৳300.00
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
      id: "prod_shongkhonil",
      title: "শঙ্খনীল কারাগার (Shongkhonil Karagar)",
      subtitle: "মধ্যবিত্ত জীবনের নিখুঁত দর্পণ",
      handle: "shongkhonil-karagar-humayun-ahmed",
      description: "হুমায়ূন আহমেদের বাংলা সাহিত্যের অন্যতম শ্রেষ্ঠ সৃষ্টি ও মধ্যবিত্ত পারিবারিক সম্পর্কের মর্মস্পর্শী উপন্যাস।",
      thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_anyaprokash",
      author: "হুমায়ূন আহমেদ (Humayun Ahmed)",
      isbn: "978-9848681109",
      categories: ["Bengali Literature", "Drama", "Fiction"],
      hardcover_price: 32000,  // ৳320.00
      ebook_price: 15000,      // ৳150.00
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
      id: "prod_tuntuni",
      title: "দীপু নাম্বার টু (Dipu Number Two)",
      subtitle: "কিশোর ক্লাসিক রোমাঞ্চ উপন্যাস",
      handle: "dipu-number-two-zafar-iqbal",
      description: "মুহম্মদ জাফর ইকবালের বহুল পঠিত কিশোর রোমাঞ্চকর উপন্যাস। বন্ধুত্ব, সাহস ও আত্মবিশ্বাসের অনন্য গল্প।",
      thumbnail: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_tamralipi",
      author: "মুহম্মদ জাফর ইকবাল (Muhammad Zafar Iqbal)",
      isbn: "978-9844580019",
      categories: ["Young Adult", "Adventures", "Fiction"],
      hardcover_price: 30000,  // ৳300.00
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
      id: "prod_cratch",
      title: "ক্রাচের কর্নেল (Cratcher Colonel)",
      subtitle: "কর্নেল তাহের ও বাংলাদেশের রাজনীতি",
      handle: "cratcher-colonel-shahaduz-zaman",
      description: "শাহাদুজ্জামানের বহুল আলোচিত রাজনৈতিক গবেষণাধর্মী জীবনী উপন্যাস। বাংলাদেশের অভ্যুদয় পর্বের রক্তাক্ত ইতিহাস।",
      thumbnail: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80",
      publisher_id: "pub_prothoma",
      author: "শাহাদুজ্জামান (Shahaduz Zaman)",
      isbn: "978-9844658912",
      categories: ["History", "Politics", "Biographies"],
      hardcover_price: 42000,  // ৳420.00
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
