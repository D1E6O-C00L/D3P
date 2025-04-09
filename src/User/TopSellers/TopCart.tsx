import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { agregarProductoAlCarrito } from "../../api/cart"; // Asegúrate de que esta función esté correctamente implementada
import { useUser } from "../context/UserContext"; // Para obtener el usuario logueado

interface Product {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: string;
  stock: number;
  imagen_url: string;
}

const TopCart: React.FC = () => {
  const { user } = useUser(); // Obtén el usuario desde el contexto
  const [topSellers, setTopSellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await axios.get(
          "https://d3p-backend.onrender.com/api/productos/destacados"
        );

        // Accede a response.data.data para obtener el array de productos
        if (response.data.success && Array.isArray(response.data.data)) {
          setTopSellers(response.data.data);
        } else {
          console.error("La respuesta no contiene un array válido:", response.data);
          setTopSellers([]); // Establece un array vacío si la respuesta no es válida
        }
      } catch (error) {
        console.error("Error fetching top sellers:", error);
        setTopSellers([]); // Establece un array vacío en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellers();
  }, []);

  const handleAddToCart = async (id_producto: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      return;
    }

    if (!user || !user.id_usuario) {
      alert("No se pudo validar el usuario. Por favor, inicia sesión nuevamente.");
      return;
    }

    try {
      const response = await agregarProductoAlCarrito(user.id_usuario, id_producto, 1, token);

      if (response.success) {
        alert("Producto agregado al carrito");
      } else {
        alert(response.message || "No se pudo agregar el producto al carrito.");
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("Error al agregar al carrito. Por favor, intenta nuevamente.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">
          Cargando productos destacados...
        </p>
      </div>
    );
  }

  if (topSellers.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">
          No hay productos destacados disponibles.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-[#0c2c4c] mb-8">
        Productos Destacados
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topSellers.map((product) => (
          <div
            key={product.id_producto}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <img
              src={product.imagen_url}
              alt={product.nombre}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#0c2c4c]">
                {product.nombre}
              </h3>
              <p className="text-gray-600 font-medium">
                ${parseFloat(product.precio).toFixed(2)}
              </p>
              <button
                className="mt-4 w-full bg-[#0c2c4c] text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-[#1a4b7f] transition"
                aria-label={`Agregar ${product.nombre} al carrito`}
                onClick={() => handleAddToCart(product.id_producto)}
              >
                <ShoppingCart size={20} />
                <span>Agregar al carrito</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCart;