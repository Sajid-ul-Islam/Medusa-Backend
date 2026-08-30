import axios from "axios";

const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

export const medusaClient = axios.create({
  baseURL: MEDUSA_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 6000,
});

// Cart token management
export const getCartId = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("medusa_cart_id");
};

export const setCartId = (cartId: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("medusa_cart_id", cartId);
};

export const removeCartId = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("medusa_cart_id");
};

// Curated sample publishers for marketplace
export const SAMPLE_PUBLISHERS = [
  {
    id: "pub_guardian",
    name: "Guardian Publications (গার্ডিয়ান পাবলিকেশন)",
    handle: "guardian-publications",
    description:
      "Leading publisher of contemporary Islamic research, Seerah literature, spiritual purification, and youth development books.",
    store_name: "Guardian Publications",
    logo_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80",
    banner_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    total_books: 180,
    location: "Banglabazar, Dhaka, Bangladesh",
  },
  {
    id: "pub_somokalin",
    name: "Somokalin Prokashon (সমকালীন প্রকাশন)",
    handle: "somokalin-prokashon",
    description:
      "Celebrated publisher of Arif Azad's bestsellers (Paradoxical Sajid), youth motivation, and modern lifestyle literature.",
    store_name: "Somokalin Prokashon",
    logo_url: "https://images.unsplash.com/photo-1532012164546-f432f2e37b73?auto=format&fit=crop&w=300&q=80",
    banner_url: "https://images.unsplash.com/photo-1507842229451-2b0e6c51804b?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    total_books: 125,
    location: "Banglabazar, Dhaka, Bangladesh",
  },
  {
    id: "pub_islamic_foundation",
    name: "Islamic Foundation Bangladesh (ইসলামিক ফাউন্ডেশন)",
    handle: "islamic-foundation",
    description:
      "Official statutory authority publishing authentic Quranic exegesis (Tafsir), Sahih Hadith encyclopedias, and Islamic jurisprudence.",
    store_name: "Islamic Foundation Bangladesh",
    logo_url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=300&q=80",
    banner_url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    total_books: 450,
    location: "Agargaon, Dhaka, Bangladesh",
  },
  {
    id: "pub_shian",
    name: "Shian Publications (শিয়ান পাবলিকেশন)",
    handle: "shian-publications",
    description:
      "Prestigious publisher of Islamic history, spirituality, classical Arabic translations, and Tazkiyah literature.",
    store_name: "Shian Publications",
    logo_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=300&q=80",
    banner_url: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    total_books: 95,
    location: "Purana Paltan, Dhaka, Bangladesh",
  },
  {
    id: "pub_batighar",
    name: "Batighar Publications (বাতিঘর)",
    handle: "batighar-publications",
    description:
      "Premier Bangladeshi publishing house celebrating rich Bengali literature, world translations, and modern poetry.",
    store_name: "Batighar Publications",
    logo_url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=300&q=80",
    banner_url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    total_books: 145,
    location: "Dhaka & Chattogram, Bangladesh",
  },
  {
    id: "pub_prothoma",
    name: "Prothoma Prokashan (প্রথমা)",
    handle: "prothoma-prokashan",
    description:
      "Leading Bangladeshi non-fiction, political history, memoirs, and investigative journalism publisher.",
    store_name: "Prothoma Prokashan",
    logo_url: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=300&q=80",
    banner_url: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    total_books: 98,
    location: "Karwan Bazar, Dhaka, Bangladesh",
  },
  {
    id: "pub_mawla",
    name: "Mawla Brothers (মাওলা ব্রাদার্স)",
    handle: "mawla-brothers",
    description:
      "Historic Bangladeshi publisher of classic novels, critical essays, academic journals, and Amar Ekushey Boi Mela editions.",
    store_name: "Mawla Brothers",
    logo_url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=300&q=80",
    banner_url: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    total_books: 210,
    location: "Banglabazar, Dhaka, Bangladesh",
  },
  {
    id: "pub_somoy",
    name: "Somoy Prokashon (সময় প্রকাশন)",
    handle: "somoy-prokashon",
    description:
      "Pioneering publisher of iconic science fiction, popular thrillers, and Ekushey Boi Mela bestsellers.",
    store_name: "Somoy Prokashon",
    logo_url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=300&q=80",
    banner_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    total_books: 180,
    location: "Banglabazar, Dhaka, Bangladesh",
  },
  {
    id: "pub_anyaprokash",
    name: "Anyaprokash (অন্যপ্রকাশ)",
    handle: "anyaprokash",
    description:
      "Historic prestigious home of Humayun Ahmed masterpieces, contemporary novels, and Bengali cultural literature.",
    store_name: "Anyaprokash",
    logo_url: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=300&q=80",
    banner_url: "https://images.unsplash.com/photo-1507842229451-2b0e6c51804b?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    total_books: 260,
    location: "Purana Paltan, Dhaka, Bangladesh",
  },
  {
    id: "pub_tamralipi",
    name: "Tamralipi (তাম্রলিপি)",
    handle: "tamralipi",
    description:
      "Leading publisher of children's literature, young adult fiction, translations, and science encyclopedias.",
    store_name: "Tamralipi",
    logo_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=300&q=80",
    banner_url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    total_books: 175,
    location: "Purana Paltan, Dhaka, Bangladesh",
  },
  {
    id: "pub_oreilly",
    name: "O'Reilly Media & Tech",
    handle: "oreilly-media",
    description:
      "Definitive guides to programming, systems design, artificial intelligence, and cloud engineering.",
    store_name: "O'Reilly Media & Tech",
    logo_url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=300&q=80",
    banner_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    total_books: 85,
    location: "Sebastopol, California, USA",
  },
  {
    id: "pub_oxford",
    name: "Oxford Academic Press",
    handle: "oxford-press",
    description:
      "Prestigious academic publications, computer science literature, and higher education textbooks since 1586.",
    store_name: "Oxford Academic Press",
    logo_url: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=300&q=80",
    banner_url: "https://images.unsplash.com/photo-1507842229451-2b0e6c51804b?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    total_books: 42,
    location: "Oxford, United Kingdom",
  },
  {
    id: "pub_mit_press",
    name: "MIT Press & Computing",
    handle: "mit-press",
    description:
      "World authority in Algorithms, Deep Learning, Cryptography, Computational Theory, and Open Science.",
    store_name: "MIT Press & Computing",
    logo_url: "https://images.unsplash.com/photo-1532012164546-f432f2e37b73?auto=format&fit=crop&w=300&q=80",
    banner_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    total_books: 95,
    location: "Cambridge, Massachusetts, USA",
  },
  {
    id: "pub_penguin",
    name: "Penguin Classics & Fiction",
    handle: "penguin-classics",
    description:
      "Timeless fiction, contemporary novels, poetry collections, and modern bestsellers worldwide.",
    store_name: "Penguin Classics & Fiction",
    logo_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=300&q=80",
    banner_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    total_books: 120,
    location: "London, United Kingdom",
  },
  {
    id: "pub_harpercollins",
    name: "HarperCollins Classics",
    handle: "harpercollins-classics",
    description:
      "One of the world's greatest publishing houses bringing inspiring fiction, biographies, and timeless wisdom.",
    store_name: "HarperCollins Classics",
    logo_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80",
    banner_url: "https://images.unsplash.com/photo-1507842229451-2b0e6c51804b?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    total_books: 160,
    location: "New York, USA",
  },
];

// Curated sample book catalog with rich metadata
export const SAMPLE_BOOKS = [
  {
    id: "prod_clean_code",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    handle: "designing-data-intensive-applications",
    description:
      "The definitive guide to distributed data systems, storage engines, stream processing, and architectural reliability under extreme scale.",
    long_description:
      "Data is at the center of many challenges in system design today. Difficult issues need to be figured out, such as scalability, consistency, reliability, efficiency, and maintainability. In addition, we have an overwhelming variety of tools, including relational databases, NoSQL datastores, stream or batch processors, and message brokers.\n\nIn this practical and comprehensive guide, author Martin Kleppmann helps you navigate this diverse landscape by examining the pros and cons of various technologies for processing and storing data.",
    isbn: "978-1449373320",
    publisher: {
      id: "pub_oreilly",
      name: "O'Reilly Media & Tech",
      handle: "oreilly-tech",
    },
    thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    categories: ["Technology", "Computer Science", "Architecture"],
    published_date: "2017-03-16",
    pages: 616,
    is_digital: true,
    is_physical: true,
    stock: 45,
    sample_chapter:
      "Chapter 1: Reliable, Scalable, and Maintainable Applications\n\nToday, many applications are data-intensive, as opposed to compute-intensive. Raw CPU power is rarely a bottleneck for these applications—bigger problems are usually the amount of data, the complexity of data, and the speed at which it is changing.\n\nA data-intensive application is typically built from standard building blocks that provide commonly needed functionality. For example, many applications need to: store data so that they, or another application, can find it again later (databases)...",
    variants: [
      {
        id: "var_ddia_hardcover",
        title: "Hardcover Physical Edition",
        price: 4999, // $49.99
        format: "Physical",
      },
      {
        id: "var_ddia_ebook",
        title: "Instant Digital eBook (PDF & ePub)",
        price: 2999, // $29.99
        format: "Digital",
      },
    ],
  },
  {
    id: "prod_ai_modern_approach",
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell & Peter Norvig",
    handle: "artificial-intelligence-a-modern-approach",
    description:
      "The authoritative, most widely used introduction to AI theory and practice in university programs worldwide.",
    long_description:
      "The long-anticipated revision of Artificial Intelligence: A Modern Approach explores the full breadth and depth of the field of artificial intelligence (AI). The 4th Edition brings readers up to date on the latest technologies, presents concepts in a more unified manner, and offers new or expanded coverage of machine learning, deep learning, transfer learning, multiagent systems, robotics, natural language processing, causality, probabilistic programming, privacy, fairness, and safe AI.",
    isbn: "978-0134610993",
    publisher: {
      id: "pub_oxford",
      name: "Oxford Academic Press",
      handle: "oxford-academic",
    },
    thumbnail: "https://images.unsplash.com/photo-1532012164546-f432f2e37b73?auto=format&fit=crop&w=600&q=80",
    categories: ["Academic", "Artificial Intelligence", "Technology"],
    published_date: "2020-04-28",
    pages: 1152,
    is_digital: true,
    is_physical: true,
    stock: 28,
    sample_chapter:
      "Chapter 1: Introduction to Artificial Intelligence\n\nWhat is AI? We have claimed that AI is exciting, but what is it? The definitions of artificial intelligence can be categorized into four approaches: Thinking Humanly, Thinking Rationally, Acting Humanly, and Acting Rationally.\n\nIn this book, we adopt the view of AI as the study and construction of rational agents...",
    variants: [
      {
        id: "var_ai_hardcover",
        title: "Hardcover Textbook Edition",
        price: 8999,
        format: "Physical",
      },
      {
        id: "var_ai_ebook",
        title: "eBook Student Edition",
        price: 3999,
        format: "Digital",
      },
    ],
  },
  {
    id: "prod_the_great_gatsby",
    title: "The Great Gatsby (Collector's Illustrated)",
    author: "F. Scott Fitzgerald",
    handle: "the-great-gatsby-collectors-edition",
    description:
      "The iconic Jazz Age masterpiece capturing romance, ambition, and tragedy in 1920s Long Island.",
    long_description:
      "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    isbn: "978-0743273565",
    publisher: {
      id: "pub_penguin",
      name: "Penguin Classics & Fiction",
      handle: "penguin-classics",
    },
    thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    categories: ["Fiction", "Classics", "Literature"],
    published_date: "1925-04-10",
    pages: 180,
    is_digital: true,
    is_physical: true,
    stock: 100,
    sample_chapter:
      "Chapter 1\n\nIn my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.\n\n'Whenever you feel like criticizing any one,' he told me, 'just remember that all the people in this world haven't had the advantages that you've had.'...",
    variants: [
      {
        id: "var_gatsby_paperback",
        title: "Collector's Paperback",
        price: 1599,
        format: "Physical",
      },
      {
        id: "var_gatsby_ebook",
        title: "Digital Classic eBook",
        price: 799,
        format: "Digital",
      },
    ],
  },
  {
    id: "prod_clean_architecture",
    title: "Clean Architecture: A Craftsman's Guide",
    author: "Robert C. Martin",
    handle: "clean-architecture-craftsmans-guide",
    description:
      "Essential rules and patterns of software structure and architecture from Uncle Bob.",
    long_description:
      "By applying universal rules of software architecture, you can dramatically improve developer productivity throughout the life of any software system. Now, building upon the success of his best-selling books 'Clean Code' and 'The Clean Coder,' legendary software craftsman Robert C. Martin reveals those rules and helps you apply them.",
    isbn: "978-0134494166",
    publisher: {
      id: "pub_oreilly",
      name: "O'Reilly Media & Tech",
      handle: "oreilly-tech",
    },
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    categories: ["Technology", "Software Engineering"],
    published_date: "2017-09-20",
    pages: 432,
    is_digital: true,
    is_physical: true,
    stock: 60,
    sample_chapter:
      "Chapter 1: What Is Design and Architecture?\n\nThere has been a lot of confusion about the difference between design and architecture. Is there any difference? Design and architecture are often used interchangeably. There is no difference between them whatsoever. None...",
    variants: [
      {
        id: "var_ca_paperback",
        title: "Paperback Edition",
        price: 3499,
        format: "Physical",
      },
      {
        id: "var_ca_ebook",
        title: "ePub / PDF eBook",
        price: 2199,
        format: "Digital",
      },
    ],
  },
  {
    id: "prod_sapiens",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    handle: "sapiens-brief-history-of-humankind",
    description:
      "100,000 years of human evolution, cognition, agricultural revolution, and the future of Homo sapiens.",
    long_description:
      "From a renowned historian comes a groundbreaking narrative of humanity’s creation and evolution—a #1 international bestseller—that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be 'human.'",
    isbn: "978-0062316097",
    publisher: {
      id: "pub_penguin",
      name: "Penguin Classics & Fiction",
      handle: "penguin-classics",
    },
    thumbnail: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
    categories: ["Non-Fiction", "History", "Science"],
    published_date: "2015-02-10",
    pages: 498,
    is_digital: true,
    is_physical: true,
    stock: 75,
    sample_chapter:
      "Part One: The Cognitive Revolution\n\nChapter 1: An Animal of No Significance\n\nAbout 13.5 billion years ago, matter, energy, time and space came into being in what is known as the Big Bang. The story of these fundamental features of our universe is called physics...",
    variants: [
      {
        id: "var_sapiens_hardcover",
        title: "Hardcover Edition",
        price: 2799,
        format: "Physical",
      },
      {
        id: "var_sapiens_ebook",
        title: "Audiobook & eBook Bundle",
        price: 1899,
        format: "Digital",
      },
    ],
  },
  {
    id: "prod_quantum_mechanics",
    title: "Principles of Quantum Mechanics",
    author: "R. Shankar",
    handle: "principles-of-quantum-mechanics",
    description:
      "Comprehensive textbook on the mathematical foundations and physical principles of quantum theory.",
    long_description:
      "R. Shankar has introduced major additions and updated key presentations in this second edition of Principles of Quantum Mechanics. New features include a detailed section on path integrals and their applications, along with expanded treatments of mathematical foundations.",
    isbn: "978-0306447908",
    publisher: {
      id: "pub_oxford",
      name: "Oxford Academic Press",
      handle: "oxford-academic",
    },
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
    categories: ["Academic", "Physics", "Science"],
    published_date: "1994-09-01",
    pages: 694,
    is_digital: true,
    is_physical: true,
    stock: 18,
    sample_chapter:
      "Chapter 1: Mathematical Introduction\n\nThe formulation of quantum mechanics relies heavily on linear vector spaces. In this chapter, we develop the essential Dirac bra-ket notation and operators...",
    variants: [
      {
        id: "var_qm_hardcover",
        title: "Standard Hardcover",
        price: 7499,
        format: "Physical",
      },
      {
        id: "var_qm_ebook",
        title: "PDF eTextbook",
        price: 3499,
        format: "Digital",
      },
    ],
  },
];

// API functions with fallback
export const api = {
  // Products
  getProducts: async (params?: {
    limit?: number;
    offset?: number;
    collection_id?: string;
    category?: string;
    publisher_handle?: string;
    search?: string;
  }) => {
    try {
      const response = await medusaClient.get("/store/products", { params });
      if (response.data?.products && response.data.products.length > 0) {
        return response.data;
      }
    } catch (error) {
      // Graceful fallback to sample data
    }

    let filtered = [...SAMPLE_BOOKS];
    if (params?.category) {
      filtered = filtered.filter((b) =>
        b.categories.some((c) => c.toLowerCase() === params.category?.toLowerCase())
      );
    }
    if (params?.publisher_handle) {
      filtered = filtered.filter(
        (b) => b.publisher.handle.toLowerCase() === params.publisher_handle?.toLowerCase()
      );
    }
    if (params?.search) {
      const query = params.search.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.author.toLowerCase().includes(query) ||
          (b.isbn && b.isbn.toLowerCase().includes(query)) ||
          b.categories.some((c) => c.toLowerCase().includes(query))
      );
    }

    const offset = params?.offset || 0;
    const limit = params?.limit || 12;
    return {
      products: filtered.slice(offset, offset + limit),
      count: filtered.length,
    };
  },

  getProduct: async (handle: string) => {
    try {
      const response = await medusaClient.get(`/store/products/${handle}`);
      if (response.data?.product) {
        return response.data;
      }
    } catch (error) {
      // Graceful fallback
    }

    const found = SAMPLE_BOOKS.find((b) => b.handle === handle || b.id === handle);
    return { product: found || null };
  },

  // Collections
  getCollections: async () => {
    try {
      const response = await medusaClient.get("/store/collections");
      return response.data;
    } catch (error) {
      return {
        collections: [
          { id: "col_tech", title: "Technology & Software" },
          { id: "col_academic", title: "Academic & Science" },
          { id: "col_fiction", title: "Fiction & Literature" },
        ],
      };
    }
  },

  // Cart
  createCart: async (data: any) => {
    try {
      const response = await medusaClient.post("/store/carts", data);
      return response.data;
    } catch (error) {
      const mockCartId = "cart_" + Math.random().toString(36).substring(2, 10);
      return {
        cart: {
          id: mockCartId,
          items: [],
          subtotal: 0,
          total: 0,
          shipping_total: 0,
        },
      };
    }
  },

  getCart: async (cartId: string) => {
    try {
      const response = await medusaClient.get(`/store/carts/${cartId}`);
      return response.data;
    } catch (error) {
      // Return cached local cart if backend mock
      const stored = localStorage.getItem("bookhub_mock_cart");
      if (stored) {
        return { cart: JSON.parse(stored) };
      }
      return {
        cart: {
          id: cartId,
          items: [],
          subtotal: 0,
          total: 0,
          shipping_total: 0,
        },
      };
    }
  },

  addToCart: async (cartId: string, variantId: string, quantity: number = 1) => {
    try {
      const response = await medusaClient.post(`/store/carts/${cartId}/line-items`, {
        variant_id: variantId,
        quantity,
      });
      return response.data;
    } catch (error) {
      // Mock cart update for standalone frontend preview
      const stored = localStorage.getItem("bookhub_mock_cart");
      let cartObj = stored
        ? JSON.parse(stored)
        : { id: cartId, items: [], subtotal: 0, total: 0, shipping_total: 500 };

      // Find book corresponding to variant
      let matchingBook = SAMPLE_BOOKS.find((b) =>
        b.variants.some((v) => v.id === variantId)
      );
      let matchingVariant = matchingBook?.variants.find((v) => v.id === variantId);

      if (!matchingBook) {
        matchingBook = SAMPLE_BOOKS[0];
        matchingVariant = matchingBook.variants[0];
      }

      const existingIndex = cartObj.items.findIndex(
        (i: any) => i.variant_id === variantId
      );

      const price = matchingVariant?.price || 2999;

      if (existingIndex > -1) {
        cartObj.items[existingIndex].quantity += quantity;
        cartObj.items[existingIndex].total =
          cartObj.items[existingIndex].quantity * price;
      } else {
        cartObj.items.push({
          id: "item_" + Math.random().toString(36).substring(2, 9),
          title: matchingBook.title + (matchingVariant ? ` (${matchingVariant.title})` : ""),
          quantity,
          variant_id: variantId,
          product_id: matchingBook.id,
          thumbnail: matchingBook.thumbnail,
          unit_price: price,
          total: price * quantity,
          publisher: matchingBook.publisher,
          format: matchingVariant?.format || "Physical",
        });
      }

      cartObj.subtotal = cartObj.items.reduce(
        (sum: number, item: any) => sum + item.total,
        0
      );
      cartObj.total = cartObj.subtotal + (cartObj.shipping_total || 500);

      localStorage.setItem("bookhub_mock_cart", JSON.stringify(cartObj));
      return { cart: cartObj };
    }
  },

  updateCartLineItem: async (cartId: string, lineItemId: string, quantity: number) => {
    try {
      const response = await medusaClient.post(
        `/store/carts/${cartId}/line-items/${lineItemId}`,
        { quantity }
      );
      return response.data;
    } catch (error) {
      const stored = localStorage.getItem("bookhub_mock_cart");
      if (stored) {
        const cartObj = JSON.parse(stored);
        const item = cartObj.items.find((i: any) => i.id === lineItemId);
        if (item) {
          item.quantity = quantity;
          item.total = item.unit_price * quantity;
          cartObj.subtotal = cartObj.items.reduce(
            (sum: number, i: any) => sum + i.total,
            0
          );
          cartObj.total = cartObj.subtotal + (cartObj.shipping_total || 500);
          localStorage.setItem("bookhub_mock_cart", JSON.stringify(cartObj));
          return { cart: cartObj };
        }
      }
      return { cart: null };
    }
  },

  deleteCartLineItem: async (cartId: string, lineItemId: string) => {
    try {
      const response = await medusaClient.delete(
        `/store/carts/${cartId}/line-items/${lineItemId}`
      );
      return response.data;
    } catch (error) {
      const stored = localStorage.getItem("bookhub_mock_cart");
      if (stored) {
        const cartObj = JSON.parse(stored);
        cartObj.items = cartObj.items.filter((i: any) => i.id !== lineItemId);
        cartObj.subtotal = cartObj.items.reduce(
          (sum: number, i: any) => sum + i.total,
          0
        );
        cartObj.total = cartObj.subtotal + (cartObj.shipping_total || 500);
        localStorage.setItem("bookhub_mock_cart", JSON.stringify(cartObj));
        return { cart: cartObj };
      }
      return { cart: null };
    }
  },

  // Checkout
  addShippingMethod: async (cartId: string, shippingMethodId: string) => {
    try {
      const response = await medusaClient.post(
        `/store/carts/${cartId}/shipping-methods`,
        { option_id: shippingMethodId }
      );
      return response.data;
    } catch (error) {
      return { success: true };
    }
  },

  updateCartBilling: async (cartId: string, billingAddress: any) => {
    try {
      const response = await medusaClient.post(`/store/carts/${cartId}`, {
        billing_address: billingAddress,
      });
      return response.data;
    } catch (error) {
      return { success: true };
    }
  },

  updateCartShipping: async (cartId: string, shippingAddress: any) => {
    try {
      const response = await medusaClient.post(`/store/carts/${cartId}`, {
        shipping_address: shippingAddress,
      });
      return response.data;
    } catch (error) {
      return { success: true };
    }
  },

  completeCart: async (cartId: string) => {
    try {
      const response = await medusaClient.post(`/store/carts/${cartId}/complete`);
      return response.data;
    } catch (error) {
      const orderId = "order_" + Math.random().toString(36).substring(2, 10);
      return {
        type: "order",
        data: {
          id: orderId,
          display_id: Math.floor(100000 + Math.random() * 900000),
          status: "completed",
        },
      };
    }
  },

  // Orders
  getOrder: async (orderId: string) => {
    try {
      const response = await medusaClient.get(`/store/orders/${orderId}`);
      return response.data;
    } catch (error) {
      return {
        order: {
          id: orderId,
          display_id: Math.floor(100000 + Math.random() * 900000),
          status: "completed",
          payment_status: "captured",
          fulfillment_status: "processing",
          created_at: new Date().toISOString(),
          total: 5498,
          subtotal: 4998,
          shipping_total: 500,
          items: [
            {
              id: "item_sample_1",
              title: "Designing Data-Intensive Applications (Hardcover)",
              quantity: 1,
              unit_price: 4999,
              total: 4999,
              publisher: { name: "O'Reilly Media & Tech" },
              format: "Physical",
            },
          ],
        },
      };
    }
  },

  // Publishers
  getPublishers: async () => {
    try {
      const response = await medusaClient.get("/store/publishers");
      if (response.data?.publishers && response.data.publishers.length > 0) {
        return response.data;
      }
    } catch (error) {
      // Graceful fallback
    }
    return { publishers: SAMPLE_PUBLISHERS };
  },

  getPublisher: async (handle: string) => {
    try {
      const response = await medusaClient.get(`/store/publishers/${handle}`);
      if (response.data?.publisher) {
        return response.data;
      }
    } catch (error) {
      // Graceful fallback
    }
    const pub = SAMPLE_PUBLISHERS.find(
      (p) => p.handle === handle || p.id === handle
    );
    return { publisher: pub || null };
  },
};
