import React, { useRef } from 'react';
import { Movie } from '../types';

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ title, movies, onMovieClick }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const sectionStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #222222 0%, #111111 100%)',
    padding: '40px 0',
    position: 'relative'
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px'
  };

  const titleStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '30px',
    fontFamily: 'Montserrat, sans-serif'
  };

  const carouselContainerStyle: React.CSSProperties = {
    position: 'relative'
  };

  const moviesContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    padding: '10px 0',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none'
  };

  const movieCardStyle: React.CSSProperties = {
    flexShrink: 0,
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    position: 'relative'
  };

  const movieImageStyle: React.CSSProperties = {
    width: '200px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '12px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  };

  const movieInfoStyle: React.CSSProperties = {
    marginTop: '10px',
    color: 'white',
    textAlign: 'center'
  };

  const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(202, 170, 118, 0.9)',
    color: 'white',
    border: '2px solid rgba(255,255,255,0.2)',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    fontWeight: 'bold',
    zIndex: 10,
    transition: 'all 0.3s ease',
    opacity: 0.9,
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
  };

  const leftButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    left: '10px'
  };

  const rightButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    right: '10px'
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <h3 style={titleStyle}>{title}</h3>
        
        <div style={carouselContainerStyle}>
          <button
            onClick={scrollLeft}
            style={leftButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(202, 170, 118, 1)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(202, 170, 118, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(202, 170, 118, 0.9)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
            }}
          >
            ←
          </button>
          
          <div
            ref={carouselRef}
            style={moviesContainerStyle}
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                style={movieCardStyle}
                onClick={() => onMovieClick(movie)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) {
                    img.style.transform = 'scale(1.1)';
                    img.style.boxShadow = '0 15px 35px rgba(0,0,0,0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) {
                    img.style.transform = 'scale(1)';
                    img.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
                  }
                }}
              >
                <img
                  src={movie.image_url}
                  alt={movie.title}
                  style={movieImageStyle}
                />
                
                <div style={movieInfoStyle}>
                  <h4 style={{ 
                    fontSize: '14px', 
                    fontWeight: 'bold', 
                    margin: '8px 0 4px 0',
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {movie.title}
                  </h4>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    color: '#cccccc'
                  }}>
                    <span style={{ color: '#ffd700' }}>★</span>
                    <span>{movie.imdb_score}</span>
                    <span>•</span>
                    <span>{movie.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={scrollRight}
            style={rightButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(202, 170, 118, 1)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(202, 170, 118, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(202, 170, 118, 0.9)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
            }}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default MovieCarousel;
