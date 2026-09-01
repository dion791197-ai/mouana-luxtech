export type ProjectStatus = 'available' | 'sold_out' | 'coming_soon';

export interface VillaType {
  name: string;
  usableArea: number;
  landArea: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  maidRoom?: boolean;
  floorPlan: string;
  areaPlan: string;
  description?: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  coordinates: { lat: number; lng: number };
  status: ProjectStatus;
  heroImage: string;
  description: string;
  projectArea: string;
  landArea: string;
  usableArea: string;
  projectType: string;
  totalUnits: number;
  unitType: string;
  residentialUnits: number;
  introduction: string;
  locationAdvantage: string;
  masterPlanImage: string;
  villaTypes: VillaType[];
  gallery: string[];
  metaTitle: string;
  metaDescription: string;
}
