import { useEffect, useState } from "react";
import { Search, Plus, Trash2, Pencil, X } from "lucide-react";
import { eliminarCategoria, obtenerCategorias } from "../../api/categorias";

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

const AdminCatalogo = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [filtered, setFiltered] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const data = await obtenerCategorias();
      setCategorias(data);
      setFiltered(data);
    } catch (error) {
      console.error("Error al cargar categorías", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filteredResults = categorias.filter((c) =>
      c.nombre.toLowerCase().includes(term.toLowerCase())
    );
    setFiltered(filteredResults);
  };

  const toggleSelected = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("No autorizado");

      await eliminarCategoria(id, token);
      setCategorias((prev) => prev.filter((c) => c.id !== id));
      setFiltered((prev) => prev.filter((c) => c.id !== id));
      setIdToDelete(null);
    } catch (error) {
      console.error("Error al eliminar categoría", error);
    }
  };

  const handleDeleteSelected = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("No autorizado");

    try {
      for (let id of selected) {
        await eliminarCategoria(id, token);
      }
      setCategorias((prev) => prev.filter((c) => !selected.includes(c.id)));
      setFiltered((prev) => prev.filter((c) => !selected.includes(c.id)));
      setSelected([]);
    } catch (error) {
      console.error("Error al eliminar categorías:", error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-amber-50 min-h-screen">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#0c2c4c] mb-4 md:mb-6">Catálogo de Categorías</h2>

      <div className="flex justify-between items-center mb-4 gap-2">
        <div className="flex gap-2 items-center">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <Search className="text-[#0c2c4c] cursor-pointer w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <Plus className="text-[#0c2c4c] cursor-pointer w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {selected.length > 0 && (
          <button
            onClick={() => setShowModal(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition text-red-600 hover:text-red-800"
          >
            <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>

      <div
        className={`transition-all duration-500 overflow-hidden ${showSearch ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="relative w-full max-w-md mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar categorías..."
            className="w-full text-[#0c2c4c] p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a4b7f]"
          />
          <Search className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
        </div>
      </div>

      <div className="bg-[#e9f0ed] p-3 sm:p-4 rounded-xl shadow-md w-full">
        {loading ? (
          <div className="py-8 text-center text-[#0c2c4c]">
            <p>Cargando categorías...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-8 text-center text-[#0c2c4c]">
            <p>No se encontraron categorías</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filtered.map((categoria) => (
              <div
                key={categoria.id}
                className="bg-white rounded-lg p-3 sm:p-4 shadow hover:shadow-lg transition text-[#0c2c4c] relative"
              >
                <input
                  type="checkbox"
                  className="absolute top-2 left-2 w-4 h-4 sm:w-5 sm:h-5 accent-[#1a4b7f] cursor-pointer rounded border-gray-300 shadow-sm hover:ring-2 hover:ring-blue-400 transition"
                  checked={selected.includes(categoria.id)}
                  onChange={() => toggleSelected(categoria.id)}
                />
                <div className="pl-6 sm:pl-7">
                  <h3 className="font-bold text-[#0c2c4c] text-sm sm:text-base line-clamp-1">{categoria.nombre}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{categoria.descripcion}</p>
                  <div className="flex justify-end gap-2 mt-2">
                    <button className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition">
                      <Pencil size={16} />
                    </button>
                    <button
                      className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition"
                      onClick={() => {
                        setIdToDelete(categoria.id);
                        setShowModal(true);
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 md:mt-6 flex justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <button
            key={i}
            onClick={() => {}}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${i === 0 ? "bg-[#1a4b7f]" : "bg-gray-300"}`}
          />
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm relative">
            <div className="flex justify-between items-center bg-gray-200 p-2 rounded-t-lg">
              <div className="flex gap-2 pl-1">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
              </div>
              <button className="text-red-600 font-bold pr-2" onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="p-4 sm:p-6 text-center">
              <p className="text-base sm:text-lg font-semibold text-[#0c2c4c]">
                ¿Estás seguro de que deseas eliminar {idToDelete ? "esta categoría" : "las categorías seleccionadas"}?
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => {
                    if (idToDelete !== null) {
                      handleDelete(idToDelete);
                    } else {
                      handleDeleteSelected();
                    }
                    setShowModal(false);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-md"
                >
                  Sí, eliminar
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-[#0c2c4c] px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-md"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCatalogo;