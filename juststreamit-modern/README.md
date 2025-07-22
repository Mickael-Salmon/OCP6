# 🎬 JustStreamIT - Modern Movie Streaming App

> Une application de streaming moderne construite avec React, TypeScript et une API REST pour découvrir les meilleurs films.

Une application web élégante qui permet aux utilisateurs de découvrir et explorer une vaste collection de films. Avec un design moderne inspiré des plateformes de streaming populaires comme Netflix, l'application offre une expérience utilisateur fluide et engageante.

## ✨ Fonctionnalités

### 🎯 **Navigation et Discovery**
- **Section Hero** avec film en vedette et titre massif centré
- **Carousels horizontaux** pour différentes catégories avec navigation fluide
- **Boutons de navigation** élégants et visibles (60px, design doré)
- **Recherche** par genre et popularité

### 🎭 **Catégories de Films**
- 🏆 **Films les mieux notés** - Les classiques incontournables
- 💥 **Action** - Films d'action et d'aventure
- 😂 **Comédies** - Pour se divertir et rire
- 🚀 **Science-Fiction** - L'univers du futur et de l'imaginaire

### 🎪 **Interface Utilisateur**
- **Design responsive** adapté à tous les écrans
- **Thème sombre professionnel** avec accents dorés (#caaa76)
- **Animations fluides** et micro-interactions partout
- **Modal détaillé** pour chaque film avec backdrop amélioré
- **Hover effects** sophistiqués sur les cartes de films
- **Header avec effet de verre** et navigation élégante

### 📱 **Expérience Mobile**
- Interface optimisée pour mobile et tablette
- Navigation tactile intuitive
- Carousels adaptés aux écrans tactiles
- Typography responsive avec clamp()

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- The JustStreamIT API server running on `http://localhost:8000`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd juststreamit-modern
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the API server**
   Make sure the JustStreamIT API is running on `http://localhost:8000`. If you need to change the API URL, modify the `baseURL` in `src/services/movieApi.ts`.

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

## 🏗️ Architecture

### Project Structure
```
src/
├── components/
│   ├── Header.tsx          # Application header
│   ├── HeroSection.tsx     # Best movie showcase
│   ├── MovieCarousel.tsx   # Horizontal movie carousel
│   └── Modal.tsx          # Movie details modal
├── services/
│   ├── movieApi.ts        # Movie API service class
│   └── apiService.ts      # API service wrapper
├── types/
│   ├── movie.ts           # TypeScript type definitions
│   └── index.ts           # Type exports
├── App.tsx                # Main application component
└── index.tsx              # Application entry point
```

### Component Overview

- **Header**: Simple navigation header with the application title
- **HeroSection**: Displays the best movie with poster, description, and details
- **MovieCarousel**: Scrollable carousel with navigation buttons for movie categories
- **Modal**: Full-screen overlay displaying comprehensive movie information

### API Integration
The application integrates with a REST API that provides:
- Movie listings with filters and sorting
- Individual movie details
- Genre-based movie collections
- Search functionality

## 🎨 Design & Styling

### **Technologies de Style**
- **CSS3 Avancé** - Gradients, animations, et effects modernes
- **Inline Styles** - Pour maximum compatibilité et performance
- **Responsive Design** - Support multi-appareils avec clamp() et media queries
- **Custom Animations** - Keyframes CSS pour transitions fluides

### **Palette de Couleurs**
```css
:root {
  --cinema-dark: #111111;        /* Arrière-plan principal */
  --cinema-gold: #caaa76;        /* Accents dorés */
  --cinema-gold-hover: #b8965f;  /* Hover states */
  --shadow-strong: 0 10px 25px rgba(0, 0, 0, 0.6);
}
```

### **Améliorations Visuelles**
- **Hero Section Repensée** :
  - Titre massif centré (jusqu'à 12rem)
  - Affiche du film mise en avant (300x400px)
  - Arrière-plan dynamique avec l'image du film
  - Buttons d'action avec gradients dorés

- **Carousels Optimisés** :
  - Boutons de navigation 60px avec design doré
  - Hover effects avec scaling et glow
  - Cartes de films avec transitions fluides
  - Scrolling horizontal parfaitement fluide

- **Header Moderne** :
  - Effet glass-morphism avec backdrop-blur
  - Logo gradient avec ombrage
  - Navigation avec micro-interactions

- **Modal Raffinée** :
  - Backdrop radial-gradient amélioré
  - Animations slideInUp et fadeIn
  - Meilleur contraste et lisibilité

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App (irreversible)

### TypeScript Configuration
The application is fully typed with TypeScript, providing:
- Type-safe API calls
- Component prop validation
- Better IDE support and autocomplete
- Compile-time error detection

### API Service
The API service is structured with:
- Axios-based HTTP client
- Error handling and timeouts
- Response type validation
- Configurable base URL

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the OpenClassrooms curriculum.

## 🔗 Related Projects

- Original JustStreamIT (vanilla JavaScript version)
- JustStreamIT API server

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
