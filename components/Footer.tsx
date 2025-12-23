import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm">
          {/* 
            Hidden Admin Entry Point:
            The copyright symbol (©) is now the secret link to the admin panel.
            cursor-default ensures it doesn't look like a link to regular visitors.
          */}
          <Link 
            to="/admin" 
            className="hover:text-gray-200 transition-colors cursor-default" 
            title="Admin Login"
            aria-label="Admin Login"
          >
            &copy;
          </Link> 
          {' '}
          {new Date().getFullYear()} 影城數位印刷 COPYCITY Digital Printing. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center items-center gap-4 text-xs">
          <a href="#" className="hover:text-white transition-colors">隱私權政策</a>
          <span>|</span>
          <a href="#" className="hover:text-white transition-colors">服務條款</a>
        </div>
      </div>
    </footer>
  );
};