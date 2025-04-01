"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { useCustomization } from "../context/CustomizationContext"
import { X } from "lucide-react"
import imageShirtFront from "../../assets/model-image.png" // Replace with actual t-shirt front image
import imageShirtBack from "../../assets/model-image-back.png" // Replace with actual t-shirt back image

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
    shirtSize,
    currentView,
  } = useCustomization()

 
  const [draggingText, setDraggingText] = useState(false)
  const [draggingImage, setDraggingImage] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const containerRef = useRef<HTMLDivElement>(null)


  const handleTextMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDraggingText(true)
    const element = e.currentTarget as HTMLDivElement
    const rect = element.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

 
  const handleImageMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDraggingImage(true)
    const element = e.currentTarget as HTMLDivElement
    const rect = element.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  
  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()

    if (draggingText) {
      const x = e.clientX - containerRect.left - dragOffset.x
      const y = e.clientY - containerRect.top - dragOffset.y

     
      const boundedX = Math.max(0, Math.min(x, containerRect.width - 100))
      const boundedY = Math.max(0, Math.min(y, containerRect.height - 40))

      setTextPosition({ x: boundedX, y: boundedY })
    }

    if (draggingImage) {
      const x = e.clientX - containerRect.left - dragOffset.x
      const y = e.clientY - containerRect.top - dragOffset.y

     
      const boundedX = Math.max(0, Math.min(x, containerRect.width - 100))
      const boundedY = Math.max(0, Math.min(y, containerRect.height - 100))

      setImagePosition({ x: boundedX, y: boundedY })
    }
  }

  
  const handleMouseUp = () => {
    setDraggingText(false)
    setDraggingImage(false)
  }


  useEffect(() => {
    if (draggingText || draggingImage) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [draggingText, draggingImage])


  const getShirtImage = () => {
    return currentView === "front" ? imageShirtFront : imageShirtBack
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
    <div ref={containerRef} className="relative h-[400px] w-full overflow-hidden flex items-center justify-center">
      
      <div className={`h-full w-3/4 ${getShirtBackgroundColor()} relative flex items-center justify-center`}>
        <img
          src={getShirtImage() || "/placeholder.svg"}
          alt={`T-shirt ${currentView} view`}
          className="h-auto max-h-full w-auto max-w-full object-contain opacity-20"
        />
      </div>

      
      {showText && customText && (
        <div
          className="absolute cursor-move"
          style={{
            left: `${textPosition.x}px`,
            top: `${textPosition.y}px`,
            userSelect: "none",
          }}
          onMouseDown={handleTextMouseDown}
        >
          <div className="relative group">
            <p className={`text-xl font-bold ${getTextColor()} drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]`}>{customText}</p>

            
            <button
              className="absolute -right-3 -top-3 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
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
          style={{
            left: `${imagePosition.x}px`,
            top: `${imagePosition.y}px`,
            userSelect: "none",
          }}
          onMouseDown={handleImageMouseDown}
        >
          <div className="relative group">
            <img
              src={customImage || "/placeholder.svg"}
              alt="Custom uploaded image"
              className="h-auto max-h-[150px] w-auto max-w-[150px] object-contain"
            />

            
            <button
              className="absolute -right-3 -top-3 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => setShowImage(false)}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}