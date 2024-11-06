import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import data from '../data/movieListData.json';
import { useNavigate } from 'react-router-dom';

function Main() {
  console.log('movieListData.results:', data.results);

  const [movieList] = useState(data.results);
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-5 p-8">
      {movieList.map((movie) => (
        <MovieCard
          key={movie.id}
          poster={movie.backdrop_path}
          title={movie.title}
          voteAverage={movie.vote_average}
          onClick={() => navigate('/details')}
        />
      ))}
    </div>
  );
}

export default Main;
