# Painel de Performance - Herval Mkt

Sistema completo de gestão e acompanhamento de campanhas de marketing digital para agências.

## 🚀 Funcionalidades

### 📊 **Dashboard Completo**
- Visualização de campanhas ativas
- Acompanhamento de resultados por período
- Gerenciamento de leads
- Sistema de autenticação por cliente

### 🔐 **Sistema de Acesso**
- Login individual por cliente
- Dados isolados e seguros
- Interface responsiva (mobile + desktop)

### 📈 **Métricas em Tempo Real**
- CPL, ROAS, conversões
- Gráficos de evolução
- Filtros por período
- Exportação de dados

## 🛠️ **Tecnologias**

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Deploy**: Netlify
- **Icons**: Lucide React

## 📋 **Como Configurar**

### 1. **Configurar Supabase**

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Crie um novo projeto
3. Vá em Settings > API e copie:
   - Project URL
   - Anon public key

### 2. **Configurar Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

### 3. **Executar Migrações**

No painel do Supabase, vá em SQL Editor e execute o arquivo:
`supabase/migrations/001_initial_schema.sql`

### 4. **Criar Usuários**

No painel do Supabase > Authentication > Users, crie usuários para cada cliente:

```
Email: joao@empresa.com
Senha: senha123
```

### 5. **Deploy**

O sistema está configurado para deploy automático no Netlify.

## 📱 **Como Usar**

### **Para a Agência (Herval Mkt)**

1. Acesse o painel administrativo do Supabase
2. Gerencie clientes, campanhas e dados
3. Crie logins para novos clientes
4. Monitore métricas globais

### **Para os Clientes**

1. Acesse o link do painel
2. Faça login com email/senha fornecidos
3. Visualize suas campanhas e resultados
4. Acompanhe leads em tempo real

## 🔧 **Personalização**

### **Adicionar Novos Clientes**
```sql
INSERT INTO clientes (nome, email, empresa) 
VALUES ('Nome Cliente', 'email@cliente.com', 'Empresa Ltd');
```

### **Configurar Campanhas**
```sql
INSERT INTO campanhas (cliente_id, nome_campanha, canal, objetivo, status, resultado_principal)
VALUES (uuid_cliente, 'Nome Campanha', 'Meta Ads', 'Leads', 'Rodando', 'CPL R$15');
```

## 📞 **Suporte**

Para dúvidas ou suporte técnico:
- Email: contato@hervalmkt.com
- WhatsApp: (11) 99999-9999

---

**Desenvolvido por Herval Mkt** 🚀