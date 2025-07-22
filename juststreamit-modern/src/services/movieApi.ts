import axios from 'axios';
import { Movie, MovieDetails, ApiResponse } from '../types/movie';

// Configuration de l'instance axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1/titles',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour la gestion des erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export class MovieApiService {
  /**
   * Récupère le meilleur film (meilleur score IMDb)
   */
  static async getBestMovie(): Promise<Movie> {
    try {
      const response = await api.get<ApiResponse<Movie>>('/?sort_by=-imdb_score&page_size=1');
      const bestMovie = response.data.results[0];
      
      if (!bestMovie) {
        throw new Error('Aucun film trouvé');
      }
      
      return bestMovie;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du meilleur film: ${error}`);
    }
  }

  /**
   * Récupère les détails complets d'un film
   */
  static async getMovieDetails(movieId: number): Promise<MovieDetails> {
    try {
      const response = await api.get<MovieDetails>(`/${movieId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des détails du film: ${error}`);
    }
  }

  /**
   * Récupère les films par genre avec pagination
   */
  static async getMoviesByGenre(
    genre: string, 
    page: number = 1, 
    pageSize: number = 7
  ): Promise<Movie[]> {
    try {
      const response = await api.get<ApiResponse<Movie>>(
        `/?sort_by=-imdb_score&genre=${genre}&page=${page}&page_size=${pageSize}`
      );
      return response.data.results;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des films du genre ${genre}: ${error}`);
    }
  }

  /**
   * Récupère les films les mieux notés (sans filtre de genre)
   */
  static async getTopRatedMovies(count: number = 7): Promise<Movie[]> {
    try {
      const response = await api.get<ApiResponse<Movie>>(
        `/?sort_by=-imdb_score&page_size=${count}`
      );
      return response.data.results;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des films les mieux notés: ${error}`);
    }
  }

  /**
   * Recherche de films par titre
   */
  static async searchMovies(query: string, page: number = 1): Promise<Movie[]> {
    try {
      if (!query.trim()) {
        return [];
      }
      
      const response = await api.get<ApiResponse<Movie>>(
        `/?title_icontains=${encodeURIComponent(query)}&page=${page}&page_size=20`
      );
      return response.data.results;
    } catch (error) {
      throw new Error(`Erreur lors de la recherche: ${error}`);
    }
  }

  /**
   * Récupère plusieurs films par leurs IDs
   */
  static async getMoviesByIds(ids: number[]): Promise<Movie[]> {
    try {
      const promises = ids.map(id => api.get<Movie>(`/${id}`));
      const responses = await Promise.all(promises);
      return responses.map(response => response.data);
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des films: ${error}`);
    }
  }

  /**
   * Récupère les genres disponibles (utilitaire)
   */
  static getAvailableGenres(): string[] {
    return [
      'Action',
      'Adventure', 
      'Animation',
      'Biography',
      'Comedy',
      'Crime',
      'Documentary',
      'Drama',
      'Family',
      'Fantasy',
      'Film-Noir',
      'History',
      'Horror',
      'Music',
      'Musical',
      'Mystery',
      'Romance',
      'Sci-Fi',
      'Sport',
      'Thriller',
      'War',
      'Western'
    ];
  }
}

export default MovieApiService;
