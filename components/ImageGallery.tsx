'use client';

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

const ImageGallery = ({ images, initialIndex = 0, onClose }: ImageGalleryProps) => {
  const [current, setCurrent] = useState(initialIndex);

  const prev = () => setCurrent((current - 1 + images.length) % images.length);
  const next = () => setCurrent((current + 1) % images.length);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <span className="text-sm text-muted-foreground">{current + 1} / {images.length}</span>
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main image */}
      <div className="flex-1 flex items-center justify-center relative px-4">
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-2 z-10 w-9 h-9 rounded-full bg-card/60 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="absolute right-2 z-10 w-9 h-9 rounded-full bg-card/60 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground">
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
        <img
          src={images[current]}
          alt={`Photo ${current + 1}`}
          className="max-w-full max-h-[60vh] object-contain rounded-xl"
        />
      </div>

      {/* Thumbnail grid */}
      <div className="p-4 overflow-y-auto max-h-[30vh]">
        <div className="grid grid-cols-4 gap-2 max-w-lg mx-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${
                i === current ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
