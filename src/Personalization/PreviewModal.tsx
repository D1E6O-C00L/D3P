import { useState } from 'react';

function PreviewModal({
  onClose,
  addedText,
  uploadedImage,
  selectedView
}: {
  onClose: () => void;
  addedText: string;
  uploadedImage?: string | null;
  selectedView: string;
}) {
  const [view, setView] = useState(selectedView);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-[400px] w-full">
        <h2 className="text-center text-xl font-bold text-[#0c2c4c] mb-4">Previsualización</h2>

        {/* Imagen Principal */}
        <div className="relative w-full h-[300px] flex items-center justify-center bg-gray-200 rounded-lg">
          <img 
            src={view === 'front' 
              ? require('../assets/model-image.png') 
              : require('../assets/model-image-back.png')} 
            alt={`Playera ${view === 'front' ? 'Delantera' : 'Trasera'}`} 
            className="w-full object-contain"
          />

          {/* Imagen subida */}
          {uploadedImage && (
            <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 w-[150px] h-[200px]">
              <img src={uploadedImage} alt="Personalización" className="w-full h-full object-contain" />
            </div>
          )}

          {/* Texto añadido */}
          {addedText && (
            <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 w-[150px] h-[200px] border-2 border-white flex items-center justify-center">
              <p className="text-white text-center text-lg md:text-xl lg:text-2xl font-bold">
                {addedText}
              </p>
            </div>
          )}
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setView('front')}
            className={`px-4 py-2 rounded-lg text-white ${view === 'front' ? 'bg-[#0c2c4c]' : 'bg-gray-400'}`}
          >
            Delantera
          </button>

          <button
            onClick={() => setView('back')}
            className={`px-4 py-2 rounded-lg text-white ${view === 'back' ? 'bg-[#0c2c4c]' : 'bg-gray-400'}`}
          >
            Trasera
          </button>
        </div>

        {/* Botón para cerrar */}
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreviewModal;