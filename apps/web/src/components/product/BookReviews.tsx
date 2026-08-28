"use client";

import { useState } from "react";
import { Star, CheckCircle2, ThumbsUp, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
}

export function BookReviews({ bookTitle }: { bookTitle: string }) {
  const { success } = useToast();
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "rev_1",
      author: "Tanvir Ahmed",
      rating: 5,
      date: "2 days ago",
      title: "Masterpiece on software architecture!",
      comment:
        "Every software engineer in Bangladesh should read this. The explanation of distributed systems, consensus algorithms, and partitioning is unmatched.",
      isVerifiedPurchase: true,
      helpfulCount: 24,
    },
    {
      id: "rev_2",
      author: "Farhana Yasmin",
      rating: 5,
      date: "1 week ago",
      title: "Fast bKash delivery & crisp physical print",
      comment:
        "Ordered with bKash and received the parcel within 24 hours in Dhanmondi. The paper quality is top-notch and binding is solid.",
      isVerifiedPurchase: true,
      helpfulCount: 15,
    },
    {
      id: "rev_3",
      author: "Mahmudul Hasan",
      rating: 4,
      date: "2 weeks ago",
      title: "Great eBook with DRM watermark",
      comment:
        "Downloaded the ePub version right after checkout. Love that it has my email licensed on the front page. Very crisp reading on tablet.",
      isVerifiedPurchase: true,
      helpfulCount: 9,
    },
  ]);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newComment, setNewComment] = useState("");

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newRev: Review = {
      id: "rev_" + Date.now(),
      author: newAuthor,
      rating: newRating,
      date: "Just now",
      title: newTitle || "Verified Reader Review",
      comment: newComment,
      isVerifiedPurchase: true,
      helpfulCount: 0,
    };

    setReviews([newRev, ...reviews]);
    setNewAuthor("");
    setNewTitle("");
    setNewComment("");
    setShowReviewModal(false);
    success("Your review has been published!", "Review Submitted");
  };

  return (
    <div className="border-t pt-10 mt-12 space-y-8">
      {/* Header & Rating Breakdown */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card border rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Reader Reviews &amp; Ratings</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center text-amber-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(Number(averageRating))
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-xl font-extrabold">{averageRating} out of 5</span>
            <span className="text-xs text-muted-foreground">({reviews.length} verified ratings)</span>
          </div>
        </div>

        <Button onClick={() => setShowReviewModal(true)} className="gap-2 self-start md:self-auto">
          <MessageSquare className="h-4 w-4" /> Write a Review
        </Button>
      </div>

      {/* Review Modal Form */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-card border rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg">Review &quot;{bookTitle}&quot;</h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="text-xs font-semibold block mb-1.5">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 text-2xl hover:scale-110 transition"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= newRating ? "fill-amber-400 text-amber-400" : "text-muted"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shakib Al Hasan"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Headline (optional)</label>
                <input
                  type="text"
                  placeholder="What is the most important thing to know?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Review Details *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="What did you like or dislike about this book?"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button type="button" variant="outline" onClick={() => setShowReviewModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="gap-1.5">
                  <Send className="h-4 w-4" /> Submit Review
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-6 bg-card border rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                  {rev.author[0]}
                </div>
                <div>
                  <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    {rev.author}
                    {rev.isVerifiedPurchase && (
                      <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="h-3 w-3" /> Verified Reader
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">{rev.date}</div>
                </div>
              </div>

              <div className="flex items-center text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= rev.rating ? "fill-amber-400 text-amber-400" : "text-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            <h4 className="font-bold text-sm text-foreground">{rev.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{rev.comment}</p>

            <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
              <button
                type="button"
                onClick={() => {
                  rev.helpfulCount += 1;
                  setReviews([...reviews]);
                }}
                className="flex items-center gap-1.5 hover:text-foreground transition"
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                <span>Helpful ({rev.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
