import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  User,
  Mail,
  LogOut,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import { useState, useEffect, useRef } from "react";
import { BASE_CLOUDINARY } from "../../assets/constants/cloudinary";
import { useCurrency } from "../../context/CurrencyContext";   // 👈  NEW

const logo = `${BASE_CLOUDINARY}/v1751579321/logo_igthyq.svg`;
const Icono = `${BASE_CLOUDINARY}/v1751579320/ICONO_USUARIO_fkqi9q.svg`;

function Header() {
  const { user, logout } = useUser();
  const { currency, setCurrency } = useCurrency();            // 👈  NEW
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
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
        <Link to={"/"}>
          <img src={logo} alt="Logo de D3P" className="h-10 md:h-20" />
        </Link>
      </div>

      {/* Botón de hamburguesa para móviles */}
      <button
        onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
        className="ml-1 p-1 md:hidden rounded-md hover:bg-gray-100"
        aria-label={
          isNavMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
        }
      >
        {isNavMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Navegación */}
      <div
        className={`${
          isNavMenuOpen ? "flex" : "hidden"
        } md:flex flex-grow justify-center absolute md:relative top-[48px] left-0 bg-transparent w-full md:w-auto md:top-auto p-2 md:p-0 shadow-md md:shadow-none z-50`}
      >
        <div className="px-1 py-1 rounded-lg w-full md:w-auto bg-transparent">
          <ul className="flex flex-col md:flex-row gap-2 md:gap-4 text-xs sm:text-sm md:text-base font-bold uppercase">
            <li>
              <Link to="/" className="hover:text-gray-400 block py-1 md:py-0">
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/Categories"
                className="hover:text-gray-400 block py-1 md:py-0"
              >
                Categorías
              </Link>
            </li>
            <li>
              <Link
                to="/TopSellers"
                className="hover:text-gray-400 block py-1 md:py-0"
              >
                Top Sellers
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Parte derecha */}
      <div className="flex items-center gap-1 sm:gap-2 ml-auto">
        {/* Buscador desktop */}
        <div className="relative hidden sm:block sm:w-44 md:w-64 lg:w-80">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full text-[#0c2c4c] p-1 pl-8 border border-[#0c2c4c] rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-[#0c2c4c] transition duration-300 h-7"
            aria-label="Buscar productos"
          />
          <Search className="absolute left-2 top-1.5 w-4 h-4 text-gray-500" />
        </div>

        {/* Buscador móvil */}
        <div className="sm:hidden relative" ref={searchRef}>
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-1 hover:bg-gray-100 rounded-md"
            aria-label="Abrir campo de búsqueda"
          >
            <Search className="w-5 h-5" />
          </button>
          {isSearchOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white/90 shadow-lg rounded-lg p-2 z-10">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full text-[#0c2c4c] p-1 pl-8 border border-[#0c2c4c] rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-[#0c2c4c] transition duration-300 h-7"
                  autoFocus
                  aria-label="Buscar productos"
                />
                <Search className="absolute left-2 top-1.5 w-4 h-4 text-gray-500" />
              </div>
            </div>
          )}
        </div>

        {/* Carrito */}
        <Link
          to="/carrito"
          className="flex items-center justify-center"
          aria-label="Ir al carrito de compras"
        >
          <ShoppingBag className="w-6 h-6 md:w-7 md:h-7 cursor-pointer hover:opacity-80 transition" />
        </Link>

        {/* Selector de moneda */}
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as "MXN" | "USD")}
          className="bg-[#0c2c4c] border border-white text-white text-xs px-1 rounded-md h-6 cursor-pointer"
          title="Moneda"
        >
          <option value="MXN">MXN</option>
          <option value="USD">USD</option>
        </select>

        {/* Usuario */}
        {user ? (
          <div className="relative" ref={menuRef}>
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer"
              aria-label="Abrir menú de usuario"
            >
              <img
                src={Icono}
                className="w-7 h-7 md:w-8 md:h-8 hover:opacity-80 transition"
                alt="Usuario"
              />
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
        ) : (
          <Link to="/Login" aria-label="Iniciar sesión">
            <img
              src={Icono}
              className="w-7 h-7 md:w-8 md:h-8 cursor-pointer hover:opacity-80 transition"
              alt="Usuario"
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
