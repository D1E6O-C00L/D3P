import axios from 'axios';

const API_URL = 'http://localhost:8888/api/auth';

export const registrarUsuario = async (datos: {
  nombre: string;
  correo: string;
  contraseña: string;
  direccion: string;
}) => {
  const res = await axios.post(`${API_URL}/register`, datos);
  return res.data;
};

export const iniciarSesion = async (datos: {
  correo: string;
  contraseña: string;
}) => {
  const res = await axios.post(`${API_URL}/login`, datos);
  return res.data; 
};
