import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function Layout() {
  return (
    <div className="min-h-svh flex flex-col">
      <NavBar />
      <main className="flex-1 flex flex-col py-6">
        <Outlet />
      </main>
    </div>
  );
}
