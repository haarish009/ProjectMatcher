import React from 'react';
import { Interest } from '../types';
import { interests } from '../data/interests';
import { useUser } from '../contexts/UserContext';
import * as LucideIcons from 'lucide-react';

const InterestSelector: React.FC = () => {
  const { userProfile, updateInterests } = useUser();
  
  const handleInterestClick = (interestId: string) => {
    if (userProfile.interests.includes(interestId)) {
      updateInterests(userProfile.interests.filter(id => id !== interestId));
    } else {
      updateInterests([...userProfile.interests, interestId]);
    }
  };
  
  // Dynamically get the Lucide icon component
  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as Record<string, React.ComponentType<{size?: number, className?: string}>>)[iconName];
    return IconComponent ? <IconComponent size={24} className="mb-2 text-blue-500" /> : null;
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Select Your Interests</h2>
      <p className="text-gray-600 mb-4">Choose one or more fields that interest you</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {interests.map((interest: Interest) => (
          <button
            key={interest.id}
            onClick={() => handleInterestClick(interest.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
              userProfile.interests.includes(interest.id)
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            {getIconComponent(interest.icon)}
            <span className="font-medium">{interest.name}</span>
            <span className="text-xs text-gray-500 text-center mt-1">{interest.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InterestSelector;