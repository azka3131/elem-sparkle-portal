import { useEffect, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface FormDialogProps<T> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  /** Initial values; when null, the form is in "create" mode. */
  initial: T | null;
  /** Empty state used for Create and Reset. */
  emptyValue: T;
  /** Validate. Return `{}` when valid. Keys are field names. */
  validate?: (values: T) => Record<string, string>;
  onSubmit: (values: T) => Promise<void> | void;
  /** Render function receives current state, setter, and error map. */
  children: (props: {
    values: T;
    setValues: (updater: (v: T) => T) => void;
    setField: <K extends keyof T>(key: K, value: T[K]) => void;
    errors: Record<string, string>;
  }) => ReactNode;
  submitLabel?: string;
  size?: "md" | "lg" | "xl";
}

const SIZE: Record<NonNullable<FormDialogProps<unknown>["size"]>, string> = {
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

/**
 * Reusable Create/Edit dialog. Handles unsaved-changes warning,
 * validation display, loading state, and a Reset button.
 */
export function FormDialog<T extends object>({
  open,
  onOpenChange,
  title,
  description,
  initial,
  emptyValue,
  validate,
  onSubmit,
  children,
  submitLabel = "Simpan",
  size = "lg",
}: FormDialogProps<T>) {
  const baseline = initial ?? emptyValue;
  const [values, setValues] = useState<T>(baseline);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);

  // Reset internal state whenever the dialog opens for a different item.
  useEffect(() => {
    if (open) {
      setValues(initial ?? emptyValue);
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initial]);

  const isDirty = JSON.stringify(values) !== JSON.stringify(baseline);

  const attemptClose = (next: boolean) => {
    if (!next && isDirty && !saving) {
      setConfirmClose(true);
      return;
    }
    onOpenChange(next);
  };

  const setField = <K extends keyof T>(key: K, value: T[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const handleSubmit = async () => {
    const validationErrors = validate?.(values) ?? {};
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Periksa kembali formulir", {
        description: "Ada isian yang belum sesuai.",
      });
      return;
    }
    try {
      setSaving(true);
      await onSubmit(values);
      onOpenChange(false);
    } catch (err) {
      toast.error("Gagal menyimpan", {
        description: err instanceof Error ? err.message : "Silakan coba lagi.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={attemptClose}>
        <DialogContent className={SIZE[size]}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>

          <div className="max-h-[65vh] space-y-4 overflow-y-auto pr-1">
            {children({ values, setValues, setField, errors })}
          </div>

          <DialogFooter className="gap-2 sm:justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setValues(emptyValue);
                setErrors({});
              }}
              disabled={saving}
            >
              Reset
            </Button>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => attemptClose(false)}
                disabled={saving}
              >
                Batal
              </Button>
              <Button type="button" onClick={handleSubmit} disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {submitLabel}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmClose} onOpenChange={setConfirmClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Buang perubahan?</AlertDialogTitle>
            <AlertDialogDescription>
              Perubahan yang belum disimpan akan hilang. Anda yakin ingin menutup formulir?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Lanjut Edit</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setConfirmClose(false);
                onOpenChange(false);
              }}
            >
              Buang Perubahan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

/** Field wrapper displaying an inline validation message. */
export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive">{message}</p>;
}
