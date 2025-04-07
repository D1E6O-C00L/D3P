"use client";

import React, { useState } from "react";
import { useCustomization } from "../context/CustomizationContext";
import { Upload, Type, RotateCcw } from "lucide-react";
import Logo from "../../../assets/Marca.jpg";

export default function CustomizationPanel() {
  const {
    setCustomText,
    setShowText,
    setCustomImage,
    setShowImage,
    shirtColor,
    setShirtColor,
    shirtSize,
    setShirtSize,
    currentView,
    setCurrentView,
  } = useCustomization();

  const [textInput, setTextInput] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setCustomImage(e.target.result as string);
          setShowImage(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddText = () => {
    if (textInput.trim()) {
      setCustomText(textInput);
      setShowText(true);
      setTextInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddText();
    }
  };

  const handleToggleView = () => {
    setCurrentView(currentView === "front" ? "back" : "front");
  };

  const shirtColors = [
    { id: "black", name: "Negro" },
    { id: "white", name: "Blanco" },
    { id: "gray", name: "Gris oscuro" },
  ];

  const shirtSizes = [
    { id: "s", name: "Chica (S)" },
    { id: "m", name: "Mediana (M)" },
    { id: "l", name: "Grande (L)" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Logo */}
      <div className="mb-4 flex justify-center">
        <img
          src={Logo || "/placeholder.svg"}
          alt="Divine Design Print Logo"
          className="h-[10rem] w-auto object-contain"
          loading="lazy"
        />
      </div>

      {/* Toggle view button */}
      <button
        onClick={handleToggleView}
        className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
        aria-label={`Cambiar vista a ${currentView === "front" ? "parte trasera" : "parte delantera"}`}
      >
        <RotateCcw size={18} />
        <span>{currentView === "front" ? "Ver parte trasera" : "Ver parte delantera"}</span>
      </button>

      {/* Add text */}
      <div className="space-y-2">
        <div className="relative">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu texto personalizado"
            className="text-[#0c2c4c] w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-label="Campo para texto personalizado"
          />
          <button
            onClick={handleAddText}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-blue-50 p-1.5 text-blue-600 transition-colors hover:bg-blue-100"
            aria-label="Añadir texto personalizado"
          >
            <Type size={18} />
          </button>
        </div>
        <button
          onClick={handleAddText}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
          aria-label="Añadir texto personalizado"
        >
          <Type size={18} />
          <span>Añadir texto</span>
        </button>
      </div>

      {/* Upload image */}
      <div>
        <label
          htmlFor="image-upload"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
          aria-label="Cargar imagen personalizada"
        >
          <Upload size={18} />
          <span>Cargar imagen</span>
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Shirt Colors */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Color de Playera</h3>
        <div className="flex flex-col gap-2">
          {shirtColors.map((color) => (
            <button
              key={color.id}
              onClick={() => setShirtColor(color.id as any)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                shirtColor === color.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              aria-label={`Seleccionar color ${color.name}`}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>

      {/* Shirt Sizes */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Talla de Playera</h3>
        <div className="flex flex-col gap-2">
          {shirtSizes.map((size) => (
            <button
              key={size.id}
              onClick={() => setShirtSize(size.id as any)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                shirtSize === size.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              aria-label={`Seleccionar talla ${size.name}`}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}