import { useState } from 'react';

interface TextInputModalProps {
  onClose: () => void;
  onAddText: (text: string) => void;
}

function TextInputModal({ onClose, onAddText }: TextInputModalProps) {
  const [text, setText] = useState('');

  return (
    <div className=" top-0 left-0 w-full h-full bg-[#0c2c4c] bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[#0c2c4c]">Añadir texto</h2>
          <button onClick={onClose} className="text-[#0c2c4c] hover:text-gray-800">&times;</button>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tu texto aquí"
          maxLength={200}
          className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none text-[#0c2c4c]"
        />

        <div className="text-right text-sm text-[#0c2c4c]">{text.length} / 200</div>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => {
              onAddText(text);
              onClose();
            }}
            className="bg-[#0c2c4c] text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}

export default TextInputModal;
