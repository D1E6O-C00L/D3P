import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../../api/auth";
import Carousel from "./Carousel";
import Logo from "../../assets/logo.svg";
import { ArrowLeft, EyeOff, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ModalAlert from "../../Modal/ModalAlert";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!correo || !contraseña) {
      setAlertMessage("Por favor, completa todos los campos.");
      setShowAlert(true);
      return;
    }

    try {
      setLoading(true);
      const response = await iniciarSesion({ correo, contraseña });
      if (response.success) {
        localStorage.setItem("token", response.token);
        setUser({
          id_usuario: response.usuario.id_usuario,
          nombre: response.usuario.nombre,
          correo: response.usuario.correo,
          rol: response.usuario.rol || "usuario",
        });

        navigate("/");
      } else {
        setAlertMessage(response.message || "Error al iniciar sesión.");
        setShowAlert(true);
      }
    } catch (error) {
      console.error(error);
      setAlertMessage("Error al intentar iniciar sesión.");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#0c2c4c] to-[#1a4b7f]">
        <div className="relative w-24 h-24 mb-4">
          <div className="absolute inset-0 border-4 border-t-transparent border-[#dbe4e5] rounded-full animate-spin"></div>
          <div className="absolute inset-3 bg-[#1a4b7f] rounded-full animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
            D3P
          </div>
        </div>
        <div className="text-white text-xl font-semibold mt-2 flex items-center">
          Cargando
          <span className="w-1.5 h-1.5 bg-white rounded-full ml-1 animate-bounce" style={{ animationDelay: "0ms" }}></span>
          <span className="w-1.5 h-1.5 bg-white rounded-full ml-1 animate-bounce" style={{ animationDelay: "200ms" }}></span>
          <span className="w-1.5 h-1.5 bg-white rounded-full ml-1 animate-bounce" style={{ animationDelay: "400ms" }}></span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0c2c4c] to-[#1a4b7f]">
      <div className="text-white p-4">
        <Link to="/" className="flex items-center text-white hover:text-gray-300 transition" aria-label="Regresar a la página principal">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-medium">Regresar</span>
        </Link>
      </div>

      <div className="flex-1 flex justify-center items-center p-4">
        <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-xl overflow-hidden shadow-2xl">
          <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-auto">
            <Carousel />
          </div>

          <div className="bg-white flex flex-col justify-between items-center text-[#1a4b7f] rounded-b-xl md:rounded-b-none md:rounded-r-xl w-full md:w-1/2 p-4 sm:p-6 md:p-8">
            <div className="text-center mb-4 w-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Iniciar Sesión</h2>
              <img
                src={Logo || "/placeholder.svg"}
                alt="Logo de la empresa"
                className="w-24 sm:w-32 md:w-40 mx-auto my-3 sm:my-4"
                loading="lazy"
              />
              <div className="text-sm md:text-base">
                <p>¿Aún no tienes una cuenta?</p>
                <Link to="/registration" className="underline hover:text-[#0c2c4c]">
                  Registrarse
                </Link>
              </div>
            </div>

            <div className="w-full my-4 sm:my-6">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <input
                  name="correo"
                  id="correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="Correo"
                  className="border-b-2 border-[#efeeec] w-full py-2 px-2 outline-none focus:border-[#0c2c4c] rounded"
                  aria-label="Correo electrónico"
                />
                <div className="relative">
                  <input
                    name="contraseña"
                    id="contraseña"
                    type={mostrarContraseña ? "text" : "password"}
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    placeholder="Contraseña"
                    className="border-b-2 border-[#efeeec] w-full py-2 px-2 pr-10 outline-none focus:border-[#0c2c4c] rounded"
                    aria-label="Contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarContraseña(!mostrarContraseña)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#1a4b7f]"
                    aria-label={mostrarContraseña ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {mostrarContraseña ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="bg-[#dbe4e5] hover:bg-[#bbbbc3] w-full text-[#1a4b7f] rounded-xl py-2 px-4 font-semibold text-lg sm:text-xl transition-colors"
                >
                  Entrar
                </button>
              </form>
            </div>

            <div className="text-center w-full">
              <Link to="/reset-password" className="text-sm md:text-base underline hover:text-[#0c2c4c]">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showAlert && <ModalAlert message={alertMessage} onClose={() => setShowAlert(false)} />}
    </div>
  );
}

export default Login;
