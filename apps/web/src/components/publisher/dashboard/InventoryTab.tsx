"use client";

import { useState } from "react";
import { Plus, BookOpen, Trash2, Edit3, Upload, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/utils";

interface InventoryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  price: number;
  stock: number;
  sales: number;
  revenue: number;
  type: string;
}

interface InventoryTabProps {
  books: InventoryBook[];
  onAddBook: (book: Omit<InventoryBook, "id" | "sales" | "revenue">) => void;
  onDeleteBook: (id: string) => void;
}

export function InventoryTab({ books, onAddBook, onDeleteBook }: InventoryTabProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newIsbn, setNewIsbn] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("50");
  const [newType, setNewType] = useState("Physical & Digital");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAuthor || !newPrice) return;

    onAddBook({
      title: newTitle,
      author: newAuthor,
      isbn: newIsbn || `978-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      price: parseFloat(newPrice) || 500,
      stock: parseInt(newStock) || 50,
      type: newType,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewIsbn("");
    setNewPrice("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">Publication Inventory</h3>
          <p className="text-xs text-muted-foreground">Manage your published titles, stocks, and pricing.</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} size="sm" className="rounded-xl gap-1.5 font-bold">
          <Plus className="h-4 w-4" /> Add New Publication
        </Button>
      </div>

      {/* Books Table */}
      <div className="border rounded-2xl bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 border-b">
              <tr className="text-muted-foreground font-semibold">
                <th className="p-4">Title &amp; Author</th>
                <th className="p-4">ISBN</th>
                <th className="p-4">Format</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Sales</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-muted/20 transition">
                  <td className="p-4">
                    <span className="font-bold text-foreground block">{book.title}</span>
                    <span className="text-muted-foreground text-[11px]">{book.author}</span>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-muted-foreground">{book.isbn}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                      {book.type}
                    </span>
                  </td>
                  <td className="p-4 font-bold">{formatBDT(book.price)}</td>
                  <td className="p-4 font-medium">{book.stock} units</td>
                  <td className="p-4 font-semibold text-emerald-600">{book.sales || 0} sold</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => onDeleteBook(book.id)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
                      aria-label="Delete book"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h4 className="text-base font-bold text-foreground">Publish New Book Title</h4>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Book Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Paradoxical Sajid"
                  className="w-full h-9 px-3 rounded-xl border bg-muted/40 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Author Name</label>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Arif Azad"
                  className="w-full h-9 px-3 rounded-xl border bg-muted/40 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Retail Price (৳)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="450"
                    className="w-full h-9 px-3 rounded-xl border bg-muted/40 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Initial Stock</label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    placeholder="50"
                    className="w-full h-9 px-3 rounded-xl border bg-muted/40 text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-xl"
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="flex-1 rounded-xl font-bold">
                  Publish Book
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
