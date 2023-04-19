import React, { useState } from 'react';
import { useFetchSearchMovieQuery, useFetchActorMoviesQuery } from '../store';
import MovieCard from './movieCard';

function SearchMoviesList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [actorSearch, setActorSearch] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const {
    data: searchByTitleData,
    error: searchByTitleError,
    isFetching: searchByTitleFetching,
  } = useFetchSearchMovieQuery(searchTerm);

  const {
    data: searchByActorData,
    error: searchByActorError,
    isFetching: searchByActorFetching,
  } = useFetchActorMoviesQuery(searchTerm);

  const handleSelectChange = (e) => {
    setSearchType(e.target.value);
    setActorSearch(e.target.value === 'actor');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value.trim();
    if (searchType === 'actor' && !searchValue.includes(' ')) {
      setErrorMessage('Please enter both the first name and last name of the actor.');
    } else {
      setErrorMessage('');
      setSearchTerm(searchValue);
      setActorSearch(searchType === 'actor');
    }
  };  

  const renderMoviesOnly = (data) => {
    if (data) {
      return (
        <div className="row row-cols-4 row-cols-md-4 m-4">
          {data.map((movie) => (
            <MovieCard key={movie.id} movie={movie}></MovieCard>
          ))}
        </div>
      );
    }
    return null;
  };
  
  const renderMovies = (data) => {
    if (data && !errorMessage && actorSearch) {
      return data.map((actorData) => (
        <div key={actorData.actor.id}>
          <h2>{actorData.actor.name}</h2>
          <div className="row row-cols-4 row-cols-md-4 m-4">
            {actorData.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie}></MovieCard>
            ))}
          </div>
        </div>
      ));
    }
    return null;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input type="text" name="search" placeholder="Search..." />
        <button type="submit">Search</button>
        <div>
          <select value={searchType} onChange={handleSelectChange}>
            <option value="title">Title</option>
            <option value="actor">Actor</option>
          </select>
        </div>
        <div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {searchByTitleFetching || searchByActorFetching ? (
            <p>Loading...</p>
          ) : searchByTitleError || searchByActorError ? (
            <p>Error loading movies. Please try again later.</p>
          ) : actorSearch ? (
            renderMovies(searchByActorData)
          ) : (
            renderMoviesOnly(searchByTitleData?.results)
          )}
        </div>
      </form>
    </div>
  );
}  

export default SearchMoviesList;      