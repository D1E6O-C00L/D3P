import { useState } from "react";
import { FaCoffee, FaTshirt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type IconType = "coffee" | "tshirt" | null;

function Iconos() {
  const [hoveredIcon, setHoveredIcon] = useState<IconType>(null);

  const handleMouseEnter = (icon: IconType): void => {
    setHoveredIcon(icon);
  };

  const handleMouseLeave = (): void => {
    setHoveredIcon(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 flex flex-col justify-center items-center p-4">
      
      <Link
        to="/"
        className="absolute top-4 left-4 flex items-center text-white hover:text-gray-300 transition"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span className="font-medium">Regresar</span>
      </Link>

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-12 md:mb-20 lg:mb-35 px-4 max-w-4xl">
        Seleccione el producto de su preferencia
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-24 lg:gap-50">
        <div
          className={`relative group flex justify-center items-center cursor-pointer transition-all duration-500 ease-in-out ${
            hoveredIcon === "coffee" ? "scale-105 md:scale-110" : ""
          }`}
          onMouseEnter={() => handleMouseEnter("coffee")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="absolute border-8 md:border-12 lg:border-16 border-white rounded-full w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-lg group-hover:shadow-blue-300"></div>
          <Link
            to="/personalizedCup"
            className="flex justify-center items-center h-full w-full"
          >
            <FaCoffee className="text-white text-5xl md:text-6xl h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 transform transition-all duration-500 group-hover:scale-110" />
          </Link>
          <span className="absolute -bottom-10 text-white text-xl md:text-2xl font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Tazas
          </span>
        </div>

        <div
          className={`relative group flex justify-center items-center cursor-pointer transition-all duration-500 ease-in-out ${
            hoveredIcon === "tshirt" ? "scale-105 md:scale-110" : ""
          }`}
          onMouseEnter={() => handleMouseEnter("tshirt")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="absolute border-8 md:border-12 lg:border-16 border-white rounded-full w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-lg group-hover:shadow-blue-300"></div>
          <Link
            to="/customization"
            className="flex justify-center items-center h-full w-full"
          >
            <FaTshirt className="text-white text-5xl md:text-6xl h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 transform transition-all duration-500 group-hover:scale-110" />
          </Link>
          <span className="absolute -bottom-10 text-white text-xl md:text-2xl font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Camisetas
          </span>
        </div>
      </div>
    </div>
  );
}

export default Iconos;
