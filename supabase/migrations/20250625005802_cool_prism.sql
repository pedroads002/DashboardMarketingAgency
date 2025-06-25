/*
  # Schema inicial do Painel de Performance - Herval Mkt

  1. Tabelas principais
    - `clientes` - Dados dos clientes da agência
    - `campanhas` - Campanhas ativas por cliente
    - `resultados` - Resultados e métricas por período
    - `leads` - Leads gerados pelas campanhas

  2. Segurança
    - RLS habilitado em todas as tabelas
    - Políticas de acesso baseadas em autenticação
*/

-- Tabela de clientes
CREATE TABLE IF NOT EXISTS clientes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  email text UNIQUE NOT NULL,
  telefone text,
  empresa text,
  data_cadastro timestamptz DEFAULT now(),
  ativo boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de campanhas
CREATE TABLE IF NOT EXISTS campanhas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id uuid REFERENCES clientes(id) ON DELETE CASCADE,
  nome_campanha text NOT NULL,
  canal text NOT NULL,
  objetivo text NOT NULL,
  status text NOT NULL DEFAULT 'Rodando',
  data_inicio date DEFAULT CURRENT_DATE,
  ultima_alteracao timestamptz DEFAULT now(),
  resultado_principal text,
  link_campanha text,
  investimento decimal(10,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de resultados
CREATE TABLE IF NOT EXISTS resultados (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id uuid REFERENCES clientes(id) ON DELETE CASCADE,
  data date NOT NULL,
  kpi_principal text NOT NULL,
  variacao text,
  destaques text[] DEFAULT '{}',
  comentario text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de leads
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id uuid REFERENCES clientes(id) ON DELETE CASCADE,
  nome text NOT NULL,
  telefone text NOT NULL,
  campanha_origem text NOT NULL,
  data_entrada date DEFAULT CURRENT_DATE,
  status text NOT NULL DEFAULT 'Novo',
  tag_extra text,
  observacoes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE campanhas ENABLE ROW LEVEL SECURITY;
ALTER TABLE resultados ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança (permitir acesso autenticado por enquanto)
CREATE POLICY "Usuários autenticados podem ver clientes"
  ON clientes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários autenticados podem ver campanhas"
  ON campanhas FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários autenticados podem gerenciar campanhas"
  ON campanhas FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Usuários autenticados podem ver resultados"
  ON resultados FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários autenticados podem gerenciar resultados"
  ON resultados FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Usuários autenticados podem ver leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários autenticados podem gerenciar leads"
  ON leads FOR ALL
  TO authenticated
  USING (true);

-- Inserir dados de exemplo
INSERT INTO clientes (nome, email, empresa) VALUES
  ('João Silva', 'joao@empresa.com', 'Empresa ABC'),
  ('Maria Santos', 'maria@clinica.com', 'Clínica Dental Plus'),
  ('Pedro Costa', 'pedro@loja.com', 'Loja Fashion Style');

-- Inserir campanhas de exemplo
INSERT INTO campanhas (cliente_id, nome_campanha, canal, objetivo, status, resultado_principal, link_campanha)
SELECT 
  c.id,
  'Captação WhatsApp',
  'Meta Ads',
  'Leads',
  'Rodando',
  'CPL R$12,50',
  'https://business.facebook.com/campaign/123'
FROM clientes c WHERE c.email = 'maria@clinica.com';

INSERT INTO campanhas (cliente_id, nome_campanha, canal, objetivo, status, resultado_principal, link_campanha)
SELECT 
  c.id,
  'Vendas Online',
  'Google Ads',
  'Vendas',
  'Em revisão',
  'ROAS 4.2x',
  'https://ads.google.com/campaign/456'
FROM clientes c WHERE c.email = 'pedro@loja.com';

-- Inserir resultados de exemplo
INSERT INTO resultados (cliente_id, data, kpi_principal, variacao, destaques, comentario)
SELECT 
  c.id,
  CURRENT_DATE - 1,
  '38 leads',
  '+10 leads',
  ARRAY['Criativo novo', 'Otimização de campanha'],
  'Excelente performance com novo criativo'
FROM clientes c WHERE c.email = 'maria@clinica.com';

-- Inserir leads de exemplo
INSERT INTO leads (cliente_id, nome, telefone, campanha_origem, status, tag_extra)
SELECT 
  c.id,
  'Maria Silva',
  '11999887766',
  'Meta Ads - Implante',
  'Novo',
  'implante'
FROM clientes c WHERE c.email = 'maria@clinica.com';

INSERT INTO leads (cliente_id, nome, telefone, campanha_origem, status, tag_extra)
SELECT 
  c.id,
  'João Santos',
  '11888776655',
  'Google Ads - Blefaro',
  'Respondido',
  'blefaro'
FROM clientes c WHERE c.email = 'maria@clinica.com';