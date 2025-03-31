import { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

interface ImageUploadModalProps {
  onClose: () => void;
  onImageUpload: (image: File) => void;
  selectedView: string;
}

function ImageUploadModal({ 
  onClose, 
  onImageUpload,
  selectedView 
}: ImageUploadModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Formato no válido. Solo se permiten imágenes.');
        return;
      }
      if (file.size > 15 * 1024 * 1024) { // 15MB límite
        setError('El archivo es demasiado grande. Máximo 15MB.');
        return;
      }
      setPreview(URL.createObjectURL(file));
      setError(null);
      onImageUpload(file); 
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[350px] max-w-full shadow-md">
        <h2 className="text-lg font-bold text-[#0c2c4c] mb-4">
          Cargar imagen para la parte {selectedView === 'front' ? 'frontal' : 'trasera'}
        </h2>

        {/* Área de visualización de imagen */}
        {preview ? (
          <img src={preview || "/placeholder.svg"} alt="Vista previa" className="w-full rounded-lg mb-4" />
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 text-center">
            <p className="text-gray-500">Arrastra tu imagen aquí</p>
          </div>
        )}

        <label className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-md cursor-pointer flex items-center justify-center space-x-2 w-40 mx-auto">
          <FaUpload />
          <span>Cargar imagen</span>
          <input
            type="file"
            accept="image/png, image/jpeg, image/heic"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Mensaje de error */}
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

        <div className="flex space-x-2 mt-4">
          <button 
            className="flex-1 bg-[#0c2c4c] text-white px-4 py-2 rounded-md hover:bg-[#1a4b7f] transition"
            onClick={() => {
              if (preview) {
                onClose();
              }
            }}
            disabled={!preview}
          >
            Aceptar
          </button>
          
          <button 
            className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageUploadModal;
