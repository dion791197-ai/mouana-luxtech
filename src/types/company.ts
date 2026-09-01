export interface CompanyStats {
  projects: number;
  villas: number;
  villasAvailable: number;
  villasInProgress: number;
}

export interface Service {
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

export interface CompanyInfo {
  name: string;
  developer: string;
  yearsExperience: number;
  tagline: string;
  description: string;
  stats: CompanyStats;
  services: Service[];
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    coordinates: { lat: number; lng: number };
  };
}
