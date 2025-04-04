function Footer() {
    return (
      <footer className="bg-white text-[#0c2c4c] py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} Mi Tienda. Todos los derechos reservados.
            </p>
          </div>
  
          <div className="flex space-x-4">
            <a href="/terms" className="text-sm hover:underline">
              Términos y Condiciones
            </a>
            <a href="/privacy" className="text-sm hover:underline">
              Política de Privacidad
            </a>
            <a href="/contact" className="text-sm hover:underline">
              Contacto
            </a>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;