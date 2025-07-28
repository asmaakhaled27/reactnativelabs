import { configureStore, createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      if (!state.find(movie => movie.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      return state.filter(movie => movie.id !== action.payload.id);
    },
    clearFavorites: () => [],
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export const selectFavorites = state => state.favorites;

const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
  },
});

export default store; 