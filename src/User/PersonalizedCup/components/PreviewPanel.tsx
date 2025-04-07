"use client";

import { Eye } from "lucide-react";
import { useCustomization } from "../context/CustomizationContext";
import imageCup from "../../../assets/Model-Taza.jpeg";
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
    cupType,
  } = useCustomization();

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  // Get cup type name
  const cupTypeName = useMemo(() => {
    switch (cupType) {
      case "magic":
        return "Taza Mágica";
      case "scanme":
        return "Taza Scan Me";
      case "classic":
        return "Taza Clásica";
      default:
        return "Taza Clásica";
    }
  }, [cupType]);

  return (
    <div className="flex flex-col h-full">
      {/* View button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={togglePreview}
          className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium shadow-md transition-colors w-full justify-center ${
            showPreview
              ? "bg-blue-700 text-white hover:bg-blue-800"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          aria-label={showPreview ? "Ocultar vista previa" : "Ver vista previa"}
        >
          <Eye size={18} />
          <span>{showPreview ? "Ocultar vista previa" : "Ver"}</span>
        </button>
      </div>

      {/* Preview area */}
      <div
        className="flex-grow rounded-lg bg-gradient-to-b from-blue-50 to-gray-50 p-4 flex flex-col"
        aria-live="polite"
      >
        {!showPreview ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Vista previa
              </h3>
              <p className="text-sm text-gray-500">
                Haz clic en "Ver" para visualizar tu diseño
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Cup type display */}
            <div className="text-center mb-2 py-1 bg-blue-100 rounded-md">
              <h3 className="font-medium text-blue-800">{cupTypeName}</h3>
            </div>

            {/* Cup preview */}
            <div className="relative flex-grow flex items-center justify-center">
              <img
                src={imageCup || "/placeholder.svg"}
                alt="Vista previa de la taza"
                className="h-auto max-h-full w-auto max-w-full object-contain"
                loading="lazy"
              />

              {/* Text overlay in preview */}
              {showText && customText && (
                <div
                  className="absolute"
                  style={{
                    left: `${textPosition.x}px`,
                    top: `${textPosition.y}px`,
                  }}
                  aria-label="Texto personalizado en la taza"
                >
                  <p className="text-xl font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                    {customText}
                  </p>
                </div>
              )}

              {/* Image overlay in preview */}
              {showImage && customImage && (
                <div
                  className="absolute"
                  style={{
                    left: `${imagePosition.x}px`,
                    top: `${imagePosition.y}px`,
                  }}
                  aria-label="Imagen personalizada en la taza"
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
        )}
      </div>
    </div>
  );
}