
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string; // URL to your project screenshot
  metrics?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  isCurrent?: boolean;
  link?: string;     // Link to a certificate, game, or company site
  linkText?: string; // Label for the link (e.g., "View on Twitch")
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Honor {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  summary: string;
  yearsOfExperience: string;
  skills: {
    programming: string[];
    erp: string[];
    tools: string[];
    business: string[];
  };
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  honors: Honor[];
  socials: {
    github: string;
    linkedin: string;
    email: string;
    profileImage?: string; // Link to your headshot
  };
}
