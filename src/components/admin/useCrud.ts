import { useState, useCallback } from "react";
import { toast } from "sonner";

/**
 * Common client-side CRUD state for admin modules.
 * The mutations are local; they will be swapped for Laravel API calls later.
 */
export function useCrud<T extends { id: number | string }>(initial: T[]) {
  const [items, setItems] = useState<T[]>(initial);

  const save = useCallback(
    (values: T, existing: T | null, entityName: string) => {
      if (existing) {
        setItems((s) => s.map((it) => (it.id === existing.id ? { ...it, ...values } : it)));
        toast.success(`${entityName} diperbarui`);
      } else {
        const nextId =
          typeof (items[0]?.id ?? 1) === "number"
            ? (Math.max(0, ...items.map((it) => Number(it.id))) + 1)
            : String(Date.now());
        setItems((s) => [{ ...values, id: nextId as T["id"] }, ...s]);
        toast.success(`${entityName} ditambahkan`);
      }
    },
    [items],
  );

  const remove = useCallback((id: number | string) => {
    setItems((s) => s.filter((it) => it.id !== id));
  }, []);

  return { items, setItems, save, remove };
}
