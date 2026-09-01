import type { CompanyInfo } from '@/types/company';

export const companyInfo: CompanyInfo = {
  name: 'Mouana Phuket',
  developer: 'Modern 79',
  yearsExperience: 17,
  tagline: 'Find Your Dream Home',
  description: 'At Mouana Phuket, we bring over 17 years of dedicated expertise to the art of luxury living, proudly curating exceptional spaces that redefine paradise. With a legacy spanning two decades and 20 successful projects, we\'ve stood as a symbol of quality and reliability.',
  stats: {
    projects: 7,
    villas: 128,
    villasAvailable: 56,
    villasInProgress: 48,
  },
  services: [
    { icon: 'home', titleKey: 'services.privateVilla', descriptionKey: 'services.privateVillaDesc' },
    { icon: 'users', titleKey: 'services.communityLiving', descriptionKey: 'services.communityLivingDesc' },
    { icon: 'scale', titleKey: 'services.legalSupport', descriptionKey: 'services.legalSupportDesc' },
    { icon: 'building', titleKey: 'services.facilities', descriptionKey: 'services.facilitiesDesc' },
    { icon: 'trending-up', titleKey: 'services.investment', descriptionKey: 'services.investmentDesc' },
    { icon: 'headphones', titleKey: 'services.concierge', descriptionKey: 'services.conciergeDesc' },
    { icon: 'palette', titleKey: 'services.interiorDesign', descriptionKey: 'services.interiorDesignDesc' },
    { icon: 'leaf', titleKey: 'services.sustainable', descriptionKey: 'services.sustainableDesc' },
  ],
  contact: {
    email: 'sales@mouanaphuket.com',
    phone: '+66 65 159 5666',
    whatsapp: '+66651595666',
    address: '1/100 Moo.5, Chaofa Rd, Chalong, Muang, Phuket 83130',
    coordinates: { lat: 7.8434, lng: 98.3370 },
  },
};
