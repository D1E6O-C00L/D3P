import { Link } from "react-router-dom";
import { BASE_CLOUDINARY } from "../../assets/constants/cloudinary";
import { useState, useRef, useEffect } from "react";
import { User, LogOut, Mail, Menu, X } from "lucide-react";

const logo = `${BASE_CLOUDINARY}/v1751579321/logo_igthyq.svg`;
const Icono = `${BASE_CLOUDINARY}/v1751579320/ICONO_USUARIO_fkqi9q.svg`;

function HeaderAdmin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Simulación de usuario admin (puedes reemplazar por tu lógica real)
  const user = { nombre: "Administrador", correo: "admin@d3p.com" };

  const handleLogout = () => {
    // Aquí va tu lógica de logout
    window.location.href = "/login";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm text-[#0c2c4c] flex items-center py-1 px-2 h-[48px]">
      {/* Logo */}
      <div className="flex-none w-16 md:w-24 lg:w-28">
        <Link to="/admin/administrador-dashboard" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 md:h-20" />
        </Link>
      </div>

      {/* Botón de hamburguesa para móviles */}
      <button
        onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
        className="ml-1 p-1 md:hidden rounded-md hover:bg-gray-100"
        aria-label={isNavMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
      >
        {isNavMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Navegación */}
      <div
        className={`${
          isNavMenuOpen ? "flex" : "hidden"
        } md:flex flex-grow justify-center items-center absolute md:relative top-[48px] left-0 bg-transparent w-full md:w-auto md:top-auto p-2 md:p-0 shadow-md md:shadow-none z-50`}
      >
        <div className="px-1 py-1 rounded-lg w-full md:w-auto bg-transparent">
          <ul className="flex flex-col md:flex-row gap-2 md:gap-4 text-xs sm:text-sm md:text-base font-bold uppercase">
            <li>
              <Link to="/admin/Usuarios" className="hover:text-gray-400 block py-1 md:py-0">
                Usuarios
              </Link>
            </li>
            <li>
              <Link to="/admin/productos" className="hover:text-gray-400 block py-1 md:py-0">
                Productos
              </Link>
            </li>
            <li>
              <Link to="/admin/catalogos" className="hover:text-gray-400 block py-1 md:py-0">
                Categorías
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Parte derecha */}
      <div className="flex items-center gap-1 sm:gap-2 ml-auto">
        {/* Usuario */}
        <div className="relative" ref={menuRef}>
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="cursor-pointer"
            aria-label="Abrir menú de usuario"
          >
            <img src={Icono} className="w-7 h-7 md:w-8 md:h-8 hover:opacity-80 transition" alt="Usuario" />
          </div>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-3 z-10 text-xs">
              <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                <User className="h-5 w-5 text-[#0c2c4c]" />
                <p className="font-semibold truncate">{user.nombre}</p>
              </div>
              <div className="flex items-center mt-1 mb-2">
                <Mail className="h-4 w-4 mr-1 text-gray-500" />
                <p className="text-gray-500 truncate">{user.correo}</p>
              </div>
              <button
                onClick={handleLogout}
                className="mt-1 w-full bg-[#0c2c4c] hover:bg-[#1a4b7f] text-white py-1 px-2 rounded-md text-xs flex items-center justify-center"
                aria-label="Cerrar sesión"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderAdmin;