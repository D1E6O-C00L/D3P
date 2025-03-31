import { useState } from 'react';
import FrontImage from '../assets/model-image.png';
import BackImage from '../assets/model-image-back.png';
import PreviewModal from './PreviewModal';

function ProductView({ 
  setSelectedView, 
  addedText, 
  uploadedImage 
}: { 
  setSelectedView: (view: string) => void, 
  addedText?: string, 
  uploadedImage?: string | null 
}) {
    const [selectedView, setLocalSelectedView] = useState('front');
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  
    const handleSelection = (view: string) => {
      setSelectedView(view);
      setLocalSelectedView(view);
    };

    const handlePreviewClick = () => {
      setIsPreviewModalOpen(true);
    };

  return (
    <div className="flex flex-col items-center space-y-8 p-3 w-full h-[90vh] max-h-[90vh] bg-gray-100 shadow-md overflow-hidden">

      {/* Botón "Ver" con funcionalidad de previsualización */}
      <button 
        onClick={handlePreviewClick} 
        className="flex items-center gap-2 bg-amber-130 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition max-w-[180px]"
      >
        👁️ <span className="text-lg font-bold text-[#0c2c4c]">Ver</span>
      </button>

      {/* Imagen - Playera Delantera */}
      <div
        onClick={() => handleSelection('front')}
        className={`cursor-pointer border-4 ${
          selectedView === 'front' ? 'border-[#0c2c4c]' : 'border-transparent'
        } rounded-lg w-full max-w-[150px]`}
      >
        <img 
          src={FrontImage} 
          alt="Playera Delantera" 
          className="rounded-md w-full object-contain"
        />
        <p className="text-center mt-1 text-md font-bold text-gray-700">Delante</p>
      </div>

      {/* Imagen - Playera Trasera */}
      <div
        onClick={() => handleSelection('back')}
        className={`cursor-pointer border-4 ${
          selectedView === 'back' ? 'border-[#0c2c4c]' : 'border-transparent'
        } rounded-lg w-full max-w-[150px]`}
      >
        <img 
          src={BackImage} 
          alt="Playera Trasera" 
          className="rounded-md w-full object-contain"
        />
        <p className="text-center mt-1 text-md font-bold text-gray-700">Detrás</p>
      </div>

      {/* Modal de Previsualización */}
      {isPreviewModalOpen && (
        <PreviewModal 
          onClose={() => setIsPreviewModalOpen(false)}
          addedText={addedText || ''}
          uploadedImage={uploadedImage}
          selectedView={selectedView}
        />
      )}
    </div>
  );
}

export default ProductView;