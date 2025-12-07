import React, { useState } from 'react';
import { STYLES, PROPERTY_TYPES, ROOM_TYPES, COLOR_PALETTE_OPTIONS, MATERIALS, LIGHTING_PREFERENCES } from '../constants';
import { DesignInputs } from '../types';

interface DesignFormProps {
  onSubmit: (inputs: DesignInputs) => void;
  isLoading: boolean;
  initialValues?: Partial<DesignInputs>;
}

const DesignForm: React.FC<DesignFormProps> = ({ onSubmit, isLoading, initialValues }) => {
  const [inputs, setInputs] = useState<DesignInputs>({
    style: initialValues?.style || '',
    propertyType: initialValues?.propertyType || '',
    roomType: initialValues?.roomType || '',
    size: initialValues?.size || '',
    colorPalette: initialValues?.colorPalette || '',
    materials: initialValues?.materials || '',
    lighting: initialValues?.lighting || '',
    details: initialValues?.details || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DesignInputs, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof DesignInputs, string>> = {};
    if (!inputs.style) newErrors.style = "Please select a style";
    if (!inputs.propertyType) newErrors.propertyType = "Please select a property type";
    if (!inputs.roomType) newErrors.roomType = "Please select a room type";
    if (!inputs.size) newErrors.size = "Please enter the room size";
    if (!inputs.colorPalette) newErrors.colorPalette = "Please select a palette";
    if (!inputs.materials) newErrors.materials = "Please select materials";
    if (!inputs.lighting) newErrors.lighting = "Please select lighting";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(inputs);
    }
  };

  const handleChange = (field: keyof DesignInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const SelectGroup = ({ label, field, options, placeholder }: { label: string, field: keyof DesignInputs, options: string[], placeholder: string }) => (
    <div className="space-y-2">
      <label className="block font-sans text-xs font-bold uppercase tracking-wider text-stone-500">{label}</label>
      <div className="relative">
        <select
          value={inputs[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          className={`w-full appearance-none bg-stone-50 border ${errors[field] ? 'border-red-400' : 'border-stone-200'} px-4 py-3 pr-8 rounded-none text-stone-900 focus:outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition-colors`}
          disabled={isLoading}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div id="design-form" className="w-full max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm border border-stone-100 mt-12 mb-20">
      <div className="mb-10 text-center">
        <h2 className="font-serif text-3xl text-stone-900 mb-2">Welcome to Bamx Belmore AI</h2>
        <p className="text-stone-500 font-sans">We'll craft the perfect visualization for your needs.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Row 1: Style & Property */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectGroup 
            label="Interior Style" 
            field="style" 
            options={STYLES} 
            placeholder="Choose your style" 
          />
          <SelectGroup 
            label="Property Type" 
            field="propertyType" 
            options={PROPERTY_TYPES} 
            placeholder="What type of property?" 
          />
        </div>

        {/* Row 2: Room & Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectGroup 
            label="Which Room?" 
            field="roomType" 
            options={ROOM_TYPES} 
            placeholder="Select room" 
          />
          <div className="space-y-2">
            <label className="block font-sans text-xs font-bold uppercase tracking-wider text-stone-500">Size (m²)</label>
            <input
              type="number"
              value={inputs.size}
              onChange={(e) => handleChange('size', e.target.value)}
              placeholder="e.g. 25"
              className={`w-full bg-stone-50 border ${errors.size ? 'border-red-400' : 'border-stone-200'} px-4 py-3 rounded-none text-stone-900 focus:outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition-colors`}
              disabled={isLoading}
            />
            <p className="text-[10px] text-stone-400">Approximate square meters helps shape the layout.</p>
             {errors.size && <p className="text-red-500 text-xs mt-1">{errors.size}</p>}
          </div>
        </div>

        {/* Row 3: Color Palette (Visual) */}
        <div className="space-y-3">
          <label className="block font-sans text-xs font-bold uppercase tracking-wider text-stone-500">Color Palette</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {COLOR_PALETTE_OPTIONS.map((option) => {
              const isSelected = inputs.colorPalette === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleChange('colorPalette', option.value)}
                  disabled={isLoading}
                  className={`relative flex flex-col items-center p-4 border transition-all duration-200 text-left group
                    ${isSelected 
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900' 
                      : 'border-stone-200 hover:border-stone-400 hover:shadow-sm bg-white'
                    }
                  `}
                >
                  <div className="flex -space-x-2 mb-3">
                    {option.colors.map((color, idx) => (
                      <div 
                        key={idx}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className={`text-xs font-bold text-center ${isSelected ? 'text-stone-900' : 'text-stone-600'}`}>
                    {option.label}
                  </span>
                  {isSelected && (
                    <div className="absolute top-2 right-2 text-stone-900">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          {errors.colorPalette && <p className="text-red-500 text-xs mt-1">{errors.colorPalette}</p>}
        </div>

        {/* Row 4: Materials & Lighting */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <SelectGroup 
            label="Materials Focus" 
            field="materials" 
            options={MATERIALS} 
            placeholder="Select materials" 
          />
           <SelectGroup 
            label="Lighting Vibe" 
            field="lighting" 
            options={LIGHTING_PREFERENCES} 
            placeholder="Select lighting" 
          />
        </div>

        {/* Row 5: Details */}
        <div className="space-y-2">
          <label className="block font-sans text-xs font-bold uppercase tracking-wider text-stone-500">Extra Details (Optional)</label>
          <textarea
            value={inputs.details}
            onChange={(e) => handleChange('details', e.target.value)}
            placeholder="Example: floor-to-ceiling windows, specific furniture piece, art on walls, cozy reading corner..."
            rows={3}
            className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-none text-stone-900 focus:outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition-colors resize-none"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-stone-900 text-white font-sans text-sm font-bold uppercase tracking-widest py-5 hover:bg-stone-800 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
               Designing your space...
            </span>
          ) : "Generate 3 Design Concepts"}
        </button>
      </form>
    </div>
  );
};

export default DesignForm;