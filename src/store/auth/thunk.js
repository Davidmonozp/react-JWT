// src/store/auth/authThunk.js
import axios from 'axios';
import { loginRequest, loginSuccess, loginFailure, logout } from './authSlice';

// Establece la URL base para axios
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/auth';

// Thunk para el inicio de sesión
export const startLogin = (credentials) => async (dispatch) => {
  dispatch(loginRequest()); // Opcional: Informa que el login está en progreso
  try {
    // Realiza la solicitud POST al endpoint de login
    const response = await axios.post('/login', credentials);
    
    // Despacha la acción de éxito con los datos recibidos
    dispatch(loginSuccess(response.data));
  } catch (error) {
    // Maneja cualquier error y despacha la acción de fallo con el mensaje de error
    dispatch(loginFailure({ error: error.response?.data?.message || 'Login failed' }));
  }
};


export const startRegister = (userData) => async (dispatch) => {
  dispatch(loginRequest()); // Opcional: Informa que el registro está en progreso
  try {
    // Realiza la solicitud POST al endpoint de registro
    const response = await axios.post('/register', userData);
    
    // Despacha la acción de éxito con los datos recibidos
    dispatch(loginSuccess(response.data));
    
    // Opcional: Redirige al usuario a la página de inicio de sesión después del registro
    // Puedes manejar la redirección en el componente, pero esta es una opción si quieres hacerlo aquí
  } catch (error) {
    // Maneja cualquier error y despacha la acción de fallo con el mensaje de error
    dispatch(loginFailure({ error: error.response?.data?.message || 'Registro fallido' }));
  }
};

// Thunk para el cierre de sesión
export const startLogout = () => async (dispatch) => {
  dispatch(logout()); // Limpia el estado de autenticación
  try {
    // Si es necesario hacer una solicitud al backend para cerrar sesión
    await axios.post('/logout');
  } catch (error) {
    // Maneja cualquier error en el cierre de sesión
    console.error('Logout failed:', error);
  }
};





// import axios from 'axios';
// import { login, logout, checkingCredentials, setError } from './authSlice';

// const API_URL = 'http://127.0.0.1:8000/api/auth';

// // Función para iniciar sesión
// export const startLogin = (email, password) => {
//   return async (dispatch) => {
//     dispatch(checkingCredentials());

//     try {
//       const response = await axios.post(`${API_URL}/login`, { email, password });
//       const { access_token } = response.data;

//       // Puedes hacer una llamada adicional para obtener información del usuario si es necesario
//       // Ejemplo (descomentar si se requiere):
//       // const userResponse = await axios.get(`${API_URL}/me`, { headers: { Authorization: `Bearer ${access_token}` } });

//       // Simula la respuesta del usuario para este ejemplo
//       const user = { uid: '123', email: email, displayName: 'User Name', photoURL: 'photo_url' };

//       dispatch(login({ ...user, access_token }));
//       localStorage.setItem('token', access_token);
//     } catch (error) {
//       dispatch(setError('Error durante el inicio de sesión'));
//     }
//   };
// };

// // Función para cerrar sesión
// export const startLogout = () => {
//   return async (dispatch, getState) => {
//     const { auth: { access_token } } = getState();

//     try {
//       await axios.post(`${API_URL}/logout`, {}, {
//         headers: { Authorization: `Bearer ${access_token}` },
//       });
//       dispatch(logout());
//       localStorage.removeItem('token');
//     } catch (error) {
//       dispatch(setError('Error durante el cierre de sesión'));
//     }
//   };
// };
