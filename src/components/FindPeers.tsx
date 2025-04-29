import React from 'react';
import { useUser } from '../contexts/UserContext';
import { Users, UserPlus } from 'lucide-react';
import { skills } from '../data/skills';

// Simulated peer data (in a real app, this would come from a database)
const peers = [
  { id: 1, name: 'Alex Chen', skills: ['python', 'tensorflow', 'react', 'django'], expertise: 'Intermediate' },
  { id: 2, name: 'Jamie Taylor', skills: ['javascript', 'react', 'node', 'mongodb'], expertise: 'Advanced' },
  { id: 3, name: 'Sam Rodriguez', skills: ['java', 'csharp', 'cpp', 'mongodb'], expertise: 'Intermediate' },
  { id: 4, name: 'Taylor Kim', skills: ['python', 'sklearn', 'pandas', 'numpy'], expertise: 'Advanced' },
  { id: 5, name: 'Jordan Patel', skills: ['html', 'css', 'javascript', 'figma'], expertise: 'Beginner' },
];

const FindPeers: React.FC = () => {
  const { userProfile, recommendations } = useUser();
  
  if (recommendations.length === 0) {
    return null;
  }
  
  // Get top recommended project
  const topProject = recommendations[0].project;
  
  // Get skill names instead of IDs
  const getSkillName = (skillId: string) => {
    const skill = skills.find(s => s.id === skillId);
    return skill ? skill.name : skillId;
  };
  
  // Find complementary peers based on missing skills
  const missingSkills = recommendations[0].missingSkills;
  const recommendedPeers = peers.filter(peer => 
    peer.skills.some(skill => missingSkills.includes(skill))
  ).slice(0, 3);
  
  if (recommendedPeers.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center mb-4">
        <Users size={20} className="text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold">Find Collaborators</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        These students have complementary skills for your top project: <strong>{topProject.title}</strong>
      </p>
      
      <div className="space-y-4">
        {recommendedPeers.map(peer => (
          <div 
            key={peer.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <div>
              <h3 className="font-medium text-gray-800">{peer.name}</h3>
              <p className="text-sm text-gray-500">{peer.expertise} level</p>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {peer.skills
                  .filter(skill => missingSkills.includes(skill))
                  .map(skill => (
                    <span 
                      key={skill}
                      className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs"
                    >
                      {getSkillName(skill)}
                    </span>
                  ))}
              </div>
            </div>
            
            <button className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
              <UserPlus size={14} className="mr-1" />
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindPeers;