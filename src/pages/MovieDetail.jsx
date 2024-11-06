import data from '../data/movieDetailData.json';

function MovieDetail() {
  const baseURL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="flex gap-6 flex-wrap p-8">
      <section className="w-[50%]">
        <img src={baseURL + data.poster_path} alt={data.title} className="object-contain" />
      </section>
      <div className="flex-1 flex flex-col gap-6">
        <h2 className="font-bold text-3xl">{data.title}</h2>
        <section>
          <h3>평균 평점</h3>
          <p>{data.vote_average}</p>
        </section>
        <section>
          <h3>장르</h3>
          {data.genres.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </section>
        <section>
          <h3>줄거리</h3>
          <p>{data.overview}</p>
        </section>
      </div>
    </div>
  );
}

export default MovieDetail;
