import React from 'react';

interface BigButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  shadowColor?: string;
  size?: 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export const BigButton: React.FC<BigButtonProps> = ({
  color = '#FF9F43',
  shadowColor = 'rgba(0,0,0,0.2)',
  size = 'lg',
  className = '',
  style,
  children,
  ...rest
}) => {
  const sizeCls =
    size === 'xl'
      ? 'min-h-[88px] px-8 py-4 text-2xl sm:text-3xl'
      : size === 'lg'
      ? 'min-h-[72px] px-6 py-3.5 text-xl'
      : 'min-h-[56px] px-5 py-2.5 text-lg';

  return (
    <button
      type="button"
      {...rest}
      style={
        {
          backgroundColor: color,
          '--kid-btn-shadow': shadowColor,
          ...style,
        } as React.CSSProperties
      }
      className={`kid-btn-3d rounded-full font-kid font-extrabold text-white inline-flex items-center justify-center gap-3 select-none active:scale-[0.98] disabled:opacity-45 disabled:cursor-not-allowed ${sizeCls} ${className}`}
    >
      {children}
    </button>
  );
};
