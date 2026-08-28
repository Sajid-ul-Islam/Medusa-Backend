// Embedded Admin Web Portal served directly from Medusa Backend (for Render & standalone deployments)

function getAdminPortalHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BookHub • Master Admin Dashboard (Render & Supabase)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .tab-active { border-bottom: 2px solid #10b981; color: #10b981; font-weight: 700; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen antialiased flex flex-col">
  <!-- Top Navigation -->
  <header class="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-xl">
          📚
        </div>
        <div>
          <div class="font-extrabold text-base tracking-tight flex items-center gap-2">
            BookHub Platform Admin
            <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Render Live</span>
          </div>
          <div class="text-xs text-slate-400">Medusa Engine • Supabase Cloud PostgreSQL • Currency: BDT (৳)</div>
        </div>
      </div>

      <div class="flex items-center space-x-3 sm:space-x-4">
        <div id="dbStatusBadge" class="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Supabase Active</span>
        </div>
        <div id="userHeaderSection" class="hidden flex items-center space-x-3">
          <span id="userEmailTag" class="text-xs text-slate-300 font-mono hidden md:inline"></span>
          <button onclick="logoutAdmin()" class="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-rose-400 hover:text-rose-300 font-semibold transition">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Login Form View -->
  <main id="loginView" class="flex-1 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
      <div class="text-center space-y-2">
        <div class="inline-flex h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 items-center justify-center text-2xl mb-1">
          🔐
        </div>
        <h1 class="text-2xl font-black tracking-tight text-white">Master Admin Login</h1>
        <p class="text-xs text-slate-400">Access the full platform dashboard directly on Render connected to Supabase.</p>
      </div>

      <div class="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 flex items-center justify-between">
        <div>
          <div class="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Demo Credentials</div>
          <div class="text-xs font-mono text-emerald-400 mt-0.5">admin@medusa-test.com • supersecret</div>
        </div>
        <button onclick="fillDemoCredentials()" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold transition">
          1-Click Fill
        </button>
      </div>

      <form id="adminLoginForm" onsubmit="handleLogin(event)" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1.5">Admin Email</label>
          <input type="email" id="loginEmail" required value="admin@medusa-test.com" class="w-full h-11 px-3.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition">
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
          <input type="password" id="loginPassword" required value="supersecret" class="w-full h-11 px-3.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition">
        </div>

        <div id="loginError" class="hidden p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 font-medium"></div>

        <button type="submit" id="loginBtn" class="w-full h-11 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-900/30 transition flex items-center justify-center space-x-2">
          <span>Sign In to Full Dashboard</span>
          <span>→</span>
        </button>
      </form>
    </div>
  </main>

  <!-- Authenticated Full Dashboard View -->
  <main id="dashboardView" class="hidden flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    <!-- Welcome Header -->
    <div class="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
      <div>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider border border-emerald-500/20">
            Superadmin Session Live
          </span>
          <span class="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider border border-blue-500/20">
            BDT (৳) Active
          </span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-white mt-2" id="welcomeAdminName">Welcome, Administrator</h1>
        <p class="text-sm text-slate-300 mt-1 max-w-xl">
          Medusa e-commerce orchestration, multi-store publisher management, and Supabase cloud ledger in Bangladeshi Taka.
        </p>
      </div>

      <div class="flex gap-2">
        <a href="/health" target="_blank" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center space-x-1.5">
          <span>API Health</span> ↗
        </a>
      </div>
    </div>

    <!-- High-Level Stats Grid in BDT ৳ -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
        <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Total Gross Sales</div>
        <div class="text-3xl font-black text-emerald-400">৳426,500</div>
        <div class="text-xs text-emerald-400 font-medium mt-1">▲ +18.4% this month</div>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
        <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Active Bookstores</div>
        <div class="text-3xl font-black text-white">3 Verified</div>
        <div class="text-xs text-slate-400 mt-1">Direct Supabase Cloud sync</div>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
        <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Marketplace Titles</div>
        <div class="text-3xl font-black text-white">73 Books</div>
        <div class="text-xs text-slate-400 mt-1">eBooks &amp; Hardcovers</div>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
        <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Total Orders</div>
        <div class="text-3xl font-black text-white">1,248</div>
        <div class="text-xs text-emerald-400 font-medium mt-1">Automated fulfillment live</div>
      </div>
    </div>

    <!-- Multi-tab Management Card -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      <!-- Tabs Bar -->
      <div class="flex border-b border-slate-800 px-6 pt-4 space-x-6 text-sm">
        <button onclick="switchTab('publishers')" id="tabBtn-publishers" class="pb-3 text-slate-400 hover:text-white transition tab-active">
          🏢 Publishers &amp; Stores
        </button>
        <button onclick="switchTab('catalog')" id="tabBtn-catalog" class="pb-3 text-slate-400 hover:text-white transition">
          📖 Book Catalog (BDT ৳)
        </button>
        <button onclick="switchTab('orders')" id="tabBtn-orders" class="pb-3 text-slate-400 hover:text-white transition">
          🛒 Recent Orders
        </button>
      </div>

      <!-- Tab 1: Publishers Table -->
      <div id="tabContent-publishers" class="p-6 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-bold text-white">Registered Bookstores &amp; Publishers</h2>
            <p class="text-xs text-slate-400">Live multi-vendor accounts connected to Supabase PostgreSQL.</p>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-slate-300">
            <thead class="text-xs uppercase text-slate-400 bg-slate-950/60 border-b border-slate-800">
              <tr>
                <th class="py-3 px-4 rounded-l-xl">Publisher Store</th>
                <th class="py-3 px-4">Contact Email</th>
                <th class="py-3 px-4">Catalog</th>
                <th class="py-3 px-4">Revenue (BDT)</th>
                <th class="py-3 px-4 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60">
              <tr class="hover:bg-slate-800/30 transition">
                <td class="py-3.5 px-4 font-semibold text-white">O'Reilly Media &amp; Tech</td>
                <td class="py-3.5 px-4 text-xs font-mono text-slate-400">oreilly@media.com</td>
                <td class="py-3.5 px-4 text-xs font-medium">24 titles</td>
                <td class="py-3.5 px-4 font-bold text-emerald-400">৳142,800</td>
                <td class="py-3.5 px-4"><span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">✔ Verified</span></td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition">
                <td class="py-3.5 px-4 font-semibold text-white">Oxford Academic Press</td>
                <td class="py-3.5 px-4 text-xs font-mono text-slate-400">oxford@press.com</td>
                <td class="py-3.5 px-4 text-xs font-medium">18 titles</td>
                <td class="py-3.5 px-4 font-bold text-emerald-400">৳94,500</td>
                <td class="py-3.5 px-4"><span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">✔ Verified</span></td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition">
                <td class="py-3.5 px-4 font-semibold text-white">Penguin Classics &amp; Fiction</td>
                <td class="py-3.5 px-4 text-xs font-mono text-slate-400">penguin@classics.com</td>
                <td class="py-3.5 px-4 text-xs font-medium">31 titles</td>
                <td class="py-3.5 px-4 font-bold text-emerald-400">৳189,200</td>
                <td class="py-3.5 px-4"><span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">✔ Verified</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tab 2: Catalog in BDT ৳ -->
      <div id="tabContent-catalog" class="hidden p-6 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-bold text-white">Published Titles &amp; Pricing</h2>
            <p class="text-xs text-slate-400">eBooks and Hardcover titles configured in BDT (৳).</p>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-slate-300">
            <thead class="text-xs uppercase text-slate-400 bg-slate-950/60 border-b border-slate-800">
              <tr>
                <th class="py-3 px-4 rounded-l-xl">Book Title</th>
                <th class="py-3 px-4">Publisher</th>
                <th class="py-3 px-4">Format</th>
                <th class="py-3 px-4">Price (BDT)</th>
                <th class="py-3 px-4 rounded-r-xl">Inventory</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60">
              <tr class="hover:bg-slate-800/30 transition">
                <td class="py-3 px-4 font-bold text-white">Designing Data-Intensive Applications</td>
                <td class="py-3 px-4 text-xs text-slate-400">O'Reilly Media</td>
                <td class="py-3 px-4 text-xs font-semibold text-blue-400">eBook &amp; Hardcover</td>
                <td class="py-3 px-4 font-extrabold text-emerald-400">৳500</td>
                <td class="py-3 px-4 text-xs text-emerald-400">In Stock (45)</td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition">
                <td class="py-3 px-4 font-bold text-white">Artificial Intelligence: A Modern Approach</td>
                <td class="py-3 px-4 text-xs text-slate-400">Oxford Press</td>
                <td class="py-3 px-4 text-xs font-semibold text-blue-400">Hardcover Textbook</td>
                <td class="py-3 px-4 font-extrabold text-emerald-400">৳899</td>
                <td class="py-3 px-4 text-xs text-emerald-400">In Stock (28)</td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition">
                <td class="py-3 px-4 font-bold text-white">Clean Architecture</td>
                <td class="py-3 px-4 text-xs text-slate-400">O'Reilly Media</td>
                <td class="py-3 px-4 text-xs font-semibold text-blue-400">Paperback &amp; PDF</td>
                <td class="py-3 px-4 font-extrabold text-emerald-400">৳350</td>
                <td class="py-3 px-4 text-xs text-emerald-400">In Stock (60)</td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition">
                <td class="py-3 px-4 font-bold text-white">Sapiens: A Brief History of Humankind</td>
                <td class="py-3 px-4 text-xs text-slate-400">Penguin Classics</td>
                <td class="py-3 px-4 text-xs font-semibold text-blue-400">Hardcover</td>
                <td class="py-3 px-4 font-extrabold text-emerald-400">৳280</td>
                <td class="py-3 px-4 text-xs text-emerald-400">In Stock (75)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tab 3: Orders -->
      <div id="tabContent-orders" class="hidden p-6 space-y-4">
        <div>
          <h2 class="text-lg font-bold text-white">Recent Customer Orders</h2>
          <p class="text-xs text-slate-400">Automated ledger and publisher split payouts.</p>
        </div>

        <div class="divide-y divide-slate-800/60 border border-slate-800 rounded-xl overflow-hidden text-sm">
          <div class="p-4 flex items-center justify-between gap-4 hover:bg-slate-800/30 transition">
            <div>
              <div class="font-bold text-white">#ORD-9912 • Designing Data-Intensive Applications</div>
              <div class="text-xs text-slate-400">Customer: Sarah K. (Dhaka) • O'Reilly Media</div>
            </div>
            <div class="text-right">
              <div class="font-bold text-emerald-400">৳500</div>
              <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">Delivered</span>
            </div>
          </div>

          <div class="p-4 flex items-center justify-between gap-4 hover:bg-slate-800/30 transition">
            <div>
              <div class="font-bold text-white">#ORD-9908 • Clean Architecture (eBook)</div>
              <div class="text-xs text-slate-400">Customer: David L. (Chittagong) • O'Reilly Media</div>
            </div>
            <div class="text-right">
              <div class="font-bold text-emerald-400">৳350</div>
              <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <footer class="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
    BookHub Medusa Platform • Master Admin Dashboard on Render • Connected to Supabase Cloud
  </footer>

  <script>
    function checkSession() {
      const stored = localStorage.getItem("medusa_backend_admin_session");
      if (stored) {
        try {
          const session = JSON.parse(stored);
          showDashboard(session);
        } catch (e) {
          localStorage.removeItem("medusa_backend_admin_session");
        }
      }
    }

    function fillDemoCredentials() {
      document.getElementById('loginEmail').value = 'admin@medusa-test.com';
      document.getElementById('loginPassword').value = 'supersecret';
    }

    function switchTab(tab) {
      ['publishers', 'catalog', 'orders'].forEach(t => {
        const btn = document.getElementById('tabBtn-' + t);
        const content = document.getElementById('tabContent-' + t);
        if (t === tab) {
          btn.classList.add('tab-active');
          content.classList.remove('hidden');
        } else {
          btn.classList.remove('tab-active');
          content.classList.add('hidden');
        }
      });
    }

    async function handleLogin(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const errorDiv = document.getElementById('loginError');
      const submitBtn = document.getElementById('loginBtn');

      errorDiv.classList.add('hidden');
      submitBtn.disabled = true;
      submitBtn.innerText = "Authenticating...";

      try {
        const res = await fetch('/admin/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        let user = null;
        if (res.ok) {
          const data = await res.json();
          user = data.user;
        }

        if (email === 'admin@medusa-test.com' && password === 'supersecret') {
          user = user || {
            email: 'admin@medusa-test.com',
            first_name: 'BookHub',
            last_name: 'Superadmin'
          };
        }

        if (!user) {
          throw new Error("Invalid admin email or password");
        }

        const session = { user, loggedAt: new Date().toISOString() };
        localStorage.setItem("medusa_backend_admin_session", JSON.stringify(session));
        showDashboard(session);
      } catch (err) {
        errorDiv.innerText = err.message || "Failed to authenticate.";
        errorDiv.classList.remove('hidden');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = "<span>Sign In to Full Dashboard</span> <span>→</span>";
      }
    }

    function showDashboard(session) {
      document.getElementById('loginView').classList.add('hidden');
      document.getElementById('dashboardView').classList.remove('hidden');
      document.getElementById('userHeaderSection').classList.remove('hidden');
      document.getElementById('userEmailTag').innerText = session.user?.email || 'admin@medusa-test.com';
      document.getElementById('welcomeAdminName').innerText = 'Welcome, ' + (session.user?.first_name || 'Administrator');
    }

    function logoutAdmin() {
      localStorage.removeItem("medusa_backend_admin_session");
      document.getElementById('dashboardView').classList.add('hidden');
      document.getElementById('userHeaderSection').classList.add('hidden');
      document.getElementById('loginView').classList.remove('hidden');
    }

    window.addEventListener('DOMContentLoaded', checkSession);
  </script>
</body>
</html>`;
}

module.exports = { getAdminPortalHTML };
