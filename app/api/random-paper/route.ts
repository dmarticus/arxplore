import { NextResponse } from "next/server";
import { parseArxivXml } from "@/utils/parseArxivXml";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const selectedCategories = searchParams.get("categories")?.split(",") || [];

  // If no categories selected, use all categories
  const categories =
    selectedCategories.length > 0
      ? selectedCategories
      : [
          "cs.AI",
          "cs.CL",
          "cs.CV",
          "cs.LG",
          "cs.RO",
          "cs.NE",
          "math.CO",
          "math.DS",
          "math.PR",
          "physics.comp-ph",
          "physics.data-an",
          "physics.soc-ph",
          "q-bio.BM",
          "q-bio.NC",
          "q-bio.QM",
          "q-fin.PM",
          "q-fin.ST",
          "q-fin.TR",
          "stat.ML",
          "stat.ME",
          "stat.AP",
        ];

  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];

  try {
    const randomStart = Math.floor(Math.random() * 100);
    const maxResults = 25;

    const response = await fetch(
      `http://export.arxiv.org/api/query?search_query=cat:${randomCategory}&start=${randomStart}&max_results=${maxResults}&sortBy=submittedDate`
    );

    if (!response.ok) {
      throw new Error(`ArXiv API responded with status: ${response.status}`);
    }

    const xmlData = await response.text();
    const papers = parseArxivXml(xmlData);

    if (!papers || papers.length === 0) {
      return NextResponse.json({ error: "No papers found" }, { status: 404 });
    }

    const randomPaper = papers[Math.floor(Math.random() * papers.length)];
    return NextResponse.json({ paper: randomPaper });
  } catch (error) {
    console.error("Error fetching from ArXiv:", error);
    return NextResponse.json(
      { error: "Failed to fetch from ArXiv" },
      { status: 500 }
    );
  }
}
