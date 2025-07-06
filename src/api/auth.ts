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