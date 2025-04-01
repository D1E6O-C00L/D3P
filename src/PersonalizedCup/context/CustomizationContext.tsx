"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type CupType = "magic" | "scanme" | "classic"
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

  cupType: CupType
  setCupType: (type: CupType) => void

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

  // Cup type and view state
  const [cupType, setCupType] = useState<CupType>("classic")
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

    cupType,
    setCupType,

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

