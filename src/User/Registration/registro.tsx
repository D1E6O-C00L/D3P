import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrarUsuario } from "../../api/auth";
import { FiArrowLeft } from "react-icons/fi";
import { Eye, EyeOff } from "lucide-react";
import ModalAlert from "../../Modal/ModalAlert"; // asegúrate que exista

const Registro = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const mostrarAlerta = (msg: string) => {
    setAlertMessage(msg);
    setShowAlert(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !apellido || !correo || !contraseña || !direccion || !confirmarContraseña) {
      return mostrarAlerta("Todos los campos son obligatorios.");
    }

    if (contraseña !== confirmarContraseña) {
      return mostrarAlerta("Las contraseñas no coinciden.");
    }

    try {
      const datos = { nombre, apellido, correo, contraseña, direccion };
      const response = await registrarUsuario(datos);

      if (response.success) {
        navigate("/login");
      } else {
        mostrarAlerta(response.message || "Error al registrar usuario.");
      }
    } catch (error) {
      console.error(error);
      mostrarAlerta("Error al registrar usuario");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0c2c4c] to-[#1a4b7f] px-4">
      <div className="absolute top-4 left-4 text-white">
        <Link
          to="/login"
          className="flex items-center text-white hover:text-gray-300 transition"
        >
          <FiArrowLeft className="h-6 w-6 mr-2" />
          <span className="font-medium">Regresar</span>
        </Link>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#0c2c4c] text-center mb-6">
          Crear cuenta
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input placeholder="Nombre" className="w-full text-[#0c2c4c] px-4 py-2 border border-gray-300 rounded-md" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <input placeholder="Apellido" className="w-full text-[#0c2c4c] px-4 py-2 border border-gray-300 rounded-md" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          <input placeholder="Dirección" className="w-full text-[#0c2c4c] px-4 py-2 border border-gray-300 rounded-md" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          <input placeholder="Correo electrónico" type="email" className="w-full text-[#0c2c4c] px-4 py-2 border border-gray-300 rounded-md" value={correo} onChange={(e) => setCorreo(e.target.value)} />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="Contraseña"
              className="w-full text-[#0c2c4c] px-4 py-2 border border-gray-300 rounded-md pr-10"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmarContraseña}
              onChange={(e) => setConfirmarContraseña(e.target.value)}
              placeholder="Confirmar Contraseña"
              className="w-full text-[#0c2c4c] px-4 py-2 border border-gray-300 rounded-md pr-10"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0c2c4c] text-white font-bold py-2 rounded-md hover:bg-[#1a4b7f] transition"
          >
            Registrarse
          </button>
        </form>
      </div>

      {showAlert && (
        <ModalAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default Registro;
