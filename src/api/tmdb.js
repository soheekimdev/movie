const BASE_URL = 'https://api.themoviedb.org/3';
const ENDPOINT = {
  MOVIE: {
    POPULAR: '/movie/popular',
  },
};
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const getPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL + ENDPOINT.MOVIE.POPULAR}?api_key=${API_KEY}&language=ko-KR`);

    if (!response.ok) {
      throw new Error('API 요청에 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('영화 데이터를 가져오는 데 실패했습니다.', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`);

    if (!response) {
      throw new Error('API 요청에 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('영화 상세 정보를 가져오는 데 실패했습니다.', error);
    throw error;
  }
};
