import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { moviesApi } from './apis/moviesApi'; 
import favouritesReducer from './favouriteSlice';

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
     favourites: favouritesReducer,
  },
  middleware: (getDefaultMiddleware) => {  //Thunk middelware er default når der benyttes Redux Toolkit configureStore.
    return getDefaultMiddleware().concat(moviesApi.middleware);
  }
});

setupListeners(store.dispatch);

export { useFetchPopularMoviesQuery, useFetchHighestRatedMoviesQuery, useFetchMovieTrailerQuery, useFetchSearchMovieQuery, useFetchActorMoviesQuery } from './apis/moviesApi';