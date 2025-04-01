"use client";
import Carousel from "./Carousel";
import Logo from "../assets/logo.svg";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="felx felx-col h-screen bg-gradient-to-br from-[#0c2c4c] to-[#1a4b7f] ">
      <div className=" text-white p-4 flex items-center">
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Iniciar Sesión
              </h2>
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
                  name="usuario"
                  id="usuario"
                  placeholder="Usuario"
                  className="border-b-2 border-[#efeeec] w-full py-2 px-2 outline-none focus:border-[#0c2c4c] rounded"
                />
                <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Contraseña"
                  className="border-b-2 border-[#efeeec] w-full py-2 px-2 outline-none focus:border-[#0c2c4c] rounded"
                />
              </div>
            </div>

            <div className="text-center">
              <button className="bg-[#dbe4e5] hover:bg-[#bbbbc3] w-full max-w-xs text-[#1a4b7f] rounded-xl p-2 px-4 mb-4 font-semibold text-xl transition-colors">
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
