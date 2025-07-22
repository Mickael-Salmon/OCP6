import React, { useEffect } from 'react';
import { Movie } from '../types';

interface ModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ movie, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !movie) {
    return null;
  }

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.95) 100%)',
    backdropFilter: 'blur(8px)',
    animation: 'fadeIn 0.3s ease-out'
  };

  return (
    <div
      style={backdropStyle}
      onClick={handleBackdropClick}
    >
      <div 
        className="relative bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden transform"
        style={{ 
          animation: 'slideInUp 0.4s ease-out',
          background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 bg-black bg-opacity-60 hover:bg-opacity-90 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row max-h-[90vh] overflow-y-auto">
          {/* Movie Poster Section */}
          <div className="lg:w-2/5 relative">
            <div className="relative overflow-hidden">
              <img
                src={movie.image_url}
                alt={movie.title}
                className="w-full h-96 lg:h-full object-cover"
                style={{
                  filter: 'brightness(0.95) contrast(1.05)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Movie Details Section */}
          <div className="lg:w-3/5 p-8 lg:p-12 text-white">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-black mb-4 leading-tight">
                {movie.title}
              </h2>
              
              {/* Rating and Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center space-x-2 bg-yellow-500 bg-opacity-20 px-4 py-2 rounded-full border border-yellow-500 border-opacity-30">
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="font-bold text-yellow-300 text-lg">{movie.imdb_score}</span>
                  <span className="text-yellow-200">/10</span>
                </div>
                <span className="text-gray-300 font-medium text-lg">{movie.year}</span>
                <span className="text-gray-300 font-medium text-lg">{movie.duration} min</span>
                {movie.rated && (
                  <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {movie.rated}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-lg rounded-xl shadow-lg hover:shadow-yellow-500/25 transform transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span>REGARDER</span>
                </button>
                <button className="px-8 py-4 border-2 border-white border-opacity-30 text-white font-semibold text-lg rounded-xl backdrop-blur-sm bg-white bg-opacity-10 transition-all duration-300 hover:bg-opacity-20 hover:border-opacity-60">
                  AJOUTER À MA LISTE
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-gray-200 text-lg leading-relaxed">
                {movie.long_description || movie.description}
              </p>
            </div>

            {/* Movie Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-base">
              {movie.directors && movie.directors.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-bold text-yellow-400 text-lg">Réalisateur(s)</h3>
                  <p className="text-gray-300">{movie.directors.join(', ')}</p>
                </div>
              )}

              {movie.actors && movie.actors.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-bold text-yellow-400 text-lg">Acteurs principaux</h3>
                  <p className="text-gray-300">{movie.actors.slice(0, 5).join(', ')}</p>
                </div>
              )}

              {movie.genres && movie.genres.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-bold text-yellow-400 text-lg">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {movie.countries && movie.countries.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-bold text-yellow-400 text-lg">Pays</h3>
                  <p className="text-gray-300">{movie.countries.join(', ')}</p>
                </div>
              )}

              {(movie as any).budget && (
                <div className="space-y-2">
                  <h3 className="font-bold text-yellow-400 text-lg">Budget</h3>
                  <p className="text-gray-300">${(movie as any).budget.toLocaleString()}</p>
                </div>
              )}

              {movie.worldwide_gross_income && (
                <div className="space-y-2">
                  <h3 className="font-bold text-yellow-400 text-lg">Recettes mondiales</h3>
                  <p className="text-gray-300">{movie.worldwide_gross_income}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
