import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { Settings2, X } from "lucide-react";

export const categories = {
  "Computer Science": [
    { id: "cs.AI", name: "Artificial Intelligence" },
    { id: "cs.AR", name: "Hardware Architecture" },
    { id: "cs.CC", name: "Computational Complexity" },
    { id: "cs.CE", name: "Computational Engineering, Finance, and Science" },
    { id: "cs.CG", name: "Computational Geometry" },
    { id: "cs.CL", name: "Computation and Language" },
    { id: "cs.CR", name: "Cryptography and Security" },
    { id: "cs.CV", name: "Computer Vision and Pattern Recognition" },
    { id: "cs.CY", name: "Computers and Society" },
    { id: "cs.DB", name: "Databases" },
    { id: "cs.DC", name: "Distributed, Parallel, and Cluster Computing" },
    { id: "cs.DL", name: "Digital Libraries" },
    { id: "cs.DM", name: "Discrete Mathematics" },
    { id: "cs.DS", name: "Data Structures and Algorithms" },
    { id: "cs.FL", name: "Formal Languages and Automata Theory" },
    { id: "cs.GL", name: "General Literature" },
    { id: "cs.GR", name: "Graphics" },
    { id: "cs.GT", name: "Computer Science and Game Theory" },
    { id: "cs.HC", name: "Human-Computer Interaction" },
    { id: "cs.IR", name: "Information Retrieval" },
    { id: "cs.IT", name: "Information Theory" },
    { id: "cs.LG", name: "Machine Learning" },
    { id: "cs.LO", name: "Logic in Computer Science" },
    { id: "cs.MA", name: "Multiagent Systems" },
    { id: "cs.MM", name: "Multimedia" },
    { id: "cs.MS", name: "Mathematical Software" },
    { id: "cs.NA", name: "Numerical Analysis" },
    { id: "cs.OH", name: "Other Computer Science" },
    { id: "cs.OS", name: "Operating Systems" },
    { id: "cs.PF", name: "Performance" },
    { id: "cs.SE", name: "Software Engineering" },
    { id: "cs.SI", name: "Social and Information Networks" },
    { id: "cs.SY", name: "Systems and Control" },
  ],
  Mathematics: [
    { id: "math.AG", name: "Algebraic Geometry" },
    { id: "math.AP", name: "Analysis of PDEs" },
    { id: "math.AT", name: "Algebraic Topology" },
    { id: "math.CA", name: "Classical Analysis and ODEs" },
    { id: "math.CO", name: "Combinatorics" },
    { id: "math.CT", name: "Category Theory" },
    { id: "math.CV", name: "Complex Variables" },
    { id: "math.DG", name: "Differential Geometry" },
    { id: "math.DS", name: "Dynamical Systems" },
    { id: "math.FA", name: "Functional Analysis" },
    { id: "math.GM", name: "General Mathematics" },
    { id: "math.GN", name: "General Topology" },
    { id: "math.GR", name: "Group Theory" },
    { id: "math.GT", name: "Geometric Topology" },
    { id: "math.HO", name: "History and Overview" },
    { id: "math.IT", name: "Information Theory" },
    { id: "math.KT", name: "K-Theory and Homology" },
    { id: "math.LO", name: "Logic" },
    { id: "math.MG", name: "Mathematical Physics" },
    { id: "math.MP", name: "Mathematical Physics" },
    { id: "math.NA", name: "Numerical Analysis" },
    { id: "math.NT", name: "Number Theory" },
    { id: "math.OA", name: "Operator Algebras" },
    { id: "math.OC", name: "Optimization and Control" },
    { id: "math.PR", name: "Probability" },
    { id: "math.QA", name: "Quantum Algebra" },
    { id: "math.RA", name: "Rings and Algebras" },
    { id: "math.RT", name: "Representation Theory" },
    { id: "math.SG", name: "Symplectic Geometry" },
    { id: "math.SP", name: "Spectral Theory" },
    { id: "math.ST", name: "Statistics Theory" },
  ],
  Physics: [
    { id: "physics.acc-ph", name: "Accelerator Physics" },
    { id: "physics.app-ph", name: "Applied Physics" },
    { id: "physics.atm-clus", name: "Atmospheric and Oceanic Physics" },
    { id: "physics.bio-ph", name: "Biological Physics" },
    { id: "physics.chem-ph", name: "Chemical Physics" },
    { id: "physics.class-ph", name: "Classical Physics" },
    { id: "physics.comp-ph", name: "Computational Physics" },
    {
      id: "physics.data-an",
      name: "Data Analysis, Statistics and Probability",
    },
    { id: "physics.ed-ph", name: "Physics Education" },
    { id: "physics.geo-ph", name: "Geophysics" },
    { id: "physics.hist-ph", name: "History and Philosophy of Physics" },
    { id: "physics.ins-det", name: "Instrumentation and Detectors" },
    { id: "physics.med-ph", name: "Medical Physics" },
    { id: "physics.optics", name: "Optics" },
    { id: "physics.plasm-ph", name: "Plasma Physics" },
    { id: "physics.pop-ph", name: "Popular Physics" },
    { id: "physics.soc-ph", name: "Physics and Society" },
    { id: "physics.space-ph", name: "Space Physics" },
  ],
  Biology: [
    { id: "q-bio.BM", name: "Biomolecules" },
    { id: "q-bio.MN", name: "Molecular Networks" },
    { id: "q-bio.NC", name: "Neurons and Cognition" },
    { id: "q-bio.OT", name: "Other Quantitative Biology" },
  ],
  Finance: [
    { id: "q-fin.CP", name: "Computational Finance" },
    { id: "q-fin.EC", name: "Econometrics" },
    { id: "q-fin.MF", name: "Mathematical Finance" },
    { id: "q-fin.PM", name: "Portfolio Management" },
    { id: "q-fin.ST", name: "Statistical Finance" },
    { id: "q-fin.TR", name: "Trading and Market Microstructure" },
  ],
  Statistics: [
    { id: "stat.AP", name: "Applications" },
    { id: "stat.CO", name: "Computation" },
    { id: "stat.ML", name: "Machine Learning" },
    { id: "stat.ME", name: "Methodology" },
    { id: "stat.OT", name: "Other Statistics" },
    { id: "stat.TH", name: "Theoretical Statistics" },
  ],
  "Electrical Engineering and Systems Science": [
    { id: "eess.AS", name: "Audio and Speech Processing" },
    { id: "eess.IV", name: "Image and Video Processing" },
    { id: "eess.SP", name: "Signal Processing" },
    { id: "eess.SY", name: "Systems and Control" },
  ],
  Economics: [
    { id: "econ.EM", name: "Econometrics" },
    { id: "econ.GN", name: "General Economics" },
    { id: "econ.MC", name: "Microeconomics" },
    { id: "econ.MT", name: "Macroeconomics" },
    { id: "econ.TH", name: "Theoretical Economics" },
  ],
};

interface CategoryFiltersProps {
  selectedCategories: string[];
  onToggleCategory: (categoryId: string) => void;
}

export function CategoryFilters({
  selectedCategories,
  onToggleCategory,
}: CategoryFiltersProps) {
  const selectedCount = selectedCategories.length;

  const clearAll = () => {
    selectedCategories.forEach((categoryId) => onToggleCategory(categoryId));
  };

  const toggleAllInCategory = (items: { id: string }[]) => {
    const categoryIds = items.map((item) => item.id);
    const allSelected = categoryIds.every((id) =>
      selectedCategories.includes(id)
    );

    categoryIds.forEach((id) => {
      if (allSelected) {
        // If all are selected, deselect all
        if (selectedCategories.includes(id)) {
          onToggleCategory(id);
        }
      } else {
        // If not all selected, select all missing ones
        if (!selectedCategories.includes(id)) {
          onToggleCategory(id);
        }
      }
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          {selectedCount > 0 ? (
            <span>
              {selectedCount} {selectedCount === 1 ? "category" : "categories"}{" "}
              selected
            </span>
          ) : (
            <span>All categories</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[90vw] sm:w-[400px] h-[500px] p-0"
        side="bottom"
        align="center"
        sideOffset={4}
      >
        <div className="flex flex-col h-full">
          <div className="sticky top-0 bg-popover p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-sm">Filter Categories</h2>
              {selectedCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAll}
                  className="h-8 text-xs gap-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                  Clear all
                </Button>
              )}
            </div>
          </div>
          <div className="p-4 overflow-auto">
            <div className="space-y-4">
              {Object.entries(categories).map(([group, items]) => (
                <div key={group} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {group}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleAllInCategory(items)}
                      className="h-6 text-xs"
                    >
                      {items.every((item) =>
                        selectedCategories.includes(item.id)
                      )
                        ? "Deselect All"
                        : "Select All"}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {items.map((category) => (
                      <Button
                        key={category.id}
                        variant={
                          selectedCategories.includes(category.id)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        className="h-auto py-1 px-3 whitespace-normal text-left justify-start text-xs"
                        onClick={() => onToggleCategory(category.id)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
