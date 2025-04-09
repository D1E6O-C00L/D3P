import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck, ArrowLeft } from "lucide-react";
import Logo from "../../assets/logo.svg"; // Usa tu logo aquí

const AdminLogin = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!correo || !contraseña) {
      alert("Por favor completa todos los campos.");
      return;
    }

    // Aquí deberías llamar tu endpoint de autenticación de admins
    alert("Login de administrador enviado correctamente");
    // Si es válido, redirige:
    // navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c2c4c] to-[#1a4b7f] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 md:p-8">
        <div className="flex flex-col items-center mb-6">
          <img src={Logo || "/placeholder.svg"} alt="Logo" className="w-24 h-24 mb-4" />
          <h1 className="text-2xl font-bold text-[#0c2c4c] text-center">Panel de Administrador</h1>
          <p className="text-sm text-gray-500 text-center">Inicia sesión para acceder al panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="correo" className="text-sm text-[#0c2c4c] font-medium block mb-1">
              Correo institucional
            </label>
            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-[#1a4b7f]"
              placeholder="admin@empresa.com"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="contraseña" className="text-sm text-[#0c2c4c] font-medium block mb-1">
              Contraseña
            </label>
            <input
              id="contraseña"
              type={mostrarContraseña ? "text" : "password"}
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-[#1a4b7f]"
              placeholder="********"
              required
            />
            <button
              type="button"
              onClick={() => setMostrarContraseña(!mostrarContraseña)}
              className="absolute right-3 top-9 text-[#1a4b7f]"
            >
              {mostrarContraseña ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0c2c4c] hover:bg-[#1a4b7f] text-white py-2 rounded-md font-semibold flex items-center justify-center gap-2 transition"
          >
            <ShieldCheck size={18} />
            Ingresar al Panel
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-[#1a4b7f] hover:underline hover:text-[#0c2c4c] flex items-center justify-center gap-1"
          >
            <ArrowLeft size={16} />
            Volver al sitio
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
