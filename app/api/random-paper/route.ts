import { NextResponse } from "next/server";
import { parseArxivXml } from "@/utils/parseArxivXml";

export async function GET() {
  const categories = [
    // Computer Science
    "cs.AI", // Artificial Intelligence
    "cs.CL", // Computation and Language
    "cs.CV", // Computer Vision
    "cs.LG", // Machine Learning
    "cs.RO", // Robotics
    "cs.NE", // Neural and Evolutionary Computing

    // Mathematics
    "math.CO", // Combinatorics
    "math.DS", // Dynamical Systems
    "math.PR", // Probability

    // Physics
    "physics.comp-ph", // Computational Physics
    "physics.data-an", // Data Analysis, Statistics and Probability
    "physics.soc-ph", // Physics and Society

    // Quantitative Biology
    "q-bio.BM", // Biomolecules
    "q-bio.NC", // Neurons and Cognition
    "q-bio.QM", // Quantitative Methods

    // Quantitative Finance
    "q-fin.PM", // Portfolio Management
    "q-fin.ST", // Statistical Finance
    "q-fin.TR", // Trading and Market Microstructure

    // Statistics
    "stat.ML", // Machine Learning
    "stat.ME", // Methodology
    "stat.AP", // Applications
  ];

  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];

  try {
    // Get a random start index (ArXiv typically has hundreds of papers per category)
    const randomStart = Math.floor(Math.random() * 100);
    // Get more results and then pick one randomly
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

    // Pick a random paper from the results
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
