// ============================================================
// ENGLISH TECHNICAL VOCABULARY
// Organized by area + level, with pronunciation & translation
// ============================================================

export const VOCAB_SETS = {
  'data-science': {
    iniciante: [
      { id:'v-ds-001', word:'data',         pt:'dados',              pronunciation:'ˈdeɪtə',         example:'We need more data to train the model.', tip:'Sempre plural em inglês técnico. "The data are..." (formal) ou "the data is..." (informal).' },
      { id:'v-ds-002', word:'dataset',      pt:'conjunto de dados',  pronunciation:'ˈdeɪtəset',      example:'Download the dataset from Kaggle.', tip:'Data + set. Uma coleção organizada de dados.' },
      { id:'v-ds-003', word:'model',        pt:'modelo',             pronunciation:'ˈmɒdəl',          example:'Train the model on labeled data.', tip:'Em ML, "model" é o algoritmo treinado que faz previsões.' },
      { id:'v-ds-004', word:'feature',      pt:'variável/característica',pronunciation:'ˈfiːtʃər',  example:'Age and income are important features.', tip:'Uma coluna de entrada no seu dataset.' },
      { id:'v-ds-005', word:'label',        pt:'rótulo/classe',      pronunciation:'ˈleɪbəl',         example:'The label is what we want to predict.', tip:'O que você quer prever. Também chamado de "target" ou "output".' },
      { id:'v-ds-006', word:'training',     pt:'treinamento',        pronunciation:'ˈtreɪnɪŋ',       example:'The training phase takes 2 hours.', tip:'Processo de ajustar os parâmetros do modelo com dados.' },
      { id:'v-ds-007', word:'prediction',   pt:'previsão',           pronunciation:'prɪˈdɪkʃən',     example:'The model\'s prediction was correct.', tip:'Output do modelo para uma nova entrada.' },
      { id:'v-ds-008', word:'accuracy',     pt:'acurácia',           pronunciation:'ˈækjərəsi',       example:'The model achieved 95% accuracy.', tip:'% de previsões corretas. Cuidado: inútil em dados desbalanceados!' },
      { id:'v-ds-009', word:'correlation',  pt:'correlação',         pronunciation:'ˌkɒrəˈleɪʃən',  example:'There is a strong correlation between X and Y.', tip:'-1 a 1. Próximo de 1 = positiva forte. 0 = sem relação.' },
      { id:'v-ds-010', word:'distribution', pt:'distribuição',       pronunciation:'ˌdɪstrɪˈbjuːʃən',example:'The distribution is skewed to the right.', tip:'Como os dados estão espalhados. Normal, uniforme, binomial...' },
      { id:'v-ds-011', word:'outlier',      pt:'valor atípico',      pronunciation:'ˈaʊtlaɪər',      example:'Remove outliers before training.', tip:'Valor muito diferente dos demais. Pode ser erro ou caso especial.' },
      { id:'v-ds-012', word:'pipeline',     pt:'fluxo de trabalho',  pronunciation:'ˈpaɪplaɪn',      example:'Build an automated data pipeline.', tip:'Série de etapas automatizadas: coleta → limpeza → modelo → output.' },
      { id:'v-ds-013', word:'preprocessing',pt:'pré-processamento',  pronunciation:'priːˈprɒsesɪŋ',  example:'Preprocessing includes scaling and encoding.', tip:'Preparar os dados antes de treinar. Normalizar, codificar, imputar.' },
      { id:'v-ds-014', word:'validation',   pt:'validação',          pronunciation:'ˌvælɪˈdeɪʃən',  example:'Use the validation set to tune hyperparameters.', tip:'Conjunto de dados para ajustar o modelo sem usar o teste.' },
      { id:'v-ds-015', word:'benchmark',    pt:'referência/padrão',  pronunciation:'ˈbentʃmɑːrk',    example:'This model beats the baseline benchmark.', tip:'Ponto de comparação. "We beat the benchmark by 5%."' },
    ],
    intermediario: [
      { id:'v-ds-i01', word:'overfitting',   pt:'sobreajuste',        pronunciation:'ˌoʊvərˈfɪtɪŋ',  example:'The model is overfitting the training data.', tip:'Modelo memorizou o treino mas generaliza mal. Sinais: train acc >> val acc.' },
      { id:'v-ds-i02', word:'regularization',pt:'regularização',      pronunciation:'ˌreɡjʊlərɪˈzeɪʃən',example:'L2 regularization reduces overfitting.', tip:'Penaliza modelos complexos. L1=Lasso (esparso), L2=Ridge (suave).' },
      { id:'v-ds-i03', word:'hyperparameter',pt:'hiperparâmetro',     pronunciation:'ˌhaɪpərˈpærəmɪtər',example:'Tune the learning rate hyperparameter.', tip:'Configurações do modelo (não aprendidas): learning rate, n_estimators...' },
      { id:'v-ds-i04', word:'cross-validation',pt:'validação cruzada',pronunciation:'krɒs ˌvælɪˈdeɪʃən',example:'5-fold cross-validation gives robust estimates.', tip:'Divide dados em k partes. Cada parte serve de validação uma vez.' },
      { id:'v-ds-i05', word:'precision',    pt:'precisão',            pronunciation:'prɪˈsɪʒən',       example:'High precision means few false positives.', tip:'TP/(TP+FP). "De tudo que previ como positivo, quanto estava certo?"' },
      { id:'v-ds-i06', word:'recall',       pt:'sensibilidade',       pronunciation:'rɪˈkɔːl',          example:'High recall means few false negatives.', tip:'TP/(TP+FN). "De todos os positivos reais, quantos encontrei?"' },
      { id:'v-ds-i07', word:'ensemble',     pt:'conjunto de modelos', pronunciation:'ɑːnˈsɑːmbəl',    example:'Ensembles usually outperform single models.', tip:'Combinação de vários modelos. Bagging, boosting, stacking.' },
      { id:'v-ds-i08', word:'imputation',   pt:'imputação',           pronunciation:'ˌɪmpjʊˈteɪʃən',  example:'Impute missing values with the median.', tip:'Preencher valores ausentes. Média, mediana, KNN, múltipla imputação.' },
    ],
  },
  'genai': {
    iniciante: [
      { id:'v-ai-001', word:'prompt',       pt:'instrução/entrada',  pronunciation:'prɒmpt',          example:'Write a clear prompt for the model.', tip:'Texto de entrada dado a um LLM. "Prompting" é a arte de escrever bons prompts.' },
      { id:'v-ai-002', word:'token',        pt:'unidade de texto',   pronunciation:'ˈtoʊkən',         example:'GPT-4 has a 128k token context window.', tip:'Palavra ou pedaço de palavra. "cat" = 1 token. "unbelievable" = 3 tokens.' },
      { id:'v-ai-003', word:'inference',    pt:'inferência',         pronunciation:'ˈɪnfərəns',       example:'Run inference on the deployed model.', tip:'Usar o modelo treinado para fazer previsões. Oposto de "training".' },
      { id:'v-ai-004', word:'hallucination',pt:'alucinação',         pronunciation:'həˌluːsɪˈneɪʃən', example:'The model hallucinated fake citations.', tip:'Quando o LLM inventa fatos com confiança. Problema fundamental dos LLMs.' },
      { id:'v-ai-005', word:'context window',pt:'janela de contexto', pronunciation:'ˈkɒntekst ˈwɪndəʊ',example:'The context window is 128,000 tokens.', tip:'Quantidade máxima de tokens que o modelo consegue "ver" de uma vez.' },
      { id:'v-ai-006', word:'embedding',    pt:'vetor de representação',pronunciation:'ɪmˈbedɪŋ',    example:'Generate embeddings for semantic search.', tip:'Representação numérica (vetor) de um texto. Textos similares → vetores próximos.' },
      { id:'v-ai-007', word:'fine-tuning',  pt:'ajuste fino',        pronunciation:'faɪn ˈtjuːnɪŋ',   example:'Fine-tune the model on medical data.', tip:'Continuar o treinamento de um modelo pré-treinado com dados específicos.' },
      { id:'v-ai-008', word:'generation',   pt:'geração',            pronunciation:'ˌdʒenəˈreɪʃən',  example:'Text generation requires creativity.', tip:'Processo de criar novo conteúdo (texto, imagem, código) com IA.' },
      { id:'v-ai-009', word:'parameter',    pt:'parâmetro',          pronunciation:'pəˈræmɪtər',      example:'GPT-4 has hundreds of billions of parameters.', tip:'Os "pesos" do modelo. Mais parâmetros = mais capacidade (geralmente).' },
      { id:'v-ai-010', word:'transformer',  pt:'transformador',      pronunciation:'trænsˈfɔːrmər',   example:'GPT is a transformer-based model.', tip:'Arquitetura de rede neural com atenção. Base de todos os LLMs modernos.' },
    ],
  },
  'programacao': {
    iniciante: [
      { id:'v-pr-001', word:'variable',     pt:'variável',           pronunciation:'ˈveəriəbəl',      example:'Declare a variable to store the result.', tip:'Armazena um valor. Em Python, tipagem dinâmica: x = 5.' },
      { id:'v-pr-002', word:'function',     pt:'função',             pronunciation:'ˈfʌŋkʃən',        example:'Define a function to avoid code duplication.', tip:'Bloco de código reutilizável. "def my_func(): ..."' },
      { id:'v-pr-003', word:'debugging',    pt:'depuração',          pronunciation:'dɪˈbʌɡɪŋ',        example:'Spend time debugging the error.', tip:'Encontrar e corrigir erros no código. "bug" = erro, "debug" = corrigir.' },
      { id:'v-pr-004', word:'repository',   pt:'repositório',        pronunciation:'rɪˈpɒzɪtɔːri',   example:'Push the code to the repository.', tip:'Local onde o código é armazenado e versionado (ex: GitHub).' },
      { id:'v-pr-005', word:'dependency',   pt:'dependência',        pronunciation:'dɪˈpendənsi',      example:'Install all dependencies from requirements.txt.', tip:'Biblioteca ou pacote que seu projeto precisa para funcionar.' },
      { id:'v-pr-006', word:'deploy',       pt:'implantar/publicar', pronunciation:'dɪˈplɔɪ',          example:"Let's deploy the app to production.", tip:'Colocar o código/modelo em funcionamento no servidor real.' },
      { id:'v-pr-007', word:'refactoring',  pt:'refatoração',        pronunciation:'ˌriːˈfæktərɪŋ',   example:'Refactor the code to improve readability.', tip:'Melhorar a estrutura do código sem mudar seu comportamento.' },
      { id:'v-pr-008', word:'version control',pt:'controle de versão',pronunciation:'ˈvɜːrʒən kənˈtroʊl',example:'Always use version control for your projects.', tip:'Sistema para rastrear mudanças no código. Git é o padrão.' },
    ],
  },
}

// ── Interview Jobs Database ────────────────────────────────
export const INTERVIEW_JOBS = {
  'data-science': [
    { id:'job-ds-01', title:'Data Scientist', company:'Tech Startup',         level:'iniciante',     description:'Early-stage startup building an ML-powered recommendation engine.' },
    { id:'job-ds-02', title:'Data Analyst',   company:'E-commerce Company',   level:'iniciante',     description:'Online retail company with millions of daily transactions.' },
    { id:'job-ds-03', title:'ML Engineer',    company:'FinTech',              level:'intermediario', description:'Financial technology company working on fraud detection.' },
    { id:'job-ds-04', title:'Senior Data Scientist',company:'Big Tech',       level:'avancado',      description:'Large tech company with petabytes of user data.' },
    { id:'job-ds-05', title:'Data Scientist', company:'Healthcare AI',        level:'intermediario', description:'AI startup applying ML to medical imaging and diagnostics.' },
    { id:'job-ds-06', title:'Analytics Engineer',company:'SaaS Company',     level:'intermediario', description:'B2B software company building self-serve analytics.' },
  ],
  'genai': [
    { id:'job-ai-01', title:'AI Engineer',    company:'AI Startup',           level:'iniciante',     description:'Series A startup building conversational AI for customer support.' },
    { id:'job-ai-02', title:'LLM Engineer',   company:'Enterprise SaaS',      level:'intermediario', description:'Enterprise software company adding AI features to their platform.' },
    { id:'job-ai-03', title:'Research Scientist',company:'AI Lab',            level:'avancado',      description:'Research lab working on next-generation language models.' },
    { id:'job-ai-04', title:'Prompt Engineer',company:'Consulting Firm',      level:'iniciante',     description:'Tech consulting firm building custom GPT applications.' },
    { id:'job-ai-05', title:'ML Platform Engineer',company:'Scale-up',        level:'avancado',      description:'High-growth company building internal AI infrastructure.' },
  ],
  'programacao': [
    { id:'job-pr-01', title:'Junior Python Developer',company:'Agency',       level:'iniciante',     description:'Digital agency building data-driven web applications.' },
    { id:'job-pr-02', title:'Backend Engineer',company:'Fintech',             level:'intermediario', description:'Financial platform processing millions of transactions daily.' },
    { id:'job-pr-03', title:'Senior Software Engineer',company:'Big Tech',    level:'avancado',      description:'Large tech company with distributed systems at global scale.' },
    { id:'job-pr-04', title:'MLOps Engineer',  company:'ML Platform',        level:'intermediario', description:'Company building ML infrastructure for enterprise clients.' },
    { id:'job-pr-05', title:'Data Engineer',   company:'Data Platform',      level:'intermediario', description:'Data infrastructure company serving analytics teams.' },
  ],
  'estatistica': [
    { id:'job-st-01', title:'Statistician',    company:'Research Institute',  level:'intermediario', description:'Public research institute conducting clinical studies.' },
    { id:'job-st-02', title:'Quantitative Analyst',company:'Hedge Fund',      level:'avancado',      description:'Quantitative investment fund managing billions in assets.' },
    { id:'job-st-03', title:'Biostatistician', company:'Pharma Company',      level:'avancado',      description:'Global pharmaceutical company running clinical trials.' },
    { id:'job-st-04', title:'Data Analyst',    company:'Marketing Agency',    level:'iniciante',     description:'Performance marketing agency with large ad spend data.' },
  ],
}

// ── Interview Question Bank ────────────────────────────────
export const INTERVIEW_QUESTIONS = {
  'data-science': {
    iniciante: [
      { id:'q-ds-i-01', category:'Introduction',   question:'Tell me about yourself and why you are interested in data science.' },
      { id:'q-ds-i-02', category:'Concepts',       question:'Can you explain the difference between supervised and unsupervised learning?' },
      { id:'q-ds-i-03', category:'Statistics',     question:'What is the difference between mean, median, and mode? When would you use each?' },
      { id:'q-ds-i-04', category:'Practical',      question:'How would you handle missing values in a dataset? Walk me through your approach.' },
      { id:'q-ds-i-05', category:'Concepts',       question:'What is overfitting and how would you detect it?' },
      { id:'q-ds-i-06', category:'Tools',          question:'What Python libraries do you use for data analysis and why?' },
      { id:'q-ds-i-07', category:'Practical',      question:'Describe a data analysis project you have worked on. What was the business question?' },
      { id:'q-ds-i-08', category:'Statistics',     question:'Can you explain what a p-value is in simple terms?' },
      { id:'q-ds-i-09', category:'Communication',  question:'How would you explain a complex data finding to a non-technical stakeholder?' },
      { id:'q-ds-i-10', category:'Behavioral',     question:'Tell me about a time you had to work with messy or incomplete data.' },
    ],
    intermediario: [
      { id:'q-ds-m-01', category:'ML',             question:'Explain the bias-variance tradeoff and how it affects model selection.' },
      { id:'q-ds-m-02', category:'Evaluation',     question:'When would you use precision vs recall as your primary metric?' },
      { id:'q-ds-m-03', category:'Algorithms',     question:'How does a Random Forest work and why is it robust to overfitting?' },
      { id:'q-ds-m-04', category:'Practical',      question:'Walk me through how you would approach building a churn prediction model.' },
      { id:'q-ds-m-05', category:'Statistics',     question:'What is A/B testing and what are the key considerations when designing an experiment?' },
      { id:'q-ds-m-06', category:'Feature Eng.',   question:'How do you handle categorical variables with high cardinality?' },
      { id:'q-ds-m-07', category:'SQL',            question:'Write a query to find the top 5 customers by total spend in the last 30 days.' },
      { id:'q-ds-m-08', category:'Communication',  question:'Describe a situation where your analysis changed a business decision.' },
    ],
    avancado: [
      { id:'q-ds-a-01', category:'ML Design',      question:'How would you design an ML system to detect fraud in real-time at scale?' },
      { id:'q-ds-a-02', category:'Statistics',     question:'Explain causal inference and how you would establish causality from observational data.' },
      { id:'q-ds-a-03', category:'System Design',  question:'You have a model in production. Describe your monitoring and retraining strategy.' },
      { id:'q-ds-a-04', category:'Leadership',     question:'How do you mentor junior data scientists and maintain code quality on your team?' },
      { id:'q-ds-a-05', category:'Ethics',         question:'How do you ensure fairness and avoid bias in ML models?' },
    ],
  },
  'genai': {
    iniciante: [
      { id:'q-ai-i-01', category:'Introduction',   question:'What attracted you to the field of generative AI and LLMs?' },
      { id:'q-ai-i-02', category:'Concepts',       question:'Can you explain what a Large Language Model is in simple terms?' },
      { id:'q-ai-i-03', category:'Practical',      question:'What is prompt engineering and why does it matter?' },
      { id:'q-ai-i-04', category:'Concepts',       question:'What is hallucination in LLMs and how can it be mitigated?' },
      { id:'q-ai-i-05', category:'Tools',          question:'What AI tools and APIs have you worked with? Tell me about a project.' },
      { id:'q-ai-i-06', category:'Concepts',       question:'What is the difference between GPT-style and BERT-style models?' },
      { id:'q-ai-i-07', category:'Ethics',         question:'What are the main risks of deploying LLMs in production?' },
      { id:'q-ai-i-08', category:'Practical',      question:'How would you evaluate the quality of outputs from a language model?' },
    ],
    intermediario: [
      { id:'q-ai-m-01', category:'Architecture',   question:'Explain the attention mechanism and why it was a breakthrough in NLP.' },
      { id:'q-ai-m-02', category:'Fine-tuning',    question:'When would you fine-tune a model vs use prompt engineering vs use RAG?' },
      { id:'q-ai-m-03', category:'RAG',            question:'Walk me through how you would build a RAG system for a company knowledge base.' },
      { id:'q-ai-m-04', category:'Evaluation',     question:'How do you evaluate and benchmark LLM performance for a specific use case?' },
      { id:'q-ai-m-05', category:'Practical',      question:'Describe the most complex LLM application you have built. What challenges did you face?' },
      { id:'q-ai-m-06', category:'System Design',  question:'How would you handle latency requirements for a real-time LLM application?' },
    ],
    avancado: [
      { id:'q-ai-a-01', category:'Research',       question:'What are the current limitations of LLMs and what approaches are being explored to address them?' },
      { id:'q-ai-a-02', category:'RLHF',           question:'Explain RLHF and its role in making LLMs safe and helpful.' },
      { id:'q-ai-a-03', category:'System Design',  question:'Design a multi-agent AI system for automating a complex business workflow.' },
      { id:'q-ai-a-04', category:'Technical',      question:'How would you approach training or fine-tuning a model with limited compute?' },
    ],
  },
  'programacao': {
    iniciante: [
      { id:'q-pr-i-01', category:'Introduction',   question:'Tell me about yourself and your programming background.' },
      { id:'q-pr-i-02', category:'Python',         question:'What is the difference between a list and a tuple in Python?' },
      { id:'q-pr-i-03', category:'OOP',            question:'Can you explain object-oriented programming using a real-world example?' },
      { id:'q-pr-i-04', category:'Git',            question:'Walk me through your typical Git workflow on a team project.' },
      { id:'q-pr-i-05', category:'Debugging',      question:'Describe your approach to debugging a function that returns unexpected results.' },
      { id:'q-pr-i-06', category:'SQL',            question:'What is the difference between INNER JOIN and LEFT JOIN? Give an example.' },
      { id:'q-pr-i-07', category:'Practical',      question:'Tell me about a coding project you are proud of. What did you learn?' },
      { id:'q-pr-i-08', category:'Problem Solving',question:'How do you approach learning a new programming language or framework?' },
    ],
    intermediario: [
      { id:'q-pr-m-01', category:'Design',         question:'What design patterns have you used and when would you apply them?' },
      { id:'q-pr-m-02', category:'Performance',    question:'How would you optimize a Python script that processes a large dataset slowly?' },
      { id:'q-pr-m-03', category:'APIs',           question:'Walk me through designing a RESTful API for a todo list application.' },
      { id:'q-pr-m-04', category:'Testing',        question:'What is the difference between unit tests, integration tests and end-to-end tests?' },
      { id:'q-pr-m-05', category:'Architecture',   question:'Explain the difference between monolithic and microservices architecture.' },
      { id:'q-pr-m-06', category:'Behavioral',     question:'Describe a time you had to refactor legacy code. What was your approach?' },
    ],
    avancado: [
      { id:'q-pr-a-01', category:'System Design',  question:'Design a URL shortening service like bit.ly. Walk through your architecture.' },
      { id:'q-pr-a-02', category:'Concurrency',    question:'Explain the Python GIL and when you would use multiprocessing vs threading.' },
      { id:'q-pr-a-03', category:'Leadership',     question:'How do you conduct code reviews and enforce coding standards on your team?' },
      { id:'q-pr-a-04', category:'Scale',          question:'How would you design a system to handle 100,000 concurrent WebSocket connections?' },
    ],
  },
  'estatistica': {
    iniciante: [
      { id:'q-st-i-01', category:'Introduction',   question:'Tell me about your statistics background and how you apply it in practice.' },
      { id:'q-st-i-02', category:'Concepts',       question:'What is the central limit theorem and why is it important?' },
      { id:'q-st-i-03', category:'Hypothesis',     question:'Explain the concept of a p-value in plain English.' },
      { id:'q-st-i-04', category:'Practical',      question:'How would you determine the appropriate sample size for a survey?' },
      { id:'q-st-i-05', category:'Concepts',       question:'What is the difference between correlation and causation? Give an example.' },
    ],
    intermediario: [
      { id:'q-st-m-01', category:'Tests',          question:'When would you use ANOVA instead of multiple t-tests?' },
      { id:'q-st-m-02', category:'Regression',     question:'What assumptions does linear regression make and how do you check them?' },
      { id:'q-st-m-03', category:'Practical',      question:'Walk me through how you would design and analyze an A/B test.' },
      { id:'q-st-m-04', category:'Bayesian',       question:'What is Bayesian statistics and how does it differ from frequentist statistics?' },
    ],
    avancado: [
      { id:'q-st-a-01', category:'Causal',         question:'Explain the potential outcomes framework for causal inference.' },
      { id:'q-st-a-02', category:'Methods',        question:'What are instrumental variables and when would you use them?' },
      { id:'q-st-a-03', category:'Practical',      question:'How would you analyze a clinical trial with non-compliance and dropouts?' },
    ],
  },
}

// ── Model answer rubric criteria ──────────────────────────
export const RUBRIC = {
  grammar:     { weight: 25, label: 'Gramática',    desc: 'Uso correto de tempos verbais, estrutura frasal e concordância.' },
  vocabulary:  { weight: 25, label: 'Vocabulário',  desc: 'Uso de termos técnicos corretos e variação de vocabulário.' },
  clarity:     { weight: 25, label: 'Clareza',      desc: 'Facilidade de entender a resposta, estrutura lógica.' },
  relevance:   { weight: 25, label: 'Relevância',   desc: 'Resposta diretamente ligada à pergunta feita.' },
}
