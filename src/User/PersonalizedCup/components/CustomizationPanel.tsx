"use client";

import React, { useState, useMemo } from "react";
import { useCustomization } from "../context/CustomizationContext";
import { Upload, Type } from "lucide-react";
import Logo from "../../../assets/Marca.jpg";

export default function CustomizationPanel() {
  const {
    setCustomText,
    setShowText,
    setCustomImage,
    setShowImage,
    cupType,
    setCupType,
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

  const cupTypes = useMemo(
    () => [
      { id: "magic", name: "Taza mágica" },
      { id: "scanme", name: "Taza scan me" },
      { id: "classic", name: "Taza clásica" },
    ],
    []
  );

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

      {/* Añadir texto */}
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

      {/* Cargar imagen */}
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

      {/* Tipos de taza */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Tipo de Taza</h3>
        <div className="flex flex-col gap-2">
          {cupTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setCupType(type.id as any)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                cupType === type.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              aria-label={`Seleccionar ${type.name}`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}