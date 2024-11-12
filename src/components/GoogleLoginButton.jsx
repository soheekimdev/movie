import { FcGoogle } from 'react-icons/fc';

export default function GoogleLoginButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
    >
      <FcGoogle className="w-5 h-5" />
      <span>Google로 계속하기</span>
    </button>
  );
}
