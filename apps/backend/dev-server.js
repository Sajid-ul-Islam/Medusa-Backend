const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 9000;
const { getAdminPortalHTML } = require("./admin-portal");

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());

app.get(["/admin", "/app", "/admin/login"], (req, res) => {
  res.send(getAdminPortalHTML());
});

app.get("/", (req, res, next) => {
  if (req.headers.accept && req.headers.accept.includes("text/html")) {
    return res.send(getAdminPortalHTML());
  }
  next();
});

// In-Memory Database / Mock Store
let publishers = [
  {
    id: "pub_oreilly",
    name: "O'Reilly Media & Tech",
    email: "oreilly@media.com",
    handle: "oreilly-media",
    store_name: "O'Reilly Media & Tech",
    description: "World-renowned publisher of definitive technology, programming, and system architecture books.",
    location: "Sebastopol, CA, USA",
    is_verified: true,
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
    is_verified: true,
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
    is_verified: true,
    logo_url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=150&h=150&fit=crop",
    banner_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=400&fit=crop",
  },
];

let products = [
  {
    id: "prod_1",
    title: "Designing Data-Intensive Applications",
    handle: "designing-data-intensive-applications",
    description: "The big ideas behind reliable, scalable, and maintainable systems.",
    author: "Martin Kleppmann",
    isbn: "978-1449373320",
    categories: ["Technology & Computer Science", "Databases"],
    publisher: publishers[0],
    thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop",
    is_digital: true,
    is_physical: true,
    variants: [
      { id: "var_1_dig", title: "Instant Digital eBook (PDF + ePub)", price: 2999, format: "Digital" },
      { id: "var_1_phy", title: "Hardcover Print Edition", price: 4499, format: "Physical" },
    ],
  },
  {
    id: "prod_2",
    title: "Clean Architecture: A Craftsman's Guide",
    handle: "clean-architecture",
    description: "A craftsman's guide to software structure and design.",
    author: "Robert C. Martin",
    isbn: "978-0134494166",
    categories: ["Technology & Computer Science", "Software Architecture"],
    publisher: publishers[0],
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=800&fit=crop",
    is_digital: true,
    is_physical: true,
    variants: [
      { id: "var_2_dig", title: "Digital Edition (ePub)", price: 2499, format: "Digital" },
      { id: "var_2_phy", title: "Paperback Edition", price: 3499, format: "Physical" },
    ],
  },
  {
    id: "prod_3",
    title: "Sapiens: A Brief History of Humankind",
    handle: "sapiens-brief-history",
    description: "Explore how biology and history have defined us and enhanced our understanding of what it means to be human.",
    author: "Yuval Noah Harari",
    isbn: "978-0062316097",
    categories: ["Non-Fiction & History", "Anthropology"],
    publisher: publishers[1],
    thumbnail: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=800&fit=crop",
    is_digital: true,
    is_physical: true,
    variants: [
      { id: "var_3_dig", title: "Digital eBook (Watermarked PDF)", price: 1899, format: "Digital" },
      { id: "var_3_phy", title: "Collector's Hardcover", price: 2799, format: "Physical" },
    ],
  },
  {
    id: "prod_4",
    title: "The Great Gatsby (Collector's Illustrated)",
    handle: "the-great-gatsby",
    description: "F. Scott Fitzgerald's masterpiece of the Jazz Age on Long Island.",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    categories: ["Fiction & Literature", "Classics"],
    publisher: publishers[2],
    thumbnail: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&h=800&fit=crop",
    is_digital: true,
    is_physical: true,
    variants: [
      { id: "var_4_dig", title: "eBook Edition", price: 999, format: "Digital" },
      { id: "var_4_phy", title: "Deluxe Illustrated Paperback", price: 1999, format: "Physical" },
    ],
  },
];

let carts = {};
let orders = [];

// ==========================================
// STORE REST API ENDPOINTS (Medusa Standard)
// ==========================================

// GET /store/products
app.get("/store/products", (req, res) => {
  const { q, category, publisher_id } = req.query;
  let results = [...products];

  if (q) {
    const query = String(q).toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.author.toLowerCase().includes(query) ||
        p.isbn.includes(query)
    );
  }

  if (category && category !== "All") {
    results = results.filter((p) => p.categories.includes(String(category)));
  }

  if (publisher_id) {
    results = results.filter((p) => p.publisher.id === publisher_id || p.publisher.handle === publisher_id);
  }

  res.json({ products: results, count: results.length });
});

// GET /store/products/:handle
app.get("/store/products/:handle", (req, res) => {
  const { handle } = req.params;
  const product = products.find((p) => p.handle === handle || p.id === handle);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ product });
});

// GET /store/publishers
app.get("/store/publishers", (req, res) => {
  res.json({ publishers, count: publishers.length });
});

// GET /store/publishers/:handle
app.get("/store/publishers/:handle", (req, res) => {
  const { handle } = req.params;
  const publisher = publishers.find((pub) => pub.handle === handle || pub.id === handle);
  if (!publisher) return res.status(404).json({ message: "Publisher not found" });
  res.json({ publisher });
});

// POST /store/publishers/auth
app.post("/store/publishers/auth", (req, res) => {
  const { email, password } = req.body;
  const publisher = publishers.find((p) => p.email.toLowerCase() === (email || "").toLowerCase());

  if (!publisher || password !== "publisher123") {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    message: "Publisher authenticated successfully",
    publisher,
    token: "pub_token_" + Buffer.from(email).toString("base64"),
  });
});

// POST /store/publishers
app.post("/store/publishers", (req, res) => {
  const { name, email, store_name, description, location } = req.body;
  const newPub = {
    id: "pub_" + Math.random().toString(36).substring(2, 9),
    name: name || store_name,
    email,
    handle: (store_name || name).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    store_name,
    description: description || "Independent Book Publisher",
    location: location || "Global",
    is_verified: true,
  };
  publishers.push(newPub);
  res.status(201).json({ publisher: newPub });
});

// POST /store/carts
app.post("/store/carts", (req, res) => {
  const cartId = "cart_" + Math.random().toString(36).substring(2, 9);
  carts[cartId] = {
    id: cartId,
    items: [],
    subtotal: 0,
    shipping_total: 500,
    total: 500,
  };
  res.json({ cart: carts[cartId] });
});

// GET /store/carts/:id
app.get("/store/carts/:id", (req, res) => {
  const cart = carts[req.params.id] || {
    id: req.params.id,
    items: [],
    subtotal: 0,
    shipping_total: 500,
    total: 500,
  };
  res.json({ cart });
});

// POST /store/carts/:id/line-items
app.post("/store/carts/:id/line-items", (req, res) => {
  const { variant_id, quantity = 1 } = req.body;
  let cart = carts[req.params.id] || { id: req.params.id, items: [] };

  let foundProduct = null;
  let foundVariant = null;

  for (const prod of products) {
    const v = prod.variants.find((v) => v.id === variant_id);
    if (v) {
      foundProduct = prod;
      foundVariant = v;
      break;
    }
  }

  if (foundVariant && foundProduct) {
    const existing = cart.items.find((item) => item.variant_id === variant_id);
    if (existing) {
      existing.quantity += quantity;
      existing.total = existing.unit_price * existing.quantity;
    } else {
      cart.items.push({
        id: "item_" + Math.random().toString(36).substring(2, 9),
        variant_id,
        title: `${foundProduct.title} (${foundVariant.format})`,
        unit_price: foundVariant.price,
        quantity,
        total: foundVariant.price * quantity,
        format: foundVariant.format,
        thumbnail: foundProduct.thumbnail,
        publisher: foundProduct.publisher,
      });
    }
  }

  cart.subtotal = cart.items.reduce((sum, i) => sum + i.total, 0);
  cart.shipping_total = cart.items.length > 0 ? 500 : 0;
  cart.total = cart.subtotal + cart.shipping_total;
  carts[cart.id] = cart;

  res.json({ cart });
});

// POST /store/carts/:id/complete
app.post("/store/carts/:id/complete", (req, res) => {
  const orderId = "order_" + Math.random().toString(36).substring(2, 9);
  const cart = carts[req.params.id] || { items: [] };
  const order = {
    id: orderId,
    display_id: Math.floor(100000 + Math.random() * 900000),
    items: cart.items,
    total: cart.total,
    created_at: new Date().toISOString(),
  };
  orders.push(order);
  res.json({ type: "order", data: order });
});

// ==========================================
// ADMIN REST API (Medusa Admin Endpoint)
// ==========================================
app.post("/admin/auth", (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@medusa-test.com" && password === "supersecret") {
    return res.json({
      user: { id: "usr_admin", email: "admin@medusa-test.com", role: "admin" },
      token: "adm_token_supersecret",
    });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "Medusa Backend Engine", port: PORT });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`\n✨ =================================================`);
  console.log(`🚀 Medusa Backend Server is LIVE on port: ${PORT}`);
  console.log(`🔗 REST API Root:      http://localhost:${PORT}/store/products`);
  console.log(`🏪 Publisher Portal:   http://localhost:${PORT}/store/publishers`);
  console.log(`🔐 Admin Auth:         http://localhost:${PORT}/admin/auth`);
  console.log(`✨ =================================================\n`);
});
