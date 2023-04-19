import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '../store/favouriteSlice';
import TrailerModal from './TrailerModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import {faHeart} from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { moviesApi } from '../store/apis/moviesApi';

function MovieCard({ movie }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.favourites);

  const handlePlayTrailer = async () => {
    try {
      const trailerData = await dispatch(moviesApi.endpoints.fetchMovieTrailer.initiate(movie.title)).unwrap();
      setVideoId(trailerData.id);
      setShowTrailer(true);
    } catch (error) {
      console.error('Failed to fetch trailer:', error);
    }
  };

  const handleAddToFavourites = () => {
    dispatch(toggleFavourite(movie));
  };

  const isMovieFavourite = () => {
    return favourites.some((favMovie) => favMovie.id === movie.id);
  };

  const posterBasePath = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

  return (
    <div className="col-lg-2 mb-4">
      <div className="card">
        <img src={posterBasePath + movie.poster_path} className="card-img-top" alt={movie.title} />
        <div className="card-body">
          <h5 className="card-title">{movie.title.substring(0, 200)}</h5>
          <span className="far fa-star" aria-hidden="true"></span>
          <span className="ml-1">{movie.vote_average}</span>
          <p className="card-text">{movie.overview.substring(0,125).concat('...')}</p>
          <div className="d-flex justify-content-between p-0">
            <span className="far fa-calendar" aria-hidden="true">{movie.release_date}</span>
            <FontAwesomeIcon icon={faYoutube} onClick={handlePlayTrailer} size='xl'/>
            <FontAwesomeIcon
              icon={isMovieFavourite() ? faHeartSolid : faHeart}
              onClick={handleAddToFavourites}
              size="xl"
            />
          </div>
        </div>
      </div>
      <TrailerModal
        isOpen={showTrailer}
        closeModal={() => setShowTrailer(false)}
        videoId={videoId}
      />
    </div>
  );
}

export default MovieCard;