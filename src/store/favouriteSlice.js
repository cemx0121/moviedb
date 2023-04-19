import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favourites: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite: (state, action) => {
      const movie = action.payload;
      const movieIndex = state.favourites.findIndex((m) => m.id === movie.id);

      if (movieIndex === -1) {
        // Movie not found in favourites, add it
        state.favourites.push(movie);
      } else {
        // Movie found in favourites, remove it
        state.favourites.splice(movieIndex, 1);
      }
    },
  },
});

export const { toggleFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;
