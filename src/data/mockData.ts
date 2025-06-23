import { DashboardData } from '../types';

export const mockDashboardData: DashboardData = {
  client: {
    id: '1',
    name: 'João Silva',
    email: 'joao@empresa.com',
    joinDate: '2024-01-15',
    monthlyBudget: 5000,
    services: [
      { id: '1', name: 'Tráfego Pago', type: 'paid-ads', status: 'active' },
      { id: '2', name: 'Edição de Vídeo', type: 'video-editing', status: 'active' },
      { id: '3', name: 'Social Media', type: 'social-media', status: 'active' },
      { id: '4', name: 'Criação de Conteúdo', type: 'content-creation', status: 'active' }
    ]
  },
  adMetrics: {
    totalSpent: 3250,
    monthlyBudget: 5000,
    impressions: 125000,
    clicks: 3750,
    conversions: 87,
    ctr: 3.0,
    cpc: 0.87,
    roas: 4.2
  },
  contentMetrics: {
    postsCreated: 24,
    videosCreated: 8,
    imagesCreated: 16,
    totalContent: 24
  },
  followerMetrics: {
    weekly: 127,
    biweekly: 289,
    monthly: 543,
    allTime: 2847,
    currentTotal: 15234
  },
  clientAcquisition: {
    weekly: 3,
    biweekly: 7,
    monthly: 12,
    allTime: 89
  }
};

export const chartData = {
  followers: [
    { period: 'Jan', value: 12691 },
    { period: 'Fev', value: 13104 },
    { period: 'Mar', value: 13678 },
    { period: 'Abr', value: 14221 },
    { period: 'Mai', value: 14791 },
    { period: 'Jun', value: 15234 }
  ],
  adSpending: [
    { period: 'Sem 1', value: 812 },
    { period: 'Sem 2', value: 743 },
    { period: 'Sem 3', value: 891 },
    { period: 'Sem 4', value: 804 }
  ],
  conversions: [
    { period: 'Sem 1', value: 21 },
    { period: 'Sem 2', value: 18 },
    { period: 'Sem 3', value: 26 },
    { period: 'Sem 4', value: 22 }
  ]
};