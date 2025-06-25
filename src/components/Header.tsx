import React from 'react';
import { TrendingUp, Calendar, User } from 'lucide-react';

interface HeaderProps {
  clientName?: string;
}

export const Header: React.FC<HeaderProps> = ({ clientName = "João Silva" }) => {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mr-3 sm:mr-4">
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Painel de Performance – Herval Mkt
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Sistema de controle interno da agência
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          {/* Data */}
          <div className="flex items-center space-x-2 text-gray-600 text-sm sm:text-base">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium capitalize hidden sm:inline">{currentDate}</span>
            <span className="font-medium capitalize sm:hidden">
              {new Date().toLocaleDateString('pt-BR')}
            </span>
          </div>
          
          {/* Nome do Cliente */}
          <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
            <div className="p-1 bg-blue-100 rounded-full">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-sm">
              <span className="text-gray-500 text-xs">Cliente:</span>
              <p className="font-semibold text-gray-900">{clientName}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};