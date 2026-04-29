import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { supabase } from "../lib/supabase";
import { cn } from "../lib/utils";

interface Rating {
  id: string;
  name: string | null;
  subject: string | null;
  email_or_phone: string;
  comment: string | null;
  stars: number;
  created_at: string;
}

function StarRow({ stars, size = "sm" }: { stars: number; size?: "sm" | "lg" }) {
  const sz = size === "lg" ? "w-6 h-6" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const isFull = stars >= n;
        const isHalf = !isFull && stars >= n - 0.5;
        if (isFull) return <Star key={n} className={cn(sz, "text-amber-400 fill-amber-400")} />;
        if (isHalf)
          return (
            <span key={n} className={cn("relative inline-block", sz)}>
              <Star className={cn(sz, "text-slate-200")} />
              <span className="absolute inset-0 w-1/2 overflow-hidden">
                <Star className={cn(sz, "text-amber-400 fill-amber-400")} />
              </span>
            </span>
          );
        return <Star key={n} className={cn(sz, "text-slate-200")} />;
      })}
    </div>
  );
}

export function AllRatings() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("ratings")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setRatings(data ?? []);
        setLoading(false);
      });
  }, []);

  const avg = ratings.length
    ? (ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length).toFixed(1)
    : null;

  return (
    <div className="pb-24">
      <div className="bg-brand-blue py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Customer Reviews</h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          Real feedback from our valued customers.
        </p>
      </div>

      <div className="container mx-auto px-4 mt-16 max-w-5xl">
        {!loading && ratings.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 p-8 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="text-center sm:text-left">
              <div className="text-5xl font-black text-slate-900 mb-2">{avg}</div>
              <StarRow stars={Math.round(Number(avg) * 2) / 2} size="lg" />
              <p className="text-sm text-slate-500 mt-2">
                {ratings.length} {ratings.length === 1 ? "review" : "reviews"}
              </p>
            </div>
            <Link to="/ratings/add">
              <Button size="lg">Write a Review</Button>
            </Link>
          </div>
        )}

        {loading && (
          <div className="text-center py-20 text-slate-500">Loading reviews...</div>
        )}

        {!loading && ratings.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg mb-6">No reviews yet. Be the first!</p>
            <Link to="/ratings/add">
              <Button size="lg">Write a Review</Button>
            </Link>
          </div>
        )}

        {!loading && ratings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ratings.map((r) => (
              <div key={r.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-slate-900">{r.name || "Anonymous"}</p>
                    {r.subject && <p className="text-xs text-slate-500 font-medium mt-0.5">{r.subject}</p>}
                  </div>
                  <p className="text-xs text-slate-400 shrink-0">
                    {new Date(r.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <StarRow stars={r.stars} />
                {r.comment && <p className="text-sm text-slate-600 leading-relaxed">{r.comment}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
