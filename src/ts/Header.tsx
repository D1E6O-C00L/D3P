import logo from '../assets/logo.svg';
import Icono from '../assets/ICONO USUARIO.svg'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="top-0 left-0 w-full bg-white text-[#0c2c4c] flex items-center py-4 px-4 z-50 border-b-10 border-[#0c2c4c] shadow-md h-[70px]">

      {/* Logo */}
      <div className="flex-none w-12 md:w-24 lg:w-32">
        <img src={logo} alt="Logo" />
      </div>

      {/* Menú de navegación */}
      <div className="flex-grow flex justify-center">
        <div className="px-2 py-1 rounded-lg">
          <ul className="flex gap-8 text-sm sm:text-base md:text-lg lg:text-xl font-bold uppercase">
            <li><a href="/App" className="hover:text-gray-400">Inicio</a></li>
            <li><a href="#" className="hover:text-gray-400">Categoría</a></li>
            <li><a href="#" className="hover:text-gray-400">Top Sellers</a></li>
          </ul>
        </div>
      </div>

      {/* Icono de usuario */}
      <div className="flex-none w-12 md:w-24 lg:w-32 flex justify-end">
      <Link to="/Login">
        <img src={Icono} className="w-16 h-16 cursor-pointer hover:opacity-80 transition" />
      </Link>

      </div> 
    </div>
  );
}



export default Header;
