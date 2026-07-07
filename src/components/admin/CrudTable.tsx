import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DialogFooter } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
  /** Set to true to enable header click sorting on this column. */
  sortable?: boolean;
  /** Custom sort accessor. Defaults to row[key]. */
  sortValue?: (row: T) => string | number;
}

interface CrudTableProps<T extends { id: string | number }> {
  items: T[];
  columns: Column<T>[];
  entityName: string;
  searchKeys?: (keyof T)[];
  /** Render a form for Create/Edit. Called with row (null = create) and close callback. */
  renderForm?: (item: T | null, onClose: () => void) => ReactNode;
  /** Optional custom row actions (rendered before Edit/Delete). */
  rowActions?: (row: T) => ReactNode;
  loading?: boolean;
  hideActions?: boolean;
  onDelete?: (id: string | number) => void;
  pageSize?: number;
}

type SortState<T> = { key: keyof T | string; dir: "asc" | "desc" } | null;

export function CrudTable<T extends { id: string | number }>({
  items,
  columns,
  entityName,
  searchKeys = [],
  renderForm,
  rowActions,
  loading = false,
  hideActions = false,
  onDelete,
  pageSize = 10,
}: CrudTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortState<T>>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [deleteId, setDeleteId] = useState<string | number | null>(null);

  const filtered = useMemo(() => {
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter((row) =>
      searchKeys.some((k) => String(row[k] ?? "").toLowerCase().includes(q)),
    );
  }, [items, search, searchKeys]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const col = columns.find((c) => c.key === sort.key);
    const accessor = col?.sortValue ?? ((r: T) => (r as Record<string, unknown>)[String(sort.key)] as string | number);
    const copy = [...filtered];
    copy.sort((a, b) => {
      const av = accessor(a);
      const bv = accessor(b);
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === "number" && typeof bv === "number") return av - bv;
      return String(av).localeCompare(String(bv), "id");
    });
    return sort.dir === "asc" ? copy : copy.reverse();
  }, [filtered, sort, columns]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const paged = sorted.slice(start, start + pageSize);

  const toggleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    setSort((s) => {
      if (!s || s.key !== col.key) return { key: col.key, dir: "asc" };
      if (s.dir === "asc") return { key: col.key, dir: "desc" };
      return null;
    });
  };

  const sortIcon = (col: Column<T>) => {
    if (!col.sortable) return null;
    if (!sort || sort.key !== col.key)
      return <ArrowUpDown className="ml-1.5 inline h-3 w-3 opacity-40" />;
    return sort.dir === "asc" ? (
      <ArrowUp className="ml-1.5 inline h-3 w-3" />
    ) : (
      <ArrowDown className="ml-1.5 inline h-3 w-3" />
    );
  };

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder={`Cari ${entityName.toLowerCase()}…`}
            className="pl-9"
          />
        </div>
        {!hideActions && renderForm && (
          <Button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah {entityName}
          </Button>
        )}
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((c) => (
                <TableHead
                  key={String(c.key)}
                  className={`${c.className ?? ""} ${c.sortable ? "cursor-pointer select-none" : ""}`}
                  onClick={() => toggleSort(c)}
                >
                  {c.header}
                  {sortIcon(c)}
                </TableHead>
              ))}
              {!hideActions && <TableHead className="w-28 text-right">Aksi</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (hideActions ? 0 : 1)}
                  className="py-12 text-center text-sm text-muted-foreground"
                >
                  <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
                  Memuat data…
                </TableCell>
              </TableRow>
            ) : paged.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (hideActions ? 0 : 1)}
                  className="py-12 text-center text-sm text-muted-foreground"
                >
                  {search
                    ? `Tidak ada ${entityName.toLowerCase()} yang cocok dengan pencarian.`
                    : `Belum ada ${entityName.toLowerCase()}. Klik "Tambah" untuk membuat data pertama.`}
                </TableCell>
              </TableRow>
            ) : (
              paged.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((c) => (
                    <TableCell key={String(c.key)} className={c.className}>
                      {c.render
                        ? c.render(row)
                        : String((row as Record<string, unknown>)[String(c.key)] ?? "")}
                    </TableCell>
                  ))}
                  {!hideActions && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {rowActions?.(row)}
                        {renderForm && (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              setEditing(row);
                              setDialogOpen(true);
                            }}
                            aria-label="Edit"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteId(row.id)}
                          aria-label="Hapus"
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {sorted.length > pageSize && (
        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm">
          <div className="text-muted-foreground">
            Menampilkan {start + 1}–{Math.min(start + pageSize, sorted.length)} dari{" "}
            {sorted.length}
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[80px] text-center">
              Hal. {currentPage} / {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {renderForm &&
        dialogOpen &&
        renderForm(editing, () => setDialogOpen(false))}

      <AlertDialog open={deleteId !== null} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus {entityName}?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Data akan dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deleteId !== null) {
                  onDelete?.(deleteId);
                  toast.success(`${entityName} dihapus`);
                }
                setDeleteId(null);
              }}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/** Fallback stub form for legacy modules while we upgrade them one-by-one. */
export function DefaultForm({ onClose }: { item?: unknown; onClose: () => void }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Form akan tersedia setelah integrasi backend. Demo UI ini menampilkan struktur CRUD.
      </p>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Batal
        </Button>
        <Button type="button" onClick={onClose}>
          Simpan
        </Button>
      </DialogFooter>
    </div>
  );
}
