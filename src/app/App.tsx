import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { Header } from '@widgets/header';
import { Footer } from "@widgets/footer";
import { HomePage } from '@pages/home';
import { GenresPage } from '@pages/genres';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';
import { LoadingSpinner } from '@shared/ui/LoadingSpinner';
import '@shared/styles/global.scss';
import { GenreMoviesPage } from '@pages/genre-movies';
import { MoviePage } from '@pages/movie';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <Header />
          <main className="main-container">
            <div className="page-container">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/genres" element={<GenresPage />} />
                <Route path="/genres/:id" element={<GenreMoviesPage />} />
                <Route path="/movie/:id" element={<MoviePage />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;


