import React, { useState } from 'react';
import { Calendar, Plus, TrendingUp, TrendingDown, Edit, Trash2 } from 'lucide-react';
import { Resultado } from '../types';

export const Resultados: React.FC = () => {
  const [resultados, setResultados] = useState<Resultado[]>([
    {
      id: '1',
      cliente: 'Clínica Dental Plus',
      data: '2024-01-15',
      kpiPrincipal: '38 leads',
      variacao: '+10 leads',
      destaques: ['Criativo novo', 'Otimização de campanha'],
      comentario: 'Excelente performance com novo criativo'
    },
    {
      id: '2',
      cliente: 'Loja Fashion Style',
      data: '2024-01-14',
      kpiPrincipal: 'CPL R$8,50',
      variacao: '-R$2,00',
      destaques: ['Escala de orçamento'],
      comentario: 'Redução significativa no CPL'
    }
  ]);

  const [filtroCliente, setFiltroCliente] = useState('');
  const [filtroPeriodo, setFiltroPeriodo] = useState('Últimos 7 dias');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingResultado, setEditingResultado] = useState<Resultado | null>(null);

  const [formData, setFormData] = useState({
    cliente: '',
    data: new Date().toISOString().split('T')[0],
    kpiPrincipal: '',
    variacao: '',
    destaques: [] as string[],
    comentario: ''
  });

  const periodos = [
    'Hoje',
    'Ontem', 
    'Últimos 7 dias',
    'Últimos 30 dias',
    'Mês atual',
    'Período personalizado'
  ];

  const destaquesOptions = [
    'Criativo novo',
    'Otimização de campanha',
    'Escala de orçamento',
    'Problema técnico',
    'Resultado ruim'
  ];

  const clientes = Array.from(new Set(resultados.map(r => r.cliente)));

  const getDateRange = () => {
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(hoje.getDate() - 1);

    switch (filtroPeriodo) {
      case 'Hoje':
        return { inicio: hoje.toISOString().split('T')[0], fim: hoje.toISOString().split('T')[0] };
      case 'Ontem':
        return { inicio: ontem.toISOString().split('T')[0], fim: ontem.toISOString().split('T')[0] };
      case 'Últimos 7 dias':
        const seteDias = new Date(hoje);
        seteDias.setDate(hoje.getDate() - 7);
        return { inicio: seteDias.toISOString().split('T')[0], fim: hoje.toISOString().split('T')[0] };
      case 'Últimos 30 dias':
        const trintaDias = new Date(hoje);
        trintaDias.setDate(hoje.getDate() - 30);
        return { inicio: trintaDias.toISOString().split('T')[0], fim: hoje.toISOString().split('T')[0] };
      case 'Mês atual':
        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        return { inicio: inicioMes.toISOString().split('T')[0], fim: hoje.toISOString().split('T')[0] };
      case 'Período personalizado':
        return { inicio: dataInicial, fim: dataFinal };
      default:
        return { inicio: '', fim: '' };
    }
  };

  const resultadosFiltrados = resultados.filter(resultado => {
    const matchCliente = !filtroCliente || resultado.cliente === filtroCliente;
    
    if (filtroPeriodo === 'Período personalizado' && (!dataInicial || !dataFinal)) {
      return matchCliente;
    }

    const { inicio, fim } = getDateRange();
    const dataResultado = resultado.data;
    const matchPeriodo = !inicio || !fim || (dataResultado >= inicio && dataResultado <= fim);
    
    return matchCliente && matchPeriodo;
  }).sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingResultado) {
      setResultados(prev => prev.map(r => 
        r.id === editingResultado.id 
          ? { ...formData, id: editingResultado.id }
          : r
      ));
    } else {
      const novoResultado: Resultado = {
        ...formData,
        id: Date.now().toString()
      };
      setResultados(prev => [...prev, novoResultado]);
    }

    setFormData({
      cliente: '',
      data: new Date().toISOString().split('T')[0],
      kpiPrincipal: '',
      variacao: '',
      destaques: [],
      comentario: ''
    });
    setShowForm(false);
    setEditingResultado(null);
  };

  const handleEdit = (resultado: Resultado) => {
    setFormData(resultado);
    setEditingResultado(resultado);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este resultado?')) {
      setResultados(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleDestaqueChange = (destaque: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        destaques: [...formData.destaques, destaque]
      });
    } else {
      setFormData({
        ...formData,
        destaques: formData.destaques.filter(d => d !== destaque)
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Resultados com Filtro de Período</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Resultado</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Período
          </label>
          <select
            value={filtroPeriodo}
            onChange={(e) => setFiltroPeriodo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {periodos.map(periodo => (
              <option key={periodo} value={periodo}>{periodo}</option>
            ))}
          </select>
        </div>

        {filtroPeriodo === 'Período personalizado' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Inicial</label>
              <input
                type="date"
                value={dataInicial}
                onChange={(e) => setDataInicial(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Final</label>
              <input
                type="date"
                value={dataFinal}
                onChange={(e) => setDataFinal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}
      </div>

      {/* Gráfico Simples */}
      {resultadosFiltrados.length > 0 && (
        <div className="mb-6 p-4 bg-white border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Evolução dos Resultados</h3>
          <div className="space-y-2">
            {resultadosFiltrados.slice(0, 5).map((resultado, index) => (
              <div key={resultado.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-600">{new Date(resultado.data).toLocaleDateString('pt-BR')}</span>
                <span className="font-medium">{resultado.cliente}</span>
                <span className="text-sm">{resultado.kpiPrincipal}</span>
                <span className={`text-sm flex items-center ${
                  resultado.variacao.includes('+') ? 'text-green-600' : 
                  resultado.variacao.includes('-') ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {resultado.variacao.includes('+') ? <TrendingUp className="w-4 h-4 mr-1" /> : 
                   resultado.variacao.includes('-') ? <TrendingDown className="w-4 h-4 mr-1" /> : null}
                  {resultado.variacao}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KPI Principal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variação</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destaques</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comentário</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {resultadosFiltrados.map((resultado) => (
              <tr key={resultado.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {resultado.cliente}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(resultado.data).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {resultado.kpiPrincipal}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`flex items-center ${
                    resultado.variacao.includes('+') ? 'text-green-600' : 
                    resultado.variacao.includes('-') ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {resultado.variacao.includes('+') ? <TrendingUp className="w-4 h-4 mr-1" /> : 
                     resultado.variacao.includes('-') ? <TrendingDown className="w-4 h-4 mr-1" /> : null}
                    {resultado.variacao}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex flex-wrap gap-1">
                    {resultado.destaques.map((destaque, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {destaque}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {resultado.comentario}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(resultado)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(resultado.id)}
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

      {resultadosFiltrados.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhum resultado encontrado com os filtros aplicados.
        </div>
      )}

      {/* Modal de Formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingResultado ? 'Editar Resultado' : 'Novo Resultado'}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                <input
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({...formData, data: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KPI Principal</label>
                <input
                  type="text"
                  value={formData.kpiPrincipal}
                  onChange={(e) => setFormData({...formData, kpiPrincipal: e.target.value})}
                  placeholder="Ex: 38 leads, CPL R$10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Variação</label>
                <input
                  type="text"
                  value={formData.variacao}
                  onChange={(e) => setFormData({...formData, variacao: e.target.value})}
                  placeholder="Ex: +10 leads, -R$2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destaques</label>
                <div className="space-y-2">
                  {destaquesOptions.map(destaque => (
                    <label key={destaque} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.destaques.includes(destaque)}
                        onChange={(e) => handleDestaqueChange(destaque, e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">{destaque}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comentário</label>
                <textarea
                  value={formData.comentario}
                  onChange={(e) => setFormData({...formData, comentario: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingResultado ? 'Atualizar' : 'Criar'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingResultado(null);
                    setFormData({
                      cliente: '',
                      data: new Date().toISOString().split('T')[0],
                      kpiPrincipal: '',
                      variacao: '',
                      destaques: [],
                      comentario: ''
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