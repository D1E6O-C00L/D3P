import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

interface Producto {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number | string;
  imagen_url: string;
}

const ProductsByCategory = React.memo(() => {
  const { id_categoria } = useParams<{ id_categoria?: string }>();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      if (!id_categoria) {
        setError("No se encontró la categoría seleccionada.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://d3p-backend.onrender.com/api/categorias/categoria/${id_categoria}`
        );
        setProductos(res.data.data || []);
        setError(null);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductos();
  }, [id_categoria]);

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#0c2c4c] to-[#1a4b7f] text-white">
      <div className="mb-6 flex items-center">
        <Link
          to="/categories"
          className="flex items-center text-white hover:text-gray-200 transition"
          aria-label="Volver a la lista de categorías"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium text-lg">Volver a categorías</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center mb-10">
        Productos de la categoría
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center py-20" aria-live="polite">
          <span className="flex items-center gap-2">
            <ArrowLeft className="animate-spin h-8 w-8 text-white" />
            Cargando productos...
          </span>
        </div>
      ) : error ? (
        <p className="text-center text-red-300 font-medium" aria-live="assertive">
          {error}
        </p>
      ) : productos.length === 0 ? (
        <p className="text-center text-white/80 text-lg" aria-live="polite">
          No hay productos en esta categoría.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productos.map((prod) => (
            <div
              key={prod.id_producto}
              className="bg-white text-[#0c2c4c] rounded-xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 overflow-hidden"
            >
              <img
                src={prod.imagen_url}
                alt={`Imagen del producto ${prod.nombre}`}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-[#1a4b7f] mb-1">
                  {prod.nombre}
                </h2>
                <p className="text-sm text-gray-700 mb-2">
                  {prod.descripcion}
                </p>
                <p className="font-semibold text-[#0c2c4c]">
                  ${parseFloat(prod.precio as string).toFixed(2)} MXN
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default ProductsByCategory;