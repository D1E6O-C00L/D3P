"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useCustomization } from "../context/CustomizationContext";
import { X } from "lucide-react";
import imageCup from "../../../assets/Model-Taza.jpeg";

export default function CupDisplay() {
  const {
    customText,
    textPosition,
    setTextPosition,
    showText,
    setShowText,
    customImage,
    imagePosition,
    setImagePosition,
    showImage,
    setShowImage,
  } = useCustomization();

  const [dragging, setDragging] = useState<"text" | "image" | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, type: "text" | "image") => {
      e.stopPropagation();
      setDragging(type);
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || !dragging) return;
      const containerRect = containerRef.current.getBoundingClientRect();

      const x = e.clientX - containerRect.left - dragOffset.x;
      const y = e.clientY - containerRect.top - dragOffset.y;

      const maxX = containerRect.width - 100;
      const maxY = dragging === "image" ? containerRect.height - 100 : containerRect.height - 40;

      const boundedX = Math.max(0, Math.min(x, maxX));
      const boundedY = Math.max(0, Math.min(y, maxY));

      dragging === "text"
        ? setTextPosition({ x: boundedX, y: boundedY })
        : setImagePosition({ x: boundedX, y: boundedY });
    },
    [dragging, dragOffset, setTextPosition, setImagePosition]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(null);
  }, []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove, { passive: false });
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, handleMouseMove, handleMouseUp]);

  const cupImage = useMemo(() => imageCup, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[400px] w-full overflow-hidden"
      aria-label="Área de personalización de la taza"
    >
      <img
        src={cupImage || "/placeholder.svg"}
        alt="Modelo de taza personalizable"
        className="h-auto max-h-full w-auto max-w-full object-contain"
        loading="lazy"
      />

      {showText && customText && (
        <div
          className="absolute cursor-move"
          style={{ left: `${textPosition.x}px`, top: `${textPosition.y}px`, userSelect: "none" }}
          onMouseDown={(e) => handleMouseDown(e, "text")}
          aria-label="Texto personalizado"
        >
          <div className="relative group">
            <p className="text-xl font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              {customText}
            </p>
            <button
              className="absolute -right-3 -top-3 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Eliminar texto personalizado"
              onClick={() => setShowText(false)}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {showImage && customImage && (
        <div
          className="absolute cursor-move"
          style={{ left: `${imagePosition.x}px`, top: `${imagePosition.y}px`, userSelect: "none" }}
          onMouseDown={(e) => handleMouseDown(e, "image")}
          aria-label="Imagen personalizada"
        >
          <div className="relative group">
            <img
              src={customImage}
              alt="Imagen personalizada para la taza"
              className="h-auto max-h-[150px] w-auto max-w-[150px] object-contain"
              loading="lazy"
            />
            <button
              className="absolute -right-3 -top-3 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Eliminar imagen personalizada"
              onClick={() => setShowImage(false)}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}