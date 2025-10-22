import axios from 'axios';

const API_BASE_URL = 'https://cinemaguide.skillbox.cc';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTopMovies = async () => {
  const response = await api.get('/movie/top10');
  return response.data;
};

export const fetchRandomMovie = async () => {
  const response = await api.get('/movie/random');
  return response.data;
};

