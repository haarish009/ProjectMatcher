import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, ProjectRecommendation } from '../types';
import { getProjectRecommendations } from '../models/decisionTree';

interface UserContextType {
  userProfile: UserProfile;
  recommendations: ProjectRecommendation[];
  updateInterests: (interests: string[]) => void;
  updateSkills: (skills: string[]) => void;
  updateExperienceLevel: (level: 'Beginner' | 'Intermediate' | 'Advanced') => void;
  getRecommendations: () => void;
  isRecommending: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    interests: [],
    skills: [],
    experienceLevel: 'Beginner'
  });
  
  const [recommendations, setRecommendations] = useState<ProjectRecommendation[]>([]);
  const [isRecommending, setIsRecommending] = useState(false);
  
  const updateInterests = (interests: string[]) => {
    setUserProfile(prev => ({ ...prev, interests }));
  };
  
  const updateSkills = (skills: string[]) => {
    setUserProfile(prev => ({ ...prev, skills }));
  };
  
  const updateExperienceLevel = (experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced') => {
    setUserProfile(prev => ({ ...prev, experienceLevel }));
  };
  
  const getRecommendations = () => {
    setIsRecommending(true);
    // Simulate delay to show loading state (would be a real API call in production)
    setTimeout(() => {
      const newRecommendations = getProjectRecommendations(userProfile);
      setRecommendations(newRecommendations);
      setIsRecommending(false);
    }, 1000);
  };
  
  return (
    <UserContext.Provider value={{
      userProfile,
      recommendations,
      updateInterests,
      updateSkills,
      updateExperienceLevel,
      getRecommendations,
      isRecommending
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};