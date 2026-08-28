"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {
  Store,
  Upload,
  DollarSign,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  CreditCard,
  Package,
  FileSpreadsheet,
  Download,
  AlertCircle,
  FileText,
  Trash2,
} from "lucide-react";

export default function PublisherDashboard() {
  const { success, info, error: toastError } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const [booksList, setBooksList] = useState<any[]>([
    {
      id: "b_1",
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      isbn: "978-1449373320",
      price: 1200,
      stock: 45,
      sales: 128,
      revenue: 153600,
      type: "Both Physical & Digital",
    },
    {
      id: "b_2",
      title: "Clean Architecture",
      author: "Robert C. Martin",
      isbn: "978-0134494166",
      price: 950,
      stock: 60,
      sales: 94,
      revenue: 89300,
      type: "Physical Book",
    },
  ]);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    price: "",
    stock: "50",
    type: "both",
    category: "Technology",
    description: "",
  });

  const [isPublishing, setIsPublishing] = useState(false);

  // Bulk Import States
  const [parsedBulkBooks, setParsedBulkBooks] = useState<any[]>([]);
  const [bulkFileName, setBulkFileName] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handlePublishBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.price) return;

    setIsPublishing(true);
    setTimeout(() => {
      const added = {
        id: "b_" + Math.random().toString(36).substring(2, 7),
        title: newBook.title,
        author: newBook.author,
        isbn: newBook.isbn || "978-" + Math.floor(1000000000 + Math.random() * 9000000000),
        price: parseFloat(newBook.price) || 500,
        stock: parseInt(newBook.stock) || 50,
        sales: 0,
        revenue: 0,
        type:
          newBook.type === "both"
            ? "Both Physical & Digital"
            : newBook.type === "digital"
            ? "Digital eBook"
            : "Physical Book",
      };

      setBooksList((prev) => [added, ...prev]);
      setIsPublishing(false);
      setNewBook({
        title: "",
        author: "",
        isbn: "",
        price: "",
        stock: "50",
        type: "both",
        category: "Technology",
        description: "",
      });
      success(`"${added.title}" has been published and listed in the marketplace!`, "Book Published");
      setActiveTab("books");
    }, 800);
  };

  // 1. Download Sample Excel / CSV Template
  const handleDownloadTemplate = () => {
    const csvContent =
      "title,author,isbn,price_bdt,stock,format,category,description\n" +
      "The Pragmatic Programmer,David Thomas & Andrew Hunt,978-0135957059,950,50,both,Technology,Your journey to mastery in software development\n" +
      "Refactoring: Improving the Design of Existing Code,Martin Fowler,978-0134757599,1100,35,physical,Technology,Classic guide to improving legacy codebases\n" +
      "দেবী (Devi),হুমায়ূন আহমেদ,978-9848765432,350,100,both,Bengali Literature,কালজয়ী মিসির আলি রহস্য উপন্যাস";

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bookhub_bulk_catalog_template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    success("Sample CSV & Excel template downloaded successfully!", "Template Ready");
  };

  // 2. Parse Uploaded CSV / Excel File
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBulkFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      try {
        const lines = text
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0);

        if (lines.length <= 1) {
          toastError("Uploaded file is empty or missing data rows.");
          return;
        }

        const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
        const parsedRows: any[] = [];

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(",").map((v) => v.trim());
          if (values.length >= 2 && values[0]) {
            parsedRows.push({
              id: "bulk_" + Math.random().toString(36).substring(2, 7),
              title: values[0] || "Untitled Book",
              author: values[1] || "Unknown Author",
              isbn: values[2] || "978-" + Math.floor(1000000000 + Math.random() * 9000000000),
              price: parseFloat(values[3]) || 500,
              stock: parseInt(values[4]) || 50,
              type: values[5] === "digital" ? "Digital eBook" : values[5] === "physical" ? "Physical Book" : "Both Physical & Digital",
              category: values[6] || "General",
              description: values[7] || "Imported from bulk file.",
              status: "Valid",
            });
          }
        }

        if (parsedRows.length === 0) {
          throw new Error("No valid book entries found in CSV.");
        }

        setParsedBulkBooks(parsedRows);
        success(`Parsed ${parsedRows.length} book titles from ${file.name}!`, "File Analyzed");
      } catch (err: any) {
        toastError(err.message || "Failed to parse file. Please use the official template.");
      }
    };

    reader.readAsText(file);
  };

  // 3. Confirm and Import All Parsed Books
  const handleImportAllBulkBooks = () => {
    if (parsedBulkBooks.length === 0) return;

    setIsImporting(true);
    setTimeout(() => {
      const formatted = parsedBulkBooks.map((b) => ({
        ...b,
        sales: 0,
        revenue: 0,
      }));

      setBooksList((prev) => [...formatted, ...prev]);
      setIsImporting(false);
      const count = parsedBulkBooks.length;
      setParsedBulkBooks([]);
      setBulkFileName(null);
      success(`Successfully imported ${count} books into your store catalog!`, "Bulk Import Complete");
      setActiveTab("books");
    }, 1000);
  };

  const totalRevenue = booksList.reduce((sum, b) => sum + (b.revenue || 0), 0);
  const totalSales = booksList.reduce((sum, b) => sum + (b.sales || 0), 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Top Banner */}
      <div className="bg-card border rounded-2xl p-6 sm:p-8 mb-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              Verified Bookstore Partner
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Publisher Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your book titles, bulk upload inventory via Excel/CSV, and track automated earnings.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setActiveTab("bulk-import")}
            variant="outline"
            className="gap-1.5 border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10"
          >
            <FileSpreadsheet className="h-4 w-4" /> Bulk Import
          </Button>
          <Button
            onClick={() => setActiveTab("upload")}
            className="gap-1.5 shadow-sm"
          >
            <Plus className="h-4 w-4" /> Add Single Book
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card rounded-2xl border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Listed Titles
            </span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Store className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold">{booksList.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Active in store catalog</p>
        </div>

        <div className="bg-card rounded-2xl border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Gross Revenue
            </span>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold">৳{totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1 font-medium">
            <ArrowUpRight className="h-3.5 w-3.5" /> +14.2% from last month
          </p>
        </div>

        <div className="bg-card rounded-2xl border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Units Sold
            </span>
            <div className="p-2 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold">{totalSales}</p>
          <p className="text-xs text-muted-foreground mt-1">Physical &amp; digital copies</p>
        </div>

        <div className="bg-card rounded-2xl border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Payout Account
            </span>
            <div className="p-2 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <p className="text-lg font-bold text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="h-5 w-5" /> Active &amp; Verified
          </p>
          <p className="text-xs text-muted-foreground mt-1">bKash Merchant &amp; Bank</p>
        </div>
      </div>

      {/* Main Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3">
          <nav className="bg-card rounded-2xl border p-3 space-y-1 shadow-sm">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "books", label: "My Book Titles", icon: BookOpen },
              { id: "bulk-import", label: "Bulk Import (Excel/CSV)", icon: FileSpreadsheet },
              { id: "upload", label: "Upload Single Book", icon: Upload },
              { id: "orders", label: "Customer Orders", icon: Package },
              { id: "payouts", label: "Payouts & Banking", icon: DollarSign },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content View */}
        <div className="lg:col-span-9">
          <div className="bg-card rounded-2xl border p-6 sm:p-8 shadow-sm">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-1">Bookstore Performance</h2>
                  <p className="text-xs text-muted-foreground">
                    Summary of catalog activity and sales performance.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-muted/40 rounded-xl border space-y-3">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <Store className="h-4 w-4 text-primary" /> Storefront Profile
                    </h3>
                    <div className="text-xs space-y-1 text-muted-foreground">
                      <p><span className="font-semibold text-foreground">Publisher Name:</span> O&apos;Reilly Media &amp; Tech</p>
                      <p><span className="font-semibold text-foreground">Location:</span> Dhaka &amp; International</p>
                      <p><span className="font-semibold text-foreground">Verification:</span> Official Verified Partner</p>
                    </div>
                  </div>

                  <div className="p-5 bg-muted/40 rounded-xl border space-y-3">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-emerald-600" /> Revenue Split
                    </h3>
                    <div className="text-xs space-y-1 text-muted-foreground">
                      <p><span className="font-semibold text-foreground">Publisher Cut:</span> 85% of Gross Sales</p>
                      <p><span className="font-semibold text-foreground">Marketplace Fee:</span> 15% Platform Maintenance</p>
                      <p><span className="font-semibold text-foreground">Disbursement:</span> bKash / Bank Account Transfer</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* My Book Titles Tab */}
            {activeTab === "books" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Catalog Inventory ({booksList.length})</h2>
                    <p className="text-xs text-muted-foreground">
                      All published physical books and eBooks available in your store.
                    </p>
                  </div>
                  <Button size="sm" onClick={() => setActiveTab("bulk-import")} className="gap-1.5 text-xs">
                    <FileSpreadsheet className="h-3.5 w-3.5" /> Bulk Upload
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b text-xs uppercase text-muted-foreground bg-muted/30">
                      <tr>
                        <th className="py-3 px-4 rounded-l-lg">Book Title</th>
                        <th className="py-3 px-4">Author</th>
                        <th className="py-3 px-4">Format</th>
                        <th className="py-3 px-4">Price (BDT)</th>
                        <th className="py-3 px-4">Stock</th>
                        <th className="py-3 px-4 rounded-r-lg text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {booksList.map((b) => (
                        <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-foreground">
                            {b.title}
                          </td>
                          <td className="py-3.5 px-4 text-xs text-muted-foreground">{b.author}</td>
                          <td className="py-3.5 px-4">
                            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-primary/10 text-primary">
                              {b.type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-foreground">৳{b.price}</td>
                          <td className="py-3.5 px-4 text-xs">{b.stock} copies</td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                setBooksList(booksList.filter((item) => item.id !== b.id));
                                info(`Removed "${b.title}" from catalog.`);
                              }}
                              className="text-xs text-destructive hover:underline p-1"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Bulk Import (Excel / CSV) Tab */}
            {activeTab === "bulk-import" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                      Bulk Catalog Import (Excel &amp; CSV)
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Upload hundreds of book titles at once using a standard spreadsheet file.
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadTemplate}
                    className="gap-1.5 text-xs self-start sm:self-auto"
                  >
                    <Download className="h-3.5 w-3.5 text-primary" /> Download Sample CSV Template
                  </Button>
                </div>

                {/* Upload Drag and Drop Area */}
                <div className="border-2 border-dashed border-border hover:border-primary/50 bg-muted/20 rounded-2xl p-8 text-center transition space-y-4">
                  <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center">
                    <FileSpreadsheet className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Upload your Excel or CSV Spreadsheet</h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                      Supports <span className="font-mono text-primary">.csv</span>,{" "}
                      <span className="font-mono text-primary">.xlsx</span>, and{" "}
                      <span className="font-mono text-primary">.xls</span> formatted files.
                    </p>
                  </div>

                  <label className="inline-flex cursor-pointer">
                    <span className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-xl hover:bg-primary/90 transition shadow-sm">
                      Select Spreadsheet File
                    </span>
                    <input
                      type="file"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {bulkFileName && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" /> File Selected: {bulkFileName}
                    </div>
                  )}
                </div>

                {/* Parsed Preview Table */}
                {parsedBulkBooks.length > 0 && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-sm">Import Preview ({parsedBulkBooks.length} titles ready)</h3>
                        <p className="text-xs text-muted-foreground">
                          Review verified columns before publishing into your store.
                        </p>
                      </div>

                      <Button
                        onClick={handleImportAllBulkBooks}
                        disabled={isImporting}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5 text-xs"
                      >
                        {isImporting ? "Importing Titles..." : `Import All ${parsedBulkBooks.length} Books`}
                      </Button>
                    </div>

                    <div className="border rounded-xl overflow-x-auto text-xs">
                      <table className="w-full text-left">
                        <thead className="bg-muted/40 border-b uppercase text-muted-foreground font-semibold">
                          <tr>
                            <th className="py-2.5 px-3">Title</th>
                            <th className="py-2.5 px-3">Author</th>
                            <th className="py-2.5 px-3">ISBN</th>
                            <th className="py-2.5 px-3">Price (BDT)</th>
                            <th className="py-2.5 px-3">Stock</th>
                            <th className="py-2.5 px-3">Format</th>
                            <th className="py-2.5 px-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {parsedBulkBooks.map((b) => (
                            <tr key={b.id} className="hover:bg-muted/20">
                              <td className="py-2.5 px-3 font-semibold text-foreground">{b.title}</td>
                              <td className="py-2.5 px-3 text-muted-foreground">{b.author}</td>
                              <td className="py-2.5 px-3 font-mono">{b.isbn}</td>
                              <td className="py-2.5 px-3 font-bold text-emerald-600">৳{b.price}</td>
                              <td className="py-2.5 px-3">{b.stock}</td>
                              <td className="py-2.5 px-3">{b.type}</td>
                              <td className="py-2.5 px-3">
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                  ✓ Ready
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Upload Single Book Tab */}
            {activeTab === "upload" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold">Add Single Book Title</h2>
                  <p className="text-xs text-muted-foreground">
                    Upload physical book metadata or instant digital eBooks (PDF / ePub).
                  </p>
                </div>

                <form onSubmit={handlePublishBook} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Book Title *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Advanced Distributed Systems in Rust"
                        required
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Author Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Author full name"
                        required
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        ISBN-13 (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="978-0-00-000000-0"
                        value={newBook.isbn}
                        onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Selling Price (BDT ৳) *
                      </label>
                      <input
                        type="number"
                        step="1"
                        placeholder="500"
                        required
                        value={newBook.price}
                        onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Physical Stock Quantity
                      </label>
                      <input
                        type="number"
                        value={newBook.stock}
                        onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Format Edition
                      </label>
                      <select
                        value={newBook.type}
                        onChange={(e) => setNewBook({ ...newBook, type: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm"
                      >
                        <option value="both">Both Physical Print &amp; Digital eBook</option>
                        <option value="physical">Physical Print Edition Only</option>
                        <option value="digital">Digital eBook Only (PDF / ePub)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Category
                      </label>
                      <select
                        value={newBook.category}
                        onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm"
                      >
                        <option>Technology &amp; Computer Science</option>
                        <option>Academic &amp; Science</option>
                        <option>Fiction &amp; Literature</option>
                        <option>Non-Fiction &amp; History</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Book Synopsis &amp; Overview
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Detailed book description..."
                        value={newBook.description}
                        onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                        className="w-full p-3 rounded-lg border bg-background text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button type="submit" disabled={isPublishing} size="lg">
                      {isPublishing ? "Publishing to Marketplace..." : "Publish Book Title"}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Customer Orders</h2>
                <div className="divide-y border rounded-xl overflow-hidden text-sm">
                  {[
                    { id: "ORD-9912", item: "Designing Data-Intensive Applications", customer: "Sarah K.", date: "Today, 2:15 PM", amount: "৳500", status: "Shipped" },
                    { id: "ORD-9908", item: "Clean Architecture", customer: "David L.", date: "Yesterday", amount: "৳350", status: "Delivered" },
                  ].map((o) => (
                    <div key={o.id} className="p-4 flex items-center justify-between gap-4">
                      <div>
                        <div className="font-bold">{o.id} • {o.item}</div>
                        <div className="text-xs text-muted-foreground">Ordered by {o.customer} on {o.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{o.amount}</div>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-medium">
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payouts Tab */}
            {activeTab === "payouts" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold">Publisher Revenue &amp; Payout Settings (BDT ৳)</h2>
                  <p className="text-xs text-muted-foreground">
                    Direct automated earnings disbursement to your Bangladeshi mobile wallet or bank account.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border bg-card shadow-sm">
                    <div className="text-xs text-muted-foreground font-semibold">Available for Payout</div>
                    <div className="text-2xl font-black text-emerald-600 mt-1">৳121,380</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">85% Publisher Share (15% platform commission deducted)</div>
                  </div>
                  <div className="p-4 rounded-xl border bg-card shadow-sm">
                    <div className="text-xs text-muted-foreground font-semibold">Pending Processing</div>
                    <div className="text-2xl font-black text-amber-600 mt-1">৳21,420</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">Clearing from recent bKash / Card sales</div>
                  </div>
                  <div className="p-4 rounded-xl border bg-card shadow-sm">
                    <div className="text-xs text-muted-foreground font-semibold">Lifetime Paid Out</div>
                    <div className="text-2xl font-black text-primary mt-1">৳348,900</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">Transferred to your bank/bKash</div>
                  </div>
                </div>

                <div className="p-5 bg-card border rounded-2xl space-y-4">
                  <h3 className="font-bold text-base">Connected Disbursement Account</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#E2136E]/10 text-[#E2136E] font-bold flex items-center justify-center text-xs">
                          bKash
                        </div>
                        <div>
                          <div className="font-bold text-sm">bKash Merchant Account</div>
                          <div className="text-xs font-mono text-muted-foreground">+880 1712-998877</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-600">
                        Primary
                      </span>
                    </div>

                    <div className="p-4 rounded-xl border bg-muted/20 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 font-bold flex items-center justify-center text-xs">
                          Bank
                        </div>
                        <div>
                          <div className="font-bold text-sm">BRAC Bank Limited</div>
                          <div className="text-xs font-mono text-muted-foreground">Gulshan Branch • •••• 9214</div>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-xs h-7">
                        Set Primary
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
