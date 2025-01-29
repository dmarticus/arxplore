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
          // Computer Science
          "cs.AI",
          "cs.AR",
          "cs.CC",
          "cs.CE",
          "cs.CG",
          "cs.CL",
          "cs.CR",
          "cs.CV",
          "cs.CY",
          "cs.DB",
          "cs.DC",
          "cs.DL",
          "cs.DM",
          "cs.DS",
          "cs.FL",
          "cs.GL",
          "cs.GR",
          "cs.GT",
          "cs.HC",
          "cs.IR",
          "cs.IT",
          "cs.LG",
          "cs.LO",
          "cs.MA",
          "cs.MM",
          "cs.MS",
          "cs.NA",
          "cs.NE",
          "cs.OH",
          "cs.OS",
          "cs.PF",
          "cs.SE",
          "cs.SI",
          "cs.SY",

          // Mathematics
          "math.AG",
          "math.AP",
          "math.AT",
          "math.CA",
          "math.CO",
          "math.CT",
          "math.CV",
          "math.DG",
          "math.DS",
          "math.FA",
          "math.GM",
          "math.GN",
          "math.GR",
          "math.GT",
          "math.HO",
          "math.IT",
          "math.KT",
          "math.LO",
          "math.MG",
          "math.MP",
          "math.NA",
          "math.NT",
          "math.OA",
          "math.OC",
          "math.PR",
          "math.QA",
          "math.RA",
          "math.RT",
          "math.SG",
          "math.SP",
          "math.ST",

          // Physics
          "physics.acc-ph",
          "physics.app-ph",
          "physics.atm-clus",
          "physics.bio-ph",
          "physics.chem-ph",
          "physics.class-ph",
          "physics.comp-ph",
          "physics.data-an",
          "physics.ed-ph",
          "physics.geo-ph",
          "physics.hist-ph",
          "physics.ins-det",
          "physics.med-ph",
          "physics.optics",
          "physics.plasm-ph",
          "physics.pop-ph",
          "physics.soc-ph",
          "physics.space-ph",

          // Biology
          "q-bio.BM",
          "q-bio.MN",
          "q-bio.NC",
          "q-bio.OT",

          // Finance
          "q-fin.CP",
          "q-fin.EC",
          "q-fin.MF",
          "q-fin.PM",
          "q-fin.ST",
          "q-fin.TR",

          // Statistics
          "stat.AP",
          "stat.CO",
          "stat.ML",
          "stat.ME",
          "stat.OT",
          "stat.TH",

          // Electrical Engineering
          "eess.AS",
          "eess.IV",
          "eess.SP",
          "eess.SY",

          // Economics
          "econ.EM",
          "econ.GN",
          "econ.MC",
          "econ.MT",
          "econ.TH",
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
