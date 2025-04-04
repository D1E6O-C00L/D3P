import { Plus, Search, Trash2 } from "lucide-react";


export default function AdminProducts() {
  return (
    <div className="w-full px-4 sm:px-8 py-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#0c2c4c] mb-6">
        Productos
      </h1>

      <div className="flex justify-between items-center mb-4">
        <div></div>
        <div className="flex gap-4">
          <button
            title="Buscar"
            className="text-[#0c2c4c] hover:text-[#1a4b7f] transition"
          >
            <Search size={22} />
          </button>
          <button
            title="Eliminar"
            className="text-red-600 hover:text-red-800 transition"
          >
            <Trash2 size={22} />
          </button>
          <button
            title="Agregar"
            className="text-[#0c2c4c] hover:text-[#1a4b7f] transition"
          >
            <Plus size={22} />
          </button>
        </div>
      </div>

      <div className="bg-[#e8eeea] rounded-xl shadow-md overflow-hidden min-h-[300px] flex flex-col justify-center items-center border">
        <div className="w-full h-10 bg-[#0c2c4c]"></div>

        <div className="flex-1 flex flex-col justify-center items-center text-center text-sm sm:text-base font-medium p-6 text-black">
          Aquí los elementos de la BD
        </div>


        <div className="flex justify-center items-center gap-2 pb-4">
          <span className="w-2 h-2 bg-[#0c2c4c] rounded-full"></span>
          <span className="w-2 h-2 bg-[#0c2c4c]/50 rounded-full"></span>
          <span className="w-2 h-2 bg-[#0c2c4c]/50 rounded-full"></span>
        </div>
      </div>
    </div>
  );
}
