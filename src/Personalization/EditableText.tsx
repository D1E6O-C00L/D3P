import { useRef } from "react";
import { Rnd } from "react-rnd";
import { X } from "lucide-react";

interface EditableTextProps {
  text: string;
  onDelete: () => void;
}

const EditableText: React.FC<EditableTextProps> = ({ text, onDelete }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Rnd
      default={{
        x: 80,
        y: 120,
        width: 150,
        height: 100,
      }}
      bounds="parent"
      enableResizing={{
        bottomRight: true,
        bottomLeft: true,
        topRight: true,
        topLeft: true,
      }}
      minWidth={60}
      minHeight={40}
      className="group"
    >
      <div
        ref={ref}
        className="relative w-full h-full flex items-center justify-center border-2 border-blue-400 rounded bg-transparent text-white font-bold text-xl"
      >
        {text}

        {/* Botón de cerrar */}
        <button
          onClick={onDelete}
          className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
        >
          <X size={14} />
        </button>
      </div>
    </Rnd>
  );
};

export default EditableText;
