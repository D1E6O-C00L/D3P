import { 
  Facebook, 
  Instagram, 
} from 'lucide-react';
import { PiTiktokLogo } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import logo from '../../assets/Marca.jpg'; 

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 text-[#0c2c4c] py-12 px-4 border-t border-gray-200">
      <div className="container mx-auto max-w-6xl">
        {/* Sección principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-10">
          {/* Columna 1: Información de la empresa */}
          <div className="col-span-1">
            <div className="flex items-center mb-6">
              <img src={logo} alt="Logo Mi Tienda" className="h-10 mr-3" />
              <h3 className="font-bold text-xl text-[#0c2c4c]">Mi Tienda</h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              Ofrecemos los mejores productos con la más alta calidad y servicio excepcional desde 2024.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://wa.me/+5219841201700" className="bg-white p-2 rounded-full shadow-sm text-gray-600 hover:text-green-500 hover:shadow-md transition-all duration-300" aria-label="WhatsApp">
                <FaWhatsapp size={20} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61572604645783" className="bg-white p-2 rounded-full shadow-sm text-gray-600 hover:text-blue-600 hover:shadow-md transition-all duration-300" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/divinedesignp/" className="bg-white p-2 rounded-full shadow-sm text-gray-600 hover:text-pink-500 hover:shadow-md transition-all duration-300" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@d3printt" className="bg-white p-2 rounded-full shadow-sm text-gray-600 hover:text-black hover:shadow-md transition-all duration-300" aria-label="TikTok">
                <PiTiktokLogo size={20} />
              </a>
              <a href="mailto:info@mitienda.com" className="bg-white p-2 rounded-full shadow-sm text-gray-600 hover:text-red-500 hover:shadow-md transition-all duration-300" aria-label="Email">
                <CiMail size={20} />
              </a>
            </div>
          </div>
          
          {/* Columna 2: Enlaces */}
          <div className="col-span-1">
            <h4 className="font-semibold text-[#0c2c4c] mb-6 text-lg border-b border-gray-200 pb-2">Nuestra Empresa</h4>
            <ul className="space-y-3">
              <li><a href="/about" className="text-gray-600 hover:text-[#0c2c4c] transition-colors text-sm">Sobre Nosotros</a></li>
              <li><a href="/careers" className="text-gray-600 hover:text-[#0c2c4c] transition-colors text-sm">Oportunidades</a></li>
              <li><a href="/blog" className="text-gray-600 hover:text-[#0c2c4c] transition-colors text-sm">Blog</a></li>
              <li><a href="/press" className="text-gray-600 hover:text-[#0c2c4c] transition-colors text-sm">Prensa</a></li>
            </ul>
          </div>
          
          {/* Columna 3: Enlaces legales */}
          <div className="col-span-1">
            <h4 className="font-semibold text-[#0c2c4c] mb-6 text-lg border-b border-gray-200 pb-2">Legal</h4>
            <ul className="space-y-3">
              <li><a href="/terms" className="text-gray-600 hover:text-[#0c2c4c] transition-colors text-sm">Términos y Condiciones</a></li>
              <li><a href="/privacy" className="text-gray-600 hover:text-[#0c2c4c] transition-colors text-sm">Política de Privacidad</a></li>
              <li><a href="/cookies" className="text-gray-600 hover:text-[#0c2c4c] transition-colors text-sm">Política de Cookies</a></li>
              <li><a href="/shipping" className="text-gray-600 hover:text-[#0c2c4c] transition-colors text-sm">Política de Envíos</a></li>
            </ul>
          </div>
          
          {/* Columna 4: Contacto */}
          <div className="col-span-1">
            <h4 className="font-semibold text-[#0c2c4c] mb-6 text-lg border-b border-gray-200 pb-2">Contacto</h4>
            <address className="not-italic text-sm text-gray-600">
              <p className="mb-3">Calle Principal 123</p>
              <p className="mb-3">Ciudad, CP 12345</p>
              <p className="mb-3">
                <span className="font-medium">Teléfono:</span> +00 123 456 789
              </p>
              <p className="mb-3">
                <span className="font-medium">Email:</span> info@mitienda.com
              </p>
            </address>
          </div>
        </div>
        
        {/* Línea divisoria */}
        <div className="border-t border-gray-200 pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© {currentYear} Mi Tienda. Todos los derechos reservados.</p>
            <div className="mt-4 md:mt-0">
              <p>Diseñado y desarrollado con <span className="text-red-500">♥</span> en México</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;