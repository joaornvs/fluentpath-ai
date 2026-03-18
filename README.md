# ⚡ LearnPath

> Trilhas de aprendizado em Data Science, GenAI e Programação — baseadas nos melhores livros técnicos do mercado.

[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite)](https://vitejs.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e?logo=supabase)](https://supabase.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06b6d4?logo=tailwindcss)](https://tailwindcss.com)

---

## 📖 Sobre o projeto

**LearnPath** é uma plataforma de trilhas de aprendizado progressivas para quem quer entrar ou crescer nas áreas de tecnologia e ciência de dados. O diferencial é o conteúdo: cada módulo é baseado em capítulos de livros técnicos reais, não em conteúdo gerado genericamente.

### 📚 Fontes bibliográficas

| Livro | Autor(es) | Trilha |
|-------|-----------|--------|
| *Data Science from Scratch* | Joel Grus (O'Reilly, 2015) | Data Science + Programação |
| *Deep Learning* | Goodfellow, Bengio, Courville (MIT Press, 2016) | GenAI |
| *OpenIntro Statistics* | Diez, Çetinkaya-Rundel, Barr (4ª ed.) | Data Science |
| *Natural Language Processing with Transformers* | Tunstall et al. (O'Reilly, 2022) | GenAI |

> **Quer adicionar mais conteúdo?** Veja a seção [Contribuindo](#-contribuindo).

---

## ✨ Funcionalidades

- **🗺️ Trilhas visuais** — Árvore de aprendizado com módulos desbloqueáveis por pré-requisitos
- **📊 3 áreas principais** — Data Science, GenAI e Programação
- **🎯 3 níveis por área** — Iniciante → Intermediário → Avançado
- **✍️ Exercícios** — Questões baseadas no conteúdo dos livros, com feedback imediato
- **🇺🇸 Foco em inglês técnico** — Cada módulo lista o vocabulário técnico em inglês da área
- **🎤 Entrevistas técnicas** — Perguntas reais de entrevista com respostas modelo
- **➕ Cursos personalizados** — Adicione seus próprios recursos de estudo
- **🏆 Ranking global** — Competição saudável por XP
- **⚡ Gamificação** — XP, níveis e títulos progressivos
- **🔐 Autenticação** — Registro com confirmação de email via Supabase Auth
- **📱 Responsivo** — Mobile e desktop

---

## 🛠️ Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 18 + Vite 5 |
| Estilo | Tailwind CSS 3 |
| Auth + DB | Supabase (PostgreSQL) |
| Roteamento | React Router v6 |
| Notificações | react-hot-toast |

---

## 🚀 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/learnpath.git
cd learnpath
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Preencha o `.env`:

```env
VITE_SUPABASE_URL=https://sua-url.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica
```

### 4. Configure o banco de dados

Execute o SQL abaixo no **SQL Editor** do seu projeto Supabase:

```sql
-- Perfis de usuário
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  nome TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  xp INTEGER DEFAULT 0,
  nivel_escolhido TEXT DEFAULT 'iniciante',
  trilha_ativa TEXT DEFAULT 'data-science',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Progresso nas trilhas
CREATE TABLE progresso (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  node_id TEXT NOT NULL,
  trail_id TEXT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Resultado de exercícios
CREATE TABLE exercicios_resultado (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  node_id TEXT NOT NULL,
  exercise_id TEXT NOT NULL,
  correct BOOLEAN NOT NULL,
  answered_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cursos personalizados do usuário
CREATE TABLE cursos_usuario (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  descricao TEXT,
  url TEXT,
  categoria TEXT DEFAULT 'Outro',
  nivel TEXT DEFAULT 'iniciante',
  duracao TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Entrevistas realizadas
CREATE TABLE entrevistas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  trail_id TEXT NOT NULL,
  nivel TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  total INTEGER DEFAULT 0,
  done_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE progresso         ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercicios_resultado ENABLE ROW LEVEL SECURITY;
ALTER TABLE cursos_usuario    ENABLE ROW LEVEL SECURITY;
ALTER TABLE entrevistas       ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso
CREATE POLICY "profiles: own data"    ON profiles          FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "progresso: own data"   ON progresso         FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "exercicios: own data"  ON exercicios_resultado FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "cursos: own data"      ON cursos_usuario    FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "entrevistas: own data" ON entrevistas       FOR ALL USING (auth.uid() = user_id);

-- Ranking público (leitura apenas)
CREATE POLICY "profiles: public read" ON profiles FOR SELECT USING (true);
```

### 5. Rode o projeto

```bash
npm run dev
```

Acesse: `http://localhost:5173`

---

## 📁 Estrutura do Projeto

```
learnpath/
├── src/
│   ├── data/
│   │   └── curriculum.js          ← 🧠 Toda a estrutura das trilhas
│   ├── components/
│   │   ├── layout/
│   │   │   └── index.jsx          ← Navbar, Sidebar, AppLayout
│   │   ├── ui/
│   │   │   └── index.jsx          ← Button, Card, Badge, XPBar, etc.
│   │   └── trail/
│   │       ├── TrailTree.jsx      ← Árvore visual de aprendizado
│   │       └── NodeModal.jsx      ← Modal de conteúdo + exercícios
│   ├── hooks/
│   │   └── useAuth.jsx            ← Context de autenticação
│   ├── services/
│   │   └── supabase/
│   │       ├── client.js          ← Instância do Supabase
│   │       └── db.js              ← Todas as operações do banco
│   ├── lib/
│   │   └── gamification.js        ← XP, níveis, títulos
│   ├── pages/
│   │   └── index.jsx              ← Todas as páginas
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx                    ← Roteamento e guards
│   └── main.jsx                   ← Entry point
├── .env.example
├── .gitignore
└── README.md
```

---

## 🤝 Contribuindo

Este projeto foi desenhado para crescer com contribuições da comunidade!

### Adicionando novos módulos à trilha

Edite o arquivo `src/data/curriculum.js`. A estrutura de um módulo é:

```javascript
{
  id: 'ds-i-06',                          // ID único
  title: 'Título do módulo',
  description: 'Descrição curta',
  level: 'iniciante',                      // iniciante | intermediario | avancado
  duration: '45 min',
  source: 'Nome do livro — Capítulo X',   // Cite sempre a fonte!
  topics: ['Tópico 1', 'Tópico 2'],
  prerequisites: ['ds-i-05'],             // IDs de módulos anteriores
  englishFocus: ['term1', 'term2'],       // Vocabulário técnico em inglês
  exercises: [
    {
      id: 'e1',
      question: 'Pergunta em inglês?',
      options: ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
      answer: 0,                          // Índice da resposta correta
      explanation: 'Por que esta é a resposta...',
    }
  ],
}
```

### Adicionando perguntas de entrevista

Edite a constante `INTERVIEW_QUESTIONS` no mesmo arquivo:

```javascript
{
  id: 'dsiq6',
  question: 'Explain the concept of...',
  answer: 'A resposta modelo detalhada aqui...',
  category: 'Concepts',
}
```

### Adicionando novos livros como fonte

1. Adicione o PDF na pasta `/docs/references/` (não commite livros com copyright — apenas adicione a referência)
2. Crie novos módulos citando o livro no campo `source`
3. Abra um PR descrevendo os capítulos cobertos

### Abrindo um Pull Request

1. Faça um fork do repositório
2. Crie uma branch: `git checkout -b feat/nova-trilha`
3. Commite suas mudanças: `git commit -m "feat: add advanced SQL modules"`
4. Abra um PR descrevendo o que foi adicionado

---

## 🔐 Segurança

- O arquivo `.env` está no `.gitignore` — **nunca suba suas chaves**
- Row Level Security (RLS) ativado no Supabase — usuários só acessam seus próprios dados
- O ranking usa leitura pública apenas dos campos `nome`, `username` e `xp`

---

## 📝 Licença

MIT — use, modifique e distribua livremente. Se usar como base para um projeto, um crédito é bem-vindo! ⭐

---

## ⭐ Agradecimentos

Conteúdo baseado nos trabalhos de:
- **Joel Grus** — *Data Science from Scratch* (O'Reilly)
- **Ian Goodfellow, Yoshua Bengio, Aaron Courville** — *Deep Learning* (MIT Press)
- **David Diez, Mine Çetinkaya-Rundel, Christopher Barr** — *OpenIntro Statistics*
- **Lewis Tunstall, Leandro von Werra, Thomas Wolf** — *NLP with Transformers* (O'Reilly)
