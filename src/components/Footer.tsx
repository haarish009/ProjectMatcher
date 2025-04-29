import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 px-6 mt-16">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">ProjectMatcher</h3>
            <p className="text-sm text-gray-400">
              Matching students with projects tailored to their skills and interests
            </p>
          </div>
          
          <div className="flex gap-8">
            <div>
              <h4 className="text-white font-medium mb-2">Resources</h4>
              <ul className="text-sm space-y-1">
                <li><a href="#" className="hover:text-blue-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">How It Works</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-2">Connect</h4>
              <ul className="text-sm space-y-1">
                <li><a href="#" className="hover:text-blue-400 transition">Twitter</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">GitHub</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-sm text-center text-gray-500">
          <p>© 2025 ProjectMatcher. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;