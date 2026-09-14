export interface ProjectCategory {
  id: string;
  name: string;
  description: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  description: string;
  image: string;
  tag: string;
}

export interface SiteStatus {
  phase: string;
  code: string;
  coordinates: string;
  elevation: string;
  temperature: string;
  safetyRating: string;
}
