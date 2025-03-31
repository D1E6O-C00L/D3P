import type React from "react";
import FrontImage from "../assets/model-image.png";
import BackImage from "../assets/model-image-back.png";
import EditableText from "./EditableText";

interface MainShirtViewProps {
  selectedView: string;
  uploadedImage: string | null;
  addedText: string;
  onDeleteText: () => void;
}

const MainShirtView: React.FC<MainShirtViewProps> = ({
  selectedView,
  uploadedImage,
  addedText,
  onDeleteText,
}) => {
  const shirtImage = selectedView === "front" ? FrontImage : BackImage;

  return (
    <div className="flex items-center justify-center w-full h-screen bg-white overflow-hidden">
      <div className="relative w-[320px] sm:w-[350px] md:w-[400px] lg:w-[420px] max-h-[600px]">
        {/* Imagen de la playera */}
        <img
          src={shirtImage}
          alt={`Playera ${selectedView}`}
          className="w-full h-auto object-contain"
        />

        {/* Imagen cargada (personalización) */}
        {uploadedImage && (
          <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 w-[150px] h-[200px]">
            <img
              src={uploadedImage}
              alt="Personalización"
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Texto editable */}
        {addedText && (
          <EditableText text={addedText} onDelete={onDeleteText} />
        )}
      </div>
    </div>
  );
};

export default MainShirtView;
