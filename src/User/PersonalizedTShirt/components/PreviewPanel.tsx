"use client";

import { Eye } from "lucide-react";
import { useCustomization } from "../context/CustomizationContext";
import imageShirtFront from "../../../assets/model-image.png"; // Imagen de la parte delantera de la playera
import imageShirtBack from "../../../assets/model-image-back.png"; // Imagen de la parte trasera de la playera
import { useMemo } from "react";

export default function PreviewPanel() {
  const {
    showPreview,
    setShowPreview,
    customText,
    textPosition,
    showText,
    customImage,
    imagePosition,
    showImage,
    shirtColor,
    shirtSize,
    currentView,
  } = useCustomization();

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  // Memorizar valores derivados
  const shirtDetails = useMemo(() => {
    const colors = {
      black: "Negro",
      white: "Blanco",
      gray: "Gris oscuro",
    };

    const sizes = {
      s: "Chica (S)",
      m: "Mediana (M)",
      l: "Grande (L)",
    };

    const backgroundColors = {
      black: "bg-black",
      white: "bg-white",
      gray: "bg-gray-700",
    };

    return {
      colorName: colors[shirtColor] || "Negro",
      sizeName: sizes[shirtSize] || "Mediana (M)",
      backgroundColor: backgroundColors[shirtColor] || "bg-black",
      textColor: shirtColor === "white" ? "text-black" : "text-white",
    };
  }, [shirtColor, shirtSize]);

  return (
    <div className="flex flex-col h-full">
      {/* Botón para alternar vista previa */}
      <div className="flex justify-center mb-4">
        <button
          onClick={togglePreview}
          className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium shadow-md transition-colors w-full justify-center ${
            showPreview ? "bg-blue-700 text-white hover:bg-blue-800" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          aria-label={showPreview ? "Ocultar vista previa" : "Ver vista previa"}
        >
          <Eye size={18} />
          <span>{showPreview ? "Ocultar vista previa" : "Ver"}</span>
        </button>
      </div>

      {/* Área de vista previa */}
      <div
        className="flex-grow rounded-lg bg-gradient-to-b from-blue-50 to-gray-50 p-4 flex flex-col"
        aria-live="polite"
      >
        {!showPreview ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Vista previa</h3>
              <p className="text-sm text-gray-500">Haz clic en "Ver" para visualizar tu diseño</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Detalles de la playera */}
            <div className="text-center mb-2 py-1 bg-blue-100 rounded-md">
              <h3 className="font-medium text-blue-800">
                Playera {shirtDetails.colorName} - Talla {shirtDetails.sizeName} -{" "}
                {currentView === "front" ? "Frente" : "Espalda"}
              </h3>
            </div>

            {/* Vista previa de la playera */}
            <div className="relative flex-grow flex items-center justify-center">
              <div
                className={`h-full w-3/4 ${shirtDetails.backgroundColor} relative flex items-center justify-center`}
              >
                <img
                  src={currentView === "front" ? imageShirtFront : imageShirtBack || "/placeholder.svg"}
                  alt={`Vista previa de la playera (${currentView === "front" ? "Frente" : "Espalda"})`}
                  className="h-auto max-h-full w-auto max-w-full object-contain opacity-20"
                  loading="lazy"
                />

                {/* Texto personalizado */}
                {showText && customText && (
                  <div
                    className="absolute"
                    style={{
                      left: `${textPosition.x}px`,
                      top: `${textPosition.y}px`,
                    }}
                    aria-label="Texto personalizado en la playera"
                  >
                    <p
                      className={`text-xl font-bold ${shirtDetails.textColor} drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]`}
                    >
                      {customText}
                    </p>
                  </div>
                )}

                {/* Imagen personalizada */}
                {showImage && customImage && (
                  <div
                    className="absolute"
                    style={{
                      left: `${imagePosition.x}px`,
                      top: `${imagePosition.y}px`,
                    }}
                    aria-label="Imagen personalizada en la playera"
                  >
                    <img
                      src={customImage || "/placeholder.svg"}
                      alt="Imagen personalizada cargada"
                      className="h-auto max-h-[150px] w-auto max-w-[150px] object-contain"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}