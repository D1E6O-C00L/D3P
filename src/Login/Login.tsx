"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../api/auth";
import Carousel from "./Carousel";
import Logo from "../assets/logo.svg";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";


function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser(); // USAMOS el contexto

<<<<<<< HEAD
  
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState(""); 

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
=======
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

>>>>>>> 418001b90c03e071f6c79f8f7e524641f95d6faf
    if (!correo || !contraseña) {
      alert("Por favor, completa todos los campos.");
      return;
    }

<<<<<<< HEAD
   
    const datos = { correo, contraseña }; 

=======
>>>>>>> 418001b90c03e071f6c79f8f7e524641f95d6faf
    try {
      const response = await iniciarSesion({ correo, contraseña });
      console.log("Respuesta del login:", response); // Para depurar

      if (response.success) {
<<<<<<< HEAD
        
=======
>>>>>>> 418001b90c03e071f6c79f8f7e524641f95d6faf
        localStorage.setItem("token", response.token);

        // 👉 Aquí seteamos el usuario en el contexto
        setUser({
          nombre: response.usuario.nombre,
          correo: response.usuario.correo,
          rol: response.usuario.rol || "usuario",
        });
        

        alert("¡Ingreso exitoso!");
<<<<<<< HEAD
        navigate("/"); 
=======
        navigate("/");
>>>>>>> 418001b90c03e071f6c79f8f7e524641f95d6faf
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
        <Link to="/" className="flex items-center text-white hover:text-gray-300 transition">
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
              <img src={Logo || "/placeholder.svg"} alt="Logo de la empresa" className="w-32 md:w-40 mx-auto my-4" />
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
<<<<<<< HEAD
                  value={correo} 
                  onChange={(e) => setCorreo(e.target.value)} 
=======
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
>>>>>>> 418001b90c03e071f6c79f8f7e524641f95d6faf
                  placeholder="Correo"
                  className="border-b-2 border-[#efeeec] w-full py-2 px-2 outline-none focus:border-[#0c2c4c] rounded"
                />
                <input
                  name="contraseña"
                  id="contraseña"
                  type="password"
<<<<<<< HEAD
                  value={contraseña} 
                  onChange={(e) => setContraseña(e.target.value)} 
=======
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
>>>>>>> 418001b90c03e071f6c79f8f7e524641f95d6faf
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

              <Link to="/reset-password" className="text-sm md:text-base underline hover:text-[#0c2c4c]">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;