"use client"

import { Eye } from "lucide-react"
import { useCustomization } from "../context/CustomizationContext"
import imageShirtFront from "../../assets/model-image.png" // Replace with actual t-shirt front image
import imageShirtBack from "../../assets/model-image-back.png" // Replace with actual t-shirt back image

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
  } = useCustomization()

  const togglePreview = () => {
    setShowPreview(!showPreview)
  }

  // Get shirt color name
  const getShirtColorName = () => {
    switch (shirtColor) {
      case "black":
        return "Negro"
      case "white":
        return "Blanco"
      case "gray":
        return "Gris oscuro"
      default:
        return "Negro"
    }
  }

  // Get shirt size name
  const getShirtSizeName = () => {
    switch (shirtSize) {
      case "s":
        return "Chica (S)"
      case "m":
        return "Mediana (M)"
      case "l":
        return "Grande (L)"
      default:
        return "Mediana (M)"
    }
  }

  // Get background color based on shirt color
  const getShirtBackgroundColor = () => {
    switch (shirtColor) {
      case "black":
        return "bg-black"
      case "white":
        return "bg-white"
      case "gray":
        return "bg-gray-700"
      default:
        return "bg-black"
    }
  }

  // Get text color based on shirt color for visibility
  const getTextColor = () => {
    return shirtColor === "white" ? "text-black" : "text-white"
  }

  return (
    <div className="flex flex-col h-full">
      {/* View button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={togglePreview}
          className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium shadow-md transition-colors w-full justify-center ${
            showPreview ? "bg-blue-700 text-white hover:bg-blue-800" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <Eye size={18} />
          <span>{showPreview ? "Ocultar vista previa" : "Ver"}</span>
        </button>
      </div>

      {/* Preview area */}
      <div className="flex-grow rounded-lg bg-gradient-to-b from-blue-50 to-gray-50 p-4 flex flex-col">
        {!showPreview ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Vista previa</h3>
              <p className="text-sm text-gray-500">Haz clic en "Ver" para visualizar tu diseño</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Shirt details */}
            <div className="text-center mb-2 py-1 bg-blue-100 rounded-md">
              <h3 className="font-medium text-blue-800">
                Playera {getShirtColorName()} - Talla {getShirtSizeName()} - {currentView === "front" ? "Frente" : "Espalda"}
              </h3>
            </div>

            {/* Shirt preview */}
            <div className="relative flex-grow flex items-center justify-center">
              <div className={`h-full w-3/4 ${getShirtBackgroundColor()} relative flex items-center justify-center`}>
                <img
                  src={currentView === "front" ? imageShirtFront : imageShirtBack || "/placeholder.svg"}
                  alt="T-shirt Preview"
                  className="h-auto max-h-full w-auto max-w-full object-contain opacity-20"
                />

                {/* Text overlay in preview */}
                {showText && customText && (
                  <div
                    className="absolute"
                    style={{
                      left: `${textPosition.x}px`,
                      top: `${textPosition.y}px`,
                    }}
                  >
                    <p className={`text-xl font-bold ${getTextColor()} drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]`}>{customText}</p>
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
                  >
                    <img
                      src={customImage || "/placeholder.svg"}
                      alt="Custom uploaded image"
                      className="h-auto max-h-[150px] w-auto max-w-[150px] object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}