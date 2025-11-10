import { FC } from 'react';
import { Movie } from '@shared/types/movie';
import { HeroContent } from './ui/HeroContent';
import { HeroEmpty } from './ui/HeroEmpty';

interface HeroProps {
  movie: Movie | null;
  onGetRandomMovie: () => void;
}

export const Hero: FC<HeroProps> = ({ movie, onGetRandomMovie }) => {
  if (!movie) {
    return <HeroEmpty onGetRandomMovie={onGetRandomMovie} />;
  }

  return <HeroContent movie={movie} onGetRandomMovie={onGetRandomMovie} />;
};