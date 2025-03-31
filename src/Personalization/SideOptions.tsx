import { FaTshirt, FaUpload, FaTextHeight } from "react-icons/fa";
import { useState } from "react";
import TextInputModal from "./TextInputModal";
import ImageUploadModal from "./ImageUpload";
import Logo from "../assets/Marca.jpg";

function SideOptions({
  onAddText,
  onImageUpload,
  selectedView,
}: {
  onAddText: (text: string) => void;
  onImageUpload: (image: File) => void;
  selectedView: string;
}) {
  const [selectedColor, setSelectedColor] = useState("black");
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const colors = ["black", "gray-800", "white"];

  return (
    <div className="flex flex-col items-center space-y-4 p-4 w-full max-w-[350px] bg-gray-100">
      <div>
        <img
          src={Logo}
          alt="Logo"
          className="w-[16rem] h-[9rem] cursor-pointer hover:opacity-80 transition"
        />
      </div>

      {/* Botón Añadir Texto */}
      <div
        onClick={() => setIsTextModalOpen(true)}
        className="w-full p-4 border border-gray-300 rounded-lg flex items-center space-x-2 cursor-pointer 
                    hover:bg-pink-50 transition"
      >
        <FaTextHeight className="text-[#0c2c4c]" />
        <span className="text-[#0c2c4c] font-medium">Añadir texto</span>
      </div>

      {/* Botón Cargar Imagen */}
      <div
        onClick={() => setIsImageModalOpen(true)}
        className="w-full p-4 border border-gray-300 rounded-lg flex items-center space-x-2 cursor-pointer 
                    hover:bg-gray-50 transition"
      >
        <FaUpload className="text-[#0c2c4c]" />
        <span className="text-[#0c2c4c]">Cargar imagen</span>
      </div>

      {/* Tallas y Colores */}
      <div className="w-full p-4 border rounded-lg">
        <p className="text-sm font-bold mb-2">
          Tallas: <span className="text-[#0c2c4c]">XS - 5XL</span>
        </p>

        <p className="text-sm font-bold mb-2">
          Color: <span className="capitalize">{selectedColor}</span>
        </p>

        {/* Selector de Colores */}
        <div className="grid grid-cols-5 gap-2 mt-4">
          {colors.map((clr) => (
            <div
              key={clr}
              onClick={() => setSelectedColor(clr)}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer 
                ${selectedColor === clr ? "border-red-500" : "border-gray-300"} 
                bg-${clr}`}
            />
          ))}
        </div>
      </div>

      {/* Modal para añadir texto */}
      {isTextModalOpen && (
        <TextInputModal
          onClose={() => setIsTextModalOpen(false)}
          onAddText={onAddText}
        />
      )}

      {/* Modal para subir imagen */}
      {isImageModalOpen && (
        <ImageUploadModal
          onClose={() => setIsImageModalOpen(false)}
          onImageUpload={onImageUpload}
          selectedView={selectedView} // <-- Aquí lo estás enviando al modal
        />
      )}
    </div>
  );
}

export default SideOptions;
