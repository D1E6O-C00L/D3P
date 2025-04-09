import axios from "axios";

const API_URL = "https://d3p-backend.onrender.com/api/carrito";

// Obtener el carrito de un usuario con los productos
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

// Actualizar la cantidad de un producto en el carrito
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

// **Nueva función**: Agregar un producto al carrito
export const agregarProductoAlCarrito = async (
  id_usuario: number,
  id_producto: number,
  cantidad: number,
  token: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/${id_usuario}/productos`,
      { id_producto, cantidad },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    throw error;
  }
};