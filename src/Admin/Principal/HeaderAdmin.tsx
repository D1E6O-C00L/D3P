import Icono from "../../assets/ICONO USUARIO.svg";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="top-0 left-0 w-full bg-white text-[#0c2c4c] flex items-center py-4 px-4 z-50 border-b-10 border-[#0c2c4c] shadow-md h-[70px]">
     
      <div className="flex-none w-12 md:w-24 lg:w-32">
        <img src={logo} alt="Logo" />
      </div>

      
      <div className="flex-grow flex justify-center">
        <div className="px-2 py-1 rounded-lg">
          <ul className="flex gap-8 text-sm sm:text-base md:text-lg lg:text-xl font-bold uppercase">
            <li>
              <a href="/admin/pedidos" className="hover:text-gray-400">
                Pedidos
              </a>
            </li>
            <li>
              <Link to={"/admin/productos"} className="hover:text-gray-400">
              Productos
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Catalogos
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Link to="/login">
              <img
                src={Icono}
                className="w-10 h-10 md:w-12 md:h-12 cursor-pointer hover:opacity-80 transition"
                alt="Usuario"
              />
          </Link>
    </div>
  );
}

export default Header;
