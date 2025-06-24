export interface Client {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  monthlyBudget: number;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  type: 'paid-ads' | 'video-editing' | 'social-media' | 'content-creation';
  status: 'active' | 'paused' | 'completed';
}

export interface AdMetrics {
  totalSpent: number;
  monthlyBudget: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roas: number;
}

export interface ContentMetrics {
  postsCreated: number;
  videosCreated: number;
  imagesCreated: number;
  totalContent: number;
}

export interface FollowerMetrics {
  weekly: number;
  biweekly: number;
  monthly: number;
  allTime: number;
  currentTotal: number;
}

export interface ClientAcquisition {
  weekly: number;
  biweekly: number;
  monthly: number;
  allTime: number;
}

export interface DashboardData {
  client: Client;
  adMetrics: AdMetrics;
  contentMetrics: ContentMetrics;
  followerMetrics: FollowerMetrics;
  clientAcquisition: ClientAcquisition;
}

// Novos tipos para o sistema Herval Mkt
export interface Campanha {
  id: string;
  cliente: string;
  canal: string;
  objetivo: string;
  status: string;
  ultimaAlteracao: string;
  resultadoPrincipal: string;
  linkCampanha: string;
}

export interface Resultado {
  id: string;
  cliente: string;
  data: string;
  kpiPrincipal: string;
  variacao: string;
  destaques: string[];
  comentario: string;
}

export interface Lead {
  id: string;
  nome: string;
  telefone: string;
  cliente: string;
  campanhaOrigem: string;
  dataEntrada: string;
  status: string;
  tagExtra: string;
}