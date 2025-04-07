import logo from "../../assets/logo.svg";
import Icono from "../../assets/ICONO USUARIO.svg";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Mail, LogOut, Search, Menu, X } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useState, useEffect, useRef } from "react";

function Header() {
  const { user, logout } = useUser();
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
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="top-0 left-0 w-full bg-white text-[#0c2c4c] flex items-center py-4 px-4 z-50 border-b-[10px] border-[#0c2c4c] shadow-md min-h-[70px]">
      {/* Logo */}
      <div className="flex-none w-24 md:w-36 lg:w-48">
        <Link to={"/"}>
          <img src={logo} alt="Logo de D3P" />
        </Link>
      </div>

      {/* Botón de hamburguesa solo visible en móvil */}
      <button
        onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
        className="ml-2 p-1 md:hidden rounded-md hover:bg-gray-100"
        aria-label={isNavMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
      >
        {isNavMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Menú de navegación - Inicio, Categorías, Top Sellers */}
      <div
        className={`${
          isNavMenuOpen ? "flex" : "hidden"
        } md:flex flex-grow justify-start absolute md:relative top-[70px] left-0 bg-white w-full md:w-auto md:top-auto p-4 md:p-0 shadow-md md:shadow-none z-50`}
      >
        <div className="px-2 py-1 rounded-lg w-full md:w-auto">
          <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm sm:text-base md:text-lg lg:text-xl font-bold uppercase">
            <li>
              <Link to="/" className="hover:text-gray-400 block py-2 md:py-0">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/Categories" className="hover:text-gray-400 block py-2 md:py-0">
                Categorías
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 block py-2 md:py-0" aria-label="Ver los productos más vendidos">
                Top Sellers
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Parte derecha - Buscador, Carrito y Usuario */}
      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        {/* Buscador para pantallas medianas y grandes */}
        <div className="relative hidden sm:block sm:w-40 md:w-60 lg:w-80">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full text-[#0c2c4c] p-2 pl-10 border-2 border-[#0c2c4c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c2c4c] transition duration-300"
            aria-label="Buscar productos"
          />
          <Search className="absolute left-3 top-2 text-gray-500" />
        </div>

        {/* Botón de búsqueda para móvil que despliega el campo de búsqueda */}
        <div className="sm:hidden relative" ref={searchRef}>
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 hover:bg-gray-100 rounded-md"
            aria-label="Abrir campo de búsqueda"
          >
            <Search className="w-6 h-6" />
          </button>

          {/* Campo de búsqueda desplegable en móvil */}
          {isSearchOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg p-2 z-10">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full text-[#0c2c4c] p-2 pl-10 border-2 border-[#0c2c4c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c2c4c] transition duration-300"
                  autoFocus
                  aria-label="Buscar productos"
                />
                <Search className="absolute left-3 top-2 text-gray-500" />
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
          <ShoppingBag className="w-8 h-8 md:w-10 md:h-10 cursor-pointer hover:opacity-80 transition" />
        </Link>

        {/* Icono de usuario */}
        {user ? (
          <div className="relative" ref={menuRef}>
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer"
              aria-label="Abrir menú de usuario"
            >
              <img src={Icono} className="w-10 h-10 md:w-12 md:h-12 hover:opacity-80 transition" alt="Usuario" />
            </div>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-10 text-sm">
                <div className="flex items-center space-x-3 pb-3 border-b border-gray-100">
                  <User className="h-6 w-6 text-[#0c2c4c]" />
                  <p className="font-semibold">{user.nombre}</p>
                </div>

                <div className="flex items-center mt-2 mb-3">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <p className="text-gray-500">{user.correo}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-2 w-full bg-[#0c2c4c] hover:bg-[#1a4b7f] text-white py-2 px-3 rounded-md text-sm flex items-center justify-center"
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/Login" aria-label="Iniciar sesión">
            <img src={Icono} className="w-10 h-10 md:w-12 md:h-12 cursor-pointer hover:opacity-80 transition" alt="Usuario" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;