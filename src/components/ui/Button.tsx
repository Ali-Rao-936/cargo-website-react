import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:opacity-50 disabled:pointer-events-none uppercase tracking-widest",
          {
            'bg-brand-orange text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20': variant === 'primary',
            'bg-brand-blue text-white hover:bg-blue-800 shadow-lg shadow-blue-900/20': variant === 'secondary',
            'bg-white border text-slate-600 hover:bg-slate-50 border-slate-200': variant === 'outline',
            'hover:bg-slate-100 text-slate-700': variant === 'ghost',
            'py-2 px-4 text-[10px]': size === 'sm',
            'py-3 px-6 text-xs': size === 'md',
            'py-4 px-8 text-sm rounded-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
