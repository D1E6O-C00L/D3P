import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Carousel from "./Carousel";
import { ArrowLeft, EyeOff, Eye } from "lucide-react";
import { useUser } from "../context/UserContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { iniciarSesion } from "../../api/auth";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";
import { BASE_CLOUDINARY } from "../../assets/constants/cloudinary";

const Logo = `${BASE_CLOUDINARY}/v1751579321/logo_igthyq.svg`;
const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITEKEY as string;

function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");

  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const validarDominio = (email: string) =>
    /^[\w-.]+@(gmail\.com|upqroo\.edu\.mx)$/i.test(email);

  const mostrarAlerta = (mensaje: string, tipo: "error" | "warning" | "success" = "error") => {
    Swal.fire({
      title: mensaje,
      icon: tipo,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#1a4b7f",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!correo || !contraseña) {
      return mostrarAlerta("Por favor, completa todos los campos.", "warning");
    }

    if (!validarDominio(correo)) {
      return mostrarAlerta("Solo se permiten correos @gmail.com o @upqroo.edu.mx", "warning");
    }

    if (!captchaToken) {
      return mostrarAlerta("Por favor, verifica el reCAPTCHA.", "warning");
    }

    try {
      setLoading(true);
      const response = await iniciarSesion({ correo, contraseña, captchaToken });

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
        mostrarAlerta(response.message || "Error al intentar iniciar sesión.");
        recaptchaRef.current?.reset();
        setCaptchaToken("");
      }
    } catch (error) {
      mostrarAlerta("Error al intentar iniciar sesión.");
      recaptchaRef.current?.reset();
      setCaptchaToken("");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="relative w-24 h-24 mb-4">
          <div className="absolute inset-0 border-4 border-t-transparent border-gray-300 rounded-full animate-spin" />
          <div className="absolute inset-3 bg-[#1a4b7f] rounded-full animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
            D3P
          </div>
        </div>
        <p className="text-[#0c2c4c] text-xl font-semibold mt-2">Cargando…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fa] flex flex-col">
      <header className="p-4">
        <Link
          to="/"
          className="flex items-center text-[#0c2c4c] hover:text-gray-600 transition"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-medium">Regresar</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-52 xs:h-64 md:h-auto">
            <Carousel />
          </div>

          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col items-center text-[#1a4b7f]">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Iniciar Sesión</h2>
            <img src={Logo} alt="Logo D3P" className="w-28 md:w-32 mb-3" />

            <p className="text-sm md:text-base mb-6">
              ¿Aún no tienes cuenta?{" "}
              <Link to="/registration" className="underline hover:text-[#0c2c4c]">
                Registrarse
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <input
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full border-b-2 border-gray-200 focus:border-[#0c2c4c] py-2 px-2 outline-none"
              />

              <div className="relative">
                <input
                  type={mostrarContraseña ? "text" : "password"}
                  placeholder="Contraseña"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  className="w-full border-b-2 border-gray-200 focus:border-[#0c2c4c] py-2 px-2 pr-10 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setMostrarContraseña(!mostrarContraseña)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#1a4b7f]"
                >
                  {mostrarContraseña ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <ReCAPTCHA
                sitekey={SITE_KEY}
                ref={recaptchaRef}
                onChange={(tok) => setCaptchaToken(tok || "")}
                className="mx-auto"
              />

              <button
                disabled={!captchaToken}
                className="w-full bg-[#0c2c4c] hover:bg-[#133d6b] text-white rounded-lg py-2 font-semibold transition disabled:opacity-50"
              >
                Entrar
              </button>
            </form>

            <div className="w-full mt-6 flex justify-center">
              <div className="w-full max-w-xs">
                <GoogleLogin
                  onSuccess={({ credential }) => {
                    if (!credential) {
                      return mostrarAlerta("No se pudo obtener el token de Google.");
                    }

                    const decoded: any = jwtDecode(credential);
                    const email = decoded.email;

                    if (!validarDominio(email)) {
                      return mostrarAlerta("Solo se permiten correos @gmail.com o @upqroo.edu.mx");
                    }

                    localStorage.setItem("token", credential);
                    setUser({
                      id_usuario: decoded.sub,
                      nombre: decoded.name,
                      correo: email,
                      rol: "usuario",
                    });
                    navigate("/");
                  }}
                  onError={() => mostrarAlerta("Error en el login de Google")}
                  useOneTap
                  shape="pill"
                  theme="filled_blue"
                  size="large"
                />
              </div>
            </div>

            <Link
              to="/reset-password"
              className="underline hover:text-[#0c2c4c] text-sm mt-6"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
