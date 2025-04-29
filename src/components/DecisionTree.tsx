import React from 'react';
import { useUser } from '../contexts/UserContext';
import { skills } from '../data/skills';
import { interests } from '../data/interests';

const DecisionTree: React.FC = () => {
  const { userProfile, recommendations } = useUser();
  
  if (recommendations.length === 0) {
    return null;
  }
  
  // Get skill names instead of IDs
  const getSkillName = (skillId: string) => {
    const skill = skills.find(s => s.id === skillId);
    return skill ? skill.name : skillId;
  };
  
  // Get interest name instead of ID
  const getInterestName = (interestId: string) => {
    const interest = interests.find(i => i.id === interestId);
    return interest ? interest.name : interestId;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">How We Matched You</h2>
      <p className="text-gray-600 mb-6">
        Our recommendation algorithm uses a decision tree approach to match your profile with suitable projects.
        Here's how we selected these projects for you:
      </p>
      
      <div className="relative">
        {/* Main trunk line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
        
        {/* Input Features Section */}
        <div className="relative mb-8 pl-12">
          <div className="absolute left-4 top-1/2 h-0.5 w-8 bg-blue-200"></div>
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500"></div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2">Your Inputs</h3>
            
            <div className="space-y-2 text-sm">
              <div>
                <strong className="text-gray-700">Interests:</strong> 
                <span className="ml-2">
                  {userProfile.interests.length > 0
                    ? userProfile.interests.map(i => getInterestName(i)).join(', ')
                    : 'None selected'}
                </span>
              </div>
              
              <div>
                <strong className="text-gray-700">Experience Level:</strong> 
                <span className="ml-2">{userProfile.experienceLevel}</span>
              </div>
              
              <div>
                <strong className="text-gray-700">Skills:</strong> 
                <div className="ml-2 flex flex-wrap gap-1 mt-1">
                  {userProfile.skills.length > 0 ? (
                    userProfile.skills.map(skillId => (
                      <span 
                        key={skillId}
                        className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs"
                      >
                        {getSkillName(skillId)}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">None selected</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Process Node */}
        <div className="relative mb-8 pl-12">
          <div className="absolute left-4 top-1/2 h-0.5 w-8 bg-blue-200"></div>
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500"></div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2">Decision Process</h3>
            
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>Filter projects by your selected interest fields</li>
              <li>Calculate skill match percentage for each project</li>
              <li>Assess difficulty level compatibility with your experience</li>
              <li>Identify skill gaps and find relevant learning resources</li>
              <li>Score and rank projects based on overall match</li>
            </ol>
          </div>
        </div>
        
        {/* Output Section */}
        <div className="relative pl-12">
          <div className="absolute left-4 top-1/2 h-0.5 w-8 bg-blue-200"></div>
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500"></div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2">Results</h3>
            
            <div className="space-y-3 text-sm">
              {recommendations.slice(0, 3).map((rec, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-10 h-1 bg-blue-500 rounded-full mr-2"
                    style={{ width: `${Math.round(rec.matchScore * 100)}px`, maxWidth: '40px' }}
                  ></div>
                  <div className="text-gray-700">{rec.project.title} ({Math.round(rec.matchScore * 100)}% match)</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionTree;