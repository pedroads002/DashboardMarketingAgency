import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { User, ChevronDown } from 'lucide-react'

interface Cliente {
  id: string
  nome: string
  empresa?: string
}

interface ClienteSelectorProps {
  onClienteSelect: (cliente: Cliente) => void
  selectedCliente?: Cliente
}

export const ClienteSelector: React.FC<ClienteSelectorProps> = ({
  onClienteSelect,
  selectedCliente
}) => {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    fetchClientes()
  }, [])

  const fetchClientes = async () => {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('id, nome, empresa')
        .eq('ativo', true)
        .order('nome')

      if (error) throw error
      
      setClientes(data || [])
      
      // Auto-select first client if none selected
      if (data && data.length > 0 && !selectedCliente) {
        onClienteSelect(data[0])
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
        <div className="p-1 bg-blue-100 rounded-full">
          <User className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-sm">
          <span className="text-gray-500 text-xs">Carregando...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
      >
        <div className="p-1 bg-blue-100 rounded-full">
          <User className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-sm">
          <span className="text-gray-500 text-xs">Cliente:</span>
          <p className="font-semibold text-gray-900">
            {selectedCliente?.nome || 'Selecionar'}
          </p>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="max-h-60 overflow-y-auto">
            {clientes.map((cliente) => (
              <button
                key={cliente.id}
                onClick={() => {
                  onClienteSelect(cliente)
                  setIsOpen(false)
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              >
                <p className="font-medium text-gray-900">{cliente.nome}</p>
                {cliente.empresa && (
                  <p className="text-sm text-gray-500">{cliente.empresa}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}