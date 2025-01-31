"use client";

import { useState } from "react";
import { PaperDisplay } from "@/components/PaperDisplay";
import { Button } from "@/components/ui/button";
import { CategoryFilters } from "@/components/CategoryFilters";
import type { ArxivPaper } from "@/utils/parseArxivXml";

export default function Home() {
  const [paper, setPaper] = useState<ArxivPaper | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const fetchRandomPaper = async () => {
    setLoading(true);
    try {
      const categoriesParam =
        selectedCategories.length > 0
          ? `?categories=${selectedCategories.join(",")}`
          : "";
      const response = await fetch(`/api/random-paper${categoriesParam}`);
      const data = await response.json();
      setPaper(data.paper);
    } catch (error) {
      console.error("Failed to fetch paper:", error);
    } finally {
      setLoading(false);
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
      <h1 className="text-4xl font-bold mb-8">ArXplore</h1>
      <p className="text-lg text-gray-500 mb-8">
        Random walks through research papers
      </p>
      <div className="flex items-center gap-4 mb-8">
        <Button onClick={fetchRandomPaper} disabled={loading} size="default">
          {loading ? "Loading..." : "Discover"}
        </Button>
        <CategoryFilters
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
        />
      </div>
      {paper && <PaperDisplay paper={paper} />}
    </main>
  );
}
