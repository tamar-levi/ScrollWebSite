import { createSlice } from '@reduxjs/toolkit';

let initialUser = null;
try {
  const storedUser = localStorage.getItem('user');
  initialUser = storedUser ? JSON.parse(storedUser) : null;
} catch (e) {
  console.error('Error parsing user data from localStorage:', e);
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: initialUser,
    products: [] 
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.currentUser));
    },
    deleteUser: (state) => {
      state.currentUser = null;
      state.products = []; 
      localStorage.removeItem('user');
    },
    deleteUserProducts: (state) => {
      state.products = [];
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, updateUser, deleteUser, deleteUserProducts, logout } = userSlice.actions;

export default userSlice.reducer;