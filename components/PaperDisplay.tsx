import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Author {
  name: string;
}

interface PaperDisplayProps {
  paper: {
    title: string;
    summary: string;
    authors: Author[];
    links: { href: string; title: string }[];
    published: string;
  };
}

export function PaperDisplay({ paper }: PaperDisplayProps) {
  const pdfLink = paper.links.find((link) => link.title === "pdf")?.href;

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>{paper.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">
          {paper.authors.map((author) => author.name).join(", ")} -{" "}
          {new Date(paper.published).toLocaleDateString()}
        </p>
        <p className="text-gray-700">{paper.summary}</p>
      </CardContent>
      <CardFooter>
        {pdfLink && (
          <Button asChild>
            <a href={pdfLink} target="_blank" rel="noopener noreferrer">
              {`Read paper`}
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
