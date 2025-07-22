import React, { useState, useEffect } from 'react';
import { Movie } from './types';
import { apiService } from './services/apiService';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MovieCarousel from './components/MovieCarousel';
import Modal from './components/Modal';

function App() {
  const [bestMovie, setBestMovie] = useState<Movie | null>(null);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [sciFiMovies, setSciFiMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        console.log('Fetching movie data...');
        
        const [bestMovieData, topRatedData, actionData, comedyData, sciFiData] = await Promise.all([
          apiService.getBestMovie(),
          apiService.getMoviesByGenre(''), // Top rated (no genre filter)
          apiService.getMoviesByGenre('Action'),
          apiService.getMoviesByGenre('Comedy'),
          apiService.getMoviesByGenre('Sci-Fi')
        ]);

        console.log('Best movie:', bestMovieData);
        console.log('Top rated movies:', topRatedData.length, topRatedData.slice(0, 3));
        console.log('Action movies:', actionData.length, actionData.slice(0, 3));
        console.log('Comedy movies:', comedyData.length, comedyData.slice(0, 3));
        console.log('Sci-Fi movies:', sciFiData.length, sciFiData.slice(0, 3));

        setBestMovie(bestMovieData);
        setTopRatedMovies(topRatedData.slice(1, 8)); // Skip first one (best movie) for variety
        setActionMovies(actionData.slice(0, 7));
        setComedyMovies(comedyData.slice(0, 7));
        setSciFiMovies(sciFiData.slice(0, 7));
      } catch (err) {
        setError('Erreur lors du chargement des données');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleMovieClick = async (movie: Movie) => {
    try {
      const detailedMovie = await apiService.getMovieDetails(movie.id);
      setSelectedMovie(detailedMovie);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Error fetching movie details:', err);
      // Fallback to basic movie data
      setSelectedMovie(movie);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">
          Chargement de JustStreamIT...
        </div>
        <p className="text-gray-400 mt-4 text-center max-w-md">
          Préparation de votre expérience cinématographique
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-container">
        <div className="text-6xl mb-8">🎥</div>
        <div className="text-3xl font-bold text-red-400 mb-4">
          Oups ! Une erreur est survenue
        </div>
        <p className="text-gray-400 text-center max-w-md mb-8">
          {error}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Recharger la page
        </button>
      </div>
    );
  }

  return (
    <div className="App min-h-screen" style={{ backgroundColor: '#111111' }}>
      <Header title="JustStreamIt" />
      
      {bestMovie && (
        <HeroSection 
          movie={bestMovie} 
          onShowDetails={handleMovieClick}
        />
      )}
      
      <main id="categories" className="space-y-0">
        {topRatedMovies.length > 0 && (
          <MovieCarousel 
            title="🏆 Films les mieux notés" 
            movies={topRatedMovies}
            onMovieClick={handleMovieClick}
          />
        )}
        
        {actionMovies.length > 0 && (
          <MovieCarousel 
            title="💥 Action" 
            movies={actionMovies}
            onMovieClick={handleMovieClick}
          />
        )}
        
        {comedyMovies.length > 0 && (
          <MovieCarousel 
            title="😂 Comédies" 
            movies={comedyMovies}
            onMovieClick={handleMovieClick}
          />
        )}
        
        {sciFiMovies.length > 0 && (
          <MovieCarousel 
            title="🚀 Science-Fiction" 
            movies={sciFiMovies}
            onMovieClick={handleMovieClick}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 py-12 text-center text-gray-400">
        <div className="container mx-auto px-8">
          <p className="text-lg font-semibold">
            © 2024 JustStreamIt - Découvrez le cinéma comme jamais auparavant
          </p>
          <p className="text-sm mt-2 opacity-75">
            Projet réalisé avec ❤️ en React, TypeScript et Tailwind CSS
          </p>
        </div>
      </footer>

      <Modal 
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

export default App;
