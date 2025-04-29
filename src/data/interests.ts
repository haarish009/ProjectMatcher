import { Interest } from '../types';
import { BookOpen, Code, Database, Bot, Cpu, Globe, Phone, BarChart } from 'lucide-react';

export const interests: Interest[] = [
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    description: 'Build intelligent systems that can learn and make decisions',
    icon: Bot.name
  },
  {
    id: 'webdev',
    name: 'Web Development',
    description: 'Create interactive websites and web applications',
    icon: Globe.name
  },
  {
    id: 'robotics',
    name: 'Robotics',
    description: 'Design and program robots and automated systems',
    icon: Cpu.name
  },
  {
    id: 'mobile',
    name: 'Mobile App Development',
    description: 'Build applications for smartphones and tablets',
    icon: Phone.name
  },
  {
    id: 'dataScience',
    name: 'Data Science',
    description: 'Analyze and extract insights from complex datasets',
    icon: BarChart.name
  },
  {
    id: 'backend',
    name: 'Backend Development',
    description: 'Design and build server-side applications and APIs',
    icon: Database.name
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    description: 'Create user interfaces with modern frameworks',
    icon: Code.name
  },
  {
    id: 'machineLearning',
    name: 'Machine Learning',
    description: 'Build systems that can learn from data and improve over time',
    icon: BookOpen.name
  }
];