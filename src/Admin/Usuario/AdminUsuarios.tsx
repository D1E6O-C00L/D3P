"use client"

import { useEffect, useState } from "react"
import { Search, Loader, UserCircle, Shield, Users, Eye, EyeOff, RotateCcw } from "lucide-react"
import Swal from "sweetalert2"
import { obtenerUsuarios, toggleActivoUsuario, cambiarRolUsuario } from "../../api/auth" // Asegúrate de tener estas funciones

export interface UsuarioDTO {
  id_usuario?: number
  nombre: string
  correo: string
  contraseña: string
  direccion?: string
  rol?: "usuario" | "admin"
  activo: number
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
      (u: UsuarioDTO) =>
        u.nombre.toLowerCase().includes(term.toLowerCase()) || u.correo.toLowerCase().includes(term.toLowerCase()),
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
        if (!token) return Swal.fire("Error", "Token no disponible", "error")
        const response = await toggleActivoUsuario(id, false, token) // Desactivar el usuario
        if (response.success) {
          Swal.fire("Usuario dado de baja", "", "success")
          fetchUsuarios() // Recargar lista
        } else {
          Swal.fire("Error", response.message || "No se pudo dar de baja al usuario", "error")
        }
      } catch (error) {
        console.error("Error al dar de baja:", error)
        Swal.fire("Error", "No se pudo dar de baja al usuario", "error")
      }
    }
  }

  const toggleActivo = async (usuario: UsuarioDTO) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres ${usuario.activo ? "desactivar" : "activar"} este usuario?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: usuario.activo ? "Desactivar" : "Activar",
      cancelButtonText: "Cancelar",
    })
    if (confirm.isConfirmed) {
      try {
        const token = localStorage.getItem("admin_token")
        await toggleActivoUsuario(usuario.id_usuario as number, !usuario.activo, token as string)
        fetchUsuarios() // Recargar lista
      } catch (error) {
        console.error("Error al cambiar estado:", error)
        Swal.fire("Error", "No se pudo actualizar el estado del usuario", "error")
      }
    }
  }

const handleChangeRole = async (id: number, currentRole: string) => {
  const newRole = currentRole === "usuario" ? "admin" : "usuario"; // Cambia el rol entre "admin" y "usuario"
  try {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      Swal.fire("Error", "Token no disponible", "error"); // Si no hay token, muestra el error
      return;
    }

    const response = await cambiarRolUsuario(id, newRole, token);

    if (response.success) {
      fetchUsuarios(); // Recargar la lista de usuarios
    } else {
      // Si la respuesta no fue exitosa, mostrar error
    }
  } catch (error) {
    console.error("Error al cambiar el rol:", error);
    // Si hay un error en el proceso, mostrar mensaje de error
    Swal.fire("Error", "No se pudo cambiar el rol del usuario", "error");
  }
};


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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <p className="text-2xl font-bold text-blue-600">
                  {usuarios.filter((u: UsuarioDTO) => u.rol === "usuario").length}
                </p>
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
                <p className="text-2xl font-bold text-indigo-600">
                  {usuarios.filter((u: UsuarioDTO) => u.rol === "admin").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Usuarios Activos</p>
                <p className="text-2xl font-bold text-green-600">
                  {usuarios.filter((u: UsuarioDTO) => u.activo === 1).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
            <h3 className="text-lg font-semibold text-slate-800">Buscar Usuarios</h3>
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-500">
                {filtered.length} usuario{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
              </div>
              {/* Filtros rápidos */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFiltered(usuarios)}
                  className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                >
                  Todos ({usuarios.length})
                </button>
                <button
                  onClick={() => setFiltered(usuarios.filter((u: UsuarioDTO) => u.rol === "admin"))}
                  className="px-3 py-1 text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-full transition-colors"
                >
                  Admins ({usuarios.filter((u: UsuarioDTO) => u.rol === "admin").length})
                </button>
                <button
                  onClick={() => setFiltered(usuarios.filter((u: UsuarioDTO) => u.rol === "usuario"))}
                  className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full transition-colors"
                >
                  Usuarios ({usuarios.filter((u: UsuarioDTO) => u.rol === "usuario").length})
                </button>
              </div>
            </div>
          </div>
          <div className="relative max-w-md">
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
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Usuario</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Contacto</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Dirección</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Rol</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filtered.map((usuario, index) => (
                    <tr
                      key={usuario.id_usuario}
                      className={`hover:bg-slate-50 transition-colors duration-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                      } ${usuario.rol === "admin" ? "border-l-4 border-l-indigo-500" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div
                              className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                                usuario.rol === "admin"
                                  ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                                  : "bg-gradient-to-br from-blue-500 to-indigo-600"
                              }`}
                            >
                              {usuario.nombre.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-semibold text-slate-900">{usuario.nombre}</div>
                              {usuario.rol === "admin" && <Shield className="w-4 h-4 text-indigo-600" />}
                            </div>
                            <div className="text-xs text-slate-500">ID: #{usuario.id_usuario}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-700 font-medium">{usuario.correo}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-700">
                          {usuario.direccion ? (
                            <span className="bg-slate-100 px-2 py-1 rounded-md text-xs">{usuario.direccion}</span>
                          ) : (
                            <span className="text-slate-400 italic text-xs">No especificada</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center space-y-2">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                              usuario.rol === "admin"
                                ? "bg-indigo-100 text-indigo-800 border-indigo-200"
                                : "bg-blue-100 text-blue-800 border-blue-200"
                            }`}
                          >
                            {usuario.rol === "admin" ? (
                              <>
                                <Shield className="w-3 h-3 mr-1" />
                                Admin
                              </>
                            ) : (
                              <>
                                <UserCircle className="w-3 h-3 mr-1" />
                                Usuario
                              </>
                            )}
                          </span>
                          <button
                            onClick={() => handleChangeRole(usuario.id_usuario as number, usuario.rol || "usuario")}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200"
                            title="Cambiar rol"
                          >
                            <RotateCcw className="w-3 h-3 mr-1" />
                            Cambiar rol
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                            usuario.activo === 1
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-red-100 text-red-800 border-red-200"
                          }`}
                        >
                          {usuario.activo === 1 ? (
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
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => toggleActivo(usuario)}
                            className={`inline-flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 ${
                              usuario.activo
                                ? "bg-red-100 hover:bg-red-200 text-red-700 border border-red-200"
                                : "bg-green-100 hover:bg-green-200 text-green-700 border border-green-200"
                            }`}
                            title={usuario.activo ? "Desactivar usuario" : "Activar usuario"}
                          >
                            {usuario.activo ? (
                              <>
                                <EyeOff className="w-3 h-3 mr-1" />
                                Desactivar
                              </>
                            ) : (
                              <>
                                <Eye className="w-3 h-3 mr-1" />
                                Activar
                              </>
                            )}
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
