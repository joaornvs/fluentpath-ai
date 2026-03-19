# ⚡ LearnPath

> Plataforma de aprendizado de tecnologia com foco em **inglês técnico**. Trilhas progressivas de Data Science, GenAI, Programação e Estatística — baseadas nos melhores livros técnicos do mercado.

[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e?logo=supabase&logoColor=white)](https://supabase.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

**🔗 Site ao vivo:** [fluentpath-ai.vercel.app](https://fluentpath-ai.vercel.app)

---

## 📖 Sobre o Projeto

O **LearnPath** foi criado para profissionais e estudantes brasileiros de tecnologia que querem aprender conteúdo técnico **e** melhorar o inglês ao mesmo tempo.

Cada módulo das trilhas inclui:
- Conteúdo técnico baseado em capítulos de livros reais
- Vocabulário com pronúncia IPA e tradução PT/EN
- Frases práticas para o dia a dia profissional
- Exercícios de múltipla escolha com explicações detalhadas

### 📚 Fontes Bibliográficas

| Livro | Autor(es) | Trilha |
|-------|-----------|--------|
| *Data Science from Scratch* | Joel Grus (O'Reilly, 2015) | Data Science + Programação |
| *Deep Learning* | Goodfellow, Bengio, Courville (MIT Press, 2016) | GenAI |
| *OpenIntro Statistics* | Diez, Çetinkaya-Rundel, Barr (4ª ed.) | Estatística |
| *NLP with Transformers* | Tunstall et al. (O'Reilly, 2022) | GenAI |

---

## ✨ Funcionalidades

### 🗺️ Trilhas de Aprendizado
- **4 trilhas:** Data Science · GenAI & LLMs · Programação · Estatística
- **3 níveis por trilha:** Iniciante → Intermediário → Avançado
- **50+ módulos** com sistema de pré-requisitos (desbloqueio progressivo)
- Árvore visual com conectores mostrando a progressão
- Cada módulo: tópicos, vocabulário EN/PT com pronúncia, frases práticas, exercícios e fonte bibliográfica

### 🇺🇸 Inglês Técnico
- **Flashcards** com pronúncia IPA e tradução
- **Quiz de vocabulário** com múltipla escolha e feedback imediato
- **Guia de pronúncia** com busca e exemplos reais de uso
- Vocabulário integrado a cada módulo das trilhas

### 🏆 Gamificação
- XP por ação: módulo completo (+15), exercício correto (+10), vocabulário (+5)
- 100 níveis com títulos progressivos (de "Rookie Learner" a "English Legend")
- Ranking global com pódio e filtro por trilha

### 👤 Perfil
- Upload de foto de perfil
- Estatísticas de progresso (módulos, XP, nível)
- Preferências de trilha e nível de inglês

### 📈 Progresso
- Progresso por trilha com barra visual
- Histórico de módulos concluídos com data
- Evolução de XP e nível

### ➕ Cursos Personalizados
- Adicione seus próprios recursos (cursos externos, livros, tutoriais, artigos)
- Categorização por área, nível e duração
- Links clicáveis para recursos externos

---

## 🚫 O que foi removido

| Funcionalidade | Motivo |
|----------------|--------|
| Simulador de Entrevistas | Removido para simplificar a experiência e melhorar a performance geral |

---

## 🛠️ Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 18 + Vite 5 |
| Estilo | Tailwind CSS 3 |
| Auth + DB + Storage | Supabase (PostgreSQL) |
| Roteamento | React Router v6 |
| Notificações | react-hot-toast |
| Deploy | Vercel (CI/CD automático via GitHub) |
| Fontes | Plus Jakarta Sans + Syne + JetBrains Mono |

---

## ⚡ Performance

O LearnPath usa um sistema de **cache em memória** para evitar queries desnecessárias ao banco:

| Dado | TTL do Cache |
|------|-------------|
| Perfil do usuário | 30 segundos |
| Progresso das trilhas | 20 segundos |
| Vocabulário aprendido | 15 segundos |
| Ranking global | 60 segundos |
| Cursos | 10 segundos |

O perfil carrega em background sem bloquear a navegação. Timeout máximo de 4 segundos — nunca trava infinitamente.

---

## 🚀 Como Rodar Localmente

### 1. Clone e instale

```bash
git clone https://github.com/joaornvs/fluentpath-ai.git
cd fluentpath-ai
npm install
```

### 2. Configure o ambiente

```bash
cp .env.example .env
```

Preencha o `.env`:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anon_publica
```

### 3. Configure o banco de dados no Supabase

Execute no **SQL Editor** do seu projeto Supabase:

```sql
DROP TABLE IF EXISTS entrevistas CASCADE;
DROP TABLE IF EXISTS cursos_usuario CASCADE;
DROP TABLE IF EXISTS vocab_resultado CASCADE;
DROP TABLE IF EXISTS exercicios_resultado CASCADE;
DROP TABLE IF EXISTS progresso CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  nome TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  xp INTEGER DEFAULT 0,
  nivel_ingles TEXT DEFAULT 'iniciante',
  trilha_ativa TEXT DEFAULT 'data-science',
  foto_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE progresso (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  node_id TEXT NOT NULL,
  trail_id TEXT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE exercicios_resultado (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  node_id TEXT NOT NULL,
  correct BOOLEAN NOT NULL,
  answered_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE vocab_resultado (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  word_id TEXT NOT NULL,
  correct BOOLEAN NOT NULL,
  answered_at TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE TABLE entrevistas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  trail_id TEXT NOT NULL,
  job_title TEXT,
  nivel TEXT NOT NULL,
  score FLOAT DEFAULT 0,
  total INTEGER DEFAULT 0,
  feedback TEXT,
  done_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles             ENABLE ROW LEVEL SECURITY;
ALTER TABLE progresso            ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercicios_resultado ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocab_resultado      ENABLE ROW LEVEL SECURITY;
ALTER TABLE cursos_usuario       ENABLE ROW LEVEL SECURITY;
ALTER TABLE entrevistas          ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own" ON profiles          FOR ALL    USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "pub" ON profiles          FOR SELECT USING (true);
CREATE POLICY "own" ON progresso         FOR ALL    USING (auth.uid() = user_id);
CREATE POLICY "own" ON exercicios_resultado FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "own" ON vocab_resultado   FOR ALL    USING (auth.uid() = user_id);
CREATE POLICY "own" ON cursos_usuario    FOR ALL    USING (auth.uid() = user_id);
CREATE POLICY "own" ON entrevistas       FOR ALL    USING (auth.uid() = user_id);
```

### 4. Configure o Storage (foto de perfil)

No Supabase → **Storage** → **New bucket**:
- Nome: `avatars`
- Public bucket: ✅ ativado

### 5. Rode

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
│   │   ├── curriculum.js          ← 🧠 Trilhas completas (50+ módulos)
│   │   └── english.js             ← 🇺🇸 Vocabulário técnico por área
│   ├── components/
│   │   ├── layout/
│   │   │   └── index.jsx          ← Navbar, Sidebar, MobileNav, AppLayout
│   │   └── ui/
│   │       └── index.jsx          ← Button, Card, Badge, XPBar, Spinner, etc.
│   ├── hooks/
│   │   └── useAuth.jsx            ← Context de autenticação (carregamento não bloqueante)
│   ├── services/
│   │   └── supabase/
│   │       ├── client.js          ← Instância do Supabase
│   │       └── db.js              ← CRUD com cache em memória
│   ├── lib/
│   │   └── gamification.js        ← XP, níveis, títulos, metadata das trilhas
│   ├── pages/
│   │   ├── Landing.jsx            ← Página inicial pública
│   │   ├── Auth.jsx               ← Register (2 etapas), Login, ConfirmEmail
│   │   ├── Dashboard.jsx          ← Trilhas + árvore de módulos + modal de conteúdo
│   │   ├── English.jsx            ← Flashcards, quiz e guia de pronúncia
│   │   ├── ProgressAndCourses.jsx ← Progresso e cursos personalizados
│   │   ├── Ranking.jsx            ← Ranking global com pódio
│   │   └── Profile.jsx            ← Perfil com upload de foto
│   ├── styles/
│   │   └── globals.css            ← Design system completo
│   ├── App.jsx                    ← Roteamento e guards de autenticação
│   └── main.jsx                   ← Entry point
├── vercel.json                    ← Rewrites para SPA (evita 404 ao recarregar)
├── .env.example
├── .gitignore
└── README.md
```

---

## 🤝 Como Contribuir

### Adicionando módulos às trilhas

Edite `src/data/curriculum.js`. Estrutura de um módulo:

```javascript
{
  id: 'ds-i-09',                     // ID único — convenção: [trilha]-[nivel]-[numero]
  title: 'Título do Módulo',
  duration: '45 min',
  source: 'Nome do Livro — Capítulo X',  // SEMPRE cite a fonte!
  description: 'Descrição curta e objetiva.',
  topics: ['Tópico 1', 'Tópico 2'],
  prerequisites: ['ds-i-08'],             // IDs de módulos anteriores (ou [] para nenhum)
  englishWords: [
    {
      word: 'clustering',
      pt: 'agrupamento',
      pronunciation: 'ˈklʌstərɪŋ',       // Notação IPA
      example: 'K-means is a clustering algorithm.',
      tip: 'Dica extra de uso (opcional).',
    }
  ],
  englishPhrases: [
    { en: 'We need to choose the number of clusters.', pt: 'Precisamos escolher o número de clusters.' }
  ],
  exercises: [
    {
      id: 'e1',
      question: 'What is the main limitation of K-Means?',
      options: ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
      answer: 0,          // Índice da resposta correta (0–3)
      explanation: 'Explicação detalhada da resposta correta.',
    }
  ],
}
```

### Adicionando vocabulário

Edite `VOCAB_SETS` em `src/data/english.js`:

```javascript
{
  id: 'v-ds-020',
  word: 'overfitting',
  pt: 'sobreajuste',
  pronunciation: 'ˌoʊvərˈfɪtɪŋ',
  example: 'The model is overfitting the training data.',
  tip: 'Sinal: train accuracy alta, validation accuracy baixa.',
}
```

### Como adicionar um PDF como fonte

1. Leia o conteúdo do PDF e extraia os tópicos por capítulo
2. Crie módulos em `curriculum.js` citando o livro no campo `source`
3. Adicione o vocabulário técnico em `english.js`
4. Crie `docs/references/REFERENCES.md` listando título, autor, editora e ISBN
5. **Não commite o PDF** (direitos autorais) — apenas a referência
6. Abra um Pull Request descrevendo os capítulos cobertos

### Pull Request

```bash
git checkout -b feat/novos-modulos-genai
git add .
git commit -m "feat: add advanced RAG modules to GenAI trail"
git push origin feat/novos-modulos-genai
```

---

## 🔐 Segurança

- `.env` está no `.gitignore` — **nunca suba suas chaves para o GitHub**
- Row Level Security (RLS) ativado — cada usuário acessa apenas seus próprios dados
- O ranking usa leitura pública apenas de `nome`, `username` e `xp`
- Fotos de perfil armazenadas no Supabase Storage (bucket público para leitura)

---

## 📝 Licença

MIT — use, modifique e distribua livremente.

Se o projeto te ajudou, uma ⭐ no GitHub é muito bem-vinda!

---

## 🙏 Agradecimentos

Conteúdo baseado nos trabalhos de:
- **Joel Grus** — *Data Science from Scratch* (O'Reilly)
- **Ian Goodfellow, Yoshua Bengio, Aaron Courville** — *Deep Learning* (MIT Press)
- **David Diez, Mine Çetinkaya-Rundel, Christopher Barr** — *OpenIntro Statistics*
- **Lewis Tunstall, Leandro von Werra, Thomas Wolf** — *NLP with Transformers* (O'Reilly)
