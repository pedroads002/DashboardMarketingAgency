import React, { useState } from 'react';
import { Plus, Filter, Search, ExternalLink, Edit, Trash2 } from 'lucide-react';
import { Campanha } from '../types';

export const CampanhasAtivas: React.FC = () => {
  const [campanhas, setCampanhas] = useState<Campanha[]>([
    {
      id: '1',
      cliente: 'Clínica Dental Plus',
      canal: 'Meta Ads',
      objetivo: 'Leads',
      status: 'Rodando',
      ultimaAlteracao: '2024-01-15',
      resultadoPrincipal: 'CPL R$12,50',
      linkCampanha: 'https://business.facebook.com/campaign/123'
    },
    {
      id: '2',
      cliente: 'Loja Fashion Style',
      canal: 'Google Ads',
      objetivo: 'Vendas',
      status: 'Em revisão',
      ultimaAlteracao: '2024-01-14',
      resultadoPrincipal: 'ROAS 4.2x',
      linkCampanha: 'https://ads.google.com/campaign/456'
    }
  ]);

  const [filtroCliente, setFiltroCliente] = useState('');
  const [filtroCanal, setFiltroCanal] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCampanha, setEditingCampanha] = useState<Campanha | null>(null);

  const [formData, setFormData] = useState({
    cliente: '',
    canal: 'Meta Ads',
    objetivo: 'Leads',
    status: 'Rodando',
    ultimaAlteracao: new Date().toISOString().split('T')[0],
    resultadoPrincipal: '',
    linkCampanha: ''
  });

  const canais = ['Meta Ads', 'Google Ads', 'TikTok Ads', 'LinkedIn Ads', 'YouTube Ads'];
  const objetivos = ['WhatsApp', 'Conversão', 'Reconhecimento', 'Leads', 'Vendas'];
  const statusOptions = ['Rodando', 'Pausada', 'Em revisão', 'Finalizada'];

  const campanhasFiltradas = campanhas.filter(campanha => {
    const matchCliente = !filtroCliente || campanha.cliente.toLowerCase().includes(filtroCliente.toLowerCase());
    const matchCanal = !filtroCanal || campanha.canal === filtroCanal;
    return matchCliente && matchCanal;
  }).sort((a, b) => new Date(b.ultimaAlteracao).getTime() - new Date(a.ultimaAlteracao).getTime());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCampanha) {
      setCampanhas(prev => prev.map(c => 
        c.id === editingCampanha.id 
          ? { ...formData, id: editingCampanha.id }
          : c
      ));
    } else {
      const novaCampanha: Campanha = {
        ...formData,
        id: Date.now().toString()
      };
      setCampanhas(prev => [...prev, novaCampanha]);
    }

    setFormData({
      cliente: '',
      canal: 'Meta Ads',
      objetivo: 'Leads',
      status: 'Rodando',
      ultimaAlteracao: new Date().toISOString().split('T')[0],
      resultadoPrincipal: '',
      linkCampanha: ''
    });
    setShowForm(false);
    setEditingCampanha(null);
  };

  const handleEdit = (campanha: Campanha) => {
    setFormData(campanha);
    setEditingCampanha(campanha);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta campanha?')) {
      setCampanhas(prev => prev.filter(c => c.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Rodando': return 'bg-green-100 text-green-800';
      case 'Pausada': return 'bg-yellow-100 text-yellow-800';
      case 'Em revisão': return 'bg-blue-100 text-blue-800';
      case 'Finalizada': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Campanhas Ativas</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Campanha</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Search className="w-4 h-4 inline mr-1" />
            Filtrar por Cliente
          </label>
          <input
            type="text"
            value={filtroCliente}
            onChange={(e) => setFiltroCliente(e.target.value)}
            placeholder="Digite o nome do cliente..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Filter className="w-4 h-4 inline mr-1" />
            Filtrar por Canal
          </label>
          <select
            value={filtroCanal}
            onChange={(e) => setFiltroCanal(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos os canais</option>
            {canais.map(canal => (
              <option key={canal} value={canal}>{canal}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => {
              setFiltroCliente('');
              setFiltroCanal('');
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors w-full sm:w-auto"
          >
            Limpar filtros
          </button>
        </div>
      </div>

      {/* Tabela - Desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Canal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Objetivo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Alteração</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resultado Principal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campanhasFiltradas.map((campanha) => (
              <tr key={campanha.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {campanha.cliente}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {campanha.canal}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {campanha.objetivo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campanha.status)}`}>
                    {campanha.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(campanha.ultimaAlteracao).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {campanha.resultadoPrincipal}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {campanha.linkCampanha && (
                    <a
                      href={campanha.linkCampanha}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Abrir</span>
                    </a>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(campanha)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(campanha.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile/Tablet */}
      <div className="lg:hidden space-y-4">
        {campanhasFiltradas.map((campanha) => (
          <div key={campanha.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-900">{campanha.cliente}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campanha.status)}`}>
                {campanha.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Canal:</span>
                <span className="font-medium">{campanha.canal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Objetivo:</span>
                <span className="font-medium">{campanha.objetivo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Resultado:</span>
                <span className="font-medium">{campanha.resultadoPrincipal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Última alteração:</span>
                <span className="font-medium">{new Date(campanha.ultimaAlteracao).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEdit(campanha)}
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => handleDelete(campanha.id)}
                  className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Excluir</span>
                </button>
              </div>
              
              {campanha.linkCampanha && (
                <a
                  href={campanha.linkCampanha}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {campanhasFiltradas.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhuma campanha encontrada com os filtros aplicados.
        </div>
      )}

      {/* Modal de Formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingCampanha ? 'Editar Campanha' : 'Nova Campanha'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                <input
                  type="text"
                  value={formData.cliente}
                  onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Canal</label>
                <select
                  value={formData.canal}
                  onChange={(e) => setFormData({...formData, canal: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {canais.map(canal => (
                    <option key={canal} value={canal}>{canal}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Objetivo</label>
                <select
                  value={formData.objetivo}
                  onChange={(e) => setFormData({...formData, objetivo: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {objetivos.map(objetivo => (
                    <option key={objetivo} value={objetivo}>{objetivo}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resultado Principal</label>
                <input
                  type="text"
                  value={formData.resultadoPrincipal}
                  onChange={(e) => setFormData({...formData, resultadoPrincipal: e.target.value})}
                  placeholder="Ex: CPL R$12,50 ou ROAS 4.2x"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link da Campanha</label>
                <input
                  type="url"
                  value={formData.linkCampanha}
                  onChange={(e) => setFormData({...formData, linkCampanha: e.target.value})}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingCampanha ? 'Atualizar' : 'Criar'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingCampanha(null);
                    setFormData({
                      cliente: '',
                      canal: 'Meta Ads',
                      objetivo: 'Leads',
                      status: 'Rodando',
                      ultimaAlteracao: new Date().toISOString().split('T')[0],
                      resultadoPrincipal: '',
                      linkCampanha: ''
                    });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};