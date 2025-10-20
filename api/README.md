# 🐍 API Backend

> API Backend desenvolvida em Flask com autenticação JWT, integração com PokéAPI e banco de dados estruturado.

[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-FCA121?style=for-the-badge&logo=python&logoColor=white)](https://www.sqlalchemy.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

## 📋 Índice

- [🔧 Tecnologias](#🔧-tecnologias)
- [⚙️ Instalação](#⚙️-instalação)
- [📁 Estrutura](#📁-estrutura)
- [📡 Endpoints](#📡-endpoints)
- [🗄️ Modelos](#🗄️-modelos)
- [🔒 Autenticação](#🔒-autenticação)
- [🌐 Variáveis de Ambiente](#🌐-variáveis-de-ambiente)
- [🐳 Docker](#🐳-docker)

## 🔧 Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Python** | 3.13+ | Linguagem de programação |
| **Flask** | 3.1.2+ | Framework web minimalista |
| **SQLAlchemy** | 3.1.1+ | ORM para banco de dados |
| **Flask-JWT-Extended** | 4.7.1+ | Autenticação JWT |
| **bcrypt** | 5.0.0+ | Hashing seguro de senhas |
| **Flask-CORS** | 6.0.1+ | Cross-Origin Resource Sharing |
| **Requests** | 2.32.5+ | Cliente HTTP |
| **Requests-Cache** | 1.2.1+ | Cache para requisições HTTP |
| **python-dotenv** | 1.1.1+ | Carregamento de variáveis de ambiente |

### 🛠️ Ferramentas de Desenvolvimento

- **uv** - Gerenciador de dependências ultra-rápido
- **Black** - Formatador de código Python
- **Flake8** - Linting e análise estática

## ⚙️ Instalação

### Pré-requisitos

- **Python 3.13+**
- **uv** (recomendado) ou **pip**

### Instalação do uv

```bash
# Linux/macOS
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows (PowerShell)
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Via pip
pip install uv
```

### Setup do Projeto

```bash
# Clone o repositório (se ainda não fez)
git clone https://github.com/Kaduh15/kogui-pokedex.git
cd kogui-pokedex/api

# Instale as dependências
uv sync

# Ou com pip tradicional
# python -m venv .venv
# source .venv/bin/activate  # Linux/macOS
# .venv\Scripts\activate     # Windows
# pip install -r requirements.txt
```

### Configuração do Ambiente

1. **Crie o arquivo `.env`:**

```bash
cp .env.example .env  # Se existir
# ou crie manualmente:
touch .env
```

2. **Configure as variáveis:**

```bash
# .env
DATABASE_URI=sqlite:///pokedex.db
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production
JWT_ACCESS_TOKEN_EXPIRES=3600
FLASK_ENV=development
FLASK_DEBUG=True
```

### Executar a Aplicação

```bash
# Com uv
uv run python main.py

# Com Python tradicional
# source .venv/bin/activate
# python main.py
```

A API estará disponível em **http://localhost:5000** 🚀

## 📁 Estrutura do Projeto

```
api/
├── 📂 models/                 # Modelos do banco de dados
│   ├── __init__.py
│   ├── usuario.py            # Modelo de Usuário
│   ├── pokemon_usuario.py    # Relação Usuário-Pokémon
│   └── tipo_pokemon.py       # Tipos de Pokémon
│
├── 📂 routes/                # Rotas/Endpoints
│   ├── __init__.py
│   ├── auth.py               # Autenticação
│   ├── pokemon.py            # Endpoints de Pokémons
│   └── user.py               # Endpoints de Usuários
│
├── 📂 services/             # Lógica de negócio
│   ├── __init__.py
│   ├── auth_service.py       # Serviços de autenticação
│   ├── pokemon_service.py    # Serviços de Pokémons
│   └── pokeapi_service.py    # Integração com PokéAPI
│
├── 📂 utils/                 # Utilitários
│   ├── __init__.py
│   ├── decorators.py         # Decorators customizados
│   ├── validators.py         # Validadores
│   └── exceptions.py         # Exceções customizadas
│
├── 📄 config.py              # Configurações da aplicação
├── 📄 database.py           # Setup do banco de dados
├── 📄 main.py               # Aplicação principal
├── 📄 pyproject.toml        # Configuração do projeto
├── 📄 uv.lock              # Lock das dependências
├── 🐳 Dockerfile           # Container Docker
└── 📋 README.md            # Esta documentação
```

## 📡 Endpoints

### Base URL
```
http://localhost:5000
```

### 🔐 Autenticação

#### Registro de Usuário
```http
POST /auth/register
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "minhasenhasegura"
}
```

**Resposta (201):**
```json
{
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@email.com",
      "dt_inclusao": "2024-10-20T13:32:53.000Z"
    },
    "token": {
      "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
      "token_type": "Bearer"
    }
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "senha": "minhasenhasegura"
}
```

**Resposta (200):**
```json
{
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@email.com"
    },
    "token": {
      "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
      "token_type": "Bearer"
    }
  }
}
```

#### Perfil do Usuário
```http
GET /auth/profile
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@email.com"
    }
  }
}
```

### 🎮 Pokémons

#### Listar Pokémons da PokéAPI
```http
GET /api/pokemon?page=1&limit=20&gen=1&name=pikachu
Authorization: Bearer <token>
```

**Parâmetros:**
- `page` - Página (padrão: 1)
- `limit` - Limite por página (padrão: 20)
- `gen` - Geração do Pokémon (opcional)
- `name` - Nome do Pokémon para busca (opcional)

#### Adicionar aos Favoritos
```http
POST /api/pokemon/user/{pokemon_id}/favorite
Authorization: Bearer <token>
```

#### Remover dos Favoritos
```http
DELETE /api/pokemon/user/{pokemon_id}/favorite
Authorization: Bearer <token>
```

#### Adicionar ao Grupo de Batalha
```http
POST /api/pokemon/user/{pokemon_id}/battle-group
Authorization: Bearer <token>
```

#### Remover do Grupo de Batalha
```http
DELETE /api/pokemon/user/{pokemon_id}/battle-group
Authorization: Bearer <token>
```

#### Listar Pokémons do Usuário
```http
GET /api/pokemon/user?favorite=true&battle_group=false
Authorization: Bearer <token>
```

**Parâmetros:**
- `favorite` - Filtrar apenas favoritos (true/false)
- `battle_group` - Filtrar apenas do grupo de batalha (true/false)

### ⚕️ Saúde da API

#### Health Check
```http
GET /health
```

**Resposta (200):**
```json
{
  "status": "healthy",
  "timestamp": "2024-10-20T13:24:53Z",
  "version": "1.0.0",
  "database": "connected"
}
```

## 🗄️ Modelos do Banco de Dados

### UsuarioModel

```python
class UsuarioModel(db.Model):
    __tablename__ = "usuarios"
    
    id = db.Column("IDUsuario", db.Integer, primary_key=True)
    nome = db.Column("Nome", db.String(100), nullable=False)
    login = db.Column("Login", db.String(100), unique=True, nullable=False)
    email = db.Column("Email", db.String(100), unique=True, nullable=False)
    senha = db.Column("Senha", db.String(255), nullable=False)
    dt_inclusao = db.Column("DtInclusao", db.DateTime, default=datetime.utcnow)
    dt_alteracao = db.Column("DtAlteracao", db.DateTime, onupdate=datetime.utcnow)
    
    # Relacionamentos
    pokemons = db.relationship("PokemonUsuarioModel", back_populates="usuario")
```

### PokemonUsuarioModel

```python
class PokemonUsuarioModel(db.Model):
    __tablename__ = "pokemons_usuario"
    
    id = db.Column("IDPokemonUsuario", db.Integer, primary_key=True)
    id_usuario = db.Column("IDUsuario", db.Integer, db.ForeignKey("usuarios.IDUsuario"))
    codigo = db.Column("Codigo", db.String(50), nullable=False)  # ID da PokéAPI
    nome = db.Column("Nome", db.String(100), nullable=False)
    imagem_url = db.Column("ImagemURL", db.String(255))
    grupo_batalha = db.Column("GrupoBatalha", db.Boolean, default=False)
    favorito = db.Column("Favorito", db.Boolean, default=False)
    
    # Relacionamentos
    usuario = db.relationship("UsuarioModel", back_populates="pokemons")
    tipos = db.relationship("PokemonUsuarioTipoModel", back_populates="pokemon")
```

### PokemonTipeModel (Tipos de Pokémon)

```python
class PokemonTipeModel(db.Model):
    __tablename__ = "pokemon_tipos"
    
    id = db.Column("IDTipo", db.Integer, primary_key=True)
    nome = db.Column("Nome", db.String(50), unique=True, nullable=False)
    cor = db.Column("Cor", db.String(7))  # Hex color
```

## 🔒 Autenticação

### JWT (JSON Web Tokens)

A API utiliza **JWT** para autenticação stateless. Após o login, o cliente recebe um token que deve ser enviado no header `Authorization`:

```http
Authorization: Bearer <seu_token_jwt>
```

### Middleware de Autenticação

```python
# Exemplo de uso do decorator @jwt_required()
from flask_jwt_extended import jwt_required, get_jwt_identity

@app.route('/protected')
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    return {"logged_in_as": current_user_id}
```

### Hash de Senhas

As senhas são hasheadas usando **bcrypt** com salt aleatório:

```python
from bcrypt import hashpw, gensalt, checkpw

# Hashear senha
senha_hash = hashpw(senha.encode('utf-8'), gensalt())

# Verificar senha
if checkpw(senha.encode('utf-8'), senha_hash):
    # Senha correta
```

## 🌐 Variáveis de Ambiente

### Arquivo `.env`

```bash
# === BANCO DE DADOS ===
DATABASE_URI=sqlite:///pokedex.db
# Para PostgreSQL: postgresql://user:password@localhost:5432/pokedex
# Para MySQL: mysql://user:password@localhost:3306/pokedex

# === JWT ===
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production
JWT_ACCESS_TOKEN_EXPIRES=3600  # 1 hora em segundos
JWT_ALGORITHM=HS256

# === FLASK ===
FLASK_ENV=development
FLASK_DEBUG=True
FLASK_HOST=0.0.0.0
FLASK_PORT=5000

# === POKE API ===
POKEAPI_BASE_URL=https://pokeapi.co/api/v2
POKEAPI_CACHE_EXPIRE=3600  # 1 hora

# === CORS ===
CORS_ORIGINS=http://localhost:3000,http://localhost:4200

# === LOGGING ===
LOG_LEVEL=INFO
LOG_FORMAT=%(asctime)s - %(name)s - %(levelname)s - %(message)s
```

### Variáveis de Produção

```bash
# .env.production
FLASK_ENV=production
FLASK_DEBUG=False
DATABASE_URI=postgresql://user:password@db:5432/pokedex
JWT_SECRET_KEY=your-production-secret-key-use-a-strong-one
LOG_LEVEL=WARNING
```


## 🔧 Qualidade de Código

### Linting e Formatação

```bash
# Formatar código com Black
uv run black .

# Verificar estilo com Flake8
uv run flake8 .

# Rodar ambos
uv run black . && uv run flake8 .
```

## 🐳 Docker

### Dockerfile

```dockerfile
FROM python:3.13-slim

WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Instalar uv
RUN pip install uv

# Copiar arquivos de dependências
COPY pyproject.toml uv.lock ./

# Instalar dependências
RUN uv sync --frozen

# Copiar código fonte
COPY . .

# Expor porta
EXPOSE 5000

# Comando de inicialização
CMD ["uv", "run", "python", "main.py"]
```

### Build e Execução

```bash
# Build da imagem
docker build -t kogui-pokedex-api .

# Executar container
docker run -p 5000:5000 \
  -e DATABASE_URI=sqlite:///database.db \
  -e JWT_SECRET_KEY=your-secret-key \
  kogui-pokedex-api
```

### Docker Compose

```yaml
# No docker-compose.yml da raiz
services:
  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URI=sqlite:///database.db
      - JWT_SECRET_KEY=your-secret-key
    volumes:
      - api_data:/app/instance
```

## 🛠️ Desenvolvimento

### Adicionando Novas Dependências

```bash
# Adicionar dependência de produção
uv add flask-migrate

# Adicionar dependência de desenvolvimento
uv add --group dev pytest

# Atualizar dependências
uv sync
```

### Estrutura de uma Nova Rota

```python
# routes/exemplo.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

exemplo_bp = Blueprint('exemplo', __name__)

@exemplo_bp.route('/exemplo', methods=['GET'])
@jwt_required()
def get_exemplo():
    user_id = get_jwt_identity()
    return jsonify({"message": "Exemplo", "user_id": user_id})

# main.py - registrar blueprint
from routes.exemplo import exemplo_bp
app.register_blueprint(exemplo_bp, url_prefix='/api')
```

### Novo Modelo

```python
# models/exemplo.py
from database import db
from datetime import datetime

class Exemplo(db.Model):
    __tablename__ = 'exemplos'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text)
    ativo = db.Column(db.Boolean, default=True)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'descricao': self.descricao,
            'ativo': self.ativo,
            'data_criacao': self.data_criacao.isoformat()
        }
```

## 📈 Performance

### Cache da PokéAPI

A API utiliza `requests-cache` para cachear requisições à PokéAPI:

```python
import requests_cache

# Configurar cache
requests_cache.install_cache(
    'pokeapi_cache', 
    backend='sqlite', 
    expire_after=3600  # 1 hora
)
```

### Otimizações de Banco

- **Indexação** em colunas frequentemente consultadas
- **Lazy loading** em relacionamentos
- **Paginação** em listagens

## 🔍 Debug

### Logs

```python
import logging

# Configurar logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)
logger.info("API iniciada com sucesso")
```

### Modo Debug

```bash
# Ativar debug mode
export FLASK_DEBUG=True
# ou no .env
FLASK_DEBUG=True
```

## 🔗 Links Úteis

- 📚 **[Flask Documentation](https://flask.palletsprojects.com/)**
- 📚 **[SQLAlchemy Documentation](https://docs.sqlalchemy.org/)**
- 📚 **[Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/)**
- 🎮 **[PokéAPI Documentation](https://pokeapi.co/docs/v2)**
- 🔧 **[uv Documentation](https://docs.astral.sh/uv/)**

---

🐍 **Desenvolvido com Flask e ♥️**
