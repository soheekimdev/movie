const BASE_URL = 'https://api.themoviedb.org/3';
const ENDPOINT = {
  MOVIE: {
    POPULAR: '/movie/popular',
  },
  SEARCH: {
    MOVIE: '/search/movie',
  },
};
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const options = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    Accept: 'application/json',
  },
};

export const getPopularMovies = async (page) => {
  try {
    const response = await fetch(`${BASE_URL + ENDPOINT.MOVIE.POPULAR}?language=ko-KR&page=${page}`, options);

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
    const response = await fetch(`${BASE_URL}/movie/${movieId}?language=ko-KR`, options);

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

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL + ENDPOINT.SEARCH.MOVIE}?query=${encodeURIComponent(query)}&language=ko-KR`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('영화 검색 중 에러 발생:', error);
    return [];
  }
};
