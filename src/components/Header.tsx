import React from 'react';
import { Bell, Settings, User, TrendingUp } from 'lucide-react';

interface HeaderProps {
  clientName: string;
}

export const Header: React.FC<HeaderProps> = ({ clientName }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-2 bg-blue-600 rounded-lg mr-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Bem-vindo de volta, {clientName}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button className="flex items-center space-x-2 p-2 text-gray-700 hover:text-gray-900 transition-colors">
            <User className="w-5 h-5" />
            <span className="font-medium">{clientName}</span>
          </button>
        </div>
      </div>
    </header>
  );
};