import InputWithLabel from '../components/InputWithLabel';
import Button from '../components/Button';

export default function Signup() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center h-full">
      <h2 className="font-bold text-3xl">회원가입</h2>
      <form className="flex flex-col gap-10 w-[400px]">
        <fieldset className="flex flex-col gap-4">
          <InputWithLabel label="이름" placeholder="윤정년" />
          <InputWithLabel label="이메일" type="email" placeholder="email@email.com" />
          <InputWithLabel label="비밀번호" type="password" />
          <InputWithLabel label="비밀번호 확인" type="password" />
        </fieldset>
        <Button type="submit" color="primary">
          회원가입
        </Button>
      </form>
    </div>
  );
}
