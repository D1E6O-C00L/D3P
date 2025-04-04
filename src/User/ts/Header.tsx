import logo from "../../assets/logo.svg";
import Icono from "../../assets/ICONO USUARIO.svg";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Mail, LogOut } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useState, useEffect, useRef } from "react";

function Header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null); 

  const handleLogout = () => {
    logout();
    navigate("/");
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
    <div className="top-0 left-0 w-full bg-white text-[#0c2c4c] flex items-center py-4 px-4 z-50 border-b-10 border-[#0c2c4c] shadow-md h-[70px]">
      <div className="flex-none w-12 md:w-24 lg:w-32">
        <Link to={"/"}>
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="flex-grow flex justify-center">
        <div className="px-2 py-1 rounded-lg">
          <ul className="flex gap-8 text-sm sm:text-base md:text-lg lg:text-xl font-bold uppercase">
            <li><Link to="/" className="hover:text-gray-400">Inicio</Link></li>
            <li><Link to="/Categories" className="hover:text-gray-400">Categorías</Link></li>
            <li><a href="#" className="hover:text-gray-400">Top Sellers</a></li>
          </ul>
        </div>
      </div>

      {/* Iconos de acciones */}
      <div className="flex items-center gap-4">
        <Link to="/carrito">
          <ShoppingBag className="w-8 h-8 md:w-10 md:h-10 cursor-pointer hover:opacity-80 transition" />
        </Link>

        {user ? (
          <div className="relative" ref={menuRef}>
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer"
            >
              <img
                src={Icono}
                className="w-10 h-10 md:w-12 md:h-12 hover:opacity-80 transition"
                alt="Usuario"
              />
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
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/Login">
            <img
              src={Icono}
              className="w-10 h-10 md:w-12 md:h-12 cursor-pointer hover:opacity-80 transition"
              alt="Usuario"
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;