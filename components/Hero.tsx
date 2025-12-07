import React from 'react';

interface HeroProps {
  onStartClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <div className="space-y-8 animate-fade-in-up">
        <div className="space-y-4">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-stone-900 leading-[1.1]">
            Design Inspirations, <br />
            <span className="italic text-stone-600">Generated Just for You</span>
          </h1>
          <p className="font-serif text-xl md:text-2xl text-stone-700">
            Answer a few questions and get three AI-generated interior concepts tailored to your space.
          </p>
          <p className="font-sans text-sm text-stone-500 uppercase tracking-widest">
            Perfect for apartments, villas or offices
          </p>
        </div>

        <button 
          onClick={onStartClick}
          className="group relative inline-flex items-center justify-center px-8 py-4 bg-stone-900 text-stone-50 font-sans text-sm tracking-wider uppercase transition-all duration-300 hover:bg-stone-800 hover:shadow-lg"
        >
          Start Creating
          <svg className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Right Content - Visual */}
      <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden hidden md:block">
        <div className="absolute inset-0 bg-stone-50">
           {/* Collage effect */}
           <div className="absolute top-0 right-0 w-3/4 h-3/4 z-10 overflow-hidden shadow-2xl">
             <img 
               src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
               alt="Modern Minimalist Interior" 
               className="w-full h-full object-cover opacity-95 hover:scale-105 transition-transform duration-1000"
             />
           </div>
           <div className="absolute bottom-0 left-0 w-1/2 h-1/2 z-20 overflow-hidden shadow-xl border-4 border-stone-50">
             <img 
               src="https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
               alt="Interior Design Detail" 
               className="w-full h-full object-cover"
             />
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;