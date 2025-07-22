"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import { actualizarContraseña } from "../../api/auth";
import { BASE_CLOUDINARY } from "../../assets/constants/cloudinary";
import Swal from "sweetalert2";

const Logo = `${BASE_CLOUDINARY}/v1751579321/logo_igthyq.svg`;

const ResetPassword = React.memo(() => {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [mostrarNueva, setMostrarNueva] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const mostrarAlerta = (titulo: string, icono: "success" | "error" | "warning", redirigir?: boolean) => {
    Swal.fire({
      title: titulo,
      icon: icono,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#1a4b7f",
    }).then(() => {
      if (redirigir) navigate("/login");
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!correo || !nuevaContraseña || !confirmarContraseña) {
      mostrarAlerta("Por favor, completa todos los campos.", "warning");
      return;
    }

    if (nuevaContraseña !== confirmarContraseña) {
      mostrarAlerta("Las contraseñas no coinciden.", "error");
      return;
    }

    try {
      const response = await actualizarContraseña({ correo, nuevaContraseña });

      if (response.success) {
        mostrarAlerta("¡Contraseña cambiada exitosamente!", "success", true);
      } else {
        mostrarAlerta(response.message || "Error al cambiar la contraseña.", "error");
      }
    } catch (error) {
      console.error(error);
      mostrarAlerta("Error al intentar cambiar la contraseña.", "error");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#0c2c4c] to-[#1a4b7f]">
      <div className="text-white p-4 flex items-center">
        <Link to="/login" className="flex items-center text-white hover:text-gray-300 transition">
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Recupera tu Contraseña</h2>
              <img
                src={Logo || "/placeholder.svg"}
                alt="Logo de la empresa"
                className="w-32 md:w-40 mx-auto my-4"
                loading="lazy"
              />
            </div>

            <form onSubmit={handleSubmit} className="w-full my-6 space-y-6">
              <input
                name="correo"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Correo"
                className="border-b-2 border-[#efeeec] w-full py-2 px-2 outline-none focus:border-[#0c2c4c] rounded"
              />

              <div className="relative">
                <input
                  name="nuevaContraseña"
                  id="nuevaContraseña"
                  type={mostrarNueva ? "text" : "password"}
                  value={nuevaContraseña}
                  onChange={(e) => setNuevaContraseña(e.target.value)}
                  placeholder="Nueva Contraseña"
                  className="border-b-2 border-[#efeeec] w-full py-2 px-2 pr-10 outline-none focus:border-[#0c2c4c] rounded"
                />
                <button
                  type="button"
                  onClick={() => setMostrarNueva(!mostrarNueva)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#1a4b7f]"
                >
                  {mostrarNueva ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <div className="relative">
                <input
                  name="confirmarContraseña"
                  id="confirmarContraseña"
                  type={mostrarConfirmar ? "text" : "password"}
                  value={confirmarContraseña}
                  onChange={(e) => setConfirmarContraseña(e.target.value)}
                  placeholder="Confirmar Contraseña"
                  className="border-b-2 border-[#efeeec] w-full py-2 px-2 pr-10 outline-none focus:border-[#0c2c4c] rounded"
                />
                <button
                  type="button"
                  onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#1a4b7f]"
                >
                  {mostrarConfirmar ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <button
                type="submit"
                className="bg-[#dbe4e5] hover:bg-[#bbbbc3] w-full max-w-xs text-[#1a4b7f] rounded-xl p-2 px-4 mb-4 font-semibold text-xl transition-colors"
              >
                Cambiar Contraseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ResetPassword;
