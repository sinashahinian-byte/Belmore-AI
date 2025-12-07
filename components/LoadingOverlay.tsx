import React from 'react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin mb-8"></div>
      <h2 className="font-serif text-2xl text-stone-900 animate-pulse">Designing your space...</h2>
      <p className="text-stone-500 mt-2 font-sans text-sm tracking-wide">
        Creating three unique concepts to inspire you.
      </p>
    </div>
  );
};

export default LoadingOverlay;