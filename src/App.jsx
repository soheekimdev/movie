import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import MovieDetail from './pages/MovieDetail';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="min-h-svh flex flex-col">
      <NavBar />
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/details/:id" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
