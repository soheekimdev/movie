import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import data from '../data/movieListData.json';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/swiper.css';

function Main() {
  const [movieList] = useState(data.results);
  const [top20Movies] = useState(() => {
    const sortedMovies = [...data.results].sort((a, b) => b.vote_average - a.vote_average);
    return sortedMovies.slice(0, 20);
  });
  const navigate = useNavigate();

  return (
    <>
      <section className="flex flex-col gap-4 p-8">
        <h2 className="text-2xl">TOP 10</h2>
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
          >
            {top20Movies.map((movie) => (
              <SwiperSlide key={movie.id} className="pb-12">
                <MovieCard
                  poster={movie.poster_path}
                  title={movie.title}
                  voteAverage={movie.vote_average}
                  onClick={() => navigate('/details')}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="flex flex-col gap-4 p-8">
        <h2 className="text-2xl">현재 상영중</h2>
        <div className="grid grid-cols-3 gap-5">
          {movieList.map((movie) => (
            <MovieCard
              key={movie.id}
              poster={movie.poster_path}
              title={movie.title}
              voteAverage={movie.vote_average}
              onClick={() => navigate('/details')}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Main;
