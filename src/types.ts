export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageSrc: string;
  liveUrl: string;
  githubUrl: string;
  category: string;
  highlighted?: boolean;
  longDescription?: string;
  features?: string[];
  architecture?: string;
  gallery?: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; icon?: string }[];
}

export interface ExperienceMilestone {
  id: string;
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  description: string;
  tags?: string[];
  isCurrent?: boolean;
}

export interface EducationMilestone {
  id: string;
  period: string;
  degree: string;
  institution: string;
  location: string;
  description: string;
  grade?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}
