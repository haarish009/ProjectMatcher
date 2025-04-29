import { Project, UserProfile, ProjectRecommendation, Course } from '../types';
import { projects } from '../data/projects';
import { courses } from '../data/courses';

/**
 * This is a simplified decision tree model that recommends projects based on user interests, skills, and experience level.
 * In a real-world application, this would be a proper machine learning model trained on historical data.
 */
export const getProjectRecommendations = (userProfile: UserProfile): ProjectRecommendation[] => {
  // Filter projects by interest field
  const interestProjects = projects.filter(project => 
    userProfile.interests.includes(project.interestField)
  );
  
  if (interestProjects.length === 0) {
    return [];
  }
  
  // Map user's experience level to a numeric value
  const experienceLevelMap = {
    'Beginner': 1,
    'Intermediate': 2,
    'Advanced': 3
  };
  
  const userExperienceValue = experienceLevelMap[userProfile.experienceLevel];
  
  // Calculate a match score for each project based on:
  // 1. How many required skills the user has
  // 2. If the project difficulty matches user experience level
  // 3. Penalize if project is too advanced or too basic
  const scoredProjects = interestProjects.map(project => {
    const requiredSkills = project.requiredSkills;
    const userSkills = userProfile.skills;
    
    // Calculate skill match percentage
    const skillsUserHas = requiredSkills.filter(skill => userSkills.includes(skill));
    const skillMatchPercentage = requiredSkills.length > 0 
      ? skillsUserHas.length / requiredSkills.length 
      : 0;
    
    // Calculate difficulty match (penalize if too easy or too hard)
    const projectDifficultyValue = experienceLevelMap[project.difficulty];
    const difficultyMatch = 1 - Math.abs(projectDifficultyValue - userExperienceValue) / 3;
    
    // Missing skills
    const missingSkills = requiredSkills.filter(skill => !userSkills.includes(skill));
    
    // Find relevant courses for missing skills
    const relevantCourses = findRelevantCourses(missingSkills);
    
    // Calculate final score (weighted sum)
    const skillWeight = 0.6;
    const difficultyWeight = 0.4;
    const matchScore = (skillMatchPercentage * skillWeight) + (difficultyMatch * difficultyWeight);
    
    return {
      project,
      matchScore,
      missingSkills,
      relevantCourses
    };
  });
  
  // Sort by match score (descending)
  return scoredProjects
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5); // Return top 5 recommendations
};

/**
 * Find courses that teach the missing skills
 */
const findRelevantCourses = (missingSkills: string[]): Course[] => {
  if (missingSkills.length === 0) {
    return [];
  }
  
  // Find courses that cover at least one of the missing skills
  const relevantCourses = courses.filter(course => {
    return course.skills.some(skill => missingSkills.includes(skill));
  });
  
  // Sort by how many missing skills they cover (descending)
  relevantCourses.sort((a, b) => {
    const aSkillsCovered = a.skills.filter(skill => missingSkills.includes(skill)).length;
    const bSkillsCovered = b.skills.filter(skill => missingSkills.includes(skill)).length;
    if (bSkillsCovered !== aSkillsCovered) {
      return bSkillsCovered - aSkillsCovered;
    }
    // If same number of skills covered, sort by rating
    return b.rating - a.rating;
  });
  
  // Return top 3 most relevant courses
  return relevantCourses.slice(0, 3);
};