import React, { useEffect, useState } from "react";
import { obtenerCategorias } from "../api/categorias";
import { Link } from "react-router-dom";

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

const CategoryList = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await obtenerCategorias();
        setCategorias(data);
        console.log("categorias:", data); // debug
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    fetchCategorias();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#0c2c4c]">Categorías</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categorias.map((cat) => (
          <Link
            key={cat.id}
            to={`/categorias/${cat.id}`} // FIX aquí
            className="border border-gray-300 p-4 rounded-md hover:shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold text-[#1a4b7f]">{cat.nombre}</h2>
            <p className="text-gray-600">{cat.descripcion}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
