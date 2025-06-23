import React from 'react';

interface ChartData {
  period: string;
  value: number;
}

interface ChartProps {
  data: ChartData[];
  title: string;
  color?: string;
  type?: 'area' | 'bar';
}

export const Chart: React.FC<ChartProps> = ({ 
  data, 
  title, 
  color = 'blue',
  type = 'area'
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const colorClasses = {
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    purple: 'from-purple-400 to-purple-600',
    orange: 'from-orange-400 to-orange-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-12 text-sm text-gray-600 font-medium">
              {item.period}
            </div>
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} transition-all duration-500`}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
            <div className="w-16 text-sm font-semibold text-gray-900 text-right">
              {item.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};