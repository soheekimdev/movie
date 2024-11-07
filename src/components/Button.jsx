export default function Button({
  type = 'button',
  style = 'default',
  color = 'neutral',
  size = 'md',
  className,
  children,
}) {
  const typeStyles = {
    default: 'inline-flex items-center justify-center',
    link: 'inline-flex items-center justify-center underline hover:no-underline',
  };

  const colorStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    neutral: 'bg-transparent hover:bg-gray-50 text-gray-500 border border-gray-400',
  };

  const sizeStyles = {
    sm: 'text-sm px-3 py-1 rounded',
    md: 'text-base px-4 py-2 rounded-md',
    lg: 'text-lg px-6 py-3 rounded-lg',
    xl: 'text-xl px-8 py-4 rounded-xl',
  };

  const renderButton = () => {
    switch (type) {
      case 'link':
        return (
          <button type={type} className={`${typeStyles[style]} ${colorStyles[color]} ${className}`}>
            {children}
          </button>
        );
      default:
        return (
          <button
            type={type}
            className={`${typeStyles.default} ${colorStyles[color]} ${sizeStyles[size]} ${className}`}
          >
            {children}
          </button>
        );
    }
  };

  return renderButton();
}
