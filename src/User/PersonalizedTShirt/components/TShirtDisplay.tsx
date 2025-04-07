"use client";

import React, { useRef, useState, useEffect } from "react";
import { useCustomization } from "../context/CustomizationContext";
import { X } from "lucide-react";
import imageShirtFront from "../../../assets/model-image.png"; // Imagen de la parte delantera de la playera
import imageShirtBack from "../../../assets/model-image-back.png"; // Imagen de la parte trasera de la playera

export default function TShirtDisplay() {
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

    shirtColor,
    currentView,
  } = useCustomization();

  const [dragging, setDragging] = useState<"text" | "image" | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, type: "text" | "image") => {
    e.stopPropagation();
    setDragging(type);
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current || !dragging) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left - dragOffset.x;
    const y = e.clientY - containerRect.top - dragOffset.y;

    const boundedX = Math.max(0, Math.min(x, containerRect.width - 100));
    const boundedY = Math.max(0, Math.min(y, dragging === "text" ? containerRect.height - 40 : containerRect.height - 100));

    if (dragging === "text") {
      setTextPosition({ x: boundedX, y: boundedY });
    } else if (dragging === "image") {
      setImagePosition({ x: boundedX, y: boundedY });
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const getShirtImage = () => (currentView === "front" ? imageShirtFront : imageShirtBack);

  const getShirtBackgroundColor = () => {
    switch (shirtColor) {
      case "black":
        return "bg-black";
      case "white":
        return "bg-white";
      case "gray":
        return "bg-gray-700";
      default:
        return "bg-black";
    }
  };

  const getTextColor = () => (shirtColor === "white" ? "text-black" : "text-white");

  return (
    <div
      ref={containerRef}
      className="relative h-[400px] w-full overflow-hidden flex items-center justify-center"
      aria-label="Área de personalización de la playera"
    >
      {/* Contenedor de la playera */}
      <div className={`h-full w-3/4 ${getShirtBackgroundColor()} relative flex items-center justify-center`}>
        <img
          src={getShirtImage() || "/placeholder.svg"}
          alt={`Vista ${currentView === "front" ? "frontal" : "trasera"} de la playera`}
          className="h-auto max-h-full w-auto max-w-full object-contain opacity-20"
          loading="lazy"
        />
      </div>

      {/* Texto personalizado */}
      {showText && customText && (
        <div
          className="absolute cursor-move"
          style={{
            left: `${textPosition.x}px`,
            top: `${textPosition.y}px`,
            userSelect: "none",
          }}
          onMouseDown={(e) => handleMouseDown(e, "text")}
          aria-label="Texto personalizado en la playera"
        >
          <div className="relative group">
            <p className={`text-xl font-bold ${getTextColor()} drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]`}>
              {customText}
            </p>
            <button
              className="absolute -right-3 -top-3 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => setShowText(false)}
              aria-label="Eliminar texto personalizado"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Imagen personalizada */}
      {showImage && customImage && (
        <div
          className="absolute cursor-move"
          style={{
            left: `${imagePosition.x}px`,
            top: `${imagePosition.y}px`,
            userSelect: "none",
          }}
          onMouseDown={(e) => handleMouseDown(e, "image")}
          aria-label="Imagen personalizada en la playera"
        >
          <div className="relative group">
            <img
              src={customImage || "/placeholder.svg"}
              alt="Imagen personalizada cargada"
              className="h-auto max-h-[150px] w-auto max-w-[150px] object-contain"
              loading="lazy"
            />
            <button
              className="absolute -right-3 -top-3 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => setShowImage(false)}
              aria-label="Eliminar imagen personalizada"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}