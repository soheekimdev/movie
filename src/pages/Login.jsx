import Button from '../components/Button';
import InputWithLabel from '../components/InputWithLabel';

export default function Login() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center h-full">
      <h2 className="font-bold text-3xl">로그인</h2>
      <form className="flex flex-col gap-10 w-[400px]">
        <fieldset className="flex flex-col gap-4">
          <InputWithLabel label="이메일" type="email" placeholder="email@email.com" />
          <InputWithLabel label="비밀번호" type="password" />
        </fieldset>
        <Button type="submit" color="primary">
          로그인
        </Button>
      </form>
    </div>
  );
}
