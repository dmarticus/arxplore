import { XMLParser } from "fast-xml-parser";

export interface ArxivPaper {
  title: string;
  summary: string;
  authors: { name: string }[];
  links: { href: string; title: string }[];
  published: string;
}

interface ArxivEntry {
  title: string;
  summary: string;
  author: { name: string } | { name: string }[];
  link:
    | { "@_href": string; "@_title"?: string }
    | { "@_href": string; "@_title"?: string }[];
  published: string;
}

interface ArxivResponse {
  feed: {
    entry: ArxivEntry;
  };
}

export function parseArxivXml(xmlString: string): ArxivPaper | null {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
  });
  const result = parser.parse(xmlString) as ArxivResponse;

  if (!result.feed || !result.feed.entry) {
    return null;
  }

  const entry = result.feed.entry;

  return {
    title: entry.title,
    summary: entry.summary,
    authors: Array.isArray(entry.author)
      ? entry.author.map((a) => ({ name: a.name }))
      : [{ name: entry.author.name }],
    links: Array.isArray(entry.link)
      ? entry.link.map((l) => ({
          href: l["@_href"],
          title: l["@_title"] || "",
        }))
      : [{ href: entry.link["@_href"], title: entry.link["@_title"] || "" }],
    published: entry.published,
  };
}
