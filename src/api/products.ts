const API_URL = "http://localhost:8888/api/productos";

export async function getAllProducts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

export async function getProductById(id: number) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return null;
  }
}

export async function toggleProductoActivo(id: number, activo: boolean, token: string) {
  try {
    const res = await fetch(`${API_URL}/${id}/estado`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ activo }),
    });

    return await res.json();
  } catch (error) {
    console.error("Error al cambiar estado activo:", error);
    throw error;
  }
}


export async function createProduct(producto: any, token: string) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(producto),
    });

    return await res.json();
  } catch (error) {
    console.error("Error al crear producto:", error);
  }
}

export async function updateProduct(id: number, updates: any, token: string) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    return await res.json();
  } catch (error) {
    console.error("Error al actualizar producto:", error);
  }
}

  