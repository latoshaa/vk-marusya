import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@widgets/header';
import { Footer } from "@widgets/footer";
import { HomePage } from '@pages/home';
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

const GenresPage = () => (
  <div style={{ padding: '40px 0', flex: 1 }}>
    <h1>Страница жанров</h1>
    <p>Контент страницы жанров</p>
  </div>
);

const MoviePage = () => (
  <div style={{ padding: '40px 0', flex: 1 }}>
    <h1>Страница фильма</h1>
    <p>Контент страницы фильма</p>
  </div>
);

export default App;


