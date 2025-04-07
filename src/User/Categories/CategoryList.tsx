import React, { useEffect, useState, useCallback } from "react";
import { obtenerCategorias } from "../../api/categorias";
import { Link } from "react-router-dom";
import Header from "../ts/Header";
import {
  Grid,
  BookOpen,
  ShoppingBag,
  Coffee,
  Camera,
  Music,
  Code,
  Search,
  Loader,
} from "lucide-react";

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();

  if (name.includes("libro") || name.includes("educación")) return <BookOpen className="w-6 h-6" />;
  if (name.includes("tecnología") || name.includes("electrónica")) return <Code className="w-6 h-6" />;
  if (name.includes("música") || name.includes("audio")) return <Music className="w-6 h-6" />;
  if (name.includes("foto") || name.includes("imagen")) return <Camera className="w-6 h-6" />;
  if (name.includes("comida") || name.includes("bebida")) return <Coffee className="w-6 h-6" />;
  if (name.includes("ropa") || name.includes("moda")) return <ShoppingBag className="w-6 h-6" />;

  return <Grid className="w-6 h-6" />;
};

const CategoryList = React.memo(() => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchCategorias = async () => {
      setIsLoading(true);
      try {
        const data = await obtenerCategorias();
        setCategorias(data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const filteredCategorias = categorias.filter(
    (cat) =>
      cat.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c2c4c] to-[#1a4b7f] text-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Explora nuestras categorías</h1>
          <p className="max-w-2xl mx-auto mb-8">
            Encuentra productos y servicios organizados por categoría
          </p>

          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-white rounded-md leading-5 bg-transparent placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-white sm:text-sm"
              placeholder="Buscar categorías..."
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Buscar categorías"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20" aria-live="polite">
            <Loader className="animate-spin h-8 w-8 text-white" />
            <span className="ml-2">Cargando categorías...</span>
          </div>
        ) : (
          <>
            {filteredCategorias.length === 0 && (
              <div className="text-center py-16" aria-live="polite">
                <p className="text-white text-lg">
                  No se encontraron categorías que coincidan con tu búsqueda.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategorias.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/categorias/${cat.id}`}
                  className="group flex flex-col h-full overflow-hidden rounded-xl bg-white text-[#0c2c4c] border border-white/20 shadow-sm transition duration-300 hover:shadow-lg hover:-translate-y-1"
                  aria-label={`Ver productos de la categoría ${cat.nombre}`}
                >
                  <div className="flex items-center p-6 border-b border-[#1a4b7f]">
                    <div className="p-2 rounded-full bg-[#dbe4e5] text-[#1a4b7f] mr-4">
                      {getCategoryIcon(cat.nombre)}
                    </div>
                    <h2 className="text-xl font-bold group-hover:text-[#0c2c4c] transition">
                      {cat.nombre}
                    </h2>
                  </div>
                  <div className="p-6 flex-grow">
                    <p className="text-[#1a4b7f]">{cat.descripcion}</p>
                  </div>
                  <div className="px-6 py-3 bg-[#f0f4f8] text-right">
                    <span className="text-sm font-medium text-[#1a4b7f] group-hover:text-[#0c2c4c] flex items-center justify-end">
                      Ver productos
                      <svg
                        className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default CategoryList;