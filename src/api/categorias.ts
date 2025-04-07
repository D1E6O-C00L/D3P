// User/api/categorias.ts
import axios from "axios";

export const obtenerCategorias = async () => {
  const res = await axios.get("https://d3p-backend.onrender.com/api/categorias");
  return res.data.data;
};

export const obtenerProductosPorCategoria = async (id_categoria: string) => {
  const res = await axios.get(`https://d3p-backend.onrender.com/api/categorias/categoria/${id_categoria}`);
  return res.data.data;
};

// --- FUNCIONES PARA ADMIN DE CATALOGO, YA QUE LO DE CATEGORIA ES SIMILAR A CATALOGO---
export const crearCategoria = async (categoria: any, token: string) => {
  const res = await axios.post("https://d3p-backend.onrender.com/api/categorias", categoria, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const actualizarCategoria = async (id: number, updates: any, token: string) => {
  const res = await axios.put(`https://d3p-backend.onrender.com/api/categorias/${id}`, updates, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const eliminarCategoria = async (id: number, token: string) => {
  const res = await axios.delete(`https://d3p-backend.onrender.com/api/categorias/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};