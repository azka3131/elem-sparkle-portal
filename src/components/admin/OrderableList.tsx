import { ArrowDown, ArrowUp, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OrderableListProps {
  items: string[];
  onChange: (items: string[]) => void;
  addLabel?: string;
  placeholder?: string;
}

/** Reorderable text list with add/remove and up/down controls. */
export function OrderableList({
  items,
  onChange,
  addLabel = "Tambah",
  placeholder = "Tulis item…",
}: OrderableListProps) {
  const set = (i: number, value: string) =>
    onChange(items.map((v, idx) => (idx === i ? value : v)));
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const copy = items.slice();
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  };

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-6 text-center text-xs font-semibold text-muted-foreground">
            {i + 1}.
          </span>
          <Input
            value={item}
            placeholder={placeholder}
            onChange={(e) => set(i, e.target.value)}
          />
          <div className="flex gap-0.5">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => move(i, -1)}
              disabled={i === 0}
              aria-label="Naik"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => move(i, 1)}
              disabled={i === items.length - 1}
              aria-label="Turun"
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={() => remove(i)}
              aria-label="Hapus"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...items, ""])}
      >
        <Plus className="mr-1.5 h-3.5 w-3.5" />
        {addLabel}
      </Button>
    </div>
  );
}
