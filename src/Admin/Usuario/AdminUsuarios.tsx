// src/Admin/Usuario/AdminUsuarios.tsx
"use client"

import { useEffect, useState } from "react"
import { Search, Loader, Trash2, UserCircle, Shield, Users } from "lucide-react"
import Swal from "sweetalert2"
import { obtenerUsuarios, darDeBajaUsuario } from "../../api/auth" // Asegúrate de tener estas funciones

export interface UsuarioDTO {
  id_usuario?: number
  nombre: string
  correo: string
  contraseña: string
  direccion?: string
  rol?: "usuario" | "admin"
}

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState<UsuarioDTO[]>([])
  const [filtered, setFiltered] = useState<UsuarioDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchUsuarios = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("admin_token")
      if (!token) return
      const data = await obtenerUsuarios(token)
      setUsuarios(data)
      setFiltered(data)
    } catch (error) {
      console.error("Error al cargar usuarios:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filteredResults = usuarios.filter(
      (u) => u.nombre.toLowerCase().includes(term.toLowerCase()) || u.correo.toLowerCase().includes(term.toLowerCase()),
    )
    setFiltered(filteredResults)
  }

  const handleDarDeBaja = async (id: number) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Este usuario será dado de baja.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, dar de baja",
      cancelButtonText: "Cancelar",
    })
    if (confirm.isConfirmed) {
      try {
        const token = localStorage.getItem("admin_token")
        await darDeBajaUsuario(id, token as string)
        Swal.fire("Usuario dado de baja", "", "success")
        fetchUsuarios() // Recargar lista
      } catch (error) {
        console.error("Error al dar de baja:", error)
        Swal.fire("Error", "No se pudo dar de baja al usuario", "error")
      }
    }
  }

  useEffect(() => {
    fetchUsuarios()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-2">Gestión de Usuarios</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Usuarios</p>
                <p className="text-2xl font-bold text-slate-800">{usuarios.length}</p>
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-slate-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Usuarios Estándar</p>
                <p className="text-2xl font-bold text-blue-600">{usuarios.filter((u) => u.rol === "usuario").length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <UserCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Administradores</p>
                <p className="text-2xl font-bold text-indigo-600">{usuarios.filter((u) => u.rol === "admin").length}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Buscar por nombre o correo..."
              className="block w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 transition-all duration-200"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="py-16 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <Loader className="w-6 h-6 text-blue-600 animate-spin" />
              </div>
              <p className="text-slate-600 font-medium">Cargando usuarios...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full mb-4">
                <Users className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">No se encontraron usuarios</p>
              <p className="text-slate-400 text-sm mt-1">Intenta con otros términos de búsqueda</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Correo</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Dirección</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Rol</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filtered.map((usuario, index) => (
                    <tr
                      key={usuario.id_usuario}
                      className={`hover:bg-slate-50 transition-colors duration-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-700">#{usuario.id_usuario}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {usuario.nombre.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-slate-900">{usuario.nombre}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-700">{usuario.correo}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-700">
                          {usuario.direccion || <span className="text-slate-400 italic">No especificada</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            usuario.rol === "admin"
                              ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                              : "bg-blue-100 text-blue-800 border border-blue-200"
                          }`}
                        >
                          {usuario.rol === "admin" ? (
                            <>
                              <Shield className="w-3 h-3 mr-1" />
                              Administrador
                            </>
                          ) : (
                            <>
                              <UserCircle className="w-3 h-3 mr-1" />
                              Usuario
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDarDeBaja(usuario.id_usuario as number)}
                          className="inline-flex items-center justify-center w-9 h-9 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all duration-200 hover:scale-105"
                          title="Dar de baja"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>
            Mostrando {filtered.length} de {usuarios.length} usuarios en total
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminUsuarios
