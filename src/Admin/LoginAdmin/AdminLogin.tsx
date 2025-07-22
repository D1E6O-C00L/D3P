import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck, ArrowLeft } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import { BASE_CLOUDINARY } from "../../assets/constants/cloudinary";
import { useAdmin } from "../../context/AdminContext";
import { iniciarSesion } from "../../api/auth";

const Logo = `${BASE_CLOUDINARY}/v1751579321/logo_igthyq.svg`;
const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITEKEY as string;

const validarCorreoAdmin = (email: string) => {
  return /^[\w-.]+@upqroo\.edu\.mx$/i.test(email) || /^admin@d3p\.com$/i.test(email);
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAdmin();
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!correo || !contraseña) {
      return Swal.fire("Campos incompletos", "Por favor completa todos los campos.", "warning");
    }

    if (!validarCorreoAdmin(correo)) {
      return Swal.fire("Correo no válido", "Solo se permiten correos institucionales.", "error");
    }

    if (!captchaToken) {
      return Swal.fire("Captcha requerido", "Por favor verifica el captcha.", "warning");
    }

    try {
      const response = await iniciarSesion({ correo, contraseña, captchaToken });

      if (!response.success) {
        throw new Error(response.message || "Error en inicio de sesión");
      }

      if (response.usuario.rol !== "admin") {
        return Swal.fire("Acceso denegado", "No tienes permisos de administrador", "error");
      }

      localStorage.setItem("admin_token", response.token);
      loginAdmin(response.token);

      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Has iniciado sesión correctamente.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/admin/administrador-dashboard");
    } catch (error: any) {
      console.error(error);
      Swal.fire("Error", error.message || "No se pudo iniciar sesión", "error");
      recaptchaRef.current?.reset();
      setCaptchaToken("");
    }
  };

  return (
  <div className="min-h-screen w-full bg-gradient-to-br from-[#0c2c4c] to-[#1a4b7f] flex items-center justify-center px-4">
    <div className="bg-white rounded-xl shadow-2xl h-screen w-screen flex flex-col md:flex-row overflow-hidden">
      {/* Imagen o ilustración decorativa */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-[#133d6b] p-6">
        <img
          src={Logo}
          alt="Logo decorativo"
          className="w-40 md:w-48"
        />
      </div>

      {/* Panel de Login */}
      <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="Logo" className="w-24 h-24 mb-4" />
          <h1 className="text-2xl md:text-3xl font-bold text-[#0c2c4c] text-center">
            Panel de Administrador
          </h1>
          <p className="text-sm text-gray-500 text-center">
            Inicia sesión para acceder al panel
          </p>
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
              className="text-[#0c2c4c] w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="admin@upqroo.edu.mx"
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
              className="text-[#0c2c4c] w-full border border-gray-300 rounded-md px-4 py-2 pr-10"
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

          <ReCAPTCHA
            sitekey={SITE_KEY}
            ref={recaptchaRef}
            onChange={(token) => setCaptchaToken(token || "")}
          />

          <button
            type="submit"
            className="w-full bg-[#0c2c4c] hover:bg-[#1a4b7f] text-white py-2 rounded-md font-semibold flex items-center justify-center gap-2 transition"
            disabled={!captchaToken}
          >
            <ShieldCheck size={18} />
            Ingresar al Panel
          </button>
        </form>

        <div className="w-full mt-6 flex justify-center">
          <div className="w-full max-w-xs">
            <GoogleLogin
              onSuccess={({ credential }) => {
                if (!credential) return;
                const decoded: any = jwtDecode(credential);
                if (!validarCorreoAdmin(decoded.email)) {
                  return Swal.fire("Correo no válido", "Solo se permiten correos institucionales.", "error");
                }

                localStorage.setItem("admin_token", credential);
                loginAdmin(credential);
                navigate("/admin/administrador-dashboard");
              }}
              onError={() => Swal.fire("Error", "Error en el login de Google", "error")}
              useOneTap
              shape="pill"
              theme="filled_blue"
              size="large"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-[#1a4b7f] hover:underline hover:text-[#0c2c4c] flex items-center justify-center gap-1"
          >
            <ArrowLeft size={16} />
            Ir al sitio web
          </button>
        </div>
      </div>
    </div>
  </div>
);

};

export default AdminLogin;
