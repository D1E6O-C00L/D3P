"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type ShirtColor = "black" | "white" | "gray"
type ShirtSize = "s" | "m" | "l"
type View = "front" | "back"
type Position = { x: number; y: number }

interface CustomizationContextType {
  customText: string
  setCustomText: (text: string) => void
  textPosition: Position
  setTextPosition: (position: Position) => void
  showText: boolean
  setShowText: (show: boolean) => void

  customImage: string | null
  setCustomImage: (image: string | null) => void
  imagePosition: Position
  setImagePosition: (position: Position) => void
  showImage: boolean
  setShowImage: (show: boolean) => void

  shirtColor: ShirtColor
  setShirtColor: (color: ShirtColor) => void
  shirtSize: ShirtSize
  setShirtSize: (size: ShirtSize) => void

  showPreview: boolean
  setShowPreview: (show: boolean) => void

  currentView: View
  setCurrentView: (view: View) => void
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined)

export function CustomizationProvider({ children }: { children: ReactNode }) {
  // Text state
  const [customText, setCustomText] = useState("")
  const [textPosition, setTextPosition] = useState<Position>({ x: 150, y: 150 })
  const [showText, setShowText] = useState(false)

  // Image state
  const [customImage, setCustomImage] = useState<string | null>(null)
  const [imagePosition, setImagePosition] = useState<Position>({ x: 150, y: 150 })
  const [showImage, setShowImage] = useState(false)

  // Shirt properties
  const [shirtColor, setShirtColor] = useState<ShirtColor>("black")
  const [shirtSize, setShirtSize] = useState<ShirtSize>("m")
  const [currentView, setCurrentView] = useState<View>("front")

  // Preview state
  const [showPreview, setShowPreview] = useState(false)

  const value = {
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
  }

  return <CustomizationContext.Provider value={value}>{children}</CustomizationContext.Provider>
}

export function useCustomization() {
  const context = useContext(CustomizationContext)
  if (context === undefined) {
    throw new Error("useCustomization must be used within a CustomizationProvider")
  }
  return context
}