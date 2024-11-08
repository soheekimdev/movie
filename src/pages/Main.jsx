import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { getPopularMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/swiper.css';

function Main() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const top10Movies = useMemo(() => {
    return [...movies].sort((a, b) => b.vote_average - a.vote_average).slice(0, 10);
  }, [movies]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await getPopularMovies();
        setMovies(response.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error}</div>;

  return (
    <>
      <section className="flex flex-col gap-4 p-8">
        <h2 className="text-2xl">TOP 10</h2>
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            breakpoints={{
              360: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
          >
            {top10Movies.map((movie) => (
              <SwiperSlide key={movie.id} className="pb-12">
                <MovieCard
                  poster={movie.poster_path}
                  title={movie.title}
                  voteAverage={movie.vote_average}
                  onClick={() => navigate(`/details/${movie.id}`)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="flex flex-col gap-4 p-8">
        <h2 className="text-2xl">인기 영화</h2>
        <div className="grid grid-cols-3 gap-5">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              poster={movie.poster_path}
              title={movie.title}
              voteAverage={movie.vote_average}
              onClick={() => navigate(`/details/${movie.id}`)}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Main;
