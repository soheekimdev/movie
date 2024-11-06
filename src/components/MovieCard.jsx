// eslint-disable-next-line react/prop-types
function MovieCard({ poster, title, voteAverage, onClick }) {
  const baseURL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="flex flex-col bg-white rounded overflow-hidden text-black cursor-pointer" onClick={onClick}>
      <img src={baseURL + poster} alt={title} />
      <div className="p-2">
        <p className="font-bold">{title}</p>
        <p className="text-gray-700 text-sm">⭐️ {voteAverage}</p>
      </div>
    </div>
  );
}

export default MovieCard;
