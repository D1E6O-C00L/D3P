"use client"

import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { ArrowLeft, ShoppingCart, CheckCircle, X } from "lucide-react"
import { agregarProductoAlCarrito } from "../../api/cart"

// Definir la interfaz de Producto
interface Producto {
  id_producto: number
  nombre: string
  descripcion: string
  precio: number | string
  imagen_url: string
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
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
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

const ProductsByCategory = React.memo(() => {
  const { id_categoria } = useParams<{ id_categoria?: string }>()
  const [productos, setProductos] = useState<Producto[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Estado para el modal
  const [modalOpen, setModalOpen] = useState(false)
  const [addedProduct, setAddedProduct] = useState("")
  
  // Estado para la alerta de error
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  useEffect(() => {
    let isMounted = true

    const fetchProductos = async () => {
      if (!id_categoria) {
        setError("No se encontró la categoría seleccionada.")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const res = await axios.get(`http://localhost:8888/api/categorias/categoria/${id_categoria}`)
        if (isMounted) {
          setProductos(res.data.data || [])
          setError(null)
        }
      } catch (err) {
        console.error("Error al cargar productos:", err)
        setError("No se pudieron cargar los productos.")
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchProductos()

    return () => {
      isMounted = false
    }
  }, [id_categoria])

  const handleAddToCart = async (id_producto: number, nombre: string) => {
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("usuario") || "{}")

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

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#0c2c4c] to-[#1a4b7f] text-white">
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

      <h1 className="text-3xl font-bold text-center mb-10">Productos de la categoría</h1>

      {isLoading ? (
        <div className="flex justify-center items-center py-20" aria-live="polite">
          <span className="flex items-center gap-2">
            <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"></div>
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
                src={prod.imagen_url || "/placeholder.svg"}
                alt={`Imagen del producto ${prod.nombre}`}
                className="w-full h-48 object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=192&width=400"
                }}
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-[#1a4b7f] mb-1">{prod.nombre}</h2>
                <p className="text-sm text-gray-700 mb-2">{prod.descripcion}</p>
                <p className="font-semibold text-[#0c2c4c]">
                  ${Number.parseFloat(prod.precio as string).toFixed(2)} MXN
                </p>
                <button
                  className="mt-4 w-full bg-[#0c2c4c] hover:bg-[#1a4b7f] text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
                  onClick={() => handleAddToCart(prod.id_producto, prod.nombre)}
                  aria-label={`Agregar ${prod.nombre} al carrito`}
                >
                  <ShoppingCart size={20} />
                  <span>Agregar al carrito</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de notificación */}
      <CartNotificationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={addedProduct}
      />

      {/* Alerta de mensaje de error (parte inferior derecha) */}
      {showAlert && (
        <div className="fixed bottom-6 right-6 bg-red-200 text-red-700 px-4 py-3 rounded-md shadow-lg">
          {alertMessage}
        </div>
      )}
    </div>
  )
})

export default ProductsByCategory
