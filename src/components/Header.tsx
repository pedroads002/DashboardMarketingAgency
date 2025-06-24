import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';

export const Header: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mr-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Painel de Performance – Herval Mkt</h1>
            <p className="text-gray-600 mt-1">Sistema de controle interno da agência</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="w-5 h-5" />
          <span className="font-medium capitalize">{currentDate}</span>
        </div>
      </div>
    </header>
  );
};