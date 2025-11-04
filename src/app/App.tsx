import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@widgets/header';
import { Footer } from "@widgets/footer";
import { HomePage } from '@pages/home';
import { GenresPage } from '@pages/genres';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';
import '@shared/styles/global.scss';

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
                <Route path="/genres/:id" element={<div>Страница жанра</div>} />
                <Route path="/movie/:id" element={<div>Страница фильма</div>} />
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


