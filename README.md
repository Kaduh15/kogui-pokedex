# 🎮 Kogui Pokédex

> Uma aplicação full-stack completa para explorar e gerenciar Pokémons, desenvolvida com Flask (API) e Angular (Frontend).

[![Made with Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Made with Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## 📋 Sobre o Projeto

O **Kogui Pokédex** é uma aplicação moderna que permite aos usuários:

- 🔐 **Autenticação segura** com JWT
- 📱 **Interface responsiva** e intuitiva
- ⭐ **Sistema de favoritos** para Pokémons
- 🔍 **Busca e filtros** avançados
- 📊 **Integração completa** com a PokéAPI
- 🐳 **Deploy com Docker** para facilitar a execução

## 🚀 Início Rápido com Docker

### Pré-requisitos
- [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/)

### Executar o projeto completo

```bash
# Clone o repositório
git clone https://github.com/Kaduh15/kogui-pokedex.git
cd kogui-pokedex

# Execute com Docker Compose
docker-compose up -d
```

**Acesse a aplicação:**
- 🌐 **Frontend:** http://localhost:3000 (porta configurável via PORT)
- 🔌 **API:** http://localhost:5000
- ⚕️ **Health Check:** http://localhost:5000/health

## 🛠️ Tecnologias Utilizadas

### 🔧 Backend (API)
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Python** | 3.13+ | Linguagem principal |
| **Flask** | 3.1.2+ | Framework web |
| **SQLAlchemy** | 3.1.1+ | ORM para banco de dados |
| **JWT Extended** | 4.7.1+ | Autenticação JWT |
| **bcrypt** | 5.0.0+ | Hash seguro de senhas |
| **Requests** | 2.32.5+ | Cliente HTTP para PokéAPI |

### 🎨 Frontend (Web)
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Angular** | 20.3+ | Framework frontend |
| **TypeScript** | 5.9+ | Superset do JavaScript |
| **Tailwind CSS** | 4.0+ | Framework CSS utilitário |
| **Lucide Angular** | 0.546+ | Ícones modernos |
| **RxJS** | 7.8+ | Programação reativa |

### ⚙️ DevOps & Ferramentas
- **Docker** & **Docker Compose** - Containerização
- **uv** - Gerenciador de dependências Python
- **ESLint** & **Prettier** - Linting e formatação
- **Black** & **Flake8** - Formatação e análise Python

## 📁 Estrutura do Projeto

```
kogui-pokedex/
├── 📂 api/                    # 🐍 Backend Flask
│   ├── 📂 models/            # Modelos do banco de dados
│   │   ├── usuario_model.py      # Modelo de usuário
│   │   ├── pokemon_usuario_model.py # Pokémons do usuário
│   │   ├── pokemon_tipe_model.py    # Tipos de Pokémon
│   │   └── pokemon_usuario_tipo_model.py # Relacionamento
│   ├── 📂 routes/            # Endpoints da API
│   │   ├── auth_routes.py        # Autenticação
│   │   ├── pokemon_routes.py     # Endpoints Pokémon
│   │   └── user_routes.py        # Endpoints usuário
│   ├── 📂 services/          # Lógica de negócio
│   │   ├── auth_service.py       # Serviço de autenticação
│   │   ├── pokemon_service.py    # Serviço de Pokémons
│   │   ├── pokeapi_service.py    # Integração PokéAPI
│   │   └── user_service.py       # Serviço de usuário
│   ├── 📂 utils/             # Utilitários
│   │   ├── auth_decorators.py    # Decorators de autenticação
│   │   ├── hash.py               # Utilitários de hash
│   │   └── http_status.py        # Códigos de status HTTP
│   ├── 📄 config.py          # Configurações da aplicação
│   ├── 📄 database.py        # Setup do banco de dados
│   ├── 📄 main.py            # Aplicação principal
│   ├── 🐳 Dockerfile         # Container da API
│   └── 📋 README.md          # Documentação da API
│
├── 📂 web/                    # 🅰️ Frontend Angular
│   ├── 📂 src/               # Código-fonte
│   │   ├── 📂 app/           # Aplicação Angular
│   │   │   ├── pages/         # Páginas (home, login, etc)
│   │   │   ├── services/      # Serviços Angular
│   │   │   └── types/         # Tipos TypeScript
│   │   ├── 📂 environments/  # Configurações de ambiente
│   │   └── 📂 utils/         # Utilitários
│   ├── 🐳 Dockerfile         # Container do frontend
│   └── 📋 README.md          # Documentação do frontend
│
├── 🐳 docker-compose.yml     # Orquestração dos serviços
└── 📋 README.md               # Documentação principal
```

## 🚀 Desenvolvimento Local

### 🐍 Backend (API)
```bash
cd api/
# Veja instruções detalhadas em api/README.md
```

### 🅰️ Frontend (Web)
```bash
cd web/
# Veja instruções detalhadas em web/README.md
```

## 📚 Documentação Específica

- 📖 **[Documentação da API](api/README.md)** - Endpoints, autenticação, modelos e desenvolvimento
- 📖 **[Documentação do Frontend](web/README.md)** - Componentes, serviços e desenvolvimento Angular

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente

Crie um arquivo `.env` na pasta `api/` com:

```bash
# Banco de Dados
DATABASE_URI=sqlite:///pokedex.db

# JWT
JWT_SECRET_KEY=your-super-secret-jwt-key-here
JWT_ACCESS_TOKEN_EXPIRES=3600
```

## 🔧 Qualidade de Código

### Backend
```bash
cd api/
# Linting e formatação
uv run black .
uv run flake8 .
```

### Frontend
```bash
cd web/
# Linting e formatação
npm run lint:all
npm run fix:all
```

## 🚢 Deploy

### Produção com Docker

```bash
# Build das imagens
docker-compose build

# Deploy em produção
docker-compose -f docker-compose.prod.yml up -d
```

## 👨‍💻 Autor

**Kadu**
- GitHub: [@Kaduh15](https://github.com/Kaduh15)
- LinkedIn: [Seu LinkedIn](https://linkedin.com/in/Kaduh15)

## 🙏 Agradecimentos

- [PokéAPI](https://pokeapi.co/) - API de dados dos Pokémons
- [Flask](https://flask.palletsprojects.com/) - Framework web Python
- [Angular](https://angular.dev/) - Framework frontend
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS

---

<div align="center">
  <p>⭐ Se este projeto foi útil para você, considere dar uma estrela!</p>
  <p>🐛 Encontrou um bug? <a href="https://github.com/Kaduh15/kogui-pokedex/issues">Reporte aqui</a></p>
  <p>💡 Tem uma sugestão? <a href="https://github.com/Kaduh15/kogui-pokedex/discussions">Vamos conversar!</a></p>
</div>
