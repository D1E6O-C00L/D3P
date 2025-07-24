"use client"

import { useEffect, useState } from "react"
import { Search, Plus, Pencil, Eye, EyeOff, Package } from "lucide-react"
import Swal from "sweetalert2"
import { getAllProducts, toggleProductoActivo, createProduct, updateProduct } from "../../api/products"
import { obtenerCategorias } from "../../api/categorias" // Importar la función para obtener categorías
import Modal from "../../components/Admin/Modal"

interface Producto {
  id_producto: number
  nombre: string
  descripcion: string
  precio: number | string
  stock: number
  imagen_url: string
  categoria_id: number
  activo: boolean
}

interface Categoria {
  id_categoria: number
  nombre: string
}

const AdminProducts = () => {
  const [productos, setProductos] = useState<Producto[]>([])
  const [filtered, setFiltered] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null)
  const [categorias, setCategorias] = useState<Categoria[]>([]) // Estado para almacenar las categorías

  const fetchProductos = async () => {
    try {
      setLoading(true)
      const res = await getAllProducts()
      setProductos(res)
      setFiltered(res)
    } catch (err) {
      console.error("Error al cargar productos:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategorias = async () => {
    try {
      const res = await obtenerCategorias() // Llamada para obtener las categorías
      setCategorias(res) // Almacena las categorías en el estado
    } catch (err) {
      console.error("Error al cargar categorías:", err)
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const resultados = productos.filter((p) => p.nombre.toLowerCase().includes(term.toLowerCase()))
    setFiltered(resultados)
  }

  const toggleActivo = async (producto: Producto) => {
    const token = localStorage.getItem("admin_token")
    if (!token || token.length < 10) {
      alert("Token inválido. Inicia sesión como administrador.")
      return
    }
    try {
      const nuevoEstado = !producto.activo
      const res = await toggleProductoActivo(producto.id_producto, nuevoEstado, token)
      if (res.success) {
        await fetchProductos()
      } else {
        alert(res.message || "No se pudo actualizar el estado.")
      }
    } catch (err) {
      console.error("Error al cambiar estado activo:", err)
    }
  }

  const abrirModal = (producto: Producto | null) => {
    setProductoSeleccionado(producto)
    setOpenModal(true)
  }

  const cerrarModal = () => {
    setOpenModal(false)
    setProductoSeleccionado(null)
  }

const guardarCambios = async () => {
  const token = localStorage.getItem("admin_token")
  if (!token || !productoSeleccionado) return

  try {
    if (productoSeleccionado.id_producto === 0) {
      // Crear nuevo producto
      const res = await createProduct(
        {
          nombre: productoSeleccionado.nombre,
          descripcion: productoSeleccionado.descripcion,
          precio: productoSeleccionado.precio,
          stock: productoSeleccionado.stock,
          categoria_id: productoSeleccionado.categoria_id,
          imagen_url: productoSeleccionado.imagen_url,
        },
        token

      )
      console.log(res);
      if (res.success) {
        Swal.fire("Producto creado", "Se agregó correctamente", "success")
      } else {
        Swal.fire("Error", res.message || "No se pudo crear el producto", "error")
      }
    }
    cerrarModal()
    fetchProductos()
  } catch (error) {
    console.error("Error al guardar:", error)
    Swal.fire("Error", "No se pudo guardar el producto", "error")
  }
}




  useEffect(() => {
    fetchProductos()
    fetchCategorias() // Cargar categorías al iniciar
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-2">Gestión de Productos</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="flex items-center justify-center w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-200 group"
              >
                <Search className="w-5 h-5 text-slate-600 group-hover:text-slate-800" />
              </button>
            </div>
            <div className="text-sm text-slate-500 font-medium">
              {filtered.length} producto{filtered.length !== 1 ? "s" : ""} encontrado
            </div>
          </div>

          {/* Search Bar */}
          <div
            className={`transition-all duration-300 ease-in-out ${showSearch ? "max-h-20 opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"} overflow-hidden`}
          >
            <div className="relative max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder-slate-400 bg-slate-50 focus:bg-white transition-all duration-200"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="py-16 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-slate-600 font-medium">Cargando productos...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full mb-4">
                <Package className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">No se encontraron productos</p>
              <p className="text-slate-400 text-sm mt-1">Intenta con otros términos de búsqueda</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Producto</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Precio</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filtered.map((producto, index) => (
                    <tr
                      key={producto.id_producto}
                      className={`hover:bg-slate-50 transition-colors duration-200 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <img
                              src={producto.imagen_url || "/placeholder.svg?height=64&width=64&query=product"}
                              alt={producto.nombre}
                              className="w-16 h-16 object-cover rounded-xl border-2 border-slate-200 shadow-sm"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-slate-900 truncate">{producto.nombre}</h3>
                            <p className="text-sm text-slate-500 truncate max-w-xs">{producto.descripcion}</p>
                            {producto.categoria_id && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                                {producto.categoria_id}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-slate-900">
                          ${Number(producto.precio).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              producto.stock > 10
                                ? "bg-green-100 text-green-800"
                                : producto.stock > 0
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {producto.stock} unidades
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              producto.activo
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : "bg-red-100 text-red-800 border border-red-200"
                            }`}
                          >
                            {producto.activo ? (
                              <>
                                <Eye className="w-3 h-3 mr-1" />
                                Activo
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3 h-3 mr-1" />
                                Inactivo
                              </>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-3">
                           {/* <button
                            onClick={() => abrirModal(producto)}
                            className="flex items-center justify-center w-9 h-9 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-all duration-200 hover:scale-105"
                          >
                            <Pencil className="w-4 h-4" />
                          </button> */}
                          <button
                            onClick={() => toggleActivo(producto)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                              producto.activo
                                ? "bg-red-100 hover:bg-red-200 text-red-700 border border-red-200"
                                : "bg-green-100 hover:bg-green-200 text-green-700 border border-green-200"
                            }`}
                          >
                            {producto.activo ? "Desactivar" : "Activar"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

{/* Modal */}
<Modal
  open={openModal}
  onClose={cerrarModal}
  title={"Nuevo Producto"}
  footer={
    <div className="flex gap-3 pt-6 border-t border-slate-200">
      <button
        onClick={cerrarModal}
        className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-all duration-200"
      >
        Cancelar
      </button>
      <button
        onClick={guardarCambios} // Guardar solo para creación
        className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25"
      >
        Guardar
      </button>
    </div>
  }
>
  <div className="space-y-6">
    {/* Nombre */}
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre</label>
      <input
        type="text"
        value={productoSeleccionado?.nombre || ""}
        onChange={(e) =>
          setProductoSeleccionado((prev) => (prev ? { ...prev, nombre: e.target.value } : null))
        }
        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 transition-all duration-200"
        placeholder="Ingresa el nombre del producto"
      />
    </div>

    {/* Descripción */}
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">Descripción</label>
      <textarea
        value={productoSeleccionado?.descripcion || ""}
        onChange={(e) =>
          setProductoSeleccionado((prev) => (prev ? { ...prev, descripcion: e.target.value } : null))
        }
        rows={4}
        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 transition-all duration-200 resize-none"
        placeholder="Describe el producto..."
      />
    </div>

    {/* Precio */}
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">Precio</label>
      <input
        type="number"
        value={productoSeleccionado?.precio || ""}
        onChange={(e) =>
          setProductoSeleccionado((prev) => (prev ? { ...prev, precio: parseFloat(e.target.value) } : null))
        }
        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 transition-all duration-200"
        placeholder="Ingresa el precio del producto"
      />
    </div>

    {/* Stock */}
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">Stock</label>
      <input
        type="number"
        value={productoSeleccionado?.stock || ""}
        onChange={(e) =>
          setProductoSeleccionado((prev) => (prev ? { ...prev, stock: parseInt(e.target.value) } : null))
        }
        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 transition-all duration-200"
        placeholder="Cantidad en stock"
      />
    </div>

    {/* Categoría */}
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">Categoría</label>
      <select
        value={productoSeleccionado?.categoria_id || ""}
        onChange={(e) =>
          setProductoSeleccionado((prev) => (prev ? { ...prev, categoria_id: parseInt(e.target.value) } : null))
        }
        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 transition-all duration-200"
      >
        {categorias.map((categoria) => (
          <option key={categoria.id_categoria} value={categoria.id_categoria}>
            {categoria.nombre}
          </option>
        ))}
      </select>
    </div>

    {/* URL de Imagen */}
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">URL de Imagen</label>
      <input
        type="text"
        value={productoSeleccionado?.imagen_url || ""}
        onChange={(e) =>
          setProductoSeleccionado((prev) => (prev ? { ...prev, imagen_url: e.target.value } : null))
        }
        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 transition-all duration-200"
        placeholder="Ingresa la URL de la imagen del producto"
      />
    </div>
  </div>
</Modal>

      </div>
    </div>
  )
}

export default AdminProducts
