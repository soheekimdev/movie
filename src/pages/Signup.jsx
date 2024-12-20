import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../api/supabase';
import InputWithLabel from '../components/InputWithLabel';
import Button from '../components/Button';

export default function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    const tempErrors = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };

    if (touched.name && !formData.name.trim()) {
      tempErrors.name = '이름을 입력해주세요';
    }

    if (touched.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) {
        tempErrors.email = '이메일을 입력해주세요';
      } else if (!emailRegex.test(formData.email)) {
        tempErrors.email = '올바른 이메일 형식이 아닙니다';
      }
    }

    // 비밀번호 검사 - Supabase 정책 반영
    if (touched.password) {
      if (!formData.password) {
        tempErrors.password = '비밀번호를 입력해주세요';
      } else {
        const hasNumber = /\d/.test(formData.password);
        const hasLowerCase = /[a-z]/.test(formData.password);
        const hasUpperCase = /[A-Z]/.test(formData.password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

        if (formData.password.length < 6) {
          tempErrors.password = '비밀번호는 최소 6자 이상이어야 합니다';
        } else if (!hasNumber || (!hasLowerCase && !hasUpperCase)) {
          tempErrors.password = '비밀번호는 숫자와 문자를 모두 포함해야 합니다';
        } else if (formData.password.length < 8 && !hasSpecialChar) {
          tempErrors.password = '8자 미만인 경우 특수문자를 포함해야 합니다';
        }

        // 흔한 비밀번호 체크
        const commonPasswords = ['password', '123456', '123456789', 'qwerty', '12345'];
        if (commonPasswords.includes(formData.password.toLowerCase())) {
          tempErrors.password = '너무 흔한 비밀번호입니다';
        }
      }
    }

    if (touched.passwordConfirm) {
      if (!formData.passwordConfirm) {
        tempErrors.passwordConfirm = '비밀번호 확인을 입력해주세요';
      } else if (formData.password !== formData.passwordConfirm) {
        tempErrors.passwordConfirm = '비밀번호가 일치하지 않습니다';
      }
    }

    setErrors(tempErrors);

    const isFormValid =
      formData.name.trim() !== '' &&
      formData.email !== '' &&
      formData.password !== '' &&
      formData.passwordConfirm !== '' &&
      Object.values(tempErrors).every((error) => error === '');

    setIsValid(isFormValid);
    return isFormValid;
  };

  useEffect(() => {
    validateForm();
  }, [formData, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      password: true,
      passwordConfirm: true,
    });

    if (validateForm()) {
      setIsLoading(true);

      try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
            },
          },
        });

        if (authError) throw authError;

        alert('회원가입이 완료되었습니다!\n이메일 인증 후 로그인해주세요.');
        navigate('/login');
      } catch (error) {
        console.error('회원가입 에러 상세:', {
          message: error.message,
          status: error.status,
          error,
        });

        let errorMessage = '회원가입 중 오류가 발생했습니다.';

        if (error.message?.includes('already registered')) {
          errorMessage = '이미 사용 중인 이메일입니다.';
        } else if (error.code === 'weak_password') {
          if (error.reasons?.includes('length')) {
            errorMessage = '비밀번호는 최소 6자 이상이어야 합니다.';
          } else {
            errorMessage =
              '비밀번호가 정책에 맞지 않습니다. 다음 조건을 확인해주세요:\n' +
              '- 최소 6자 이상\n' +
              '- 숫자와 문자 포함\n' +
              '- 8자 미만인 경우 특수문자 포함\n' +
              '- 흔히 사용되는 비밀번호는 사용 불가';
          }
        }

        alert(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex-1 self-center flex flex-col gap-8 items-center justify-center min-w-[400px] h-full p-4 md:p-8">
      <h2 className="font-bold text-3xl">회원가입</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
        <fieldset className="flex flex-col gap-4">
          <InputWithLabel
            label="이름"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="윤정년"
            error={errors.name}
          />
          <InputWithLabel
            label="이메일"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="email@email.com"
            error={errors.email}
          />
          <InputWithLabel
            label="비밀번호"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
          />
          <InputWithLabel
            label="비밀번호 확인"
            name="passwordConfirm"
            type="password"
            value={formData.passwordConfirm}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.passwordConfirm}
          />
        </fieldset>
        <Button
          type="submit"
          color="primary"
          disabled={!isValid}
          className={!isValid ? 'opacity-50 cursor-not-allowed' : ''}
        >
          {isLoading ? '처리중...' : '회원가입'}
        </Button>
      </form>
    </div>
  );
}
