import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { Login } from './components/Login';
import { Header } from './components/Header';
import { ClienteSelector } from './components/ClienteSelector';
import { CampanhasAtivas } from './components/CampanhasAtivas';
import { Resultados } from './components/Resultados';
import { GerenciadorLeads } from './components/GerenciadorLeads';
import { BarChart3, Target, Users } from 'lucide-react';

type TabType = 'campanhas' | 'resultados' | 'leads';

interface Cliente {
  id: string;
  nome: string;
  empresa?: string;
}

function App() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('campanhas');
  const [selectedCliente, setSelectedCliente] = useState<Cliente | undefined>();

  const tabs = [
    { id: 'campanhas' as TabType, label: '🟦 Campanhas Ativas', icon: BarChart3 },
    { id: 'resultados' as TabType, label: '📊 Resultados', icon: Target },
    { id: 'leads' as TabType, label: '🟩 Gerenciador de Leads', icon: Users }
  ];

  const renderContent = () => {
    if (!selectedCliente) {
      return (
        <div className="p-8 text-center">
          <p className="text-gray-500">Selecione um cliente para visualizar os dados</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'campanhas':
        return <CampanhasAtivas clienteId={selectedCliente.id} />;
      case 'resultados':
        return <Resultados clienteId={selectedCliente.id} />;
      case 'leads':
        return <GerenciadorLeads clienteId={selectedCliente.id} />;
      default:
        return <CampanhasAtivas clienteId={selectedCliente.id} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        clientName={selectedCliente?.nome}
        clienteSelector={
          <ClienteSelector 
            onClienteSelect={setSelectedCliente}
            selectedCliente={selectedCliente}
          />
        }
      />
      
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* Navigation Tabs */}
        <div className="mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-3 sm:py-4 px-1 border-b-2 font-medium text-sm sm:text-base transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(' ')[1]}</span>
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