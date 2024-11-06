import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import MovieDetail from './pages/MovieDetail';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/details" element={<MovieDetail />} />
      </Routes>
    </main>
  );
}

export default App;
