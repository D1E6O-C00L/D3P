import { useEffect, useState } from "react";
import { Search, Loader, Eye } from "lucide-react";
import { getAllPedidos } from "../../api/orders";

interface Pedido {
  id_pedido: number;
  id_usuario: number;
  fecha_pedido: string;
  estado: string;
  total: number;
}

const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filtered, setFiltered] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPedidos = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no disponible");
      const data = await getAllPedidos(token);
      setPedidos(data);
      setFiltered(data);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filteredResults = pedidos.filter((p) =>
      p.id_pedido.toString().includes(term) ||
      p.id_usuario.toString().includes(term)
    );
    setFiltered(filteredResults);
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <div className="p-6 bg-amber-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-[#0c2c4c] mb-6">Pedidos</h2>

      <div className="mb-4">
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#1a4b7f]" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar por ID de pedido o usuario..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1a4b7f] focus:border-[#1a4b7f] sm:text-sm"
          />
        </div>
      </div>

      <div className="bg-[#e9f0ed] p-4 rounded-xl shadow-md">
        {loading ? (
          <div className="text-center text-[#0c2c4c] flex items-center justify-center gap-2">
            <Loader className="animate-spin" />
            Cargando pedidos...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-[#0c2c4c] text-white">
                <tr>
                  <th className="py-2 px-4 text-left">ID Pedido</th>
                  <th className="py-2 px-4 text-left">ID Usuario</th>
                  <th className="py-2 px-4 text-left">Fecha</th>
                  <th className="py-2 px-4 text-left">Estado</th>
                  <th className="py-2 px-4 text-left">Total</th>
                  <th className="py-2 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((pedido) => (
                  <tr key={pedido.id_pedido} className="border-b hover:bg-white/50">
                    <td className="py-2 px-4">{pedido.id_pedido}</td>
                    <td className="py-2 px-4">{pedido.id_usuario}</td>
                    <td className="py-2 px-4">{new Date(pedido.fecha_pedido).toLocaleString()}</td>
                    <td className="py-2 px-4 capitalize">{pedido.estado}</td>
                    <td className="py-2 px-4 font-semibold text-[#1a4b7f]">${pedido.total.toFixed(2)}</td>
                    <td className="py-2 px-4 text-center">
                      <button className="text-[#1a4b7f] hover:text-blue-700">
                        <Eye size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPedidos;
