import MovieApiService from './movieApi';

export const apiService = {
  getBestMovie: MovieApiService.getBestMovie,
  getMovieDetails: MovieApiService.getMovieDetails,
  getMoviesByGenre: MovieApiService.getMoviesByGenre,
  getTopRatedMovies: MovieApiService.getTopRatedMovies,
  searchMovies: MovieApiService.searchMovies,
  getMoviesByIds: MovieApiService.getMoviesByIds,
  getAvailableGenres: MovieApiService.getAvailableGenres,
};

export default apiService;
