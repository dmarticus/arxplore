"use client";

import { useState } from "react";
import { PaperDisplay } from "@/components/PaperDisplay";
import { Button } from "@/components/ui/button";
import { CategoryFilters } from "@/components/CategoryFilters";
import type { ArxivPaper } from "@/utils/parseArxivXml";
import { Search } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [papers, setPapers] = useState<ArxivPaper[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);
    setLastQuery(query);

    try {
      const categoriesParam =
        selectedCategories.length > 0
          ? `&categories=${selectedCategories.join(",")}`
          : "";
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}${categoriesParam}&maxResults=10`
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();
      setPapers(data.papers || []);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search. Please try again.");
      setPapers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDiscover = async () => {
    setLoading(true);
    setError(null);

    try {
      const categoriesParam =
        selectedCategories.length > 0
          ? `?categories=${selectedCategories.join(",")}`
          : "";
      const response = await fetch(`/api/random-paper${categoriesParam}`);
      const data = await response.json();
      setPapers(data.paper ? [data.paper] : []);
    } catch (err) {
      console.error("Failed to fetch paper:", err);
      setError("Failed to discover paper. Please try again.");
      setPapers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleToggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-16 lg:p-24">
      <h1 className="text-4xl font-bold mb-4">ArXplore</h1>
      <p className="text-lg text-gray-500 mb-8">
        Explore research papers on arXiv
      </p>

      <div className="w-full max-w-2xl mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search papers…"
            className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button onClick={handleSearch} disabled={loading || !query.trim()}>
            {loading ? "Loading…" : "Search"}
          </Button>
          <Button variant="outline" onClick={handleDiscover} disabled={loading}>
            Discover
          </Button>
          <CategoryFilters
            selectedCategories={selectedCategories}
            onToggleCategory={handleToggleCategory}
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {hasSearched && !loading && papers.length === 0 && !error && (
        <div className="text-center text-gray-500 mt-8">
          <p className="text-lg mb-2">No papers found</p>
          <p className="text-sm">
            No results for &ldquo;{lastQuery}&rdquo; on arXiv. Try different keywords or click Discover for a random paper.
          </p>
        </div>
      )}

      {papers.length > 0 && (
        <div className="w-full max-w-3xl space-y-4">
          {papers.map((paper, index) => (
            <PaperDisplay key={index} paper={paper} />
          ))}
        </div>
      )}
    </main>
  );
}
