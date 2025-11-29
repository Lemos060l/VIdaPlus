# VidaPlus - Sistema de Agendamento de Consultas Médicas

Um sistema moderno e responsivo para agendamento de consultas médicas, desenvolvido com React, TypeScript e Tailwind CSS.

## Características

- **Autenticação de Usuários**: Dois tipos de usuários - Paciente e Médico
- **Dashboard Paciente**: Visualização de consultas agendadas e disponibilidade de serviços
- **Dashboard Médico**: Gerenciamento de atendimentos e lista de pacientes
- **Tela de Serviços**: Catálogo de consultas disponíveis com preços e horários
- **Design Responsivo**: Otimizado para dispositivos móveis e desktop
- **Interface Intuitiva**: Navegação clara com componentes bem estruturados

## Requisitos

- Node.js 16+
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd vidaplus
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do Supabase:
```
VITE_SUPABASE_URL=https://sua-instancia.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## Build

Para criar uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos compilados estarão na pasta `dist/`

## Visualizar Produção

Para testar a versão de produção localmente:

```bash
npm run preview
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila para produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter
- `npm run typecheck` - Verifica tipos TypeScript

## Menu de Desenvolvimento

Ao iniciar a aplicação, você verá um menu de desenvolvimento que permite visualizar todas as telas sem fazer login:

- **Dashboard Paciente** - Interface para pacientes
- **Dashboard Médico** - Interface para médicos
- **Tela de Serviços** - Catálogo de consultas
- **Tela de Login** - Tela de autenticação
- **Tela de Cadastro** - Formulário de registro

## Estrutura do Projeto

```
src/
├── components/
│   ├── DoctorDashboard.tsx      # Dashboard do médico
│   ├── LoginScreen.tsx          # Tela de login
│   ├── PatientDashboard.tsx     # Dashboard do paciente
│   ├── RegisterScreen.tsx       # Tela de cadastro
│   └── ServicesScreen.tsx       # Tela de serviços
├── App.tsx                       # Componente raiz
├── main.tsx                      # Entrada da aplicação
└── index.css                     # Estilos globais
```

## Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces de usuário
- **TypeScript** - Superset tipado de JavaScript
- **Vite** - Build tool e dev server ultrarrápido
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Biblioteca de ícones
- **Supabase** - Backend como serviço

## Configuração do Supabase

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Na seção "Settings" → "API", copie:
   - Project URL → `VITE_SUPABASE_URL`
   - Anon Key → `VITE_SUPABASE_ANON_KEY`
4. Atualize o arquivo `.env` com essas credenciais

## Deploy

### Vercel

1. Push o código para GitHub
2. Conecte seu repositório no [Vercel](https://vercel.com)
3. Adicione as variáveis de ambiente
4. Deploy automático!

### Netlify

1. Conecte seu repositório
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Adicione as variáveis de ambiente
5. Deploy!

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## Licença

MIT

## Suporte

Para reportar bugs ou solicitar features, abra uma issue no repositório.
