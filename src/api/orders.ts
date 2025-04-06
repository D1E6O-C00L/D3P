const API_URL = "http://localhost:8888/api/pedidos";

export async function getAllPedidos(token: string) {
  try {
    const res = await fetch(`${API_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    return [];
  }
}

export async function getDetallesPedido(id_pedido: number, token: string) {
  try {
    const res = await fetch(`${API_URL}/${id_pedido}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error al obtener detalles del pedido:", error);
    return null;
  }
}
