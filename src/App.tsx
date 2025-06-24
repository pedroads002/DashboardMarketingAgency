import React, { useState } from 'react';
import { Header } from './components/Header';
import { CampanhasAtivas } from './components/CampanhasAtivas';
import { Resultados } from './components/Resultados';
import { GerenciadorLeads } from './components/GerenciadorLeads';
import { BarChart3, Target, Users } from 'lucide-react';

type TabType = 'campanhas' | 'resultados' | 'leads';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('campanhas');

  const tabs = [
    { id: 'campanhas' as TabType, label: '🟦 Campanhas Ativas', icon: BarChart3 },
    { id: 'resultados' as TabType, label: '📊 Resultados', icon: Target },
    { id: 'leads' as TabType, label: '🟩 Gerenciador de Leads', icon: Users }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'campanhas':
        return <CampanhasAtivas />;
      case 'resultados':
        return <Resultados />;
      case 'leads':
        return <GerenciadorLeads />;
      default:
        return <CampanhasAtivas />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="px-6 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;