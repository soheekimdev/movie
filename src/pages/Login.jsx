import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../store/authSlice';
import Button from '../components/Button';
import InputWithLabel from '../components/InputWithLabel';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const resultAction = await dispatch(signIn(formData));
      if (signIn.fulfilled.match(resultAction)) {
        navigate('/');
      } else if (signIn.rejected.match(resultAction)) {
        alert(resultAction.payload || '로그인에 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-8 items-center justify-center h-full p-4 md:p-8">
      <h2 className="font-bold text-3xl">로그인</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full max-w-[400px]">
        <fieldset className="flex flex-col gap-4">
          <InputWithLabel
            label="이메일"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@email.com"
            error={errors.email}
          />
          <InputWithLabel
            label="비밀번호"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
        </fieldset>
        <Button
          type="submit"
          color="primary"
          disabled={isLoading}
          className={isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </Button>
      </form>
    </div>
  );
}
