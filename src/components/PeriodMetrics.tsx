import React from 'react';
import { TrendingUp, Calendar, Users, Target } from 'lucide-react';

interface PeriodData {
  weekly: number;
  biweekly: number;
  monthly: number;
  allTime: number;
}

interface PeriodMetricsProps {
  title: string;
  data: PeriodData;
  icon: 'followers' | 'clients';
  currentTotal?: number;
}

export const PeriodMetrics: React.FC<PeriodMetricsProps> = ({
  title,
  data,
  icon,
  currentTotal
}) => {
  const IconComponent = icon === 'followers' ? Users : Target;
  
  const periods = [
    { label: 'Semanal', value: data.weekly, icon: Calendar },
    { label: '15 dias', value: data.biweekly, icon: Calendar },
    { label: 'Mensal', value: data.monthly, icon: TrendingUp },
    { label: 'Total', value: data.allTime, icon: Target }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-green-50 rounded-lg mr-3">
          <IconComponent className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {currentTotal && (
            <p className="text-sm text-gray-500">Total atual: {currentTotal.toLocaleString()}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {periods.map((period, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">{period.label}</span>
              <period.icon className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-xl font-bold text-gray-900">
              {period.value > 0 ? '+' : ''}{period.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};