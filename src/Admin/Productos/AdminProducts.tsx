import { useEffect, useState } from "react";
import { Search, Plus, Pencil } from "lucide-react";
import axios from "axios";
import { toggleProductoActivo } from "../../api/products"; // Asegúrate que esta ruta sea correcta según tu estructura

interface Producto {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen_url: string;
  categoria_nombre: string;
  activo: boolean;
}

const AdminProducts = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filtered, setFiltered] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

const toggleActivo = async (producto: Producto) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return alert("No autorizado");

    const nuevoEstado = !producto.activo;

    const respuesta = await toggleProductoActivo(producto.id_producto, nuevoEstado, token);

    if (respuesta.success) {
      // 🔁 Recargar productos desde el backend con el nuevo estado
      fetchProductos(currentPage);
    } else {
      alert(respuesta.message || "Error al actualizar estado");
    }
  } catch (error) {
    console.error("Error al cambiar estado activo:", error);
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
      </div>

      <div
        className={`transition-all duration-500 overflow-hidden ${
          showSearch ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar productos..."
          className="w-full text-[#0c2c4c] mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a4b7f]"
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-auto">
        {loading ? (
          <p className="text-center text-[#0c2c4c] py-10">Cargando productos...</p>
        ) : (
          <table className="w-full text-sm text-left text-[#0c2c4c]">
            <thead className="text-xs uppercase bg-[#1a4b7f] text-white">
              <tr>
                <th className="px-4 py-3">Imagen</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Activo</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((producto) => (
                <tr key={producto.id_producto}>
                  <td className="px-4 py-2">
                    <img
                      src={producto.imagen_url || "/placeholder.svg"}
                      alt={producto.nombre}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 font-semibold">{producto.nombre}</td>
                  <td className="px-4 py-2">${producto.precio}</td>
                  <td className="px-4 py-2">{producto.stock}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded-full ${
                        producto.activo ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                      }`}
                    >
                      {producto.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Pencil size={18} />
                    </button>
                    <button
                      className={`${
                        producto.activo ? "text-red-600" : "text-green-600"
                      } hover:text-opacity-80 text-sm font-semibold`}
                      onClick={() => toggleActivo(producto)}
                    >
                      {producto.activo ? "Desactivar" : "Activar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-3 h-3 rounded-full ${
              currentPage === i + 1 ? "bg-[#1a4b7f]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
