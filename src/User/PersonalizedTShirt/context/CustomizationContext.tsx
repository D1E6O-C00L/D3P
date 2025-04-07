"use client";

import { createContext, useContext, useState, useMemo, type ReactNode } from "react";

// Tipos para el contexto
type ShirtColor = "black" | "white" | "gray";
type ShirtSize = "s" | "m" | "l";
type View = "front" | "back";
type Position = { x: number; y: number };

interface CustomizationContextType {
  customText: string;
  setCustomText: (text: string) => void;
  textPosition: Position;
  setTextPosition: (position: Position) => void;
  showText: boolean;
  setShowText: (show: boolean) => void;

  customImage: string | null;
  setCustomImage: (image: string | null) => void;
  imagePosition: Position;
  setImagePosition: (position: Position) => void;
  showImage: boolean;
  setShowImage: (show: boolean) => void;

  shirtColor: ShirtColor;
  setShirtColor: (color: ShirtColor) => void;
  shirtSize: ShirtSize;
  setShirtSize: (size: ShirtSize) => void;

  showPreview: boolean;
  setShowPreview: (show: boolean) => void;

  currentView: View;
  setCurrentView: (view: View) => void;
}

// Creación del contexto
const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

// Proveedor del contexto
export function CustomizationProvider({ children }: { children: ReactNode }) {
  // Valores iniciales
  const initialPosition: Position = { x: 150, y: 150 };

  // Estado para texto personalizado
  const [customText, setCustomText] = useState("");
  const [textPosition, setTextPosition] = useState<Position>(initialPosition);
  const [showText, setShowText] = useState(false);

  // Estado para imagen personalizada
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [imagePosition, setImagePosition] = useState<Position>(initialPosition);
  const [showImage, setShowImage] = useState(false);

  // Estado para propiedades de la playera
  const [shirtColor, setShirtColor] = useState<ShirtColor>("black");
  const [shirtSize, setShirtSize] = useState<ShirtSize>("m");
  const [currentView, setCurrentView] = useState<View>("front");

  // Estado para vista previa
  const [showPreview, setShowPreview] = useState(false);

  // Memorizar el valor del contexto para evitar renders innecesarios
  const value = useMemo(
    () => ({
      customText,
      setCustomText,
      textPosition,
      setTextPosition,
      showText,
      setShowText,

      customImage,
      setCustomImage,
      imagePosition,
      setImagePosition,
      showImage,
      setShowImage,

      shirtColor,
      setShirtColor,
      shirtSize,
      setShirtSize,

      showPreview,
      setShowPreview,

      currentView,
      setCurrentView,
    }),
    [
      customText,
      textPosition,
      showText,
      customImage,
      imagePosition,
      showImage,
      shirtColor,
      shirtSize,
      showPreview,
      currentView,
    ]
  );

  return <CustomizationContext.Provider value={value}>{children}</CustomizationContext.Provider>;
}

// Hook personalizado para usar el contexto
export function useCustomization() {
  const context = useContext(CustomizationContext);
  if (context === undefined) {
    throw new Error("useCustomization must be used within a CustomizationProvider");
  }
  return context;
}