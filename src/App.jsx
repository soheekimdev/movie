import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import MovieDetail from './pages/MovieDetail';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <>
      <NavBar />
      <main className="flex flex-col h-full">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/details/:id" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
