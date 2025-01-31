import { createSlice } from '@reduxjs/toolkit';

// שליפת הנתונים מה-localStorage ובדיקה אם הם תקינים
let initialUser = null;

try {
  const storedUser = localStorage.getItem('user');
  initialUser = storedUser ? JSON.parse(storedUser) : null;
} catch (e) {
  console.error('Error parsing user data from localStorage:', e);
  initialUser = null; // אם יש שגיאה בפרסור, לא נכנס נתון
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: initialUser,  
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;  
      try {
        localStorage.setItem('user', JSON.stringify(action.payload)); // שמירה ב-localStorage
      } catch (e) {
        console.error('Error saving user data to localStorage:', e);
      }
    },
    logout: (state) => {
      state.currentUser = null;  
      try {
        localStorage.removeItem('user'); // מחיקת הנתונים מה-localStorage בעת התנתקות
      } catch (e) {
        console.error('Error removing user data from localStorage:', e);
      }
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
