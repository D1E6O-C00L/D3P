"use client";
import { useEffect, useState } from "react";
import { Trash, Plus, Minus, ShoppingCart, ArrowLeft, AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "default",
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />

      {/* Modal */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 z-50 overflow-hidden">
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {variant === "destructive" && <AlertTriangle className="h-5 w-5 text-red-500" />}
              {title}
            </h3>
            <p className="text-gray-500 mt-1">{description}</p>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => onOpenChange(false)}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                variant === "destructive" ? "bg-red-600 hover:bg-red-700" : "bg-[#0c2c4c] hover:bg-[#1a4b7f]"
              }`}
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cart() {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [idCarrito, setIdCarrito] = useState<number | null>(null);
  const navigate = useNavigate();

  // State for confirmation dialogs
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    description: "",
    onConfirm: () => {},
    confirmText: "Confirmar",
    variant: "default" as "default" | "destructive",
  });

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

  const handleQuantityChange = async (id_producto: number, cantidadActual: number, change: number) => {
    if (!idCarrito) return;
    const nuevaCantidad = cantidadActual + change;

    if (nuevaCantidad < 1) {
      setConfirmDialog({
        open: true,
        title: "Eliminar producto",
        description: "¿Estás seguro de que deseas eliminar este producto del carrito?",
        onConfirm: () => handleRemoveConfirmed(id_producto),
        confirmText: "Eliminar",
        variant: "destructive",
      });
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `https://d3p-backend.onrender.com/api/carrito/${idCarrito}/productos/${id_producto}`,
        { cantidad: nuevaCantidad },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id_producto === id_producto ? { ...item, cantidad: nuevaCantidad } : item))
      );
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
    }
  };

  const handleRemoveConfirmed = async (id_producto: number) => {
    if (!idCarrito) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://d3p-backend.onrender.com/api/carrito/${idCarrito}/productos/${id_producto}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems((prevItems) => prevItems.filter((item) => item.id_producto !== id_producto));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const handleVaciarCarritoConfirmed = async () => {
    if (!idCarrito) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://d3p-backend.onrender.com/api/carrito/${idCarrito}/vaciar`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems([]);
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { total } });
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
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
                onClick={() =>
                  setConfirmDialog({
                    open: true,
                    title: "Vaciar carrito",
                    description: "¿Estás seguro de que deseas vaciar todo el carrito? Esta acción no se puede deshacer.",
                    onConfirm: handleVaciarCarritoConfirmed,
                    confirmText: "Vaciar carrito",
                    variant: "destructive",
                  })
                }
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
                <div key={item.id_producto} className="flex items-center justify-between border-b py-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.imagen_url || "/placeholder.svg"}
                      alt={item.nombre}
                      className="w-20 h-20 object-cover rounded border"
                      width="80"
                      height="80"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.nombre}</h3>
                      <p className="text-sm text-gray-500">{item.descripcion}</p>
                      <p className="text-sm text-gray-500">Stock: {item.stock}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id_producto, item.cantidad, -1)}
                        className="bg-gray-100 text-gray-600 px-2 rounded disabled:opacity-50"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="min-w-[20px] text-center text-black">{item.cantidad}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id_producto, item.cantidad, 1)}
                        disabled={item.cantidad >= item.stock}
                        className="bg-gray-100 text-gray-600 px-2 rounded disabled:opacity-50"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-medium text-gray-900">${(item.precio * item.cantidad).toFixed(2)} MXN</div>
                      <button
                        onClick={() =>
                          setConfirmDialog({
                            open: true,
                            title: "Eliminar producto",
                            description: "¿Estás seguro de que deseas eliminar este producto del carrito?",
                            onConfirm: () => handleRemoveConfirmed(item.id_producto),
                            confirmText: "Eliminar",
                            variant: "destructive",
                          })
                        }
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
                <h3 className="text-xl font-medium text-gray-800 mb-1">Tu carrito está vacío</h3>
                <p className="text-gray-600 mb-6">Parece que aún no has añadido ningún producto a tu carrito.</p>
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
              <h3 className="font-bold text-lg mb-3 text-[#0c2c4c]">Resumen de compra</h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)} MXN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impuestos (16%)</span>
                  <span className="font-medium">${impuestos.toFixed(2)} MXN</span>
                </div>
                <div className="border-t mt-2 pt-2 flex justify-between">
                  <span className="font-bold text-[#0c2c4c]">Total</span>
                  <span className="font-bold text-[#0c2c4c]">${total.toFixed(2)} MXN</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-4 bg-[#0c2c4c] hover:bg-[#1a4b7f] text-white py-3 rounded-md font-medium"
              >
                Continuar al pago
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        title={confirmDialog.title}
        description={confirmDialog.description}
        onConfirm={confirmDialog.onConfirm}
        confirmText={confirmDialog.confirmText}
        variant={confirmDialog.variant}
      />
    </div>
  );
}

export default Cart;