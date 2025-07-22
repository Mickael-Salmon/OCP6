import React from 'react';
import { Movie } from '../types';

interface DebugProps {
  title: string;
  movies: Movie[];
}

const Debug: React.FC<DebugProps> = ({ title, movies }) => {
  return (
    <div className="bg-gray-800 p-4 m-4 rounded text-white text-sm">
      <h3 className="font-bold mb-2">{title}</h3>
      <p>Nombre de films: {movies.length}</p>
      {movies.slice(0, 3).map((movie, index) => (
        <div key={movie.id} className="ml-4 mt-2">
          <strong>{index + 1}.</strong> {movie.title} (Score: {movie.imdb_score}, Année: {movie.year})
          <br />
          <span className="text-gray-400 text-xs">Genres: {movie.genres.join(', ')}</span>
        </div>
      ))}
    </div>
  );
};

export default Debug;
