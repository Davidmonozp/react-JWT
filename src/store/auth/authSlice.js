import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not_authenticated', // 'checking', 'authenticated', 'not_authenticated'
    user: null, // Información del usuario autenticado
    accessToken: null, // Token JWT de acceso
    error: null, // Mensajes de error si los hubiera
  },
  reducers: {
    loginRequest: (state) => {
      state.status = 'checking';
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.status = 'authenticated';
      state.accessToken = action.payload.access_token;
      console.log('Payload user:', action.payload.user); 
      state.user = action.payload.user;
      state.error = null;
      
    },
    loginFailure: (state, action) => {
      state.status = 'not_authenticated';
      state.error = action.payload.error;
    },
    logout: (state) => {
      state.status = 'not_authenticated';
      state.accessToken = null;
      state.user = null;
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    refreshToken: (state, action) => {
      state.accessToken = action.payload.access_token;
    },
  },
});


export const { loginRequest, loginSuccess, loginFailure, logout, setUser, refreshToken } = authSlice.actions;

export default authSlice.reducer;








// import { createSlice } from '@reduxjs/toolkit';

// // Estado inicial
// const initialState = {
//   status: 'checking', // 'checking', 'authenticated', 'not-authenticated'
//   uid: null,
//   email: null,
//   displayName: null,
//   photoURL: null,
//   errorMessage: null,
//   token: null, // Para almacenar el token JWT
// };

// // Crear el slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state, { payload }) => {
//       state.status = 'authenticated';
//       state.uid = payload.user.id; // Asume que el ID del usuario está en payload.user.id
//       state.email = payload.user.email;
//       state.displayName = payload.user.name;
//       state.token = payload.access_token;
//       state.errorMessage = null;
//     },
//     logout: (state, { payload }) => {
//       state.status = 'not-authenticated';
//       state.uid = null;
//       state.email = null;
//       state.displayName = null;
//       state.photoURL = null;
//       state.token = null;
//       state.errorMessage = payload?.errorMessage || null;
//     },
//     checkingCredentials: (state) => {
//       state.status = 'checking';
//     },
//     setError: (state, { payload }) => {
//       state.errorMessage = payload;
//     },
//     setUser: (state, { payload }) => {
//       state.uid = payload.id;
//       state.email = payload.email;
//       state.displayName = payload.name;
//     },
//   },
// });

// // Exportar las acciones
// export const { login, logout, checkingCredentials, setError, setUser } = authSlice.actions;

// // Exportar el reductor
// export default authSlice.reducer;
