export interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'delivery' | 'concept';
}

export interface ClientData {
  name: string;
  testimonial: string;
}

export type FormStep = 'intro' | 'goal' | 'scope' | 'existing' | 'contact' | 'recap' | 'success';

export interface FormData {
  industry: string;
  goal: string;
  scope: string;
  existing: string;
  email: string;
}
