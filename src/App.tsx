import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import InterestSelector from './components/InterestSelector';
import SkillSelector from './components/SkillSelector';
import ProjectCard from './components/ProjectCard';
import DecisionTree from './components/DecisionTree';
import FindPeers from './components/FindPeers';
import { UserProvider, useUser } from './contexts/UserContext';
import { Sparkles, BarChart2, Book } from 'lucide-react';

const MainContent: React.FC = () => {
  const { userProfile, recommendations, getRecommendations, isRecommending } = useUser();
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleGetRecommendations = () => {
    getRecommendations();
    setShowRecommendations(true);
  };

  const isProfileComplete = userProfile.interests.length > 0 && userProfile.skills.length > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Find Your Perfect Mini Project
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Tell us about your interests and skills, and we'll recommend projects
          that match your profile and help you grow.
        </p>
      </div>

      {!showRecommendations && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-fadeIn">
          <InterestSelector />
          <SkillSelector />
          
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleGetRecommendations}
              disabled={!isProfileComplete || isRecommending}
              className={`flex items-center px-6 py-3 rounded-lg text-white font-medium text-lg transition-all transform hover:scale-105 ${
                isProfileComplete
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isRecommending ? (
                <>
                  <div className="animate-spin mr-2 h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></div>
                  Finding projects...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2" size={20} />
                  Get Project Recommendations
                </>
              )}
            </button>
          </div>
          
          {!isProfileComplete && (
            <p className="text-center text-orange-600 mt-4">
              Please select at least one interest and one skill to continue.
            </p>
          )}
        </div>
      )}

      {showRecommendations && recommendations.length > 0 && (
        <div className="animate-fadeIn">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Sparkles className="mr-2 text-orange-500" size={24} />
              Your Recommended Projects
            </h2>
            <button
              onClick={() => setShowRecommendations(false)}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 mb-12">
            {recommendations.map((recommendation, index) => (
              <ProjectCard key={recommendation.project.id} recommendation={recommendation} index={index} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="order-2 md:order-1">
              <div className="flex items-center mb-6">
                <BarChart2 className="mr-2 text-blue-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Recommendation Insights</h2>
              </div>
              <DecisionTree />
            </div>
            
            <div className="order-1 md:order-2">
              <div className="flex items-center mb-6">
                <Book className="mr-2 text-blue-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Find Study Partners</h2>
              </div>
              <FindPeers />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow">
          <MainContent />
        </main>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;