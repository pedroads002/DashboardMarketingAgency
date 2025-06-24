import React, { useState } from 'react';
import { Plus, Filter, Phone, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Lead } from '../types';

export const GerenciadorLeads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      nome: 'Maria Silva',
      telefone: '11999887766',
      cliente: 'Clínica Dental Plus',
      campanhaOrigem: 'Meta Ads - Implante',
      dataEntrada: '2024-01-15',
      status: 'Novo',
      tagExtra: 'implante'
    },
    {
      id: '2',
      nome: 'João Santos',
      telefone: '11888776655',
      cliente: 'Clínica Estética Bella',
      campanhaOrigem: 'Google Ads - Blefaro',
      dataEntrada: '2024-01-14',
      status: 'Respondido',
      tagExtra: 'blefaro'
    }
  ]);

  const [filtroCliente, setFiltroCliente] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroCampanha, setFiltroCampanha] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cliente: '',
    campanhaOrigem: '',
    dataEntrada: new Date().toISOString().split('T')[0],
    status: 'Novo',
    tagExtra: ''
  });

  const statusOptions = ['Novo', 'Respondido', 'Agendado', 'Cliente', 'Perdido', 'Frio'];
  const clientes = Array.from(new Set(leads.map(l => l.cliente)));
  const campanhas = Array.from(new Set(leads.map(l => l.campanhaOrigem)));

  const leadsFiltrados = leads.filter(lead => {
    const matchCliente = !filtroCliente || lead.cliente === filtroCliente;
    const matchStatus = !filtroStatus || lead.status === filtroStatus;
    const matchCampanha = !filtroCampanha || lead.campanhaOrigem.toLowerCase().includes(filtroCampanha.toLowerCase());
    return matchCliente && matchStatus && matchCampanha;
  }).sort((a, b) => new Date(b.dataEntrada).getTime() - new Date(a.dataEntrada).getTime());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingLead) {
      setLeads(prev => prev.map(l => 
        l.id === editingLead.id 
          ? { ...formData, id: editingLead.id }
          : l
      ));
    } else {
      const novoLead: Lead = {
        ...formData,
        id: Date.now().toString()
      };
      setLeads(prev => [...prev, novoLead]);
    }

    setFormData({
      nome: '',
      telefone: '',
      cliente: '',
      campanhaOrigem: '',
      dataEntrada: new Date().toISOString().split('T')[0],
      status: 'Novo',
      tagExtra: ''
    });
    setShowForm(false);
    setEditingLead(null);
  };

  const handleEdit = (lead: Lead) => {
    setFormData(lead);
    setEditingLead(lead);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este lead?')) {
      setLeads(prev => prev.filter(l => l.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo': return 'bg-blue-100 text-blue-800';
      case 'Respondido': return 'bg-yellow-100 text-yellow-800';
      case 'Agendado': return 'bg-purple-100 text-purple-800';
      case 'Cliente': return 'bg-green-100 text-green-800';
      case 'Perdido': return 'bg-red-100 text-red-800';
      case 'Frio': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatWhatsAppLink = (telefone: string) => {
    const cleanPhone = telefone.replace(/\D/g, '');
    return `https://wa.me/55${cleanPhone}`;
  };

  const renderKanban = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statusOptions.map(status => {
          const leadsDoStatus = leadsFiltrados.filter(lead => lead.status === status);
          return (
            <div key={status} className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                {status}
                <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {leadsDoStatus.length}
                </span>
              </h3>
              <div className="space-y-3">
                {leadsDoStatus.map(lead => (
                  <div key={lead.id} className="bg-white p-3 rounded-lg shadow-sm border">
                    <h4 className="font-medium text-gray-900 text-sm">{lead.nome}</h4>
                    <p className="text-xs text-gray-500 mt-1">{lead.cliente}</p>
                    <p className="text-xs text-gray-500">{lead.campanhaOrigem}</p>
                    {lead.tagExtra && (
                      <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {lead.tagExtra}
                      </span>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <a
                        href={formatWhatsAppLink(lead.telefone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleEdit(lead)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gerenciador de Leads</h2>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'table' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Tabela
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'kanban' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Kanban
            </button>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Lead</span>
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Filter className="w-4 h-4 inline mr-1" />
            Cliente
          </label>
          <select
            value={filtroCliente}
            onChange={(e) => setFiltroCliente(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos os clientes</option>
            {clientes.map(cliente => (
              <option key={cliente} value={cliente}>{cliente}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos os status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Campanha</label>
          <input
            type="text"
            value={filtroCampanha}
            onChange={(e) => setFiltroCampanha(e.target.value)}
            placeholder="Filtrar por campanha..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={() => {
              setFiltroCliente('');
              setFiltroStatus('');
              setFiltroCampanha('');
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Limpar filtros
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      {viewMode === 'kanban' ? renderKanban() : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campanha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Entrada</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leadsFiltrados.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {lead.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a
                      href={formatWhatsAppLink(lead.telefone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-green-600 hover:text-green-800"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{lead.telefone}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.cliente}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {lead.campanhaOrigem}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(lead.dataEntrada).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.tagExtra && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {lead.tagExtra}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(lead)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
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
      )}

      {leadsFiltrados.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhum lead encontrado com os filtros aplicados.
        </div>
      )}

      {/* Modal de Formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingLead ? 'Editar Lead' : 'Novo Lead'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  placeholder="11999887766"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

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
                <label className="block text-sm font-medium text-gray-700 mb-1">Campanha de Origem</label>
                <input
                  type="text"
                  value={formData.campanhaOrigem}
                  onChange={(e) => setFormData({...formData, campanhaOrigem: e.target.value})}
                  placeholder="Ex: Meta Ads - Implante"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Tag Extra</label>
                <input
                  type="text"
                  value={formData.tagExtra}
                  onChange={(e) => setFormData({...formData, tagExtra: e.target.value})}
                  placeholder="Ex: implante, blefaro, ansiedade"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingLead ? 'Atualizar' : 'Criar'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingLead(null);
                    setFormData({
                      nome: '',
                      telefone: '',
                      cliente: '',
                      campanhaOrigem: '',
                      dataEntrada: new Date().toISOString().split('T')[0],
                      status: 'Novo',
                      tagExtra: ''
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