import React from 'react';
import { DesignConcept } from '../types';

interface HistorySectionProps {
  history: DesignConcept[];
}

const HistorySection: React.FC<HistorySectionProps> = ({ history }) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 border-t border-stone-200">
      <h3 className="font-serif text-2xl text-stone-900 mb-8">Previous Inspirations</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {history.map((item) => (
          <div key={item.id} className="group relative aspect-square overflow-hidden cursor-pointer">
             <img 
               src={item.imageUrl} 
               alt={item.title} 
               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
             />
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 text-center">
               <p className="text-white text-xs font-serif">{item.title}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorySection;