import React from 'react';
import { DesignConcept } from '../types';

interface ResultsGridProps {
  concepts: DesignConcept[];
  onRefine: (concept: DesignConcept) => void;
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ concepts, onRefine }) => {
  if (concepts.length === 0) return null;

  const handleDownload = (concept: DesignConcept) => {
    const link = document.createElement('a');
    link.href = concept.imageUrl;
    link.download = `bamx-belmore-concept-${concept.id.slice(0, 8)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="results" className="w-full max-w-7xl mx-auto px-6 py-16 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl text-stone-900 mb-3">Your Design Inspirations</h2>
        <p className="text-stone-500 font-sans max-w-2xl mx-auto">
          Here are three concepts based on your answers. Use them as a starting point for your project.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {concepts.map((concept) => {
          const size = Number(concept.inputs.size) || 0;
          const estimatedCost = size * 2000;

          return (
            <div key={concept.id} className="group flex flex-col bg-white border border-stone-100 hover:shadow-xl transition-shadow duration-500 ease-out">
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                <img 
                  src={concept.imageUrl} 
                  alt={concept.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-serif text-xl text-stone-900 mb-3">{concept.title}</h3>
                <p className="font-sans text-stone-500 text-sm leading-relaxed mb-6 flex-grow">
                  {concept.description}
                </p>

                {/* Pricing Estimate */}
                <div className="mb-6 pt-4 border-t border-stone-100">
                  <p className="font-serif text-lg text-stone-900">
                    From {estimatedCost.toLocaleString()} AED <span className="text-xs font-sans text-stone-500 tracking-wide uppercase ml-1">for this fit-out</span>
                  </p>
                </div>

                <div className="flex gap-3 mt-auto">
                  <button 
                    onClick={() => handleDownload(concept)}
                    className="flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider border border-stone-200 text-stone-800 hover:bg-stone-50 transition-colors"
                  >
                    Download
                  </button>
                  <button 
                    onClick={() => onRefine(concept)}
                    className="flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider bg-stone-900 text-stone-50 hover:bg-stone-800 transition-colors"
                  >
                    Refine
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsGrid;