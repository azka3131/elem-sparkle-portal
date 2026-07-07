import { useRef, useState, type DragEvent } from "react";
import { ImagePlus, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (dataUrl: string | undefined) => void;
  aspect?: "video" | "square" | "wide";
  label?: string;
  className?: string;
}

const ASPECT: Record<NonNullable<ImageUploadProps["aspect"]>, string> = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[3/1]",
};

/**
 * Reusable image uploader with drag & drop, preview, replace, and remove.
 * Currently stores a base64 data URL locally; backend integration will
 * replace this with a multipart upload later.
 */
export function ImageUpload({
  value,
  onChange,
  aspect = "video",
  label = "Unggah Gambar",
  className,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const readFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) readFile(file);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) readFile(file);
          e.target.value = "";
        }}
      />
      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-border bg-muted">
          <img src={value} alt="Preview" className={cn("w-full object-cover", ASPECT[aspect])} />
          <div className="absolute right-2 top-2 flex gap-1">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => inputRef.current?.click()}
            >
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
              Ganti
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={() => onChange(undefined)}
            >
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              Hapus
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition",
            ASPECT[aspect],
            dragging
              ? "border-primary bg-primary/5"
              : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted",
          )}
        >
          <ImagePlus className="h-8 w-8 text-muted-foreground" />
          <div className="text-sm font-medium">{label}</div>
          <div className="text-xs text-muted-foreground">
            Tarik & lepas gambar di sini, atau klik untuk memilih file
          </div>
          <div className="text-[11px] text-muted-foreground">PNG, JPG, WEBP · maks 2MB</div>
        </button>
      )}
    </div>
  );
}
