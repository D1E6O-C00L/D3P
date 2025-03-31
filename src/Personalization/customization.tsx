import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ProductView from "./ProductView";
import MainShirtView from "./MainShirtView";
import TextInputModal from "./TextInputModal";
import SideOptions from "./SideOptions";

function Customization() {
  const [selectedView, setSelectedView] = useState("front");
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [addedText, setAddedText] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-screen">
      {/* Barra superior con botón de regresar */}
      <div className="bg-[#0c2c4c] text-white p-4 flex items-center">
        <Link
          to="/"
          className="flex items-center text-white hover:text-gray-300 transition"
        >
          <ArrowLeft className="h-6 w-6 mr-2" />
          <span className="font-medium">Regresar</span>
        </Link>
        <h1 className="text-xl font-bold mx-auto">
          Personalización de Playera
        </h1>
      </div>

      <div className="flex flex-1">
        <div className="w-[30%] bg-gray-100 flex flex-col justify-center items-center p-4">
          <SideOptions
            onAddText={setAddedText}
            onImageUpload={(image: File) =>
              setUploadedImage(URL.createObjectURL(image))
            }
            selectedView={selectedView} // <-- aquí lo agregas
          />
        </div>

        {/* Vista Principal - Playera */}
        <MainShirtView
          selectedView={selectedView}
          addedText={addedText}
          uploadedImage={uploadedImage}
          onDeleteText={() => setAddedText("")} // 👈 nueva prop
        />

        {/* Panel Derecho - Playeras */}
        <div className="w-[20%] bg-gray-100 flex flex-col justify-center items-center">
          <ProductView
            setSelectedView={setSelectedView}
            addedText={addedText}
            uploadedImage={uploadedImage}
          />
        </div>
      </div>

      {/* Modal para añadir texto */}
      {isTextModalOpen && (
        <TextInputModal
          onClose={() => setIsTextModalOpen(false)}
          onAddText={setAddedText}
        />
      )}
    </div>
  );
}

export default Customization;
