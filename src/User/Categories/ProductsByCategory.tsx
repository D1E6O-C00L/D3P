import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Producto {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number | string;
  imagen_url: string;
}

const ProductsByCategory = () => {
  const { id_categoria } = useParams<{ id_categoria?: string }>();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      if (!id_categoria) {
        setError("No se encontró la categoría seleccionada.");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:8888/api/categorias/categoria/${id_categoria}`
        );
        setProductos(res.data.data || []);
        setError(null);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos.");
      }
    };

    fetchProductos();
  }, [id_categoria]);

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-[#0c2c4c] mb-8">
        Productos
      </h1>

      {error ? (
        <p className="text-center text-red-500 font-medium">{error}</p>
      ) : productos.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay productos en esta categoría.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productos.map((prod) => (
            <div
              key={prod.id_producto}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={prod.imagen_url}
                alt={prod.nombre}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-[#1a4b7f]">
                  {prod.nombre}
                </h2>
                <p className="text-gray-600">{prod.descripcion}</p>
                <p className="mt-2 font-bold">
                  ${parseFloat(prod.precio as string).toFixed(2)} MXN
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsByCategory;
