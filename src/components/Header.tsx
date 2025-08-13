import React from 'react';
import { User, LogOut } from 'lucide-react';

interface HeaderProps {
  isAdmin: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
  currentUser?: string;
}

export const Header: React.FC<HeaderProps> = ({ isAdmin, onLoginClick, onLogout, currentUser }) => {
  return (
    <header className="bg-amber-800 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold">🍽️</span>
          </div>
          <h1 className="text-2xl font-bold">Golden Spoon Canteen</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAdmin ? (
            <div className="flex items-center space-x-3">
              <span className="text-amber-200">Welcome, {currentUser}</span>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center space-x-2 bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded-lg transition-colors"
            >
              <User size={18} />
              <span>Admin Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};