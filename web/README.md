# 🅰️ Frontend Web

> Interface web moderna e responsiva desenvolvida com Angular 20+ e Tailwind CSS para explorar Pokémons.

[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)](https://rxjs.dev/)

## 📋 Índice

- [🔧 Tecnologias](#🔧-tecnologias)
- [⚙️ Instalação](#⚙️-instalação)
- [📁 Estrutura](#📁-estrutura)
- [🌐 Environments](#🌐-environments)
- [🐳 Docker](#🐳-docker)
- [🌨️ PWA](#🌨️-pwa)

## 🔧 Tecnologias

### 🛠️ Core
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Angular** | 20.3+ | Framework frontend |
| **TypeScript** | 5.9+ | Superset tipado do JavaScript |
| **RxJS** | 7.8+ | Programação reativa |
| **Zone.js** | 0.15+ | Change detection |

### 🎨 UI/UX
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Tailwind CSS** | 4.0+ | Framework CSS utilitário |
| **Lucide Angular** | 0.546+ | Ícones modernos |
| **NGX Toastr** | 19.1+ | Notificações toast |
| **PostCSS** | 8.5+ | Processamento CSS |

### 🛠️ Desenvolvimento
| Ferramenta | Versão | Descrição |
|------------|--------|-----------|
| **Angular CLI** | 20.3+ | Interface de linha de comando |
| **ESLint** | 8.57+ | Linting JavaScript/TypeScript |
| **Prettier** | 3.6+ | Formatador de código |

## ⚙️ Instalação

### Pré-requisitos

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** ou **yarn**
- **Angular CLI** (opcional, mas recomendado)

### Instalação do Angular CLI

```bash
# Instalar globalmente
npm install -g @angular/cli

# Verificar versão
ng version
```

### Setup do Projeto

```bash
# Clone o repositório (se ainda não fez)
git clone https://github.com/Kaduh15/kogui-pokedex.git
cd kogui-pokedex/web

# Instalar dependências
npm install

# ou com yarn
yarn install
```

### Executar em Desenvolvimento

```bash
# Servidor de desenvolvimento
npm start
# ou
ng serve

# Com porta customizada
ng serve --port 4200

# Modo de desenvolvimento com live reload
ng serve --watch
```

A aplicação estará disponível em **http://localhost:4200** 🚀

## 📁 Estrutura do Projeto

```
web/
├── 📂 src/                     # Código-fonte
│   ├── 📂 app/                 # Aplicação Angular
│   │   ├── 📂 pages/           # Páginas da aplicação
│   │   │   ├── home/           # Página inicial (home.ts)
│   │   │   ├── login/          # Login (login.ts)
│   │   │   ├── register/       # Registro (register.ts)
│   │   │   ├── favorite/       # Favoritos (favorite.ts)
│   │   │   ├── team/           # Equipe/Grupo batalha (team.ts)
│   │   │   └── profile/        # Perfil (profile.ts)
│   │   │
│   │   ├── 📂 services/        # Serviços
│   │   │   ├── api.ts          # Cliente HTTP (API service)
│   │   │   ├── auth/           # Guards de autenticação
│   │   │       ├── auth.guard.ts
│   │   │       └── guest.guard.ts
│   │   │
│   │   ├── 📂 types/           # Interfaces TypeScript
│   │   │   ├── api.types.ts    # Tipos da API
│   │   │   ├── pokemon.types.ts # Tipos Pokémon
│   │   │   ├── ui.types.ts     # Tipos UI
│   │   │   └── index.ts        # Export central
│   │   │
│   │   ├── app.config.ts   # Configuração da app
│   │   ├── app.routes.ts   # Rotas da aplicação
│   │   ├── app.ts          # Componente principal
│   │   └── app.html        # Template principal
│   │
│   ├── 📂 environments/       # Configurações de ambiente
│   │   ├── environment.ts          # Desenvolvimento
│   │   └── environment.development.ts # Desenvolvimento alternativo
│   │
│   ├── 📂 utils/               # Utilitários
│   │   └── pokemon-type.util.ts # Utilitários tipos Pokémon
│   │
│   ├── index.html          # HTML principal
│   ├── main.ts             # Bootstrap da aplicação
│   └── styles.css          # Estilos globais
│
├── 📂 public/               # Assets públicos (se existir)
│
├── ⚙️ angular.json           # Configuração do Angular
├── 📄 package.json          # Dependências npm
├── 📄 tsconfig.json         # Configuração TypeScript
├── 🐳 Dockerfile           # Container Docker
├── 🐳 nginx.conf            # Configuração Nginx
└── 📋 README.md            # Esta documentação
```

## 🌐 Environments

### Development

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000',
  appName: 'Kogui Pokédex - Dev',
  version: '1.0.0-dev',
  enableDebugTools: true,
  logLevel: 'debug'
};
```

### Production

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.kogui-pokedex.com',
  appName: 'Kogui Pokédex',
  version: '1.0.0',
  enableDebugTools: false,
  logLevel: 'error'
};
```

## 🔧 Qualidade de Código

### Linting e Formatação

```bash
# ESLint
npm run lint
npm run lint:fix

# Prettier
npm run format
npm run format:check

# Ambos
npm run lint:all
npm run fix:all
```

## 🐳 Docker

### Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build --prod

# Production stage
FROM nginx:alpine

# Copiar build para nginx
COPY --from=builder /app/dist/web /usr/share/nginx/html

# Copiar configuração do nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expor porta
EXPOSE 80

# Comando de inicialização
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Servir arquivos estáticos
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache para assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### Build e Execução

```bash
# Build da imagem
docker build -t kogui-pokedex-web .

# Executar container
docker run -p 3000:80 kogui-pokedex-web

# Com variáveis de ambiente
docker run -p 3000:80 \
  -e API_URL=https://api.exemplo.com \
  kogui-pokedex-web
```

## 🛠️ Scripts Disponíveis

```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "build:prod": "ng build --configuration production",
    "lint": "ng lint",
    "lint:fix": "ng lint --fix",
    "format": "prettier --write \"src/**/*.{html,css,scss,ts,json}\"",
    "format:check": "prettier --check \"src/**/*.{html,css,scss,ts,json}\"",
    "lint:all": "npm run lint && npm run format:check",
    "fix:all": "npm run lint:fix && npm run format",
    "serve:prod": "ng serve --configuration production",
    "analyze": "ng build --stats-json && npx webpack-bundle-analyzer dist/web/stats.json"
  }
}
```

## 🔍 Debug e Performance

### Angular DevTools

```bash
# Instalar extensão do browser
# Chrome: Angular DevTools
# Firefox: Angular DevTools
```

## 🔗 Links Úteis

- 📚 **[Angular Documentation](https://angular.dev/)**
- 📚 **[Angular CLI Reference](https://angular.dev/tools/cli)**
- 📚 **[RxJS Documentation](https://rxjs.dev/)**
- 🎨 **[Tailwind CSS Documentation](https://tailwindcss.com/docs)**
- ⚙️ **[TypeScript Documentation](https://www.typescriptlang.org/docs/)**

---

🅰️ **Desenvolvido com Angular e ♥️**
