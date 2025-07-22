"use client"

import { useEffect, useState } from "react"
import { Search, Plus, Pencil } from "lucide-react"
import Swal from "sweetalert2"
import { obtenerCategorias, crearCategoria } from "../../api/categorias"
import Modal from "../../components/Admin/Modal"
import { actualizarCategoria } from "../../api/categorias"

interface Categoria {
  id: number
  nombre: string
  descripcion: string
}

const AdminCatalogo = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [filtered, setFiltered] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null)

  const fetchCategorias = async () => {
    try {
      setLoading(true)
      const data = await obtenerCategorias()
      setCategorias(data)
      setFiltered(data)
    } catch (error) {
      console.error("Error al cargar categorías", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filteredResults = categorias.filter((c) => c.nombre.toLowerCase().includes(term.toLowerCase()))
    setFiltered(filteredResults)
  }

  const abrirModal = (categoria: Categoria) => {
    setCategoriaSeleccionada(categoria)
    setOpenModal(true)
  }

  const cerrarModal = () => {
    setOpenModal(false)
    setCategoriaSeleccionada(null)
  }

  const guardarCambios = async () => {
    const token = localStorage.getItem("admin_token")
    if (!token || !categoriaSeleccionada) return

    try {
      if (categoriaSeleccionada.id === 0) {
        // NUEVA categoría
        await crearCategoria(
          {
            nombre: categoriaSeleccionada.nombre,
            descripcion: categoriaSeleccionada.descripcion,
          },
          token,
        )
        Swal.fire("Categoría creada", "Se agregó correctamente", "success")
      } else {
        // EDICIÓN
        await actualizarCategoria(
          categoriaSeleccionada.id,
          {
            nombre: categoriaSeleccionada.nombre,
            descripcion: categoriaSeleccionada.descripcion,
          },
          token,
        )
        Swal.fire("Categoría actualizada", "Se guardaron los cambios", "success")
      }
      cerrarModal()
      fetchCategorias()
    } catch (error) {
      console.error("Error al guardar:", error)
      Swal.fire("Error", "No se pudo guardar la categoría", "error")
    }
  }

  useEffect(() => {
    fetchCategorias()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-2">Catálogo de Categorías</h2>
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
              <button
                onClick={() => {
                  setCategoriaSeleccionada({ id: 0, nombre: "", descripcion: "" })
                  setOpenModal(true)
                }}
                className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 group shadow-lg shadow-blue-600/25"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="text-sm text-slate-500 font-medium">
              {filtered.length} categoría{filtered.length !== 1 ? "s" : ""} encontrada{filtered.length !== 1 ? "s" : ""}
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
                placeholder="Buscar categorías..."
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder-slate-400 bg-slate-50 focus:bg-white transition-all duration-200"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="py-16 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-slate-600 font-medium">Cargando categorías...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full mb-4">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">No se encontraron categorías</p>
              <p className="text-slate-400 text-sm mt-1">Intenta con otros términos de búsqueda</p>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((categoria) => (
                  <div
                    key={categoria.id}
                    className="group relative bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-slate-800 mb-2 truncate">{categoria.nombre}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{categoria.descripcion}</p>
                      </div>
                      <button
                        onClick={() => abrirModal(categoria)}
                        className="ml-3 flex items-center justify-center w-10 h-10 bg-slate-100 hover:bg-blue-100 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-105"
                        title="Editar"
                      >
                        <Pencil className="w-4 h-4 text-slate-600 hover:text-blue-600" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                        ID: {categoria.id}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 bg-white rounded-xl p-2 shadow-sm border border-slate-200">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                onClick={() => {}}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  i === 0 ? "bg-blue-600 shadow-lg shadow-blue-600/25" : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Modal */}
        <Modal
          open={openModal}
          onClose={cerrarModal}
          title={categoriaSeleccionada?.id === 0 ? "Nueva Categoría" : "Editar Categoría"}
          footer={
            <div className="flex gap-3 pt-6 border-t border-slate-200">
              <button
                onClick={cerrarModal}
                className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={guardarCambios}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25"
              >
                Guardar
              </button>
            </div>
          }
        >
          <div className="space-y-6">
            {categoriaSeleccionada?.id !== 0 && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">ID</label>
                <input
                  type="text"
                  value={categoriaSeleccionada?.id}
                  disabled
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-50 text-slate-500 font-medium"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre</label>
              <input
                type="text"
                value={categoriaSeleccionada?.nombre || ""}
                onChange={(e) =>
                  setCategoriaSeleccionada((prev) => (prev ? { ...prev, nombre: e.target.value } : null))
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 transition-all duration-200"
                placeholder="Ingresa el nombre de la categoría"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Descripción</label>
              <textarea
                value={categoriaSeleccionada?.descripcion || ""}
                onChange={(e) =>
                  setCategoriaSeleccionada((prev) => (prev ? { ...prev, descripcion: e.target.value } : null))
                }
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 transition-all duration-200 resize-none"
                placeholder="Describe la categoría..."
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default AdminCatalogo
