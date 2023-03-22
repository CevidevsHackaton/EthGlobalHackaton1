import React, { ReactNode } from 'react';

const CardFrame = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <article
      className={`rounded-lg shadow-lg bg-white p-4 sm:p-6 lg:p-8 ${className}`}>
      {children}
    </article >
  );
};

export default CardFrame;