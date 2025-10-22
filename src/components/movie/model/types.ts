export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  rating: number;
  runtime: number;
  posterUrl: string;
  backdropUrl: string;
  genres: string[];
  plot: string;
  tmdbRating: number;
}