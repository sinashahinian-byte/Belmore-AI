import { GoogleGenAI } from "@google/genai";
import { DesignInputs, DesignConcept } from "../types";
import { CONCEPT_ADJECTIVES } from "../constants";

// Helper to get a random item from array
const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Generate a specific prompt for the AI based on user input and a specific variation angle
const createPrompt = (inputs: DesignInputs, variation: 'light' | 'texture' | 'contrast'): string => {
  const base = `Photorealistic interior design photography of a ${inputs.size} square meter ${inputs.roomType} in a ${inputs.propertyType}.`;
  
  const specifics = `Style: ${inputs.style}. Color Palette: ${inputs.colorPalette}. Key Materials: ${inputs.materials}. Lighting: ${inputs.lighting}.`;
  
  const details = inputs.details ? ` Specific requirements: ${inputs.details}.` : '';
  
  let twist = '';
  switch (variation) {
    case 'light':
      twist = 'Emphasis on the specified lighting atmosphere, capturing the mood and airiness.';
      break;
    case 'texture':
      twist = 'Close attention to the tactile nature of the specified materials, focusing on finishes and fabric details.';
      break;
    case 'contrast':
      twist = 'A more dramatic composition focusing on the interplay between the color palette and the architectural form.';
      break;
  }

  return `${base} ${specifics}${details} ${twist} High resolution, architectural digest style, 8k, extremely detailed.`;
};

// Helper to generate a text description for the concept (simulated for speed/reliability)
const generateMeta = (inputs: DesignInputs, index: number): { title: string; description: string } => {
  const adjective = getRandom(CONCEPT_ADJECTIVES);
  const title = `Concept ${index + 1} – ${adjective} ${inputs.style} ${inputs.roomType}`;
  
  let description = '';
  if (index === 0) {
    description = `A ${inputs.style.toLowerCase()} approach prioritizing the ${inputs.lighting.toLowerCase()} and an open flow suited for a ${inputs.propertyType.toLowerCase()}.`;
  } else if (index === 1) {
    description = `Highlighted by ${inputs.materials.toLowerCase()} and curated pieces, this layout maximizes the ${inputs.size}m² footprint in ${inputs.colorPalette.toLowerCase()} tones.`;
  } else {
    description = `A balanced composition focusing on functionality and mood, integrating your request for ${inputs.details ? 'specific details' : 'a unique look'} with ${inputs.materials.toLowerCase()}.`;
  }

  return { title, description };
};

export const generateDesignConcepts = async (inputs: DesignInputs): Promise<DesignConcept[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-2.5-flash-image"; // Using "Nanobana" model as requested

  const variations: ('light' | 'texture' | 'contrast')[] = ['light', 'texture', 'contrast'];
  
  try {
    // Generate 3 images in parallel
    const promises = variations.map(async (variation, index) => {
      const prompt = createPrompt(inputs, variation);
      
      const response = await ai.models.generateContent({
        model: model,
        contents: {
          parts: [{ text: prompt }],
        },
      });

      // Extract image
      let imageUrl = '';
      if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
           if (part.inlineData) {
             imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
             break;
           }
        }
      }

      if (!imageUrl) {
        // Fallback placeholder if generation fails for one part (though unlikely with correct setup)
        // In a real app, we might retry or throw.
        throw new Error("Failed to generate image data");
      }

      const meta = generateMeta(inputs, index);

      return {
        id: crypto.randomUUID(),
        imageUrl,
        title: meta.title,
        description: meta.description,
        inputs: inputs,
        timestamp: Date.now()
      };
    });

    return await Promise.all(promises);

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};