export default function InputWithLabel({ label, type = 'text', placeholder = '' }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="">{label}</label>
      <input type={type} placeholder={placeholder} className="h-10 px-3 rounded-md" />
    </div>
  );
}
