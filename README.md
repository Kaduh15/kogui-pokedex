# 🎮 Kogui Pokédex

Sistema completo de Pokédex desenvolvido com Flask (Backend) e tecnologias modernas.

## 📋 Sobre o Projeto

O Kogui Pokédex é uma aplicação full-stack que permite aos usuários criar contas, gerenciar seus Pokémons favoritos e explorar diferentes tipos de Pokémon. O projeto está sendo desenvolvido com foco em segurança, escalabilidade e boas práticas de desenvolvimento.

## 🚀 Status Atual

**✅ Funcionalidades Implementadas:**
- API Backend com Flask
- Sistema de autenticação JWT
- Registro de usuários com hash bcrypt
- Modelos de banco de dados estruturados
- Validações de entrada robustas
- Código seguindo padrões PEP8

**🚧 Em Desenvolvimento:**
- Endpoints de gerenciamento de Pokémons
- Sistema de favoritos
- Interface frontend
- Integração com PokeAPI
- Testes automatizados

## 🛠 Tecnologias Utilizadas

### Backend (API)
- **Flask** - Framework web Python
- **SQLAlchemy** - ORM para banco de dados
- **JWT Extended** - Autenticação e autorização
- **bcrypt** - Hash seguro de senhas
- **Python 3.13+** - Linguagem principal

### Banco de Dados
- **SQLAlchemy ORM** - Abstração de banco de dados
- Suporte para PostgreSQL, MySQL, SQLite

### Ferramentas de Desenvolvimento
- **Black** - Formatação de código
- **Flake8** - Análise estática de código
- **uv** - Gerenciador de dependências rápido

## 📁 Estrutura do Projeto

```
kogui-pokedex/
├── api/                     # Backend Flask API
│   ├── models/             # Modelos do banco de dados
│   ├── routes/             # Endpoints da API
│   ├── services/           # Lógica de negócio
│   ├── utils/              # Utilitários e helpers
│   ├── config.py           # Configurações
│   ├── database.py         # Setup do banco de dados
│   ├── main.py             # Aplicação principal
│   └── .http               # Testes HTTP
└── README.md               # Documentação principal
```

## ⚙️ Como Executar

### Pré-requisitos
- Python 3.13 ou superior
- uv (gerenciador de dependências)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Kaduh15/kogui-pokedex.git
cd kogui-pokedex
```

2. Entre no diretório da API:
```bash
cd api
```

3. Instale as dependências:
```bash
uv sync
```

4. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env na pasta api/
DATABASE_URI=sqlite:///pokedex.db
JWT_SECRET_KEY=your-super-secret-jwt-key
JWT_ACCESS_TOKEN_EXPIRES=3600
```

5. Execute a aplicação:
```bash
uv run python main.py
```

A API estará disponível em `http://localhost:5000`

## 📡 Endpoints Disponíveis

### Autenticação
- `POST /auth/register` - Registro de usuário

**Exemplo de uso:**
```http
POST http://localhost:5000/auth/register
Content-Type: application/json

{
    "nome": "João Silva",
    "login": "joao123",
    "email": "joao@email.com",
    "senha": "minhasenhasegura"
}
```

## 🗄️ Banco de Dados

O sistema utiliza os seguintes modelos:

- **Usuario** - Dados dos usuários registrados
- **PokemonUsuario** - Pokémons coletados pelos usuários
- **TipoPokemon** - Tipos de Pokémon (Fogo, Água, etc.)
- **PokemonUsuarioTipo** - Relacionamento many-to-many entre pokémons e tipos

## 🔒 Segurança

- Senhas hasheadas com bcrypt
- Autenticação JWT stateless
- Validação rigorosa de entrada
- Sanitização de dados
- Configuração por variáveis de ambiente

## 🧪 Testes

Para testar os endpoints, utilize o arquivo `api/.http` com extensões como REST Client no VS Code.

## 📝 Conventional Commits

O projeto segue o padrão de Conventional Commits:
- `feat:` - Novas funcionalidades
- `fix:` - Correções de bugs  
- `docs:` - Documentação
- `style:` - Formatação de código
- `refactor:` - Refatoração
- `test:` - Testes
- `build:` - Configurações de build

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona funcionalidade incrível'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Kadu** - [GitHub](https://github.com/Kaduh15)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!