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

export async function deleteProduct(id: number, token: string) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al eliminar producto");

    return data;
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
}


export async function deleteManyProducts(ids: number[], token: string) {
    try {
      const res = await fetch(`http://localhost:8888/api/productos/eliminar-todos`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids }), // Mandamos los IDs como array
      });
  
      return await res.json();
    } catch (error) {
      console.error("Error al eliminar múltiples productos:", error);
    }
  }
  