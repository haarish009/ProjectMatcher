import React, { useState } from 'react';
import { skills } from '../data/skills';
import { useUser } from '../contexts/UserContext';

const SkillSelector: React.FC = () => {
  const { userProfile, updateSkills, updateExperienceLevel } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Get unique categories
  const categories = ['all', ...Array.from(new Set(skills.map(skill => skill.category)))];
  
  // Filter skills based on search and category
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const handleSkillClick = (skillId: string) => {
    if (userProfile.skills.includes(skillId)) {
      updateSkills(userProfile.skills.filter(id => id !== skillId));
    } else {
      updateSkills([...userProfile.skills, skillId]);
    }
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Select Your Skills</h2>
      <p className="text-gray-600 mb-4">Choose all the skills you currently have</p>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Your Experience Level</h3>
        <div className="flex flex-wrap gap-2">
          {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
            <button
              key={level}
              onClick={() => updateExperienceLevel(level as any)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                userProfile.experienceLevel === level
                  ? 'bg-blue-500 text-white font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search for skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filteredSkills.map(skill => (
          <button
            key={skill.id}
            onClick={() => handleSkillClick(skill.id)}
            className={`px-3 py-1 rounded-full text-sm transition-all ${
              userProfile.skills.includes(skill.id)
                ? 'bg-blue-500 text-white font-medium'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {skill.name}
          </button>
        ))}
      </div>
      
      <div className="mt-4">
        <h3 className="font-medium mb-2">Selected Skills ({userProfile.skills.length})</h3>
        <div className="flex flex-wrap gap-2">
          {userProfile.skills.length === 0 ? (
            <div className="text-gray-500 italic">No skills selected</div>
          ) : (
            userProfile.skills.map(skillId => {
              const skill = skills.find(s => s.id === skillId);
              return skill ? (
                <div key={skill.id} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center">
                  {skill.name}
                  <button 
                    onClick={() => handleSkillClick(skill.id)} 
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    ✕
                  </button>
                </div>
              ) : null;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillSelector;