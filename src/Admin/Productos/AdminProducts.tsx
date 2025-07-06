import { useEffect, useState } from "react";
import { Search, Plus, Trash2, Pencil, X } from "lucide-react";
import axios from "axios";
import { deleteProduct } from "../../api/products";
import { deleteManyProducts } from "../../api/products";

interface Producto {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen_url: string;
  categoria_nombre: string;
}

const AdminProducts = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filtered, setFiltered] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  const fetchProductos = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8888/api/productos?page=${page}&limit=9`);
      setProductos(res.data.data);
      setFiltered(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      console.error("Error al cargar productos", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filteredResults = productos.filter((p) =>
      p.nombre.toLowerCase().includes(term.toLowerCase())
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
  
      await deleteProduct(id, token);
      setProductos((prev) => prev.filter((p) => p.id_producto !== id));
      setFiltered((prev) => prev.filter((p) => p.id_producto !== id));
      setIdToDelete(null);
    } catch (error) {
      console.error("Error al eliminar producto", error);
    }
  };
  
  const handleDeleteSelected = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("No autorizado");
  
    try {
      const res = await deleteManyProducts(selected, token);
      if (res.success) {
        setProductos((prev) => prev.filter((p) => !selected.includes(p.id_producto)));
        setFiltered((prev) => prev.filter((p) => !selected.includes(p.id_producto)));
        setSelected([]);
      } else {
        alert(res.message || "Ocurrió un error al eliminar.");
      }
    } catch (error) {
      console.error("Error al eliminar productos:", error);
    }
  };
  

  

  useEffect(() => {
    fetchProductos(currentPage);
  }, [currentPage]);

  return (
    <div className="p-6 bg-amber-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-[#0c2c4c] mb-6">Productos</h2>

      <div className="flex justify-between items-center mb-4 gap-2">
        <div className="flex gap-2">
          <button onClick={() => setShowSearch(!showSearch)}>
            <Search className="text-[#0c2c4c] cursor-pointer" />
          </button>
          <Plus className="text-[#0c2c4c] cursor-pointer" />
        </div>

        {selected.length > 0 && (
          <button
            onClick={() => setShowModal(true)}
            className="text-red-600 hover:text-red-800 transition"
          >
            <Trash2 />
          </button>
        )}
      </div>

      <div
        className={`transition-all duration-500 overflow-hidden ${showSearch ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar productos..."
          className="w-full text-[#0c2c4c] mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a4b7f]"
        />
      </div>

      <div className="bg-[#e9f0ed] p-4 rounded-xl shadow-md">
        {loading ? (
          <p className="text-center text-[#0c2c4c]">Cargando productos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((producto) => (
              <div
                key={producto.id_producto}
                className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition text-[#0c2c4c] relative"
              >
                <input
                  type="checkbox"
                  className="absolute top-2 left-2 w-5 h-5 accent-[#1a4b7f] cursor-pointer rounded border-gray-300 shadow-sm hover:ring-2 hover:ring-blue-400 transition"
                  checked={selected.includes(producto.id_producto)}
                  onChange={() => toggleSelected(producto.id_producto)}
                />

                <img
                  src={producto.imagen_url || "/placeholder.svg"}
                  alt={producto.nombre}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-2 font-bold text-[#0c2c4c]">{producto.nombre}</h3>
                <p className="text-sm text-gray-600">{producto.descripcion}</p>
                <p className="text-md font-semibold text-[#1a4b7f]">${producto.precio}</p>
                <p className="text-sm text-gray-500">Stock: {producto.stock}</p>
                <p className="text-sm italic text-gray-400">
                  Categoría: {producto.categoria_nombre}
                </p>
                <div className="flex justify-end gap-2 mt-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => {
                      setIdToDelete(producto.id_producto);
                      setShowModal(true);
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-3 h-3 rounded-full  ${
              currentPage === i + 1 ? "bg-[#1a4b7f]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm relative">
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
            <div className="p-6 text-center">
              <p className="text-lg font-semibold text-[#0c2c4c]">
                ¿Estás seguro de que deseas eliminar {idToDelete ? "este producto" : "los productos seleccionados"}?
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
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >
                  Sí, eliminar
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-[#0c2c4c] px-4 py-2 rounded-md"
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

export default AdminProducts;
