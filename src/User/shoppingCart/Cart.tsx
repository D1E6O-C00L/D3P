import { useEffect, useState } from "react";
import { Trash, Plus, Minus, ShoppingCart, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import { useUser } from "../context/UserContext";
import axios from "axios";

interface CartItem {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen_url: string;
  stock: number;
  cantidad: number;
}

function Cart() {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [idCarrito, setIdCarrito] = useState<number | null>(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !user?.id_usuario) return;

      const response = await axios.get(
        `https://d3p-backend.onrender.com/api/carrito/usuario/${user.id_usuario}/productos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      setIdCarrito(data.data.id_carrito);
      setCartItems(data.data.productos);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  };

  useEffect(() => {
    if (user?.id_usuario) {
      fetchCartItems();
    }
  }, [user?.id_usuario]);

  const handleQuantityChange = async (
    id_producto: number,
    cantidadActual: number,
    change: number
  ) => {
    if (!idCarrito) return;
    const nuevaCantidad = cantidadActual + change;

    if (nuevaCantidad < 1) {
      const confirmar = confirm("¿Eliminar este producto del carrito?");
      if (!confirmar) return;

      // Si la cantidad es menor a 1, elimina el producto
      await handleRemove(id_producto);
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `https://d3p-backend.onrender.com/api/carrito/${idCarrito}/productos/${id_producto}`,
        { cantidad: nuevaCantidad },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Actualiza el carrito en tiempo real
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id_producto === id_producto
            ? { ...item, cantidad: nuevaCantidad }
            : item
        )
      );
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
    }
  };

  const handleRemove = async (id_producto: number) => {
    if (!idCarrito) return;
    const confirmar = confirm("¿Estás seguro de eliminar el producto?");
    if (!confirmar) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://d3p-backend.onrender.com/api/carrito/${idCarrito}/productos/${id_producto}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Actualiza el carrito en tiempo real
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id_producto !== id_producto)
      );
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const handleVaciarCarrito = async () => {
    if (!idCarrito) return;
    const confirmar = confirm("¿Vaciar el carrito?");
    if (!confirmar) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://d3p-backend.onrender.com/api/carrito/${idCarrito}/vaciar`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems([]); // Vacía el carrito en tiempo real
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
    }
  };

  const handleCheckout = () => {
    // Redirige a la ruta de Stripe Checkout y pasa el total como estado
    navigate("/checkout", { state: { total } });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  const impuestos = subtotal * 0.16;
  const total = subtotal + impuestos;

  return (
    <div className="min-h-screen bg-[#e7edf3] py-8 px-4 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="flex items-center text-[#0c2c4c] hover:text-[#1a4b7f] transition"
        aria-label="Regresar a la página principal"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span className="font-medium">Regresar</span>
      </Link>
      <div className="max-w-4xl mx-auto mt-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex justify-between items-center px-5 py-4 border-b">
            <h2 className="text-2xl font-bold text-[#0c2c4c] flex items-center">
              <ShoppingCart className="mr-2" />
              Carrito de Compras
            </h2>
            {cartItems.length > 0 && (
              <button
                onClick={handleVaciarCarrito}
                className="text-red-500 hover:text-red-700 text-sm"
                aria-label="Vaciar carrito"
              >
                Vaciar carrito
              </button>
            )}
          </div>
          <div className="p-5 sm:p-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id_producto}
                  className="flex items-center justify-between border-b py-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.imagen_url}
                      alt={item.nombre}
                      className="w-20 h-20 object-cover rounded border"
                      width="80"
                      height="80"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.nombre}
                      </h3>
                      <p className="text-sm text-gray-500">{item.descripcion}</p>
                      <p className="text-sm text-gray-500">Stock: {item.stock}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id_producto, item.cantidad, -1)
                        }
                        className="bg-gray-100 text-gray-600 px-2 rounded disabled:opacity-50"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="min-w-[20px] text-center text-black">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id_producto, item.cantidad, 1)
                        }
                        disabled={item.cantidad >= item.stock}
                        className="bg-gray-100 text-gray-600 px-2 rounded disabled:opacity-50"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        ${(item.precio * item.cantidad).toFixed(2)} MXN
                      </div>
                      <button
                        onClick={() => handleRemove(item.id_producto)}
                        className="text-red-500 hover:text-red-700 mt-1"
                        aria-label="Eliminar producto"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-1">
                  Tu carrito está vacío
                </h3>
                <p className="text-gray-600 mb-6">
                  Parece que aún no has añadido ningún producto a tu carrito.
                </p>
                <Link to="/categories">
                  <button className="bg-[#0c2c4c] hover:bg-[#1a4b7f] text-white px-5 py-2 rounded-md font-medium">
                    Seguir comprando
                  </button>
                </Link>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-5 border-t">
              <h3 className="font-bold text-lg mb-3 text-[#0c2c4c]">
                Resumen de compra
              </h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ${subtotal.toFixed(2)} MXN
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impuestos (16%)</span>
                  <span className="font-medium">
                    ${impuestos.toFixed(2)} MXN
                  </span>
                </div>
                <div className="border-t mt-2 pt-2 flex justify-between">
                  <span className="font-bold text-[#0c2c4c]">Total</span>
                  <span className="font-bold text-[#0c2c4c]">
                    ${total.toFixed(2)} MXN
                  </span>
                </div>
              </div>
              <button
                onClick={handleCheckout} // Llama a la función handleCheckout
                className="w-full mt-4 bg-[#0c2c4c] hover:bg-[#1a4b7f] text-white py-3 rounded-md font-medium"
              >
                Continuar al pago
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;