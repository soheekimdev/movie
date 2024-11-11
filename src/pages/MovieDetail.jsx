import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../api/tmdb';

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = 'https://image.tmdb.org/t/p/w500';
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error}</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6 flex-wrap p-8">
      <section className="w-[50%]">
        <img src={baseURL + movie.poster_path} alt={movie.title} className="object-contain" />
      </section>
      <div className="flex-1 flex flex-col gap-6">
        <h2 className="font-bold text-3xl">{movie.title}</h2>
        <section>
          <h3>평균 평점</h3>
          <p>{movie.vote_average}</p>
        </section>
        <section>
          <h3>장르</h3>
          {movie.genres.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </section>
        <section>
          <h3>줄거리</h3>
          <p>{movie.overview}</p>
        </section>
      </div>
    </div>
  );
}

export default MovieDetail;
