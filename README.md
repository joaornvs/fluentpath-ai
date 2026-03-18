# ⚡ LearnPath

> Plataforma de aprendizado de tecnologia com foco em **inglês técnico**. Trilhas de Data Science, GenAI, Programação e Estatística — baseadas nos melhores livros do mercado.

[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e?logo=supabase&logoColor=white)](https://supabase.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

---

## 📖 Sobre o Projeto

O **LearnPath** foi criado para profissionais brasileiros que querem aprender tecnologia **e** melhorar o inglês técnico ao mesmo tempo. Cada módulo de trilha inclui:

- O conteúdo técnico do tópico
- Vocabulário com pronúncia em IPA
- Tradução e exemplos de uso real
- Frases práticas para o dia a dia profissional
- Exercícios de fixação baseados no livro de referência

### 📚 Fontes Bibliográficas

| Livro | Autor(es) | Trilha |
|-------|-----------|--------|
| *Data Science from Scratch* | Joel Grus (O'Reilly, 2015) | Data Science + Programação |
| *Deep Learning* | Goodfellow, Bengio, Courville (MIT Press, 2016) | GenAI |
| *OpenIntro Statistics* | Diez, Çetinkaya-Rundel, Barr (4ª ed.) | Estatística + Data Science |
| *Natural Language Processing with Transformers* | Tunstall et al. (O'Reilly, 2022) | GenAI |

---

## ✨ Funcionalidades

### 🗺️ Trilhas de Aprendizado
- **4 trilhas:** Data Science · GenAI & LLMs · Programação · Estatística
- **3 níveis por trilha:** Iniciante → Intermediário → Avançado
- **50+ módulos** com sistema de pré-requisitos (desbloqueio progressivo)
- Cada módulo: tópicos, vocabulário EN/PT, pronúncia, frases, exercícios e fonte

### 🇺🇸 Inglês Técnico Integrado
- **Flashcards** com pronúncia IPA e tradução
- **Quiz de vocabulário** com múltipla escolha
- **Guia de pronúncia** com exemplos reais
- Frases práticas para reuniões, apresentações e entrevistas

### 🎤 Simulador de Entrevistas
- **20+ vagas** por área (Data Scientist, ML Engineer, LLM Engineer...)
- Perguntas em inglês por nível (iniciante, intermediário, avançado)
- Avaliação automática de gramática, vocabulário, clareza e relevância
- Feedback detalhado com dicas de melhoria e nota por resposta
- Histórico de entrevistas com evolução

### 🏆 Gamificação
- XP por ação (módulo: +15, exercício correto: +10, entrevista: variável)
- Níveis de 1 a 100 com títulos progressivos
- Ranking global com pódio e filtro por trilha

### 👤 Perfil
- Upload de foto de perfil
- Estatísticas detalhadas (módulos, entrevistas, XP)
- Preferências de trilha e nível de inglês
- Histórico de progresso

### ➕ Cursos Personalizados
- Adicione seus próprios recursos (cursos, livros, tutoriais)
- Categorização por área e nível
- Links para recursos externos

---

## 🛠️ Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 18 + Vite 5 |
| Estilo | Tailwind CSS 3 |
| Auth + DB | Supabase (PostgreSQL + Auth + Storage) |
| Roteamento | React Router v6 |
| Notificações | react-hot-toast |
| Fontes | Plus Jakarta Sans + Syne + JetBrains Mono |

---

## 🚀 Como Rodar Localmente

### 1. Clone e instale

```bash
git clone https://github.com/seu-usuario/learnpath.git
cd learnpath
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

### 3. Configure o banco de dados

Execute no **SQL Editor** do seu projeto Supabase:

```sql
-- Apaga tabelas antigas (cuidado em produção!)
DROP TABLE IF EXISTS entrevistas CASCADE;
DROP TABLE IF EXISTS cursos_usuario CASCADE;
DROP TABLE IF EXISTS vocab_resultado CASCADE;
DROP TABLE IF EXISTS exercicios_resultado CASCADE;
DROP TABLE IF EXISTS progresso CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Cria tabelas
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  nome TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  xp INTEGER DEFAULT 0,
  nivel_ingles TEXT DEFAULT 'iniciante',
  nivel_escolhido TEXT DEFAULT 'iniciante',
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

-- Row Level Security
ALTER TABLE profiles             ENABLE ROW LEVEL SECURITY;
ALTER TABLE progresso            ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercicios_resultado ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocab_resultado      ENABLE ROW LEVEL SECURITY;
ALTER TABLE cursos_usuario       ENABLE ROW LEVEL SECURITY;
ALTER TABLE entrevistas          ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "own" ON profiles          FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "pub" ON profiles          FOR SELECT USING (true);
CREATE POLICY "own" ON progresso         FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "own" ON exercicios_resultado FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "own" ON vocab_resultado   FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "own" ON cursos_usuario    FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "own" ON entrevistas       FOR ALL USING (auth.uid() = user_id);
```

### 4. Configure o Storage (para foto de perfil)

No Supabase → **Storage** → **New bucket**:
- Nome: `avatars`
- Public bucket: ✅ sim

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
│   │   ├── curriculum.js     ← 🧠 Trilhas completas (50+ módulos)
│   │   └── english.js        ← 🇺🇸 Vocabulário, vagas e perguntas de entrevista
│   ├── components/
│   │   ├── layout/
│   │   │   └── index.jsx     ← Navbar, Sidebar, MobileNav, AppLayout
│   │   └── ui/
│   │       └── index.jsx     ← Button, Card, Badge, XPBar, Spinner, etc.
│   ├── hooks/
│   │   └── useAuth.jsx       ← Context de autenticação
│   ├── services/
│   │   └── supabase/
│   │       ├── client.js     ← Instância do Supabase
│   │       └── db.js         ← Todas as operações do banco
│   ├── lib/
│   │   └── gamification.js   ← XP, níveis, títulos, metadata
│   ├── pages/
│   │   ├── Landing.jsx       ← Página inicial pública
│   │   ├── Auth.jsx          ← Register, Login, ConfirmEmail
│   │   ├── Dashboard.jsx     ← Trilha + árv. de módulos + modal de conteúdo
│   │   ├── English.jsx       ← Flashcards, quiz e guia de pronúncia
│   │   ├── Interview.jsx     ← Simulador de entrevistas com avaliação
│   │   ├── ProgressAndCourses.jsx ← Progresso e cursos personalizados
│   │   ├── Ranking.jsx       ← Ranking global com pódio
│   │   └── Profile.jsx       ← Perfil com upload de foto
│   ├── styles/
│   │   └── globals.css       ← Design system completo
│   ├── App.jsx               ← Roteamento e guards
│   └── main.jsx              ← Entry point
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
  id: 'ds-i-09',           // ID único: [trilha]-[nivel inicial]-[número]
  title: 'Título do módulo',
  duration: '45 min',
  source: 'Nome do livro — Capítulo X',  // SEMPRE cite a fonte!
  description: 'Descrição curta e clara.',
  topics: ['Tópico 1', 'Tópico 2', 'Tópico 3'],
  prerequisites: ['ds-i-08'],   // IDs dos módulos anteriores
  englishWords: [
    {
      word: 'clustering',
      pt: 'agrupamento',
      pronunciation: 'ˈklʌstərɪŋ',   // Notação IPA
      example: 'K-means is a clustering algorithm.',
      tip: 'Dica extra sobre uso ou contexto (opcional).',
    }
  ],
  englishPhrases: [
    { en: 'We need to choose the number of clusters.', pt: 'Precisamos escolher o número de clusters.' }
  ],
  exercises: [
    {
      id: 'e1',
      question: 'What is the main limitation of K-Means?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      answer: 0,   // Índice da resposta correta (0-3)
      explanation: 'Explicação detalhada de por que esta é a resposta.',
    }
  ],
}
```

### Adicionando vocabulário

Edite `src/data/english.js`, seção `VOCAB_SETS`:

```javascript
{ 
  id: 'v-ds-016', 
  word: 'clustering', 
  pt: 'agrupamento', 
  pronunciation: 'ˈklʌstərɪŋ',
  example: 'K-means is a clustering algorithm.',
  tip: 'Dica opcional sobre uso profissional.',
}
```

### Adicionando vagas para entrevistas

Edite `INTERVIEW_JOBS` em `src/data/english.js`:

```javascript
{ 
  id: 'job-ds-07', 
  title: 'ML Research Scientist', 
  company: 'AI Research Lab',
  level: 'avancado',
  description: 'Research lab working on foundational ML breakthroughs.',
}
```

### Adicionando perguntas de entrevista

Edite `INTERVIEW_QUESTIONS` em `src/data/english.js`:

```javascript
{ 
  id: 'q-ds-i-11', 
  category: 'Practical',
  question: 'How would you explain a complex model to a non-technical executive?',
}
```

---

## 📖 Como Adicionar um PDF como Fonte

1. Leia o PDF e extraia os capítulos relevantes
2. Crie novos módulos em `curriculum.js` citando o livro no campo `source`
3. Adicione o vocabulário técnico do livro em `english.js`
4. Para referenciar o PDF no projeto:
   - Crie a pasta `docs/references/`
   - Adicione um arquivo `REFERENCES.md` com título, autor, editora e ISBN
   - **NÃO** commite o PDF diretamente (direitos autorais)
5. Abra um Pull Request descrevendo os capítulos adicionados

**Exemplo de `REFERENCES.md`:**
```markdown
## Referências Bibliográficas

- Grus, Joel. *Data Science from Scratch*. O'Reilly Media, 2015. ISBN: 978-1491901427
- Goodfellow, Ian et al. *Deep Learning*. MIT Press, 2016. ISBN: 978-0262035613
```

---

## 🔐 Segurança

- `.env` está no `.gitignore` — **nunca suba suas chaves**
- Row Level Security (RLS) ativado — usuários só acessam seus dados
- Ranking usa leitura pública apenas de `nome`, `username` e `xp`
- Fotos de perfil armazenadas no Supabase Storage (bucket público)

---

## 📝 Licença

MIT — use, modifique e distribua livremente.

---

## ⭐ Agradecimentos

Conteúdo baseado nos trabalhos de:
- **Joel Grus** — *Data Science from Scratch* (O'Reilly)
- **Ian Goodfellow, Yoshua Bengio, Aaron Courville** — *Deep Learning* (MIT Press)
- **David Diez, Mine Çetinkaya-Rundel, Christopher Barr** — *OpenIntro Statistics*
- **Lewis Tunstall, Leandro von Werra, Thomas Wolf** — *NLP with Transformers* (O'Reilly)
