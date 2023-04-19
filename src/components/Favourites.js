import { useSelector } from 'react-redux';
import MovieCard from './movieCard';

const Favourites = () => {
  const favourites = useSelector((state) => state.favourites.favourites);

  return (
    <div className="row row-cols-3 row-cols-md-2 m-4">
      {favourites.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Favourites;