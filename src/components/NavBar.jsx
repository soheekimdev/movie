import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { searchMovies } from '../api/tmdb';
import useDebounce from '../hooks/useDebounce';
import Logo from '../assets/logo.png';
import { Menu } from 'lucide-react';

export default function NavBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex gap-6 items-center justify-between h-16 px-4 md:px-8 sticky top-0 left-0 right-0 z-50 bg-black">
      <h1 className="shrink-0">
        <Link to="/" className="flex gap-2 items-center">
          <img src={Logo} alt="무무비비 로고" className="w-8 md:w-10" />
          <span className="hidden sm:block font-bold text-md md:text-xl text-white hover:text-gray-300 transition-colors">
            무무비비
          </span>
        </Link>
      </h1>

      <div className="flex-1 flex items-center justify-end gap-3 md:gap-4">
        <div className="relative flex-1 max-w-[400px]">
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2">
            <span className="text-gray-500">{isSearching ? <div className="animate-spin">⌛</div> : '🔎'}</span>
            <input
              type="search"
              className="w-full text-gray-900 outline-none bg-transparent placeholder-gray-500 text-sm md:text-base"
              placeholder={isSearching ? '검색 중...' : '영화 제목으로 검색'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {searchTerm && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50 max-h-[80vh] overflow-y-auto">
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
        </div>

        {/* 데스크톱 메뉴 */}
        <div className="hidden sm:flex items-center gap-4">
          <Link to="/login" className="text-white hover:text-gray-300 transition-colors text-sm md:text-base">
            로그인
          </Link>
          <Link to="/signup" className="text-white hover:text-gray-300 transition-colors text-sm md:text-base">
            회원가입
          </Link>
        </div>

        {/* 모바일 메뉴 버튼 */}
        <div className="relative sm:hidden" ref={menuRef}>
          <button
            className="p-2 text-white hover:text-gray-300 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* 모바일 메뉴 드롭다운 */}
          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-36 bg-white rounded-lg shadow-lg overflow-hidden">
              <Link
                to="/login"
                className="block w-full px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="block w-full px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
