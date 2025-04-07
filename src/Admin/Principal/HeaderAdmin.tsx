import Icono from "../../assets/ICONO USUARIO.svg";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="top-0 left-0 w-full bg-white text-[#0c2c4c] flex items-center py-4 px-4 z-50 border-b-10 border-[#0c2c4c] shadow-md h-[70px]">
      {/* Logo */}
      <div className="flex-none w-12 md:w-24 lg:w-32">
        <img src={logo} alt="Logo" />
      </div>

      {/* Menú de navegación */}
      <div className="flex-grow flex justify-center overflow-x-auto">
        <div className="px-2 py-1 rounded-lg">
          <ul className="flex gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm md:text-lg lg:text-xl font-bold uppercase whitespace-nowrap">
            <li>
              <a href="/admin/pedidos" className="hover:text-gray-400 block px-1 py-1">
                Pedidos
              </a>
            </li>
            <li>
              <Link to={"/admin/productos"} className="hover:text-gray-400 block px-1 py-1">
                Productos
              </Link>
            </li>
            <li>
              <Link to={"/admin/catalogos"} className="hover:text-gray-400 block px-1 py-1">
                Catálogos
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Icono de usuario */}
      <div className="flex-none ml-2">
        <Link to="/login">
          <img
            src={Icono}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 cursor-pointer hover:opacity-80 transition"
            alt="Usuario"
          />
        </Link>
      </div>
    </div>
  );
}

export default Header;