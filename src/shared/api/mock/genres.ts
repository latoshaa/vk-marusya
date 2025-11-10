import { Genre } from '../../types/genre';

import ComedyImage from '@shared/assets/images/genres/comedy.png';
import DramaImage from '@shared/assets/images/genres/drama.png';
import DetectiveImage from '@shared/assets/images/genres/detective.png';
import FamilyImage from '@shared/assets/images/genres/family.png';
import HistoryImage from '@shared/assets/images/genres/history.png';
import ThrillerImage from '@shared/assets/images/genres/thriller.png';
import FantasyImage from '@shared/assets/images/genres/fantasy.png';
import AdventuresImage from '@shared/assets/images/genres/adventures.png';

export const mockGenres: Genre[] = [
  {
    id: 1,
    name: 'Комедия',
    movieCount: 245,
    imageUrl: ComedyImage
  },
  {
    id: 2,
    name: 'Драма',
    movieCount: 189,
    imageUrl: DramaImage
  },
  {
    id: 3,
    name: 'Детектив',
    movieCount: 156,
    imageUrl: DetectiveImage
  },
  {
    id: 4,
    name: 'Семейное',
    movieCount: 134,
    imageUrl: FamilyImage
  },
  {
    id: 5,
    name: 'Историческое',
    movieCount: 98,
    imageUrl: HistoryImage
  },
  {
    id: 6,
    name: 'Триллер',
    movieCount: 167,
    imageUrl: ThrillerImage
  },
  {
    id: 7,
    name: 'Фантастика',
    movieCount: 143,
    imageUrl: FantasyImage
  },
  {
    id: 8,
    name: 'Приключения',
    movieCount: 128,
    imageUrl: AdventuresImage
  }
];