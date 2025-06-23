import React from 'react';
import { DollarSign, AlertCircle } from 'lucide-react';

interface BudgetProgressProps {
  totalSpent: number;
  monthlyBudget: number;
}

export const BudgetProgress: React.FC<BudgetProgressProps> = ({
  totalSpent,
  monthlyBudget
}) => {
  const percentageUsed = (totalSpent / monthlyBudget) * 100;
  const remainingBudget = monthlyBudget - totalSpent;
  const isWarning = percentageUsed > 80;
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-green-50 rounded-lg mr-3">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Orçamento Mensal</h3>
        </div>
        {isWarning && (
          <AlertCircle className="w-5 h-5 text-orange-500" />
        )}
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Gasto até agora</span>
            <span className="text-sm font-bold text-gray-900">
              R$ {totalSpent.toLocaleString('pt-BR')}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                isWarning ? 'bg-gradient-to-r from-orange-400 to-orange-600' 
                          : 'bg-gradient-to-r from-green-400 to-green-600'
              }`}
              style={{ width: `${Math.min(percentageUsed, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              {percentageUsed.toFixed(1)}% utilizado
            </span>
            <span className="text-xs text-gray-500">
              R$ {monthlyBudget.toLocaleString('pt-BR')} total
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Restante</span>
            <span className={`text-lg font-bold ${
              remainingBudget > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              R$ {Math.abs(remainingBudget).toLocaleString('pt-BR')}
            </span>
          </div>
          {remainingBudget < 0 && (
            <p className="text-xs text-red-500 mt-1">
              Orçamento excedido em R$ {Math.abs(remainingBudget).toLocaleString('pt-BR')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};