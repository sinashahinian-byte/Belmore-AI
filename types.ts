export interface DesignInputs {
  style: string;
  propertyType: string;
  roomType: string;
  size: number | string;
  colorPalette: string;
  materials: string;
  lighting: string;
  details: string;
}

export interface DesignConcept {
  id: string;
  imageUrl: string; // Base64 data URL
  title: string;
  description: string;
  inputs: DesignInputs;
  timestamp: number;
}

export enum LoadingState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}