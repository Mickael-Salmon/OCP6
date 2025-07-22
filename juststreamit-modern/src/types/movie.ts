// Types pour les données de films et réponses API

export interface Movie {
  id: number;
  title: string;
  image_url: string;
  url: string;
  imdb_score: number;
  year: number;
  duration: number;
  description: string;
  long_description?: string;
  genres: string[];
  directors: string[];
  actors: string[];
  countries: string[];
  rated?: string | number;
  worldwide_gross_income?: string;
  budget_currency?: string;
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface MovieDetails extends Movie {
  long_description: string;
  writers: string[];
  company: string[];
  avg_vote: number;
  votes: number;
  budget: number;
  usa_gross_income?: string;
}

export interface CarouselSection {
  title: string;
  category: string;
  movies: Movie[];
}

export interface SearchResults {
  movies: Movie[];
  query: string;
  loading: boolean;
  error?: string;
}
