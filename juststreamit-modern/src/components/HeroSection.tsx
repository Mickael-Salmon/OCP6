import React from 'react';
import { Movie } from '../types';

interface HeroSectionProps {
  movie: Movie;
  onShowDetails: (movie: Movie) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ movie, onShowDetails }) => {
  const heroStyle: React.CSSProperties = {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    background: `linear-gradient(
      rgba(0, 0, 0, 0.4), 
      rgba(0, 0, 0, 0.7)
    ), url(${movie.image_url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  };

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    padding: '0 20px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(4rem, 12vw, 12rem)',
    fontWeight: '900',
    color: 'white',
    textShadow: '4px 4px 20px rgba(0,0,0,0.8)',
    marginBottom: '30px',
    fontFamily: 'Montserrat, sans-serif',
    letterSpacing: '0.05em',
    lineHeight: '0.9'
  };

  const posterStyle: React.CSSProperties = {
    width: '300px',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '15px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
    marginBottom: '40px',
    transition: 'transform 0.3s ease'
  };

  const metaStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '30px',
    fontSize: '1.2rem',
    color: '#e0e0e0'
  };

  const ratingStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(202, 170, 118, 0.2)',
    border: '1px solid rgba(202, 170, 118, 0.5)',
    padding: '8px 16px',
    borderRadius: '25px',
    color: '#caaa76',
    fontWeight: 'bold'
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#d0d0d0',
    maxWidth: '600px',
    marginBottom: '40px',
    textAlign: 'center'
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  };

  const primaryButtonStyle: React.CSSProperties = {
    background: 'linear-gradient(45deg, #caaa76, #b8965f)',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '10px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(202, 170, 118, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const secondaryButtonStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.1)',
    color: 'white',
    border: '2px solid rgba(255,255,255,0.3)',
    padding: '13px 28px',
    borderRadius: '10px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  };

  return (
    <section style={heroStyle}>
      {/* Dark overlay for better text contrast */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
        zIndex: 5
      }}></div>
      
      <div style={contentStyle}>
        {/* Movie Poster */}
        <img
          src={movie.image_url}
          alt={movie.title}
          style={posterStyle}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        
        {/* Movie Title */}
        <h1 style={titleStyle}>
          {movie.title}
        </h1>
        
        {/* Movie Meta */}
        <div style={metaStyle}>
          <div style={ratingStyle}>
            <span>★</span>
            <span>{movie.imdb_score}/10</span>
          </div>
          <span>•</span>
          <span>{movie.year}</span>
          {movie.duration && (
            <>
              <span>•</span>
              <span>{movie.duration} min</span>
            </>
          )}
        </div>
        
        {/* Description */}
        <p style={descriptionStyle}>
          {movie.description || 'Découvrez ce film extraordinaire dans toute sa splendeur.'}
        </p>
        
        {/* Action Buttons */}
        <div style={buttonContainerStyle}>
          <button
            style={primaryButtonStyle}
            onClick={() => onShowDetails(movie)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(202, 170, 118, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(202, 170, 118, 0.3)';
            }}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span>VOIR LE FILM</span>
          </button>
          
          <button
            style={secondaryButtonStyle}
            onClick={() => onShowDetails(movie)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.borderColor = 'rgba(202, 170, 118, 0.8)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            PLUS D'INFOS
          </button>
        </div>
      </div>
      
      {/* Bottom gradient */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100px',
        background: 'linear-gradient(to top, rgba(17,17,17,1), transparent)',
        zIndex: 8
      }}></div>
    </section>
  );
};

export default HeroSection;
