import React, { useState, useRef, useEffect } from 'react';
import DesignForm from './components/DesignForm';
import ResultsGrid from './components/ResultsGrid';
import HistorySection from './components/HistorySection';
import LeadCapture from './components/LeadCapture';
import LoadingOverlay from './components/LoadingOverlay';
import { generateDesignConcepts } from './services/geminiService';
import { DesignInputs, DesignConcept, LoadingState } from './types';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [currentConcepts, setCurrentConcepts] = useState<DesignConcept[]>([]);
  const [history, setHistory] = useState<DesignConcept[]>([]);
  const [formInitialValues, setFormInitialValues] = useState<Partial<DesignInputs>>({});
  const [showEmbedToast, setShowEmbedToast] = useState(false);
  
  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleGenerate = async (inputs: DesignInputs) => {
    setLoadingState(LoadingState.GENERATING);
    try {
      const concepts = await generateDesignConcepts(inputs);
      setCurrentConcepts(concepts);
      setHistory(prev => [...concepts, ...prev].slice(0, 12)); // Keep last 12
      setLoadingState(LoadingState.COMPLETE);
    } catch (error) {
      console.error(error);
      setLoadingState(LoadingState.ERROR);
      alert("Something went wrong while communicating with the design AI. Please check your API key and try again.");
    }
  };

  // Scroll to results when generation completes
  useEffect(() => {
    if (loadingState === LoadingState.COMPLETE) {
      // Small timeout to ensure DOM render
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [loadingState]);

  const handleRefine = (concept: DesignConcept) => {
    setFormInitialValues(concept.inputs);
    scrollToForm();
  };

  const handleCopyEmbed = () => {
    const url = window.location.href;
    const embedCode = `<iframe src="${url}" width="100%" height="800" style="border:0; width:100%; min-height:100vh;"></iframe>`;
    
    navigator.clipboard.writeText(embedCode).then(() => {
      setShowEmbedToast(true);
      setTimeout(() => setShowEmbedToast(false), 3000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {/* Navbar (Simple Brand) */}
      <header className="w-full py-6 px-6 md:px-12 flex justify-between items-center bg-stone-50">
        <div className="text-2xl font-serif tracking-tighter text-stone-900 font-bold">
          Bamx Belmore.
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-stone-400">
          Interior Design AI
        </div>
      </header>

      <main className="flex-grow">
        {/* Tool Section - Hero removed */}
        <div ref={formRef}>
          <DesignForm 
            onSubmit={handleGenerate} 
            isLoading={loadingState === LoadingState.GENERATING}
            initialValues={formInitialValues}
          />
        </div>

        {loadingState === LoadingState.GENERATING && <LoadingOverlay />}

        <div ref={resultsRef} className="bg-stone-50">
          <ResultsGrid 
            concepts={currentConcepts} 
            onRefine={handleRefine}
          />
        </div>

        <div className="bg-white">
          <HistorySection history={history} />
        </div>
      </main>

      <LeadCapture />

      <footer className="bg-stone-900 text-stone-600 py-12 px-6 text-center text-sm border-t border-stone-800">
        <div className="flex flex-col items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Bamx Belmore. All rights reserved.</p>
          <p className="text-xs">Generated images are for inspiration purposes only.</p>
          
          <button 
            onClick={handleCopyEmbed}
            className="mt-4 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-stone-300 hover:bg-stone-800 transition-all rounded"
          >
            Copy Embed Code
          </button>
        </div>
      </footer>

      {/* Toast Notification */}
      {showEmbedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-6 py-4 shadow-xl flex items-center gap-3 animate-fade-in-up rounded-sm">
          <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-sans text-sm font-medium tracking-wide">Embed code copied to clipboard</span>
        </div>
      )}
    </div>
  );
};

export default App;