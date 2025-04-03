import React, { useState, useEffect } from "react";
import { Trash, Plus, Minus, ShoppingCart } from "lucide-react";
import axios from "axios";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Función para obtener el carrito desde el backend
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:8888/api/carrito/1"); // Ajusta la URL y el ID de usuario
        setCartItems(response.data);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemove = (id: number) => {
    const confirmed = confirm("¿Estás seguro de que deseas eliminar este producto del carrito?");
    if (confirmed) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems((prev) => {
      return prev.flatMap((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;

          if (newQuantity < 0) return [item];

          if (newQuantity === 0) {
            const confirmDelete = confirm("Cantidad en 0. ¿Deseas eliminar este producto?");
            return confirmDelete ? [] : [item];
          }

          const confirmChange = confirm(
            change > 0 ? "¿Agregar una unidad más?" : "¿Eliminar una unidad?"
          );

          return confirmChange ? [{ ...item, quantity: newQuantity }] : [item];
        }
        return [item];
      });
    });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const impuestos = subtotal * 0.16;
  const total = subtotal + impuestos;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e7edf3] to-[#f4f6f8] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-[#0c2c4c] text-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold flex items-center">
                <ShoppingCart className="mr-3" />
                Carrito de Compras
              </h2>
              <span className="text-sm text-gray-300">
                {cartItems.length} {cartItems.length === 1 ? "artículo" : "artículos"}
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            {cartItems.length > 0 ? (
              <>
                <div className="hidden sm:grid sm:grid-cols-12 text-sm font-medium text-gray-500 mb-3 pb-2 border-b">
                  <div className="col-span-6">Producto</div>
                  <div className="col-span-2 text-center">Precio</div>
                  <div className="col-span-2 text-center">Cantidad</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="sm:grid sm:grid-cols-12 gap-4 py-4 border-b last:border-0 items-center"
                  >
                    <div className="col-span-6 flex items-center space-x-4 mb-3 sm:mb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded object-cover border border-gray-200"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      </div>
                    </div>

                    <div className="col-span-2 text-center text-gray-700">
                      ${item.price.toLocaleString()} MXN
                    </div>

                    <div className="col-span-2 flex items-center justify-center">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-1 text-[#0c2c4c] hover:text-[#1a4b7f]"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-1 text-[#0c2c4c] hover:text-[#1a4b7f]"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="col-span-2 flex items-center justify-end">
                      <span className="font-medium text-gray-900 mr-3">
                        ${(item.price * item.quantity).toLocaleString()} MXN
                      </span>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mt-8 sm:ml-auto sm:w-72">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-3 text-[#0c2c4c]">Resumen de compra</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">${subtotal.toLocaleString()} MXN</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Impuestos (16%)</span>
                        <span className="font-medium">${impuestos.toLocaleString()} MXN</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between">
                        <span className="font-bold text-[#0c2c4c]">Total</span>
                        <span className="font-bold text-[#0c2c4c]">${total.toLocaleString()} MXN</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-[#0c2c4c] hover:bg-[#1a4b7f] text-white py-3 rounded-md font-medium">
                      Continuar al pago
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-2">
                      Los precios incluyen impuestos. El envío se calculará en el siguiente paso.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-1">Tu carrito está vacío</h3>
                <p className="text-gray-600 mb-6">
                  Parece que aún no has añadido ningún producto a tu carrito.
                </p>
                <button className="bg-[#0c2c4c] hover:bg-[#1a4b7f] text-white px-5 py-2 rounded-md font-medium">
                  Seguir comprando
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
