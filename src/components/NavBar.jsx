import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import useDebounce from '../hooks/useDebounce';
import { searchMovies } from '../api/tmdb';

export default function NavBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  useEffect(() => {
    const handleSearch = async () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        const results = await searchMovies(debouncedSearchTerm);
        setSearchResults(results);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    };
    handleSearch();
  }, [debouncedSearchTerm]);

  return (
    <header className="flex gap-6 items-center justify-between h-16 px-8  sticky top-0 left-0 right-0 z-50 bg-black">
      <h1>
        <Link to="/" className="flex gap-2 items-center">
          <img src={Logo} alt="무무비비 로고" className="w-10" />
          <span className="font-bold text-xl">무무비비</span>
        </Link>
      </h1>

      <div className="flex gap-4">
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2">
          <div className="text-gray-500">{isSearching ? <div className="animate-spin">⌛</div> : '🔎'}</div>
          <input
            type="search"
            className="w-64 text-gray-900 outline-none bg-transparent placeholder-gray-500"
            placeholder="영화 제목으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {searchTerm && (
          <div className="absolute top-full left-0 w-full bg-white rounded-lg shadow-lg overflow-hidden">
            {isSearching ? (
              <div className="p-4 text-center text-gray-500">검색 중입니다...</div>
            ) : searchResults.length > 0 ? (
              searchResults.slice(0, 5).map((movie) => (
                <Link
                  key={movie.id}
                  to={`/details/${movie.id}`}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 transition-colors"
                  onClick={() => setSearchTerm('')}
                >
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="w-12 h-18 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-18 bg-gray-200 rounded flex items-center justify-center">🎬</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 font-medium truncate">{movie.title}</h4>
                    <p className="text-gray-500 text-sm">{movie.release_date?.slice(0, 4)}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">검색 결과가 없습니다</div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-white hover:text-gray-300 transition-colors">
            로그인
          </Link>
          <Link to="/signup" className="text-white hover:text-gray-300 transition-colors">
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
}
