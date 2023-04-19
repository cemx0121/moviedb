import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const youtubeAPIkey = 'AIzaSyBrlF2wC_FZt7_FPmrbh56Ha_yGG-61CUs'

const fetchYoutubeTrailer = async (movieTitle) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: youtubeAPIkey,
        q: `${movieTitle} trailer`,
        type: 'video',
        part: 'id',
        maxResults: 1,
        videoDefinition: 'high',
      },
    });

    return response.data.items[0].id.videoId;
  } catch (error) {
    console.error('Failed to fetch trailer from YouTube API:', error);
    return null;
  }
};

const moviesApi = createApi({
  reducerPath: 'movies',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.themoviedb.org/3/'
  }),
  endpoints(builder) {
    return {
      fetchPopularMovies: builder.query({
        query: () => {
          return {
            url: 'discover/movie',
            params: {
              sort_by: 'popularity.desc',
              api_key: '81c50c197b83129dd4fc387ca6c8c323'
            },
            method: 'GET',
          };
        },
      }),

      fetchHighestRatedMovies: builder.query({
        query: () => {
          return {
            url: 'discover/movie',
            params: {
              sort_by: 'vote_average.desc',
              api_key: '81c50c197b83129dd4fc387ca6c8c323'
            },
            method: 'GET',
          };
        },
      }),    
      fetchSearchMovie: builder.query({
        query: (searchTerm) => {
          return {
            url: 'search/movie',
            params: {
              query: searchTerm,
              api_key: '81c50c197b83129dd4fc387ca6c8c323'
            },
            method: 'GET',
          };
        },
      }),
      fetchMovieTrailer: builder.query({
        queryFn: async (movieTitle) => {
          const videoId = await fetchYoutubeTrailer(movieTitle);
          return { 
            data: { id: videoId } 
          };
        },
      }),
      fetchActorMovies: builder.query({
        query: (actorName) => {
          return {
            url: 'search/person',
            params: {
              query: actorName,
              api_key: '81c50c197b83129dd4fc387ca6c8c323',
            },
            method: 'GET',
          };
        },
        async transformResponse(response) {
          const actorsWithMovies = [];
      
          for (const actor of response.results) {
            const movieCredits = await axios.get(`https://api.themoviedb.org/3/person/${actor.id}/movie_credits`, {
              params: {
                api_key: '81c50c197b83129dd4fc387ca6c8c323',
              },
            });
      
            actorsWithMovies.push({
              actor,
              movies: movieCredits.data.cast,
            });
          }
      
          return actorsWithMovies;
        },
      }),          
    };
  },
});

export const {
  useFetchPopularMoviesQuery, 
  useFetchHighestRatedMoviesQuery,
  useFetchMovieTrailerQuery,
  useFetchSearchMovieQuery,
  useFetchActorMoviesQuery
} = moviesApi;
export { moviesApi };