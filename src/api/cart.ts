import axios from "axios";

const API_URL = "http://localhost:8888/api/carrito";

export const getCarritoUsuarioConProductos = async (id_usuario: number, token: string) => {
  const { data: carrito } = await axios.get(`${API_URL}/${id_usuario}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const { id_carrito } = carrito;

  const resProductos = await axios.get(`${API_URL}/${id_carrito}/productos`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return resProductos.data;
};

export const actualizarCantidadProducto = async (
  id_carrito: number,
  id_producto: number,
  nuevaCantidad: number,
  token: string
) => {
  await axios.post(
    `${API_URL}/${id_carrito}/productos`,
    { id_producto, cantidad: nuevaCantidad },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
