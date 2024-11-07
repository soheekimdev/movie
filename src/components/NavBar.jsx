import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

export default function NavBar() {
  return (
    <header className="flex gap-6 items-center justify-between h-16 px-8 sticky top-0 left-0 right-0 z-50 bg-black">
      <h1>
        <Link to="/" className="flex gap-2 items-center">
          <img src={Logo} alt="무무비비 로고" className="w-10" />
          <span className="font-bold text-xl">무무비비</span>
        </Link>
      </h1>
      <div className="flex gap-4">
        <Link to="/login">로그인</Link>
        <Link to="/signup">회원가입</Link>
      </div>
    </header>
  );
}
