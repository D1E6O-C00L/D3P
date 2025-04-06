// User/api/categorias.ts
import axios from "axios";

export const obtenerCategorias = async () => {
  const res = await axios.get("http://localhost:8888/api/categorias");
  return res.data.data;
};

export const obtenerProductosPorCategoria = async (id_categoria: string) => {
  const res = await axios.get(`http://localhost:8888/api/categorias/categoria/${id_categoria}`);
  return res.data.data;
};
