import { useState, useEffect } from 'react';
import InputWithLabel from '../components/InputWithLabel';
import Button from '../components/Button';

export default function Signup() {
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
    let tempErrors = {
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

    if (touched.password) {
      if (!formData.password) {
        tempErrors.password = '비밀번호를 입력해주세요';
      } else if (formData.password.length < 6) {
        tempErrors.password = '비밀번호는 최소 6자 이상이어야 합니다';
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

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      password: true,
      passwordConfirm: true,
    });

    if (validateForm()) {
      // 추후 회원가입 로직 구현
      console.log('폼 유효성 검사 통과:', formData);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-8 items-center justify-center h-full p-4 md:p-8">
      <h2 className="font-bold text-3xl">회원가입</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full max-w-[400px]">
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
          회원가입
        </Button>
      </form>
    </div>
  );
}
