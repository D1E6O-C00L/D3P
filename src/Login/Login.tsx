"use client"
import Carousel from "./Carousel"
import Logo from "../assets/logo.svg"

function Login() {
  return (
    <div className="bg-gradient-to-br from-[#0c2c4c] to-[#1a4b7f] flex flex-col md:flex-row h-screen items-center justify-center px-4">
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <Carousel />
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <img src={Logo} alt="Logo de la empresa" className="w-28" />
        </div>

        <h2 className="text-2xl font-bold text-center text-[#0c2c4c]">Bienvenido</h2>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c2c4c] placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c2c4c] placeholder-gray-500"
          />
          <button
            type="submit"
            className="w-full bg-[#0c2c4c] text-white py-3 rounded-md font-semibold hover:bg-[#143c66] transition"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          ¿No tienes una cuenta? <a href="#" className="text-[#0c2c4c] font-medium hover:underline">Regístrate</a>
        </p>
      </div>
    </div>
  )
}

export default Login
