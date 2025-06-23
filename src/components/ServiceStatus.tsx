import React from 'react';
import { CheckCircle, Pause, Clock } from 'lucide-react';
import { Service } from '../types';

interface ServiceStatusProps {
  services: Service[];
}

export const ServiceStatus: React.FC<ServiceStatusProps> = ({ services }) => {
  const getStatusIcon = (status: Service['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'paused':
        return <Pause className="w-5 h-5 text-yellow-500" />;
      case 'completed':
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: Service['status']) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'paused':
        return 'Pausado';
      case 'completed':
        return 'Concluído';
    }
  };

  const getStatusColor = (status: Service['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'paused':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'completed':
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Serviços Contratados</h3>
      
      <div className="space-y-3">
        {services.map((service) => (
          <div key={service.id} className="flex items-center justify-between p-3 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex items-center">
              {getStatusIcon(service.status)}
              <span className="ml-3 font-medium text-gray-900">{service.name}</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(service.status)}`}>
              {getStatusText(service.status)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};