import axios from 'axios';

const API_URL = 'http://localhost:8888/api/auth';

// Función para registrar un usuario
export const registrarUsuario = async (datos: {
  nombre: string;
  correo: string;
  contraseña: string;
  direccion: string;
}) => {
  const res = await axios.post(`${API_URL}/register`, datos);
  return res.data;
};

// Función para iniciar sesión
export const iniciarSesion = async (datos: {
  correo: string;
  contraseña: string;
  captchaToken: string;  // 👈 AÑADIDO
}) => {
  const res = await axios.post(`${API_URL}/login`, datos);
  return res.data; 
};

// Función para actualizar la contraseña (recuperar contraseña)
export const actualizarContraseña = async (datos: {
  correo: string;
  nuevaContraseña: string;
}) => {
  const res = await axios.post(`${API_URL}/update-password`, datos);
  return res.data; // Retorna la respuesta del backend (mensaje de éxito o error)
};

// Obtener todos los usuarios
export const obtenerUsuarios = async (token: string) => {
  const res = await axios.get(`${API_URL}/usuarios`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; // 👈 muy importante
};

// Dar de baja (eliminar) un usuario
export const darDeBajaUsuario = async (id_usuario: number, token: string) => {
  const res = await axios.delete(`http://localhost:8888/api/usuarios/${id_usuario}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Cambiar estado activo/inactivo de un usuario
export const toggleActivoUsuario = async (id: number, activo: boolean, token: string) => {
  try {
    const response = await axios.patch(
      `${API_URL}/usuarios/${id}/estado`,
      { activo },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al cambiar el estado del usuario:', error);
    throw error;
  }
};

export const cambiarRolUsuario = async (id: number, nuevoRol: "usuario" | "admin", token: string) => {
  try {
    const res = await axios.patch(
      `${API_URL}/usuarios/${id}/rol`,  // Asegúrate de que este endpoint esté configurado correctamente
      { rol: nuevoRol },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error al cambiar rol de usuario:", error);
    throw error;
  }
};

const cambiarRol = async (id: number, rol: string) => {
  const token = localStorage.getItem("admin_token");
  if (!token || token.length < 10) {
    alert("Token inválido. Inicia sesión como administrador.");
    return;
  }

  try {
    const response = await axios.patch(
      `http://localhost:8888/api/usuarios/${id}/rol`, // Ruta de la API
      { rol }, // El rol que queremos asignar
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      alert("Rol actualizado correctamente");
      // Aquí puedes hacer una recarga o actualización de la lista de usuarios
    }
  } catch (error) {
    console.error("Error al cambiar el rol:", error);
    alert("Error al cambiar el rol");
  }
};
