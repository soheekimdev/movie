import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
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
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isfetching, setIsFetching] = useState(false);
  const observerRef = useRef();
  const navigate = useNavigate();

  const top10Movies = useMemo(() => {
    return [...movies].sort((a, b) => b.vote_average - a.vote_average).slice(0, 10);
  }, [movies]);

  const loadMoreMovies = useCallback(async () => {
    if (isfetching || !hasMore) return;

    try {
      setIsFetching(true);
      const nextPage = page + 1;
      const response = await getPopularMovies(nextPage);

      // 더 불러올 데이터가 있는지 확인
      setHasMore(response.page < response.total_pages);
      setMovies((prev) => [...prev, ...response.results]);
      setPage(nextPage);
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsFetching(false);
    }
  }, [isfetching, page, hasMore]);

  // Intersection Observer 설정
  const lastMovieRef = useCallback(
    (node) => {
      if (loading) return;

      // 이전 observer 정리
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      // 새로운 observer 생성
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreMovies();
        }
      });

      // 마지막 요소 관찰 시작
      if (node) {
        observerRef.current.observe(node);
      }
    },
    [loading, hasMore, loadMoreMovies]
  );

  // 초기 데이터 로딩
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await getPopularMovies(1);
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
          {movies.map((movie, index) => (
            <div key={movie.id} ref={index === movies.length - 1 ? lastMovieRef : null}>
              <MovieCard
                poster={movie.poster_path}
                title={movie.title}
                voteAverage={movie.vote_average}
                onClick={() => navigate(`/details/${movie.id}`)}
              />
            </div>
          ))}
          {isfetching && <div>...</div>}
        </div>
      </section>
    </>
  );
}

export default Main;
