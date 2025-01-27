import { NextResponse } from "next/server";
import { parseArxivXml } from "@/utils/parseArxivXml";

export async function GET() {
  // More specific category codes
  const categories = [
    "cs.AI", // Artificial Intelligence
    "cs.CL", // Computation and Language
    "math.CO", // Combinatorics
    "physics.comp-ph", // Computational Physics
    "q-bio.BM", // Biomolecules
    "q-fin.PM", // Portfolio Management
    "stat.ML", // Machine Learning
  ];

  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];

  try {
    const response = await fetch(
      `http://export.arxiv.org/api/query?search_query=cat:${randomCategory}&start=0&max_results=1&sortBy=lastUpdatedDate&sortOrder=descending`
    );

    if (!response.ok) {
      throw new Error(`ArXiv API responded with status: ${response.status}`);
    }

    const xmlData = await response.text();
    const paper = parseArxivXml(xmlData);

    if (!paper) {
      return NextResponse.json({ error: "No papers found" }, { status: 404 });
    }

    return NextResponse.json({ paper });
  } catch (error) {
    console.error("Error fetching from ArXiv:", error);
    return NextResponse.json(
      { error: "Failed to fetch from ArXiv" },
      { status: 500 }
    );
  }
}
