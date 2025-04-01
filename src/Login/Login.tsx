"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../api/auth";
import Carousel from "./Carousel";
import Logo from "../assets/logo.svg";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  // Estados para los inputs del formulario
  const [correo, setCorreo] = useState(""); // Cambiado de usuario a correo
  const [contraseña, setContraseña] = useState(""); // Cambiado de password a contraseña

  // Función de manejo del submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (!correo || !contraseña) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Llamada a la API de login
    const datos = { correo, contraseña }; // Cambiado para que coincida con lo esperado por iniciarSesion

    try {
      const response = await iniciarSesion(datos);

      if (response.success) {
        // Guardar el token de acceso (puedes guardarlo en localStorage o contexto)
        localStorage.setItem("token", response.token);
        alert("¡Ingreso exitoso!");
        navigate("/"); // Redirige a la página principal o donde desees
      } else {
        alert(response.message || "Error al iniciar sesión.");
      }
    } catch (error) {
      console.error(error);
      alert("Error al intentar iniciar sesión.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#0c2c4c] to-[#1a4b7f]">
      <div className="text-white p-4 flex items-center">
        <Link
          to="/"
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Iniciar Sesión</h2>
              <img
                src={Logo || "/placeholder.svg"}
                alt="Logo de la empresa"
                className="w-32 md:w-40 mx-auto my-4"
              />
              <div className="text-sm md:text-base">
                <p>¿Aún no tienes una cuenta?</p>
                <Link to="/registration" className="underline hover:text-[#0c2c4c]">
                  Registrarse
                </Link>
              </div>
            </div>

            <div className="w-full my-6">
              <div className="space-y-6">
                <input
                  name="correo"
                  id="correo"
                  value={correo} // Cambiado de usuario a correo
                  onChange={(e) => setCorreo(e.target.value)} // Cambiado de setUsuario a setCorreo
                  placeholder="Correo"
                  className="border-b-2 border-[#efeeec] w-full py-2 px-2 outline-none focus:border-[#0c2c4c] rounded"
                />
                <input
                  name="contraseña"
                  id="contraseña"
                  type="password"
                  value={contraseña} // Cambiado de password a contraseña
                  onChange={(e) => setContraseña(e.target.value)} // Cambiado de setPassword a setContraseña
                  placeholder="Contraseña"
                  className="border-b-2 border-[#efeeec] w-full py-2 px-2 outline-none focus:border-[#0c2c4c] rounded"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="bg-[#dbe4e5] hover:bg-[#bbbbc3] w-full max-w-xs text-[#1a4b7f] rounded-xl p-2 px-4 mb-4 font-semibold text-xl transition-colors"
              >
                Entrar
              </button>
              <a
                href=""
                className="text-sm md:text-base underline hover:text-[#0c2c4c]"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;