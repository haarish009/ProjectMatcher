import React from 'react';
import { BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 px-6 md:px-10 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <BookOpen size={32} className="text-orange-400" />
          <h1 className="text-2xl md:text-3xl font-bold">ProjectMatcher</h1>
        </div>
        
        <div className="text-center md:text-right">
          <p className="text-blue-100 max-w-md">
            Find the perfect project to match your skills and interests
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;