import { FC, useState } from 'react';
import { Movie } from '../../components/movie/model/types';
import { HeroContent } from './ui/HeroContent';
import { HeroEmpty } from './ui/HeroEmpty';
import styles from './Hero.module.scss';

interface HeroProps {
  movie: Movie | null;
  onGetRandomMovie: () => void;
  isLoading?: boolean;
}

export const Hero: FC<HeroProps> = ({ movie, onGetRandomMovie, isLoading }) => {
  if (!movie) {
    return <HeroEmpty onGetRandomMovie={onGetRandomMovie} isLoading={isLoading} />;
  }

  return <HeroContent movie={movie} onGetRandomMovie={onGetRandomMovie} />;
};