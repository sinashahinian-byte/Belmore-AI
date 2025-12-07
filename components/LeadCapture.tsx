import React, { useState } from 'react';

const LeadCapture: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to backend
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full bg-stone-100 py-12 text-center">
        <h3 className="font-serif text-2xl text-stone-900 mb-2">Thank you!</h3>
        <p className="text-stone-600">Our design team will be in touch shortly to discuss your project.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-stone-900 text-stone-50 py-16 px-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-serif text-3xl mb-4">Realize your vision</h3>
          <p className="text-stone-400 leading-relaxed">
            Like what you see? Share your generated concepts with our senior interior designers. We can help you turn these AI inspirations into construction-ready plans.
          </p>
        </div>
        
        <div className="flex-1 w-full max-w-md">
           <form onSubmit={handleSubmit} className="space-y-4">
             <div>
               <label className="sr-only">Name</label>
               <input type="text" placeholder="Your Name" required className="w-full bg-stone-800 border-none text-stone-50 px-4 py-3 placeholder-stone-500 focus:ring-1 focus:ring-stone-400" />
             </div>
             <div>
               <label className="sr-only">Email</label>
               <input type="email" placeholder="Email Address" required className="w-full bg-stone-800 border-none text-stone-50 px-4 py-3 placeholder-stone-500 focus:ring-1 focus:ring-stone-400" />
             </div>
             <button type="submit" className="w-full bg-stone-50 text-stone-900 font-bold uppercase tracking-widest text-xs py-4 hover:bg-stone-200 transition-colors">
               Send to our Design Team
             </button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default LeadCapture;