import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { Settings2, X } from "lucide-react";

export const categories = {
  "Computer Science": [
    { id: "cs.AI", name: "Artificial Intelligence" },
    { id: "cs.CL", name: "Computation and Language" },
    { id: "cs.CV", name: "Computer Vision" },
    { id: "cs.LG", name: "Machine Learning" },
    { id: "cs.RO", name: "Robotics" },
    { id: "cs.NE", name: "Neural Computing" },
  ],
  Mathematics: [
    { id: "math.CO", name: "Combinatorics" },
    { id: "math.DS", name: "Dynamical Systems" },
    { id: "math.PR", name: "Probability" },
  ],
  Physics: [
    { id: "physics.comp-ph", name: "Computational Physics" },
    { id: "physics.data-an", name: "Data Analysis" },
    { id: "physics.soc-ph", name: "Physics and Society" },
  ],
  Biology: [
    { id: "q-bio.BM", name: "Biomolecules" },
    { id: "q-bio.NC", name: "Neurons and Cognition" },
    { id: "q-bio.QM", name: "Quantitative Methods" },
  ],
  Finance: [
    { id: "q-fin.PM", name: "Portfolio Management" },
    { id: "q-fin.ST", name: "Statistical Finance" },
    { id: "q-fin.TR", name: "Trading" },
  ],
  Statistics: [
    { id: "stat.ML", name: "Machine Learning" },
    { id: "stat.ME", name: "Methodology" },
    { id: "stat.AP", name: "Applications" },
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
        className="w-[400px] h-[500px] p-0"
        side="right"
        align="start"
        sideOffset={10}
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
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {group}
                  </h3>
                  <div className="flex flex-wrap gap-2">
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
