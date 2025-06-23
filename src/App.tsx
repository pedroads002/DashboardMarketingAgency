import React from 'react';
import { Header } from './components/Header';
import { MetricCard } from './components/MetricCard';
import { Chart } from './components/Chart';
import { PeriodMetrics } from './components/PeriodMetrics';
import { ServiceStatus } from './components/ServiceStatus';
import { BudgetProgress } from './components/BudgetProgress';
import { mockDashboardData, chartData } from './data/mockData';
import {
  Eye,
  MousePointer,
  Target,
  Percent,
  FileText,
  Video,
  Image,
  Users
} from 'lucide-react';

function App() {
  const data = mockDashboardData;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header clientName={data.client.name} />
      
      <main className="px-6 py-8">
        {/* Métricas principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Impressões"
            value={data.adMetrics.impressions.toLocaleString()}
            subtitle="Este mês"
            icon={Eye}
            trend={{ value: 12.5, isPositive: true }}
          />
          <MetricCard
            title="Cliques"
            value={data.adMetrics.clicks.toLocaleString()}
            subtitle="CTR: 3.0%"
            icon={MousePointer}
            trend={{ value: 8.2, isPositive: true }}
          />
          <MetricCard
            title="Conversões"
            value={data.adMetrics.conversions}
            subtitle="Taxa: 2.3%"
            icon={Target}
            trend={{ value: 15.7, isPositive: true }}
          />
          <MetricCard
            title="ROAS"
            value={`${data.adMetrics.roas}x`}
            subtitle="Retorno do investimento"
            icon={Percent}
            trend={{ value: 23.1, isPositive: true }}
          />
        </div>

        {/* Seção de orçamento e conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <BudgetProgress
            totalSpent={data.adMetrics.totalSpent}
            monthlyBudget={data.adMetrics.monthlyBudget}
          />
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Conteúdo Criado</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{data.contentMetrics.postsCreated}</p>
                <p className="text-sm text-gray-600">Posts</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Video className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{data.contentMetrics.videosCreated}</p>
                <p className="text-sm text-gray-600">Vídeos</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Image className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{data.contentMetrics.imagesCreated}</p>
                <p className="text-sm text-gray-600">Imagens</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Chart
            data={chartData.followers}
            title="Crescimento de Seguidores"
            color="blue"
          />
          <Chart
            data={chartData.adSpending}
            title="Gastos Semanais com Ads"
            color="green"
          />
          <Chart
            data={chartData.conversions}
            title="Conversões por Semana"
            color="purple"
          />
        </div>

        {/* Métricas por período */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PeriodMetrics
            title="Crescimento de Seguidores"
            data={data.followerMetrics}
            icon="followers"
            currentTotal={data.followerMetrics.currentTotal}
          />
          <PeriodMetrics
            title="Clientes Adquiridos"
            data={data.clientAcquisition}
            icon="clients"
          />
        </div>

        {/* Status dos serviços */}
        <ServiceStatus services={data.client.services} />
      </main>
    </div>
  );
}

export default App;