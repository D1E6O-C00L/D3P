"use client"

import { useEffect, useState } from "react"
import { Search, Pencil, Package, Eye, EyeOff } from "lucide-react"
import { getAllProducts, toggleProductoActivo } from "../../api/products"

interface Producto {
  id_producto: number
  nombre: string
  descripcion: string
  precio: number | string
  stock: number
  imagen_url: string
  categoria_nombre: string
  activo: boolean
}

const AdminProducts = () => {
  const [productos, setProductos] = useState<Producto[]>([])
  const [filtered, setFiltered] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSearch, setShowSearch] = useState(false)

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

  useEffect(() => {
    fetchProductos()
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
            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-500 font-medium">
                {filtered.length} producto{filtered.length !== 1 ? "s" : ""} encontrado
                {filtered.length !== 1 ? "s" : ""}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Package className="w-4 h-4" />
                <span className="font-medium">Total: {productos.length}</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              showSearch ? "max-h-20 opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"
            } overflow-hidden`}
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
                      className={`hover:bg-slate-50 transition-colors duration-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                      }`}
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
                            {producto.categoria_nombre && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                                {producto.categoria_nombre}
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
                          <button className="flex items-center justify-center w-9 h-9 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-all duration-200 hover:scale-105">
                            <Pencil className="w-4 h-4" />
                          </button>
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

        {/* Stats Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Productos Activos</p>
                <p className="text-2xl font-bold text-green-600">{productos.filter((p) => p.activo).length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Productos Inactivos</p>
                <p className="text-2xl font-bold text-red-600">{productos.filter((p) => !p.activo).length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <EyeOff className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Stock Total</p>
                <p className="text-2xl font-bold text-blue-600">{productos.reduce((acc, p) => acc + p.stock, 0)}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProducts
