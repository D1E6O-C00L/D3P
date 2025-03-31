"use client"

import { useState, useEffect } from "react"
import imagen1 from "../assets/CamisaC1.jpg"
import imagen2 from "../assets/TazaM1.jpg"
import imagen3 from "../assets/TazaM2.jpg"

function Carousel() {
  const [activeImage, setActiveImage] = useState(0)
  const images = [imagen1, imagen2, imagen3]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])


  return (
    <div className="relative h-full w-full overflow-hidden rounded-l-xl flex flex-col bg-amber-500 justify-between">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeImage * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image || "/placeholder.svg"}
            alt={`Slide ${index}`}
            className="w-full h-full flex-shrink-0 object-cover "
          />
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${activeImage === index ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel

