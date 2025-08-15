# 🚀 Deploy HR4AL.co no Vercel

## 📋 Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Git configurado
- Node.js 18+ instalado
- Python 3.11+ instalado

## 🔧 Configuração

### 1. Instalar Vercel CLI
```bash
npm i -g vercel
```

### 2. Login no Vercel
```bash
vercel login
```

### 3. Configurar Projeto
```bash
vercel
```

## 🎯 Deploy

### Deploy de Desenvolvimento
```bash
vercel dev
```

### Deploy de Produção
```bash
vercel --prod
```

## 📁 Estrutura de Deploy

```
hr6/
├── api/                    # API Routes (Node.js)
├── *.html                 # Static Pages
├── *.py                   # Python Functions
├── vercel.json           # Vercel Configuration
├── package.json          # Node.js Dependencies
└── requirements.txt      # Python Dependencies
```

## 🌐 URLs de Deploy

- **Homepage:** `https://hr6-one.vercel.app`
- **API:** `https://hr6-one.vercel.app/api`
- **Scraper:** `https://hr6-one.vercel.app/api/scrape`
- **Demo:** `https://hr6-one.vercel.app/demo`

## ⚙️ Configurações

### Variáveis de Ambiente
- `NODE_ENV=production`
- `PYTHONPATH=.`
- `API_TIMEOUT=30000`
- `MAX_DURATION=30`

### Build Settings
- **Node.js:** 18.x
- **Python:** 3.11
- **Build Command:** `npm run build`
- **Output Directory:** `.vercel/output`

## 🔍 Troubleshooting

### Erro de Timeout
- Aumentar `maxDuration` no vercel.json
- Otimizar código Python

### Erro de Dependências
- Verificar requirements.txt
- Instalar dependências manualmente

### Erro de CORS
- Configurar CORS no api/index.js
- Verificar origins permitidos

## 📊 Monitoramento

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Logs:** `vercel logs`
- **Analytics:** Vercel Analytics

## 🔄 Atualizações

```bash
# Fazer alterações
git add .
git commit -m "Update for Vercel"
git push

# Deploy automático via GitHub
# Ou deploy manual:
vercel --prod
```

## 🎉 Sucesso!

Após o deploy, o projeto estará disponível em:
**https://hr6-one.vercel.app**
