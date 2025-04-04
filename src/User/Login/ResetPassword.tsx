"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";  // Asegúrate de que el carousel esté importado
import Logo from "../../assets/logo.svg"; // Puedes usar el logo
import { actualizarContraseña } from "../api/auth"; // Importa la función para actualizar la contraseña

const ResetPassword = () => {
  const navigate = useNavigate();

  // Estados para los inputs del formulario
  const [correo, setCorreo] = useState("");  // Correo electrónico
  const [nuevaContraseña, setNuevaContraseña] = useState("");  // Nueva contraseña

  // Manejo del submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!correo || !nuevaContraseña) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Llamada a la API para actualizar la contraseña
      const response = await actualizarContraseña({ correo, nuevaContraseña });

      if (response.success) {
        alert("Contraseña cambiada exitosamente!");
        navigate("/login");  // Redirige al login después de cambiar la contraseña
      } else {
        alert(response.message || "Error al cambiar la contraseña.");
      }
    } catch (error) {
      console.error(error);
      alert("Error al intentar cambiar la contraseña.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#0c2c4c] to-[#1a4b7f]">
      <div className="text-white p-4 flex items-center">
        <Link
          to="/login"
          className="flex items-center text-white hover:text-gray-300 transition"
        >
          <ArrowLeft className="h-6 w-6 mr-2" />
          <span className="font-medium">Regresar</span>
        </Link>
      </div>
      <div className="flex justify-center items-center max-h-screen w-full">
        <div className="flex flex-col md:flex-row w-[80%] rounded-xl overflow-hidden shadow-2xl">
          <div className="w-[90%] md:w-1/2 h-64 md:h-auto">
            <Carousel />
          </div>

          <div className="bg-white flex flex-col justify-between items-center text-[#1a4b7f] rounded-b-xl md:rounded-b-none md:rounded-r-xl w-[10%] p-8 md:w-1/2">
            <div className="text-center mb-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Recupera tu Contraseña
              </h2>
              <img
                src={Logo || "/placeholder.svg"}
                alt="Logo de la empresa"
                className="w-32 md:w-40 mx-auto my-4"
              />
            </div>

            <div className="w-full my-6">
              <div className="space-y-6">
                <input
                  name="correo"
                  id="correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="Correo"
                  className="border-b-2 border-[#efeeec] w-full py-2 px-2 outline-none focus:border-[#0c2c4c] rounded"
                />
                <input
                  name="nuevaContraseña"
                  id="nuevaContraseña"
                  type="password"
                  value={nuevaContraseña}
                  onChange={(e) => setNuevaContraseña(e.target.value)}
                  placeholder="Nueva Contraseña"
                  className="border-b-2 border-[#efeeec] w-full py-2 px-2 outline-none focus:border-[#0c2c4c] rounded"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="bg-[#dbe4e5] hover:bg-[#bbbbc3] w-full max-w-xs text-[#1a4b7f] rounded-xl p-2 px-4 mb-4 font-semibold text-xl transition-colors"
              >
                Cambiar Contraseña
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
