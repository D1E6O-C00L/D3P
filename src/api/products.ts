import { DiSafari } from "react-icons/di";

const API_URL = "http://localhost:8888/api/productos"; // Asegúrate de que esta URL esté correcta

// Obtener todos los productos
export async function getAllProducts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`Error al obtener productos: ${res.statusText}`);
    }
    const data = await res.json();
    return data.data; // Asumimos que el campo 'data' contiene los productos
  } catch (error) {
    console.error("Error al obtener productos");
    return []; // Retorna un arreglo vacío en caso de error
  }
}

// Obtener un producto por su ID
export const getProductoById = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) {
      throw new Error(`Error al obtener el producto: ${res.statusText}`);
    }
    const data = await res.json();
    return data.data; // Asumimos que el campo 'data' contiene el producto
  } catch (error) {
    console.error( "Error al obtener el producto");
    return null; // Retorna null en caso de error
  }
};

// Crear un producto
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
console.log(res)
    if (!res.ok) {
      throw new Error(`Error al crear producto: ${res.statusText}`);
    }

    const result = await res.json();
    return result; // Retorna el resultado de la creación del producto
  } catch (error) {
    console.error("Error al crear producto:", error);
    return {  "Hubo un error al crear el producto" : DiSafari};
  }
}

// Actualizar un producto
export const updateProduct = async (id: number, updates: any, token: string) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {  // Verifica que la URL sea correcta
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      throw new Error(`Error al actualizar el producto: ${res.statusText}`);
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Error al actualizar producto:", error);
    return { success: false, message: error?.message || "Hubo un error al actualizar el producto" };
  }
};




// Cambiar el estado activo de un producto
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

    if (!res.ok) {
      throw new Error(`Error al cambiar el estado: ${res.statusText}`);
    }

    const result = await res.json();
    return result;  // Retorna el resultado de la operación
  } catch (error) {
    console.error("Error al cambiar estado activo:", error);
    throw new Error(`Error al cambiar el estado`);  // Lanza el error para manejarlo a nivel superior
  }
}

// Eliminar un producto
export async function deleteProduct(id: number, token: string) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error al eliminar producto: ${res.statusText}`);
    }

    const result = await res.json();
    return result;  // Retorna el resultado de la eliminación del producto
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return { "Hubo un error al eliminar el producto" : DiSafari };
  }
}

// Obtener productos destacados
export const getProductosDestacados = async (limit: number = 5) => {
  try {
    const res = await fetch(`${API_URL}/destacados?limit=${limit}`);
    if (!res.ok) {
      throw new Error(`Error al obtener productos destacados: ${res.statusText}`);
    }

    const data = await res.json();
    return data.data; // Retorna los productos destacados
  } catch (error) {
    console.error("Error al obtener productos destacados:", error);
    return [];  // Retorna un arreglo vacío en caso de error
  }
}
