import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Registro() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Registro exitoso 🎉");
    navigate("/"); 
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0c2c4c] to-[#1a4b7f] px-4">
      
    <div className="absolute top-4 left-4 text-white">
        <Link
          to="/"
          className="flex items-center text-white hover:text-gray-300 transition"
        >
          <ArrowLeft className="h-6 w-6 mr-2" />
          <span className="font-medium">Regresar</span>
        </Link>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#0c2c4c] text-center mb-6">
          Crear cuenta
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              className="w-full text-[#0c2c4c] px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Juan"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              className="w-full text-[#0c2c4c] px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Pérez"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              type="text"
              className="w-full text-[#0c2c4c] px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Calle 123, Ciudad"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              className="w-full text-[#0c2c4c] px-4 py-2 border border-gray-300 rounded-md"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full text-[#0c2c4c] px-4 py-2 border border-gray-300 rounded-md"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0c2c4c] text-white font-bold py-2 rounded-md hover:bg-[#1a4b7f] transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
