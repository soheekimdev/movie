export default function InputWithLabel({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder = '',
  error,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`
          h-10 
          px-3 
          rounded-md 
          border 
          transition-colors
          outline-none
          focus:border-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${error ? 'bg-red-50' : 'bg-white'}
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      <p
        id={`${name}-error`}
        className={`
          text-sm 
          min-h-[20px] 
          mt-1
          ${error ? 'text-red-500' : 'text-transparent'}
        `}
        role={error ? 'alert' : undefined}
      >
        {error || ' '}
      </p>
    </div>
  );
}
