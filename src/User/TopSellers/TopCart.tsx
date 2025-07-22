"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { ShoppingCart, CheckCircle, X } from "lucide-react"
import { agregarProductoAlCarrito } from "../../api/cart"
import { useUser } from "../context/UserContext"
import Header from "../ts/Header"
import { Link } from "react-router-dom"

interface Product {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: string;
  stock: number;
  imagen_url: string;
  activo: number; 
}


// Componente Modal para notificación de producto agregado
interface CartModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
}

const CartNotificationModal: React.FC<CartModalProps> = ({ isOpen, onClose, productName }) => {
  if (!isOpen) return null

  // Cerrar el modal automáticamente después de 3 segundos
  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay semi-transparente */}
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />

      {/* Modal */}
      <div
        className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md animate-slideIn"
        style={{
          animation: "slideIn 0.3s ease-out forwards",
        }}
      >
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>

          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">¡Producto agregado!</h3>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">{productName}</span> ha sido agregado a tu carrito.
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Seguir comprando
            </button>
            <Link
              to="/carrito"
              className="px-4 py-2 bg-[#0c2c4c] text-white rounded-md hover:bg-[#1a4b7f] transition-colors flex items-center"
            >
              <ShoppingCart size={16} className="mr-2" />
              Ver carrito
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const TopCart: React.FC = () => {
  const { user } = useUser()
  const [topSellers, setTopSellers] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Estado para el modal
  const [modalOpen, setModalOpen] = useState(false)
  const [addedProduct, setAddedProduct] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

useEffect(() => {
  const fetchTopSellers = async () => {
    try {
      const response = await axios.get("http://localhost:8888/api/productos/destacados")

      if (response.data.success && Array.isArray(response.data.data)) {
        // Filtrar solo los productos activos
        const activeProducts = response.data.data.filter((product: Product) => product.activo === 1)
        setTopSellers(activeProducts) // Asignar solo los productos activos
      } else {
        console.error("La respuesta no contiene un array válido:", response.data)
        setTopSellers([])
      }
    } catch (error) {
      console.error("Error fetching top sellers:", error)
      setTopSellers([])
    } finally {
      setLoading(false)
    }
  }

  fetchTopSellers()
}, [])


  const handleAddToCart = async (id_producto: number, nombre: string) => {
    const token = localStorage.getItem("token")

    if (!token) {
      setAlertMessage("Debes iniciar sesión para agregar productos al carrito.")
      setShowAlert(true)
      return
    }

    if (!user || !user.id_usuario) {
      setAlertMessage("No se pudo validar el usuario. Por favor, inicia sesión nuevamente.")
      setShowAlert(true)
      return
    }

    try {
      const response = await agregarProductoAlCarrito(user.id_usuario, id_producto, 1, token)

      if (response.success) {
        // En lugar de alert, mostrar el modal
        setAddedProduct(nombre)
        setModalOpen(true)
      } else {
        setAlertMessage(response.message || "No se pudo agregar el producto al carrito.")
        setShowAlert(true)
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error)
      setAlertMessage("Error al agregar al carrito. Por favor, intenta nuevamente.")
      setShowAlert(true)
    }
  }

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false)
      }, 1200) // Adjust the duration as needed

      return () => clearTimeout(timer)
    }
  }, [showAlert])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin h-10 w-10 border-4 border-[#0c2c4c] border-t-transparent rounded-full"></div>
          <p className="text-lg font-medium text-gray-600">Cargando productos destacados...</p>
        </div>
      </div>
    )
  }

  if (topSellers.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center max-w-md px-4">
          <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl font-medium text-gray-700 mb-2">No hay productos destacados disponibles</p>
          <p className="text-gray-500">Vuelve a revisar más tarde para ver nuestros productos destacados.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      {/* Estilos para la animación */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slideIn {
            animation: slideIn 0.3s ease-out forwards;
          }
        `,
        }}
      />

      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="relative mb-12">
          <h1 className="text-4xl font-bold text-center text-[#0c2c4c] mb-3">Productos Destacados</h1>
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-[#0c2c4c] rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {topSellers.map((product) => (
            <div
              key={product.id_producto}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-200"
            >
              <img
                src={product.imagen_url || "/placeholder.svg"}
                alt={product.nombre}
                className="w-full h-48 object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=192&width=400"
                }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#0c2c4c] mb-1">{product.nombre}</h3>
                <p className="text-gray-600 font-medium">${Number.parseFloat(product.precio).toFixed(2)}</p>
                <button
                  className="mt-4 w-full bg-[#0c2c4c] text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-[#1a4b7f] transition"
                  aria-label={`Agregar ${product.nombre} al carrito`}
                  onClick={() => handleAddToCart(product.id_producto, product.nombre)}
                >
                  <ShoppingCart size={20} />
                  <span>Agregar al carrito</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showAlert && (
        <div className="fixed bottom-4 right-4 bg-red-200 border border-red-500 text-red-700 px-4 py-3 rounded">
          {alertMessage}
        </div>
      )}

      {/* Modal de notificación */}
      <CartNotificationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName={addedProduct} />
    </div>
  )
}

export default TopCart
