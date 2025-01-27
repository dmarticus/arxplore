"use client";

import { useState } from "react";
import { PaperDisplay } from "@/components/PaperDisplay";
import { Button } from "@/components/ui/button";
import type { ArxivPaper } from "@/utils/parseArxivXml";

export default function Home() {
  const [paper, setPaper] = useState<ArxivPaper | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomPaper = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/random-paper");
      const data = await response.json();
      setPaper(data.paper);
    } catch (error) {
      console.error("Detailed fetch error:", {
        name: (error as Error).name,
        message: (error as Error).message,
        stack: (error as Error).stack,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">ArXplore</h1>
      <Button onClick={fetchRandomPaper} disabled={loading} className="mb-8">
        {loading ? "Loading..." : "Explore!"}
      </Button>
      {paper && <PaperDisplay paper={paper} />}
    </main>
  );
}
