"use client"

import { Clock, Package, Users, Settings, LayoutGrid } from "lucide-react"
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const currentDate = new Date().toLocaleString("es-MX", { dateStyle: "long", timeStyle: "short" })

  // Datos para las tarjetas de acceso rápido
  const quickAccessItems = [
    {
      title: "Usuarios",
      icon: <Users className="w-6 h-6" />,
      description: "Gestionar cuentas de usuario",
      color: "from-blue-500 to-blue-600",
      route: "/admin/usuarios", 
    },
    {
      title: "Categorías",
      icon: <LayoutGrid className="w-6 h-6" />,
      description: "Administrar categorías",
      color: "from-indigo-500 to-indigo-600",
      route: "/admin/catalogos", 
    },
    {
      title: "Productos",
      icon: <Package className="w-6 h-6" />,
      description: "Gestionar inventario",
      color: "from-purple-500 to-purple-600",
      route: "/admin/productos", 
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Panel de Administración</h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Bienvenido al centro de control de <span className="font-semibold text-blue-600">D3P</span>. Gestiona todos
            los aspectos de tu plataforma desde un solo lugar.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Welcome Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 md:mb-0">Bienvenido de nuevo</h2>
                <div className="flex items-center text-sm text-slate-500 bg-slate-100 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{currentDate}</span>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-600 mb-4">
                  Este espacio está diseñado exclusivamente para el equipo de gestión de
                  <span className="font-semibold text-blue-600"> D3P</span>.
                </p>
                <p className="text-slate-600">
                  Desde aquí podrás supervisar pedidos, administrar productos, revisar catálogos y controlar la
                  actividad del sistema. Utiliza las tarjetas de acceso rápido o el menú de navegación para acceder a
                  las diferentes secciones.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Sistema activo
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Base de datos conectada
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  API v2.1.0
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 md:p-8">
              <div className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                <h3 className="font-medium">Consejo del día</h3>
              </div>
              <p className="mt-2 text-slate-300 text-sm">
                Recuerda revisar regularmente los reportes de ventas para identificar tendencias y optimizar tu
                inventario según la demanda actual.
              </p>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Resumen del sistema</h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-slate-600">Usuarios registrados</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-4">
                    <LayoutGrid className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="text-slate-600">Categorías</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-4">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-slate-600">Productos activos</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Uso del sistema</span>
                  <span className="text-sm font-medium text-blue-600">78%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                    style={{ width: "78%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Acceso rápido</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {quickAccessItems.map((item, index) => (
              <Link to={item.route} key={index} className="block">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-300 cursor-pointer group h-full">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} D3P Admin Panel. Todos los derechos reservados.</p>
          <p className="mt-1">Versión 2.1.0</p>
        </div>
      </div>
    </div>
  )
}
