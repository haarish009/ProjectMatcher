export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface Interest {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  interestField: string;
  requiredSkills: string[];
  estimatedHours: number;
  collaborationSize: number;
}

export interface Course {
  id: string;
  title: string;
  platform: 'Udemy' | 'Coursera' | 'YouTube' | 'edX';
  url: string;
  skills: string[];
  rating: number;
  hours: number;
}

export interface UserProfile {
  interests: string[];
  skills: string[];
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface ProjectRecommendation {
  project: Project;
  matchScore: number;
  missingSkills: string[];
  relevantCourses: Course[];
}