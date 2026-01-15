import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`bg-white rounded-xl border border-neutral-200 ${className}`}>
      {title && (
        <div className="px-5 py-4 border-b border-neutral-100">
          <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
