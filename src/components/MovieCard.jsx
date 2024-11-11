function MovieCard({ movie, onClick }) {
  const baseURL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className={`flex flex-col w-full h-full rounded overflow-hidden text-black cursor-pointer`} onClick={onClick}>
      <div className="relative w-full aspect-[2/3]">
        {movie.poster_path ? (
          <img
            src={baseURL + movie.poster_path}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-4xl">🎬</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-2 bg-white">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 leading-6">{movie.title}</h3>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm text-gray-500">{movie.release_date?.slice(0, 4)}</span>
          <span className="text-sm font-medium">⭐ {movie.vote_average?.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
