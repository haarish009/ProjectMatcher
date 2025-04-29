import React, { useState } from 'react';
import { ProjectRecommendation } from '../types';
import { skills } from '../data/skills';
import { ArrowRight, BookOpen, Clock, Users, ChevronDown, ChevronUp } from 'lucide-react';

interface ProjectCardProps {
  recommendation: ProjectRecommendation;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ recommendation, index }) => {
  const [expanded, setExpanded] = useState(false);
  const { project, matchScore, missingSkills, relevantCourses } = recommendation;
  
  // Get the actual skill names instead of IDs
  const getSkillName = (skillId: string) => {
    const skill = skills.find(s => s.id === skillId);
    return skill ? skill.name : skillId;
  };
  
  // Format match score as percentage
  const matchPercentage = Math.round(matchScore * 100);
  
  // Determine difficulty color
  const difficultyColor = 
    project.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
    project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
    'bg-red-100 text-red-700';
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 transform ${
        expanded ? 'scale-102' : ''
      }`}
      style={{ 
        animationDelay: `${index * 150}ms`,
        opacity: 0,
        animation: 'fadeInUp 0.5s ease forwards',
        animationDelay: `${index * 150}ms` 
      }}
    >
      <div className="border-l-4 border-blue-500">
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
            <span className="px-3 py-1 rounded-full text-sm font-medium ${difficultyColor}">
              {project.difficulty}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4">{project.description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-500">
                <Clock size={16} className="mr-1" />
                <span className="text-sm">{project.estimatedHours} hours</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Users size={16} className="mr-1" />
                <span className="text-sm">{project.collaborationSize} {project.collaborationSize === 1 ? 'person' : 'people'}</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-2 text-sm font-medium">Match:</div>
              <div className="w-24 bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${matchPercentage}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm font-medium">{matchPercentage}%</span>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {project.requiredSkills.map(skillId => {
                const isUserSkill = !missingSkills.includes(skillId);
                return (
                  <span 
                    key={skillId}
                    className={`px-2 py-1 rounded-full text-xs ${
                      isUserSkill 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-orange-100 text-orange-700 border border-orange-200'
                    }`}
                  >
                    {getSkillName(skillId)}
                    {isUserSkill ? ' ✓' : ''}
                  </span>
                );
              })}
            </div>
          </div>
          
          {missingSkills.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Skills to Learn</h4>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map(skillId => (
                  <span 
                    key={skillId}
                    className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs"
                  >
                    {getSkillName(skillId)}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm mt-2"
          >
            {expanded ? (
              <>
                <span>Show Less</span>
                <ChevronUp size={16} className="ml-1" />
              </>
            ) : (
              <>
                <span>Show More</span>
                <ChevronDown size={16} className="ml-1" />
              </>
            )}
          </button>
        </div>
        
        {expanded && relevantCourses.length > 0 && (
          <div className="px-6 pb-6">
            <h4 className="font-medium text-gray-700 mb-3">Recommended Courses</h4>
            <div className="space-y-3">
              {relevantCourses.map(course => (
                <a 
                  key={course.id}
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between">
                    <div>
                      <h5 className="font-medium text-gray-800">{course.title}</h5>
                      <div className="flex items-center mt-1">
                        <BookOpen size={14} className="text-blue-600 mr-1" />
                        <span className="text-xs text-gray-600">{course.platform}</span>
                        <span className="mx-1 text-gray-400">•</span>
                        <span className="text-xs text-gray-600">{course.hours} hours</span>
                        <span className="mx-1 text-gray-400">•</span>
                        <span className="text-xs text-gray-600">★ {course.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-blue-600 self-center" />
                  </div>
                  <div className="mt-2">
                    <div className="text-xs text-gray-600">Skills covered:</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {course.skills
                        .filter(skillId => missingSkills.includes(skillId))
                        .map(skillId => (
                          <span 
                            key={skillId}
                            className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs"
                          >
                            {getSkillName(skillId)}
                          </span>
                        ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
        
        {expanded && (
          <div className="px-6 pb-6 flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center">
              Start This Project
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;