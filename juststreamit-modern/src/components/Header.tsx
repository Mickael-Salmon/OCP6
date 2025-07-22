import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const headerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 50,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.3) 100%)',
    backdropFilter: 'blur(10px)',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    borderBottom: '1px solid rgba(202, 170, 118, 0.2)'
  };

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #ffffff, #caaa76, #ffffff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontFamily: 'Montserrat, sans-serif',
    letterSpacing: '2px',
    textShadow: '0 2px 10px rgba(202, 170, 118, 0.3)'
  };

  const navStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '32px'
  };

  const linkStyle: React.CSSProperties = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    padding: '8px 16px',
    borderRadius: '8px'
  };

  const iconStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    marginRight: '8px',
    filter: 'drop-shadow(0 0 8px rgba(202, 170, 118, 0.5))'
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <span style={iconStyle}>🎬</span>
        <h1 style={titleStyle}>{title}</h1>
      </div>
      
      <nav style={navStyle}>
        <a 
          href="#home" 
          style={linkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#caaa76';
            e.currentTarget.style.background = 'rgba(202, 170, 118, 0.1)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Accueil
        </a>
        <a 
          href="#categories" 
          style={linkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#caaa76';
            e.currentTarget.style.background = 'rgba(202, 170, 118, 0.1)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Catégories
        </a>
      </nav>
    </header>
  );
};

export default Header;

