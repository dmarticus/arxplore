import { NextResponse } from "next/server";
import { parseArxivXml } from "@/utils/parseArxivXml";

// Common words that add noise to keyword searches
const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "must", "shall", "can", "need", "dare",
  "ought", "used", "to", "of", "in", "for", "on", "with", "at", "by",
  "from", "as", "into", "through", "during", "before", "after", "above",
  "below", "between", "under", "again", "further", "then", "once", "here",
  "there", "when", "where", "why", "how", "all", "each", "few", "more",
  "most", "other", "some", "such", "no", "nor", "not", "only", "own",
  "same", "so", "than", "too", "very", "just", "also", "now", "and",
  "but", "or", "if", "because", "until", "while", "what", "which", "who",
  "whom", "this", "that", "these", "those", "am", "about", "against",
  "any", "both", "down", "up", "out", "off", "over", "it", "its", "i",
  "me", "my", "we", "our", "you", "your", "he", "him", "his", "she",
  "her", "they", "them", "their"
]);

function buildArxivQuery(rawQuery: string): string {
  const trimmed = rawQuery.trim();

  // Check for quoted phrases - preserve them as exact matches
  const quotedPhrases: string[] = [];
  const withoutQuotes = trimmed.replace(/"([^"]+)"/g, (_, phrase) => {
    quotedPhrases.push(phrase);
    return "";
  });

  // Extract remaining words, filter stop words, keep meaningful terms
  const words = withoutQuotes
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 0)
    .filter(word => !STOP_WORDS.has(word))
    .filter(word => word.length >= 2);

  const queryParts: string[] = [];

  // Add quoted phrases as title searches (more precise)
  for (const phrase of quotedPhrases) {
    queryParts.push(`ti:"${phrase}"`);
  }

  // For remaining keywords, search in title AND abstract
  // Using ti: (title) gives higher relevance than all:
  for (const word of words) {
    // Search both title and abstract for each keyword
    queryParts.push(`(ti:${word}+OR+abs:${word})`);
  }

  // If we stripped everything, fall back to original query in title
  if (queryParts.length === 0) {
    return `ti:${encodeURIComponent(trimmed)}`;
  }

  // Join with AND - all terms must match
  return queryParts.join("+AND+");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const categories = searchParams.get("categories")?.split(",").filter(Boolean) || [];
  const start = parseInt(searchParams.get("start") || "0", 10);
  const maxResults = parseInt(searchParams.get("maxResults") || "10", 10);

  if (!query || query.trim() === "") {
    return NextResponse.json({ error: "Search query is required" }, { status: 400 });
  }

  try {
    // Build optimized search query
    let searchQuery = buildArxivQuery(query);

    // Add category filter if categories are selected
    if (categories.length > 0) {
      const categoryQuery = categories.map(cat => `cat:${cat}`).join("+OR+");
      searchQuery = `(${searchQuery})+AND+(${categoryQuery})`;
    }

    const response = await fetch(
      `http://export.arxiv.org/api/query?search_query=${searchQuery}&start=${start}&max_results=${maxResults}&sortBy=relevance&sortOrder=descending`
    );

    if (!response.ok) {
      throw new Error(`ArXiv API responded with status: ${response.status}`);
    }

    const xmlData = await response.text();
    const papers = parseArxivXml(xmlData);

    return NextResponse.json({
      papers: papers || [],
      query,
      start,
      maxResults,
    });
  } catch (error) {
    console.error("Error searching ArXiv:", error);
    return NextResponse.json(
      { error: "Failed to search ArXiv" },
      { status: 500 }
    );
  }
}
