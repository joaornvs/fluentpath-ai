// ============================================================
// LEARNPATH — Currículo Completo v2
// Fontes: Data Science from Scratch (Grus), Deep Learning (Goodfellow),
//         OpenIntro Statistics, NLP with Transformers (O'Reilly)
// ============================================================

// ── Data Science Trail ────────────────────────────────────
export const DATA_SCIENCE = {
  id: 'data-science',
  title: 'Data Science',
  icon: '📊',
  color: '#3b82f6',
  description: 'Do zero à ciência de dados profissional. Estatística, Python, ML e análise de dados.',
  levels: {
    iniciante: [
      {
        id:'ds-i-01', title:'O que é Data Science?', duration:'30 min',
        source:'Data Science from Scratch — Cap. 1',
        description:'Visão geral do campo, papel do cientista de dados e o pipeline completo.',
        topics:['O campo de Data Science','Tipos de problemas','Ferramentas: Python, SQL, estatística','Pipeline de dados','Perfil do profissional'],
        englishWords:[
          { word:'dataset',      pt:'conjunto de dados', pronunciation:'ˈdeɪtəset',   example:'The dataset contains 10,000 rows.' },
          { word:'pipeline',     pt:'fluxo de dados',    pronunciation:'ˈpaɪplaɪn',   example:'Our data pipeline runs every hour.' },
          { word:'insight',      pt:'percepção/achado',  pronunciation:'ˈɪnsaɪt',     example:'We found a key insight in the data.' },
          { word:'feature',      pt:'característica',    pronunciation:'ˈfiːtʃər',    example:'Age is an important feature in this model.' },
          { word:'stakeholder',  pt:'parte interessada', pronunciation:'ˈsteɪkhoʊldər',example:'We presented results to the stakeholders.' },
        ],
        englishPhrases:[
          { en:'Let me walk you through the findings.', pt:'Deixa eu te explicar os resultados.' },
          { en:'The data suggests that...', pt:'Os dados sugerem que...' },
          { en:'We need to clean the dataset first.', pt:'Precisamos limpar o conjunto de dados primeiro.' },
        ],
        exercises:[
          { id:'e1', question:'What is the primary goal of a data scientist?', options:['Extract insights from data to support decisions','Write production software','Manage cloud infrastructure','Design UI/UX'], answer:0, explanation:'Data scientists extract meaningful insights from data to support business decisions and strategy.' },
          { id:'e2', question:'Which of the following best describes a "data pipeline"?', options:['A series of automated steps to collect, process and store data','A chart showing data flow','A type of neural network','A database schema'], answer:0, explanation:'A data pipeline automates the movement and transformation of data from source to destination.' },
        ],
      },
      {
        id:'ds-i-02', title:'Python Essencial para Dados', duration:'60 min',
        source:'Data Science from Scratch — Cap. 2',
        description:'Fundamentos de Python com foco em manipulação de dados.',
        topics:['Tipos de dados','Listas e dicionários','Funções e lambdas','List comprehensions','Generators e iteradores'],
        englishWords:[
          { word:'list',          pt:'lista',            pronunciation:'lɪst',        example:'Create a list of numbers.' },
          { word:'dictionary',    pt:'dicionário',       pronunciation:'ˈdɪkʃəneri',  example:'A dictionary stores key-value pairs.' },
          { word:'function',      pt:'função',           pronunciation:'ˈfʌŋkʃən',    example:'This function returns the mean.' },
          { word:'loop',          pt:'laço/repetição',   pronunciation:'luːp',        example:'Use a loop to iterate over the list.' },
          { word:'comprehension', pt:'compreensão de lista',pronunciation:'ˌkɒmprɪˈhenʃən',example:'List comprehension is concise and fast.' },
        ],
        englishPhrases:[
          { en:'This function takes a list as input.', pt:'Esta função recebe uma lista como entrada.' },
          { en:'Let me iterate over the dataset.', pt:'Deixa eu iterar sobre o conjunto de dados.' },
          { en:'We can filter the data using a lambda.', pt:'Podemos filtrar os dados usando um lambda.' },
        ],
        exercises:[
          { id:'e1', question:'What does a list comprehension do?', options:['Creates a new list by applying an expression to each element','Sorts a list in place','Filters only strings','Converts a list to a dictionary'], answer:0, explanation:'List comprehension: [x**2 for x in range(5)] creates [0,1,4,9,16] — concise and readable.' },
          { id:'e2', question:'What is the key difference between a list and a tuple?', options:['Lists are mutable; tuples are immutable','Tuples are faster for all operations','Lists can only store numbers','Tuples are ordered, lists are not'], answer:0, explanation:'Lists can be modified after creation. Tuples cannot — they are immutable, which makes them safer for fixed data.' },
        ],
      },
      {
        id:'ds-i-03', title:'NumPy: Arrays e Operações', duration:'55 min',
        source:'Data Science from Scratch — Cap. 4',
        description:'Álgebra linear e operações vetorizadas com NumPy.',
        topics:['Arrays NumPy','Broadcasting','Operações matriciais','Indexing e slicing','Vetores e normas'],
        englishWords:[
          { word:'array',     pt:'arranjo/vetor',    pronunciation:'əˈreɪ',     example:'Create a NumPy array from a list.' },
          { word:'scalar',    pt:'escalar',          pronunciation:'ˈskeɪlər',  example:'Multiply the array by a scalar.' },
          { word:'reshape',   pt:'redimensionar',    pronunciation:'riːˈʃeɪp',  example:'Reshape the array to (3, 4).' },
          { word:'broadcast', pt:'transmitir/expandir',pronunciation:'ˈbrɔːdkɑːst',example:'NumPy broadcasts operations automatically.' },
          { word:'transpose', pt:'transpor',         pronunciation:'trænsˈpoʊz',example:'Transpose the matrix.' },
        ],
        englishPhrases:[
          { en:'I need to reshape this array.', pt:'Preciso redimensionar este array.' },
          { en:'The dot product of these vectors is...', pt:'O produto escalar desses vetores é...' },
          { en:'Let me check the shape of the matrix.', pt:'Deixa eu verificar o formato da matriz.' },
        ],
        exercises:[
          { id:'e1', question:'What does np.dot(A, B) compute?', options:['The dot product (matrix multiplication) of A and B','Element-wise multiplication','The sum of all elements','The transpose of A times B'], answer:0, explanation:'np.dot computes matrix multiplication. For 1D arrays it computes the scalar dot product.' },
        ],
      },
      {
        id:'ds-i-04', title:'Pandas: DataFrames', duration:'65 min',
        source:'Data Science from Scratch — Cap. 9',
        description:'Manipulação e análise de dados tabulares com Pandas.',
        topics:['Series e DataFrame','Indexing e seleção','GroupBy e agregações','Merge e join','Lidando com NaN'],
        englishWords:[
          { word:'dataframe',  pt:'tabela de dados',  pronunciation:'ˈdeɪtəfreɪm', example:'Load the CSV into a DataFrame.' },
          { word:'index',      pt:'índice',           pronunciation:'ˈɪndeks',      example:'Set the date column as the index.' },
          { word:'aggregate',  pt:'agregar/resumir',  pronunciation:'ˈæɡrɪɡeɪt',  example:'Aggregate sales by region.' },
          { word:'merge',      pt:'mesclar/unir',     pronunciation:'mɜːrdʒ',       example:'Merge the two DataFrames on user_id.' },
          { word:'null',       pt:'nulo/vazio',       pronunciation:'nʌl',          example:'Drop rows with null values.' },
        ],
        englishPhrases:[
          { en:'Filter rows where age is greater than 30.', pt:'Filtrar linhas onde a idade é maior que 30.' },
          { en:"Let's group by category and compute the mean.", pt:'Vamos agrupar por categoria e calcular a média.' },
          { en:'There are missing values in this column.', pt:'Há valores ausentes nesta coluna.' },
        ],
        exercises:[
          { id:'e1', question:'What does df.groupby("city").mean() return?', options:['The mean of all numeric columns grouped by city','All rows from a specific city','A new DataFrame sorted by city','The mode of each city'], answer:0, explanation:'groupby + mean() computes the average of each numeric column for each unique value in the "city" column.' },
          { id:'e2', question:'What does df.dropna() do?', options:['Removes rows that contain any missing values','Fills missing values with 0','Renames columns with NaN names','Drops duplicate rows'], answer:0, explanation:'dropna() removes rows (or columns) containing NaN values. Use df.fillna() to fill them instead.' },
        ],
      },
      {
        id:'ds-i-05', title:'Estatística Descritiva', duration:'50 min',
        source:'OpenIntro Statistics — Cap. 1 + Data Science from Scratch — Cap. 5',
        description:'Medidas de tendência central, dispersão e distribuições.',
        topics:['Média, mediana, moda','Variância e desvio padrão','Quartis e IQR','Histogramas e boxplots','Distribuições de frequência'],
        englishWords:[
          { word:'mean',              pt:'média',              pronunciation:'miːn',          example:'The mean salary is $75,000.' },
          { word:'median',            pt:'mediana',            pronunciation:'ˈmiːdiən',      example:'Use median when data has outliers.' },
          { word:'standard deviation',pt:'desvio padrão',      pronunciation:'ˈstændərd ˌdeviˈeɪʃən',example:'A low standard deviation means data is clustered.' },
          { word:'outlier',           pt:'valor atípico',      pronunciation:'ˈaʊtlaɪər',    example:'Remove outliers before modeling.' },
          { word:'distribution',      pt:'distribuição',       pronunciation:'ˌdɪstrɪˈbjuːʃən',example:'The data follows a normal distribution.' },
        ],
        englishPhrases:[
          { en:'The distribution is right-skewed.', pt:'A distribuição está assimétrica à direita.' },
          { en:'There are several outliers in this dataset.', pt:'Há vários valores atípicos neste conjunto de dados.' },
          { en:'The interquartile range shows the spread.', pt:'O intervalo interquartil mostra a dispersão.' },
        ],
        exercises:[
          { id:'e1', question:'Which measure is most resistant to outliers?', options:['Median','Mean','Standard deviation','Variance'], answer:0, explanation:'The median only depends on the middle value(s), making it robust to extreme values (outliers).' },
          { id:'e2', question:'What does a high standard deviation indicate?', options:['Data is spread far from the mean','Data is clustered near the mean','The dataset has no outliers','The mean is very large'], answer:0, explanation:'High SD = high variability. Low SD = data points are close to the mean.' },
        ],
      },
      {
        id:'ds-i-06', title:'Probabilidade Básica', duration:'55 min',
        source:'OpenIntro Statistics — Cap. 3 + Data Science from Scratch — Cap. 6',
        description:'Eventos, probabilidade condicional e Teorema de Bayes.',
        topics:['Espaço amostral','Probabilidade condicional','Independência','Teorema de Bayes','Distribuição Binomial'],
        englishWords:[
          { word:'probability',  pt:'probabilidade',   pronunciation:'ˌprɒbəˈbɪlɪti', example:'The probability of rain is 0.3.' },
          { word:'conditional',  pt:'condicional',     pronunciation:'kənˈdɪʃənl',     example:'Conditional probability: P(A|B).' },
          { word:'prior',        pt:'a priori',        pronunciation:'ˈpraɪər',         example:'Our prior belief is that P(spam)=0.2.' },
          { word:'posterior',    pt:'a posteriori',    pronunciation:'pɒˈstɪərɪər',    example:'Update to posterior after seeing data.' },
          { word:'likelihood',   pt:'verossimilhança', pronunciation:'ˈlaɪklihʊd',     example:'Maximize the likelihood function.' },
        ],
        englishPhrases:[
          { en:'Given that the email contains "free", what is the probability it is spam?', pt:'Dado que o email contém "grátis", qual a probabilidade de ser spam?' },
          { en:"Let's apply Bayes' theorem here.", pt:'Vamos aplicar o Teorema de Bayes aqui.' },
          { en:'These two events are independent.', pt:'Esses dois eventos são independentes.' },
        ],
        exercises:[
          { id:'e1', question:"What does Bayes' Theorem allow us to do?", options:["Update our probability estimate given new evidence","Calculate the mean of a distribution","Measure correlation between variables","Test statistical significance"], answer:0, explanation:"P(A|B) = P(B|A)×P(A)/P(B). It lets us update prior beliefs (P(A)) with evidence (B) to get a posterior (P(A|B))." },
        ],
      },
      {
        id:'ds-i-07', title:'Visualização de Dados', duration:'50 min',
        source:'Data Science from Scratch — Cap. 3',
        description:'Matplotlib, Seaborn e princípios de visualização eficaz.',
        topics:['Matplotlib básico','Seaborn','Tipos de gráficos','Escolha do gráfico certo','Storytelling com dados'],
        englishWords:[
          { word:'scatter plot', pt:'gráfico de dispersão',pronunciation:'ˈskætər plɒt',  example:'A scatter plot shows correlation.' },
          { word:'bar chart',    pt:'gráfico de barras',   pronunciation:'bɑːr tʃɑːrt',   example:'Use a bar chart for categories.' },
          { word:'heatmap',      pt:'mapa de calor',       pronunciation:'ˈhiːtmæp',      example:'A heatmap shows correlation matrix.' },
          { word:'axis',         pt:'eixo',                pronunciation:'ˈæksɪs',         example:'Label both axes clearly.' },
          { word:'legend',       pt:'legenda',             pronunciation:'ˈledʒənd',       example:'Add a legend to the chart.' },
        ],
        englishPhrases:[
          { en:'This scatter plot reveals a positive correlation.', pt:'Este gráfico de dispersão revela uma correlação positiva.' },
          { en:'Let me add annotations to highlight the key points.', pt:'Deixa eu adicionar anotações para destacar os pontos-chave.' },
          { en:'The trend is clearly visible in this line chart.', pt:'A tendência é claramente visível neste gráfico de linha.' },
        ],
        exercises:[
          { id:'e1', question:'Which chart type is best for showing the relationship between two continuous variables?', options:['Scatter plot','Bar chart','Pie chart','Histogram'], answer:0, explanation:'Scatter plots visualize the relationship (correlation) between two continuous variables — each point is one observation.' },
        ],
      },
      {
        id:'ds-i-08', title:'SQL para Análise de Dados', duration:'60 min',
        source:'Data Science from Scratch — Cap. 24',
        description:'SQL essencial para consultas analíticas.',
        topics:['SELECT e WHERE','JOINs','GROUP BY e HAVING','Subqueries','Window functions básicas'],
        englishWords:[
          { word:'query',      pt:'consulta',        pronunciation:'ˈkwɪəri',      example:'Run this query to get monthly sales.' },
          { word:'join',       pt:'junção/unir',     pronunciation:'dʒɔɪn',        example:'Join the tables on customer_id.' },
          { word:'aggregate',  pt:'agregar',         pronunciation:'ˈæɡrɪɡeɪt',   example:'Aggregate by month using GROUP BY.' },
          { word:'subquery',   pt:'subconsulta',     pronunciation:'ˈsʌbkwɪəri',  example:'Use a subquery to filter results.' },
          { word:'schema',     pt:'esquema/estrutura',pronunciation:'ˈskiːmə',    example:'Describe the database schema.' },
        ],
        englishPhrases:[
          { en:'I need to join these two tables.', pt:'Preciso unir essas duas tabelas.' },
          { en:'Group by month and count the orders.', pt:'Agrupar por mês e contar os pedidos.' },
          { en:'The query is taking too long — let me add an index.', pt:'A consulta está demorando muito — deixa eu adicionar um índice.' },
        ],
        exercises:[
          { id:'e1', question:'What is the difference between WHERE and HAVING?', options:['WHERE filters rows before grouping; HAVING filters after grouping','They are interchangeable','HAVING works on individual rows; WHERE on groups','WHERE is for joins; HAVING is for subqueries'], answer:0, explanation:'WHERE filters individual rows before GROUP BY. HAVING filters the groups after GROUP BY — use it with aggregate functions like COUNT(), SUM().' },
        ],
      },
    ],
    intermediario: [
      {
        id:'ds-m-01', title:'Regressão Linear', duration:'70 min',
        source:'Data Science from Scratch — Cap. 14 + OpenIntro Statistics — Cap. 8',
        description:'Modelagem preditiva com OLS, métricas e regularização.',
        topics:['OLS (Ordinary Least Squares)','Coeficientes e intercepto','R² e RMSE','Regressão múltipla','Regularização L1/L2'],
        englishWords:[
          { word:'regression',     pt:'regressão',       pronunciation:'rɪˈɡreʃən',    example:'Linear regression predicts continuous values.' },
          { word:'coefficient',    pt:'coeficiente',     pronunciation:'ˌkəʊɪˈfɪʃənt', example:'The coefficient of age is 0.3.' },
          { word:'residual',       pt:'resíduo',         pronunciation:'rɪˈzɪdjuəl',   example:'Plot residuals to check assumptions.' },
          { word:'overfitting',    pt:'sobreajuste',     pronunciation:'ˌoʊvərˈfɪtɪŋ', example:'The model is overfitting the training data.' },
          { word:'regularization', pt:'regularização',   pronunciation:'ˌreɡjələraɪˈzeɪʃən',example:'L2 regularization shrinks coefficients.' },
        ],
        englishPhrases:[
          { en:'The R-squared value indicates how well the model fits.', pt:'O valor R² indica quão bem o modelo se ajusta.' },
          { en:'We need to address multicollinearity.', pt:'Precisamos lidar com a multicolinearidade.' },
          { en:"The model's predictions are off — let me check the residuals.", pt:'As previsões do modelo estão erradas — deixa eu verificar os resíduos.' },
        ],
        exercises:[
          { id:'e1', question:'What does R² (R-squared) measure?', options:['Proportion of variance in y explained by the model','The correlation between x and y','The average prediction error','How many features the model uses'], answer:0, explanation:'R²=1 means perfect fit. R²=0 means the model explains no variance — equivalent to predicting the mean every time.' },
          { id:'e2', question:'What is the purpose of L2 (Ridge) regularization?', options:['Shrink coefficients to reduce overfitting','Remove features from the model','Increase the learning rate','Normalize the input features'], answer:0, explanation:'Ridge adds a penalty proportional to the sum of squared coefficients, discouraging large weights and reducing overfitting.' },
        ],
      },
      {
        id:'ds-m-02', title:'Classificação', duration:'65 min',
        source:'Data Science from Scratch — Cap. 16, 17',
        description:'Algoritmos de classificação e métricas de avaliação.',
        topics:['Regressão Logística','K-Nearest Neighbors','Decision Trees','Confusion Matrix','Precision, Recall, F1, ROC-AUC'],
        englishWords:[
          { word:'classification',pt:'classificação',   pronunciation:'ˌklæsɪfɪˈkeɪʃən',example:'This is a binary classification problem.' },
          { word:'precision',     pt:'precisão',        pronunciation:'prɪˈsɪʒən',       example:'Precision measures true positives among predictions.' },
          { word:'recall',        pt:'revocação/sensibilidade',pronunciation:'rɪˈkɔːl',  example:'High recall means few false negatives.' },
          { word:'threshold',     pt:'limiar/ponto de corte',pronunciation:'ˈθreʃhoʊld', example:'Adjust the threshold to balance precision and recall.' },
          { word:'confusion matrix',pt:'matriz de confusão',pronunciation:'kənˈfjuːʒən ˈmeɪtrɪks',example:'The confusion matrix shows TP, FP, FN, TN.' },
        ],
        englishPhrases:[
          { en:'The model has high precision but low recall.', pt:'O modelo tem alta precisão mas baixa sensibilidade.' },
          { en:"Let's look at the ROC curve to evaluate performance.", pt:'Vamos observar a curva ROC para avaliar o desempenho.' },
          { en:'We should use F1-score since the dataset is imbalanced.', pt:'Devemos usar o F1-score já que o conjunto de dados está desbalanceado.' },
        ],
        exercises:[
          { id:'e1', question:'When is Recall more important than Precision?', options:['When false negatives are costly (e.g., cancer detection)','When false positives are costly (e.g., spam filter)','When the dataset is balanced','Always — recall is always more important'], answer:0, explanation:'In cancer detection, missing a sick patient (false negative) is worse than a false alarm. High recall minimizes false negatives.' },
        ],
      },
      {
        id:'ds-m-03', title:'Inferência Estatística', duration:'75 min',
        source:'OpenIntro Statistics — Cap. 5, 6',
        description:'Testes de hipóteses, p-valor e intervalos de confiança.',
        topics:['Hipótese nula e alternativa','p-valor e nível de significância','Teste t e z','Intervalo de confiança','Erro Tipo I e II'],
        englishWords:[
          { word:'hypothesis',        pt:'hipótese',           pronunciation:'haɪˈpɒθɪsɪs',    example:'State the null hypothesis clearly.' },
          { word:'p-value',           pt:'valor-p',            pronunciation:'piː vælju',         example:'The p-value is 0.03, below α=0.05.' },
          { word:'significance level', pt:'nível de significância',pronunciation:'sɪɡˈnɪfɪkəns ˈlevəl',example:'We use a significance level of 5%.' },
          { word:'confidence interval',pt:'intervalo de confiança',pronunciation:'ˈkɒnfɪdəns ˈɪntəvəl',example:'The 95% CI is [2.1, 4.7].' },
          { word:'statistical power', pt:'poder estatístico',  pronunciation:'stəˈtɪstɪkl ˈpaʊər', example:'Increase sample size to boost power.' },
        ],
        englishPhrases:[
          { en:'We reject the null hypothesis at the 5% level.', pt:'Rejeitamos a hipótese nula no nível de 5%.' },
          { en:'The result is statistically significant.', pt:'O resultado é estatisticamente significativo.' },
          { en:'The confidence interval does not include zero.', pt:'O intervalo de confiança não inclui zero.' },
        ],
        exercises:[
          { id:'e1', question:'What does a p-value of 0.02 mean at α=0.05?', options:['Reject H₀ — results are statistically significant','Accept H₀ — no effect found','The effect size is 2%','There is a 2% chance H₁ is true'], answer:0, explanation:'p=0.02 < α=0.05, so we reject H₀. The p-value is the probability of observing results at least as extreme as ours, assuming H₀ is true.' },
        ],
      },
      {
        id:'ds-m-04', title:'Feature Engineering', duration:'60 min',
        source:'Data Science from Scratch — Cap. 11',
        description:'Criação e transformação de features para melhorar modelos.',
        topics:['Normalização e padronização','Encoding categórico','Criação de features','Seleção de features','Imputação de dados faltantes'],
        englishWords:[
          { word:'normalization',  pt:'normalização',    pronunciation:'ˌnɔːrməlaɪˈzeɪʃən',example:'Normalize features to [0,1] range.' },
          { word:'encoding',       pt:'codificação',     pronunciation:'ɪnˈkoʊdɪŋ',       example:'One-hot encode the category column.' },
          { word:'imputation',     pt:'imputação',       pronunciation:'ˌɪmpjʊˈteɪʃən',   example:'Impute missing values with the median.' },
          { word:'dimensionality', pt:'dimensionalidade',pronunciation:'dɪˌmenʃəˈnælɪti',  example:'Reduce dimensionality with PCA.' },
          { word:'correlation',    pt:'correlação',      pronunciation:'ˌkɒrəˈleɪʃən',    example:'High correlation between features causes issues.' },
        ],
        englishPhrases:[
          { en:'We need to encode the categorical variables.', pt:'Precisamos codificar as variáveis categóricas.' },
          { en:'This feature has 30% missing values.', pt:'Esta feature tem 30% de valores ausentes.' },
          { en:'Let me check the correlation matrix first.', pt:'Deixa eu verificar a matriz de correlação primeiro.' },
        ],
        exercises:[
          { id:'e1', question:'Why do we normalize features before training?', options:['To ensure all features contribute equally regardless of scale','To remove outliers automatically','To reduce the number of features','To speed up data loading'], answer:0, explanation:'Without normalization, a feature with large values (e.g., income: 50000) dominates features with small values (e.g., age: 30), biasing distance-based models.' },
        ],
      },
      {
        id:'ds-m-05', title:'Cross-Validation e Avaliação', duration:'55 min',
        source:'Data Science from Scratch — Cap. 11',
        description:'Técnicas de validação para modelos não enviesados.',
        topics:['Train/Val/Test split','K-Fold Cross-Validation','Stratified CV','Bias-Variance tradeoff','Curva de aprendizado'],
        englishWords:[
          { word:'cross-validation',pt:'validação cruzada',pronunciation:'krɒs ˌvælɪˈdeɪʃən',example:'Use 5-fold cross-validation.' },
          { word:'overfitting',     pt:'sobreajuste',       pronunciation:'ˌoʊvərˈfɪtɪŋ',  example:'The model is overfitting — high train, low val score.' },
          { word:'underfitting',    pt:'subajuste',         pronunciation:'ˌʌndərˈfɪtɪŋ',  example:'Underfitting means the model is too simple.' },
          { word:'bias',            pt:'viés',              pronunciation:'ˈbaɪəs',          example:'High bias leads to underfitting.' },
          { word:'variance',        pt:'variância',         pronunciation:'ˈveəriəns',       example:'High variance leads to overfitting.' },
        ],
        englishPhrases:[
          { en:'The model overfits — validation loss keeps increasing.', pt:'O modelo sobreajusta — a perda de validação continua aumentando.' },
          { en:"Let's use stratified k-fold to handle class imbalance.", pt:'Vamos usar k-fold estratificado para lidar com desequilíbrio de classes.' },
          { en:'The learning curve shows the model needs more data.', pt:'A curva de aprendizado mostra que o modelo precisa de mais dados.' },
        ],
        exercises:[
          { id:'e1', question:'What is the main benefit of k-fold cross-validation over a single train/test split?', options:['More reliable estimate of model performance using all data','Faster training time','Eliminates the need for a test set','Automatically tunes hyperparameters'], answer:0, explanation:'K-fold uses each fold as validation once, giving k estimates of performance. The average is more reliable than a single split.' },
        ],
      },
      {
        id:'ds-m-06', title:'Ensemble Methods', duration:'70 min',
        source:'Data Science from Scratch — Cap. 17',
        description:'Random Forests, Gradient Boosting e técnicas de ensemble.',
        topics:['Bagging e Random Forests','Boosting e AdaBoost','XGBoost e LightGBM','Feature importance','Hyperparameter tuning'],
        englishWords:[
          { word:'ensemble',    pt:'conjunto de modelos',pronunciation:'ɑːnˈsɑːmbəl',  example:'Ensembles combine multiple weak learners.' },
          { word:'bagging',     pt:'amostragem com reposição',pronunciation:'ˈbæɡɪŋ',  example:'Random Forest uses bagging.' },
          { word:'boosting',    pt:'impulsionamento',    pronunciation:'ˈbuːstɪŋ',      example:'XGBoost is a powerful boosting algorithm.' },
          { word:'hyperparameter',pt:'hiperparâmetro',  pronunciation:'ˌhaɪpərˈpærəmɪtər',example:'Tune the hyperparameters using grid search.' },
          { word:'feature importance',pt:'importância da feature',pronunciation:'ˈfiːtʃər ɪmˈpɔːrtəns',example:'Age has the highest feature importance.' },
        ],
        englishPhrases:[
          { en:'Random Forest reduces variance through bagging.', pt:'Random Forest reduz a variância através de bagging.' },
          { en:'Let me tune the hyperparameters with grid search.', pt:'Deixa eu ajustar os hiperparâmetros com busca em grade.' },
          { en:'XGBoost outperforms Random Forest on this dataset.', pt:'XGBoost supera o Random Forest neste conjunto de dados.' },
        ],
        exercises:[
          { id:'e1', question:'What is the key difference between bagging and boosting?', options:['Bagging trains models in parallel to reduce variance; boosting trains sequentially to reduce bias','Bagging uses decision trees; boosting uses neural networks','Bagging is supervised; boosting is unsupervised','They are the same technique with different names'], answer:0, explanation:'Bagging (e.g., Random Forest): parallel training, each model independent, reduces variance. Boosting (e.g., XGBoost): sequential, each model corrects the previous, reduces bias.' },
        ],
      },
      {
        id:'ds-m-07', title:'Clusterização', duration:'60 min',
        source:'Data Science from Scratch — Cap. 19',
        description:'Algoritmos de aprendizado não-supervisionado para agrupamento.',
        topics:['K-Means','DBSCAN','Hierarchical Clustering','Escolha do k','Métricas: silhouette, inertia'],
        englishWords:[
          { word:'clustering',  pt:'agrupamento',     pronunciation:'ˈklʌstərɪŋ',    example:'Clustering groups similar customers together.' },
          { word:'centroid',    pt:'centroide',       pronunciation:'ˈsentrɔɪd',      example:'Each cluster has a centroid.' },
          { word:'unsupervised',pt:'não-supervisionado',pronunciation:'ˌʌnsəˈpɜːrvɪzd',example:'K-Means is an unsupervised algorithm.' },
          { word:'inertia',     pt:'inércia',         pronunciation:'ɪˈnɜːrʃə',       example:'Use the elbow method to minimize inertia.' },
          { word:'silhouette',  pt:'silhueta',        pronunciation:'ˌsɪluˈet',       example:'The silhouette score measures cluster quality.' },
        ],
        englishPhrases:[
          { en:'We need to choose the optimal number of clusters.', pt:'Precisamos escolher o número ideal de clusters.' },
          { en:'The elbow method suggests k=4.', pt:'O método do cotovelo sugere k=4.' },
          { en:'These two clusters are not well-separated.', pt:'Esses dois clusters não estão bem separados.' },
        ],
        exercises:[
          { id:'e1', question:'What is a limitation of K-Means clustering?', options:['Requires specifying k in advance and assumes spherical clusters','Cannot handle large datasets','Only works with categorical data','Does not support distance metrics'], answer:0, explanation:'K-Means requires k upfront and assumes clusters are roughly spherical and equal-sized. DBSCAN handles arbitrary shapes without specifying k.' },
        ],
      },
      {
        id:'ds-m-08', title:'Redução de Dimensionalidade', duration:'65 min',
        source:'Data Science from Scratch — Cap. 10',
        description:'PCA, t-SNE e UMAP para visualização e compressão.',
        topics:['PCA: eigenvectors e variância explicada','t-SNE para visualização','UMAP','Quando usar cada técnica','PCA em pipelines de ML'],
        englishWords:[
          { word:'dimensionality reduction',pt:'redução de dimensionalidade',pronunciation:'dɪˌmenʃəˈnælɪti rɪˈdʌkʃən',example:'PCA is a popular dimensionality reduction technique.' },
          { word:'variance explained',pt:'variância explicada',pronunciation:'ˈveəriəns ɪkˈspleɪnd',example:'The first two components explain 85% of variance.' },
          { word:'eigenvector',pt:'autovetor',pronunciation:'ˈaɪɡənˌvektər',example:'PCA finds the principal eigenvectors.' },
          { word:'projection',pt:'projeção',pronunciation:'prəˈdʒekʃən',example:'Project the data onto 2 dimensions.' },
          { word:'component',pt:'componente',pronunciation:'kəmˈpoʊnənt',example:'Keep the top 10 principal components.' },
        ],
        englishPhrases:[
          { en:'The first two components capture most of the variance.', pt:'Os dois primeiros componentes capturam a maior parte da variância.' },
          { en:'Let me visualize the clusters using t-SNE.', pt:'Deixa eu visualizar os clusters usando t-SNE.' },
          { en:'We reduced from 500 to 20 dimensions.', pt:'Reduzimos de 500 para 20 dimensões.' },
        ],
        exercises:[
          { id:'e1', question:'What is the primary goal of PCA?', options:['Find orthogonal directions of maximum variance to reduce dimensions','Train a classifier on high-dimensional data','Remove correlated features from the dataset','Normalize the feature space'], answer:0, explanation:'PCA finds the directions (principal components) of maximum variance and projects data onto them, enabling dimensionality reduction while retaining as much information as possible.' },
        ],
      },
    ],
    avancado: [
      {
        id:'ds-a-01', title:'Gradient Descent e Otimização', duration:'80 min',
        source:'Data Science from Scratch — Cap. 8 + Deep Learning — Cap. 4',
        description:'Algoritmos de otimização fundamentais para ML e deep learning.',
        topics:['Gradient Descent','SGD, Adam, RMSProp','Learning rate scheduling','Convergência e critérios de parada','Minibatch training'],
        englishWords:[
          { word:'gradient',    pt:'gradiente',       pronunciation:'ˈɡreɪdiənt',    example:'Compute the gradient of the loss.' },
          { word:'learning rate',pt:'taxa de aprendizado',pronunciation:'ˈlɜːrnɪŋ reɪt',example:'A high learning rate can cause divergence.' },
          { word:'convergence', pt:'convergência',    pronunciation:'kənˈvɜːrdʒəns',  example:'Monitor convergence during training.' },
          { word:'epoch',       pt:'época',           pronunciation:'ˈiːpɒk',          example:'Train for 100 epochs.' },
          { word:'momentum',    pt:'momentum',        pronunciation:'moʊˈmentəm',      example:'Adam uses momentum to speed up convergence.' },
        ],
        englishPhrases:[
          { en:'The loss is not converging — reduce the learning rate.', pt:'A perda não está convergindo — reduza a taxa de aprendizado.' },
          { en:'Use learning rate scheduling to improve convergence.', pt:'Use agendamento de taxa de aprendizado para melhorar a convergência.' },
          { en:'Adam is usually the best default optimizer.', pt:'Adam geralmente é o melhor otimizador padrão.' },
        ],
        exercises:[
          { id:'e1', question:'What happens if the learning rate is too high?', options:['The loss oscillates or diverges instead of converging','Training is too slow','The model underfits','Gradients become zero'], answer:0, explanation:'A too-high learning rate causes the optimizer to overshoot the minimum — loss oscillates or even increases. A too-low rate makes training very slow.' },
        ],
      },
      {
        id:'ds-a-02', title:'Time Series Analysis', duration:'85 min',
        source:'Data Science from Scratch — Cap. 23',
        description:'Análise e previsão de séries temporais.',
        topics:['Autocorrelação e ACF/PACF','Stationarity','ARIMA e SARIMA','Prophet','Feature engineering temporal'],
        englishWords:[
          { word:'time series',   pt:'série temporal',  pronunciation:'taɪm ˈsɪəriːz',  example:'Forecast future sales using time series.' },
          { word:'stationarity',  pt:'estacionariedade',pronunciation:'ˌsteɪʃəˈnærɪti', example:'Check stationarity with the ADF test.' },
          { word:'seasonality',   pt:'sazonalidade',    pronunciation:'ˌsiːzəˈnælɪti',  example:'Sales show strong monthly seasonality.' },
          { word:'trend',         pt:'tendência',       pronunciation:'trend',            example:'Remove the trend before modeling.' },
          { word:'autocorrelation',pt:'autocorrelação', pronunciation:'ˌɔːtəʊˌkɒrəˈleɪʃən',example:'High autocorrelation at lag 12 suggests yearly patterns.' },
        ],
        englishPhrases:[
          { en:'The series is non-stationary — apply differencing.', pt:'A série não é estacionária — aplique diferenciação.' },
          { en:"There's a clear seasonal pattern every 12 months.", pt:'Há um padrão sazonal claro a cada 12 meses.' },
          { en:'Let me decompose the series into trend, seasonality and residual.', pt:'Deixa eu decompor a série em tendência, sazonalidade e resíduo.' },
        ],
        exercises:[
          { id:'e1', question:'What does "stationarity" mean in time series?', options:["The series' statistical properties (mean, variance) don't change over time","The series has no trend","The series repeats exactly every period","The series contains no noise"], answer:0, explanation:'A stationary series has constant mean, variance and autocorrelation over time. Most time series models (ARIMA) require stationarity.' },
        ],
      },
      {
        id:'ds-a-03', title:'A/B Testing e Experimentos', duration:'70 min',
        source:'Data Science from Scratch — Cap. 7 + OpenIntro Statistics — Cap. 7',
        description:'Design e análise de experimentos controlados.',
        topics:['Design de experimentos','Sample size e poder','Sequential testing','Multiple comparisons','Bayesian A/B testing'],
        englishWords:[
          { word:'control group', pt:'grupo controle',  pronunciation:'kənˈtroʊl ɡruːp',example:'The control group sees the original version.' },
          { word:'treatment',     pt:'tratamento',      pronunciation:'ˈtriːtmənt',      example:'The treatment group sees the new feature.' },
          { word:'sample size',   pt:'tamanho da amostra',pronunciation:'ˈsæmpəl saɪz',example:'Calculate the required sample size first.' },
          { word:'conversion rate',pt:'taxa de conversão',pronunciation:'kənˈvɜːrʒən reɪt',example:'The conversion rate increased by 2%.' },
          { word:'statistical significance',pt:'significância estatística',pronunciation:'stəˈtɪstɪkl sɪɡˈnɪfɪkəns',example:'The result reached statistical significance.' },
        ],
        englishPhrases:[
          { en:"The test didn't reach statistical significance.", pt:'O teste não atingiu significância estatística.' },
          { en:"We need at least 10,000 users per variant.", pt:'Precisamos de pelo menos 10.000 usuários por variante.' },
          { en:'The lift in conversion rate is 3.2%.', pt:'O aumento na taxa de conversão é de 3,2%.' },
        ],
        exercises:[
          { id:'e1', question:'What is statistical power in the context of A/B testing?', options:['The probability of detecting a real effect when it exists','The probability of making a Type I error','The size of the difference between variants','The confidence level of the test'], answer:0, explanation:'Power = 1 - P(Type II error). Higher power means less chance of missing a real effect. Standard target is 80% power.' },
        ],
      },
    ],
  },
}

// ── Estatística Trail ─────────────────────────────────────
export const ESTATISTICA = {
  id: 'estatistica',
  title: 'Estatística',
  icon: '📈',
  color: '#f59e0b',
  description: 'Fundamentos sólidos de estatística para ciência de dados e pesquisa.',
  levels: {
    iniciante: [
      {
        id:'st-i-01', title:'Tipos de Dados e Escalas', duration:'35 min',
        source:'OpenIntro Statistics — Cap. 1',
        description:'Variáveis numéricas, categóricas e escalas de medida.',
        topics:['Dados categóricos vs numéricos','Escala nominal, ordinal, intervalar, racional','Variáveis contínuas e discretas','Coleta de dados','Tipos de amostragem'],
        englishWords:[
          { word:'categorical', pt:'categórico',   pronunciation:'ˌkætəˈɡɒrɪkl',  example:'Gender is a categorical variable.' },
          { word:'numerical',   pt:'numérico',     pronunciation:'ˈnjuːmərɪkl',    example:'Age is a numerical variable.' },
          { word:'discrete',    pt:'discreto',     pronunciation:'dɪˈskriːt',       example:'Number of children is discrete.' },
          { word:'continuous',  pt:'contínuo',     pronunciation:'kənˈtɪnjuəs',    example:'Height is a continuous variable.' },
          { word:'sample',      pt:'amostra',      pronunciation:'ˈsæmpəl',         example:'We collected a random sample of 500.' },
        ],
        englishPhrases:[
          { en:'This variable is measured on an ordinal scale.', pt:'Esta variável é medida em escala ordinal.' },
          { en:'We used stratified random sampling.', pt:'Usamos amostragem aleatória estratificada.' },
          { en:'The variable is continuous and normally distributed.', pt:'A variável é contínua e normalmente distribuída.' },
        ],
        exercises:[
          { id:'e1', question:'Which of the following is a continuous variable?', options:['Body temperature','Number of cars in a parking lot','Shoe size (whole numbers)','Number of goals in a match'], answer:0, explanation:'Body temperature can take any value within a range (e.g., 36.7°C, 37.2°C) — it is continuous. The others are discrete (countable).' },
        ],
      },
      {
        id:'st-i-02', title:'Distribuições de Probabilidade', duration:'55 min',
        source:'OpenIntro Statistics — Cap. 3, 4',
        description:'Distribuições discretas e contínuas mais usadas na prática.',
        topics:['Distribuição Normal','Distribuição Binomial','Distribuição de Poisson','Distribuição t de Student','Distribuição Qui-quadrado'],
        englishWords:[
          { word:'normal distribution',pt:'distribuição normal',pronunciation:'ˈnɔːrməl ˌdɪstrɪˈbjuːʃən',example:'Heights follow a normal distribution.' },
          { word:'bell curve',    pt:'curva em sino',     pronunciation:'bel kɜːrv',      example:'The bell curve is symmetric around the mean.' },
          { word:'skewness',      pt:'assimetria',        pronunciation:'ˈskjuːnəs',       example:'Positive skewness means a long right tail.' },
          { word:'kurtosis',      pt:'curtose',           pronunciation:'kɜːrˈtoʊsɪs',    example:'High kurtosis means heavy tails.' },
          { word:'expected value', pt:'valor esperado',  pronunciation:'ɪkˈspektɪd ˈvæljuː',example:'The expected value of the die is 3.5.' },
        ],
        englishPhrases:[
          { en:'The data follows a roughly normal distribution.', pt:'Os dados seguem uma distribuição aproximadamente normal.' },
          { en:'Check for normality using a Q-Q plot.', pt:'Verifique a normalidade usando um gráfico Q-Q.' },
          { en:'The distribution is heavily right-skewed.', pt:'A distribuição está fortemente assimétrica à direita.' },
        ],
        exercises:[
          { id:'e1', question:'What does a Q-Q plot assess?', options:['Whether data follows a specific distribution (usually normal)','Correlation between two variables','The variance of a sample','Whether two samples come from the same population'], answer:0, explanation:'A Q-Q (quantile-quantile) plot compares sample quantiles to theoretical quantiles. Points falling on a straight line suggest the assumed distribution fits.' },
        ],
      },
      {
        id:'st-i-03', title:'Correlação e Causalidade', duration:'45 min',
        source:'OpenIntro Statistics — Cap. 7',
        description:'Medir associação entre variáveis e entender causalidade.',
        topics:['Coeficiente de Pearson','Correlação de Spearman','Correlação vs causalidade','Simpson\'s Paradox','Variáveis confundidoras'],
        englishWords:[
          { word:'correlation',  pt:'correlação',      pronunciation:'ˌkɒrəˈleɪʃən',   example:'There is a strong positive correlation.' },
          { word:'causation',    pt:'causalidade',     pronunciation:'kɔːˈzeɪʃən',      example:'Correlation does not imply causation.' },
          { word:'confounding',  pt:'confundimento',   pronunciation:'kənˈfaʊndɪŋ',     example:'Age is a confounding variable here.' },
          { word:'spurious',     pt:'espúrio/falso',   pronunciation:'ˈspjʊəriəs',       example:'A spurious correlation is misleading.' },
          { word:'association',  pt:'associação',      pronunciation:'əˌsoʊsiˈeɪʃən',   example:'There is an association between smoking and cancer.' },
        ],
        englishPhrases:[
          { en:'Correlation does not imply causation.', pt:'Correlação não implica causalidade.' },
          { en:'We need to control for confounding variables.', pt:'Precisamos controlar as variáveis confundidoras.' },
          { en:'This is a spurious correlation caused by a lurking variable.', pt:'Esta é uma correlação espúria causada por uma variável oculta.' },
        ],
        exercises:[
          { id:'e1', question:'Ice cream sales and drowning rates are highly correlated. What explains this?', options:['Both increase in summer — temperature is a confounding variable','Ice cream causes drowning','Drowning causes people to buy more ice cream','It is a direct causal relationship'], answer:0, explanation:'This is a classic example of a confounding variable: summer heat increases both ice cream consumption and swimming (and thus drowning), creating a spurious correlation.' },
        ],
      },
    ],
    intermediario: [
      {
        id:'st-m-01', title:'Testes de Hipótese Avançados', duration:'75 min',
        source:'OpenIntro Statistics — Cap. 5, 6, 7',
        description:'ANOVA, testes não-paramétricos e comparações múltiplas.',
        topics:['ANOVA one-way e two-way','Teste de Kruskal-Wallis','Correção de Bonferroni','Qui-quadrado de aderência','Teste de Fisher'],
        englishWords:[
          { word:'ANOVA',        pt:'Análise de Variância',pronunciation:'əˈnoʊvə',      example:'Use ANOVA to compare three or more groups.' },
          { word:'parametric',   pt:'paramétrico',    pronunciation:'ˌpærəˈmetrɪk',      example:'t-test is a parametric test.' },
          { word:'non-parametric',pt:'não-paramétrico',pronunciation:'nɒn ˌpærəˈmetrɪk', example:'Use non-parametric tests when normality fails.' },
          { word:'post-hoc',     pt:'pós-hoc',        pronunciation:'poʊst hɒk',          example:'Apply post-hoc tests after ANOVA.' },
          { word:'effect size',  pt:'tamanho do efeito',pronunciation:'ɪˈfekt saɪz',     example:'Report effect size alongside p-value.' },
        ],
        englishPhrases:[
          { en:'The ANOVA shows a significant difference between groups.', pt:'A ANOVA mostra uma diferença significativa entre os grupos.' },
          { en:'Run a post-hoc Tukey test to identify which groups differ.', pt:'Execute um teste de Tukey pós-hoc para identificar quais grupos diferem.' },
          { en:"The normality assumption is violated — use a non-parametric test.", pt:'O pressuposto de normalidade é violado — use um teste não-paramétrico.' },
        ],
        exercises:[
          { id:'e1', question:'When should you use ANOVA instead of multiple t-tests?', options:['When comparing 3+ groups — ANOVA controls the family-wise error rate','When data is not normally distributed','When comparing exactly 2 groups','When the sample size is small'], answer:0, explanation:'Running multiple t-tests inflates Type I error (false positive rate). ANOVA tests all groups simultaneously, controlling the overall error rate.' },
        ],
      },
    ],
    avancado: [
      {
        id:'st-a-01', title:'Estatística Bayesiana', duration:'90 min',
        source:'OpenIntro Statistics — Cap. 3 (Bayes)',
        description:'Inferência Bayesiana, MCMC e modelos probabilísticos.',
        topics:['Priori e posteriori','Credible intervals','MCMC e PyMC','Modelos hierárquicos','Comparação Bayesiana vs frequentista'],
        englishWords:[
          { word:'Bayesian inference',pt:'inferência Bayesiana',pronunciation:'ˈbeɪziən ˈɪnfərəns',example:'Bayesian inference updates beliefs with data.' },
          { word:'prior distribution',pt:'distribuição a priori',pronunciation:'ˈpraɪər',example:'Set an informative prior based on domain knowledge.' },
          { word:'credible interval',pt:'intervalo de credibilidade',pronunciation:'ˈkredɪbəl ˈɪntəvəl',example:'The 95% credible interval is [0.2, 0.8].' },
          { word:'MCMC',            pt:'Monte Carlo por Cadeia de Markov',pronunciation:'em-siː-em-siː',example:'Use MCMC to sample from the posterior.' },
          { word:'posterior',       pt:'distribuição a posteriori',pronunciation:'pɒˈstɪərɪər',example:'The posterior combines prior and likelihood.' },
        ],
        englishPhrases:[
          { en:'Update the prior with the observed data to get the posterior.', pt:'Atualize o priori com os dados observados para obter o posteriori.' },
          { en:'The credible interval has a direct probability interpretation.', pt:'O intervalo de credibilidade tem uma interpretação de probabilidade direta.' },
          { en:'We used MCMC to approximate the posterior distribution.', pt:'Usamos MCMC para aproximar a distribuição a posteriori.' },
        ],
        exercises:[
          { id:'e1', question:'What is the key philosophical difference between Bayesian and frequentist statistics?', options:['Bayesian treats parameters as random variables with distributions; frequentist treats them as fixed unknowns','Bayesian uses more data','Frequentist is always more accurate','Bayesian does not use hypothesis testing'], answer:0, explanation:'Frequentist: parameters are fixed, data is random. Bayesian: data is fixed (observed), parameters are random variables described by probability distributions.' },
        ],
      },
    ],
  },
}

// ── GenAI Trail (abbreviated for space, full in next part) ─
export const GENAI = {
  id: 'genai',
  title: 'GenAI & LLMs',
  icon: '🤖',
  color: '#8b5cf6',
  description: 'Inteligência artificial generativa, transformers, LLMs e aplicações práticas.',
  levels: {
    iniciante: [
      {
        id:'ai-i-01', title:'Fundamentos de Redes Neurais', duration:'60 min',
        source:'Deep Learning — Cap. 1, 6',
        description:'Neurônios artificiais, camadas e funções de ativação.',
        topics:['Perceptron','Funções de ativação','Forward propagation','Redes feedforward','Universal approximation'],
        englishWords:[
          { word:'neuron',          pt:'neurônio',        pronunciation:'ˈnjʊərɒn',     example:'Each neuron applies a weighted sum.' },
          { word:'activation function',pt:'função de ativação',pronunciation:'ˌæktɪˈveɪʃən ˈfʌŋkʃən',example:'ReLU is the most common activation function.' },
          { word:'weight',          pt:'peso',            pronunciation:'weɪt',           example:'Weights are updated during training.' },
          { word:'bias',            pt:'viés/bias',       pronunciation:'ˈbaɪəs',          example:'The bias term shifts the activation function.' },
          { word:'hidden layer',    pt:'camada oculta',   pronunciation:'ˈhɪdən ˈleɪər',  example:'Deep networks have many hidden layers.' },
        ],
        englishPhrases:[
          { en:'The network has 3 hidden layers with 128 units each.', pt:'A rede tem 3 camadas ocultas com 128 unidades cada.' },
          { en:'ReLU is preferred because it avoids the vanishing gradient problem.', pt:'ReLU é preferido porque evita o problema do gradiente que desaparece.' },
          { en:'The output layer uses softmax for multi-class classification.', pt:'A camada de saída usa softmax para classificação multiclasse.' },
        ],
        exercises:[
          { id:'e1', question:'What is the purpose of an activation function?', options:['Introduce non-linearity so the network can learn complex patterns','Normalize the input data','Reduce the number of parameters','Speed up training'], answer:0, explanation:'Without non-linear activations, a deep network collapses into a single linear transformation. Activations like ReLU enable learning complex, non-linear relationships.' },
          { id:'e2', question:'What is the vanishing gradient problem?', options:['Gradients shrink exponentially through layers, preventing early layers from learning','The model loses all its weights','Gradients become too large','The loss function becomes zero'], answer:0, explanation:'In deep networks, gradients are multiplied through many layers during backpropagation. With sigmoid/tanh, they shrink exponentially — early layers learn very slowly or not at all.' },
        ],
      },
      {
        id:'ai-i-02', title:'Embeddings e Representações', duration:'55 min',
        source:'NLP with Transformers — Cap. 1, 2',
        description:'Como transformar texto em vetores para modelos de IA.',
        topics:['Word embeddings','Word2Vec e GloVe','Tokenização','Similaridade coseno','Vocabulário e OOV'],
        englishWords:[
          { word:'embedding',   pt:'incorporação/vetor de representação',pronunciation:'ɪmˈbedɪŋ',example:'Word embeddings capture semantic meaning.' },
          { word:'token',       pt:'token/ficha',     pronunciation:'ˈtoʊkən',     example:'Split the sentence into tokens.' },
          { word:'tokenizer',   pt:'tokenizador',     pronunciation:'ˈtoʊkənaɪzər',example:'The tokenizer converts text to IDs.' },
          { word:'vocabulary',  pt:'vocabulário',     pronunciation:'vəˈkæbjʊləri', example:'The model has a vocabulary of 50,000 tokens.' },
          { word:'cosine similarity',pt:'similaridade coseno',pronunciation:'ˈkoʊsaɪn sɪˌmɪlˈærɪti',example:'Cosine similarity measures vector angle.' },
        ],
        englishPhrases:[
          { en:'The embedding captures the semantic meaning of the word.', pt:'O embedding captura o significado semântico da palavra.' },
          { en:'King - Man + Woman ≈ Queen — that is word arithmetic.', pt:'Rei - Homem + Mulher ≈ Rainha — isso é aritmética de palavras.' },
          { en:'Tokenize the input before feeding it to the model.', pt:'Tokenize a entrada antes de passá-la para o modelo.' },
        ],
        exercises:[
          { id:'e1', question:'What does cosine similarity measure between two word embeddings?', options:['The semantic similarity based on the angle between vectors','The Euclidean distance between words','How many characters two words share','The frequency of both words in the corpus'], answer:0, explanation:'Cosine similarity = cos(θ). Near 1: similar meaning. Near 0: unrelated. Near -1: opposite meaning. It ignores vector magnitude, focusing on direction.' },
        ],
      },
      {
        id:'ai-i-03', title:'Attention Mechanism', duration:'70 min',
        source:'NLP with Transformers — Cap. 3',
        description:'O mecanismo de atenção que revolucionou a IA.',
        topics:['Self-attention','Query, Key, Value','Attention scores','Softmax e pesos','Multi-head attention'],
        englishWords:[
          { word:'attention',      pt:'atenção',       pronunciation:'əˈtenʃən',     example:'Self-attention relates all positions.' },
          { word:'query',          pt:'consulta',      pronunciation:'ˈkwɪəri',       example:'Q represents what we are looking for.' },
          { word:'key',            pt:'chave',         pronunciation:'kiː',            example:'K represents what each token offers.' },
          { word:'value',          pt:'valor',         pronunciation:'ˈvæljuː',        example:'V is the actual content retrieved.' },
          { word:'multi-head',     pt:'múltiplas cabeças',pronunciation:'ˈmʌlti hed', example:'Multi-head attention uses 8-16 parallel heads.' },
        ],
        englishPhrases:[
          { en:'The attention scores show which tokens the model focuses on.', pt:'Os scores de atenção mostram em quais tokens o modelo se foca.' },
          { en:'Self-attention relates each token to every other token.', pt:'A auto-atenção relaciona cada token a todos os outros tokens.' },
          { en:'Q, K, V are linear projections of the input embeddings.', pt:'Q, K, V são projeções lineares dos embeddings de entrada.' },
        ],
        exercises:[
          { id:'e1', question:'In the attention mechanism, what role does the "Query" play?', options:["Represents what the current token is 'searching for' in other tokens","Stores the actual content to retrieve","Acts as a filter for irrelevant tokens","Normalizes the attention scores"], answer:0, explanation:'Think of it as a database search: Q is the search query, K is the index of available information, V is the content. Attention = softmax(QKᵀ/√d) × V.' },
        ],
      },
      {
        id:'ai-i-04', title:'Arquitetura Transformer', duration:'90 min',
        source:'NLP with Transformers — Cap. 3, 4',
        description:'A arquitetura completa que alimenta todos os LLMs modernos.',
        topics:['Encoder e Decoder','Positional encoding','Layer normalization','Feed-forward layers','Residual connections','BERT vs GPT'],
        englishWords:[
          { word:'transformer',     pt:'transformador',  pronunciation:'trænsˈfɔːrmər',   example:'GPT is a transformer-based model.' },
          { word:'encoder',         pt:'codificador',    pronunciation:'ɪnˈkoʊdər',       example:'BERT uses an encoder-only architecture.' },
          { word:'decoder',         pt:'decodificador',  pronunciation:'dɪˈkoʊdər',       example:'GPT uses a decoder-only architecture.' },
          { word:'positional encoding',pt:'codificação posicional',pronunciation:'pəˈzɪʃənl ɪnˈkoʊdɪŋ',example:'Positional encoding adds position info.' },
          { word:'residual connection',pt:'conexão residual',pronunciation:'rɪˈzɪdjuəl kəˈnekʃən',example:'Residual connections prevent vanishing gradients.' },
        ],
        englishPhrases:[
          { en:'BERT is encoder-only, making it great for understanding tasks.', pt:'BERT é somente encoder, tornando-o ótimo para tarefas de compreensão.' },
          { en:'GPT uses causal masking to prevent attending to future tokens.', pt:'GPT usa máscara causal para evitar atenção em tokens futuros.' },
          { en:'Layer norm is applied before each sub-layer.', pt:'A normalização de camada é aplicada antes de cada sub-camada.' },
        ],
        exercises:[
          { id:'e1', question:'What is the key difference between BERT and GPT architectures?', options:['BERT is encoder-only (bidirectional); GPT is decoder-only (left-to-right)','BERT generates text; GPT does not','GPT is larger than BERT','BERT uses causal masking; GPT does not'], answer:0, explanation:'BERT reads text in both directions simultaneously (good for classification, QA). GPT generates text token by token, left to right (good for generation). Both use transformers.' },
        ],
      },
    ],
    intermediario: [
      {
        id:'ai-m-01', title:'Fine-tuning e Transfer Learning', duration:'80 min',
        source:'NLP with Transformers — Cap. 2, 3',
        description:'Adaptar modelos pré-treinados para tarefas específicas.',
        topics:['Pre-training vs fine-tuning','Task-specific heads','LoRA e PEFT','Instruction tuning','RLHF básico'],
        englishWords:[
          { word:'fine-tuning',    pt:'ajuste fino',     pronunciation:'faɪn tjuːnɪŋ',   example:'Fine-tune BERT on your domain data.' },
          { word:'pre-trained',    pt:'pré-treinado',    pronunciation:'priː treɪnd',      example:'Start with a pre-trained model.' },
          { word:'downstream task',pt:'tarefa downstream',pronunciation:'ˈdaʊnstriːm tɑːsk',example:'Sentiment analysis is a downstream task.' },
          { word:'LoRA',           pt:'LoRA',            pronunciation:'ˈloʊrə',           example:'LoRA reduces trainable parameters by 99%.' },
          { word:'adapter',        pt:'adaptador',       pronunciation:'əˈdæptər',         example:'Adapters add small trainable layers.' },
        ],
        englishPhrases:[
          { en:'Fine-tune only the last few layers to save compute.', pt:'Ajuste finamente apenas as últimas camadas para economizar computação.' },
          { en:'LoRA injects trainable rank decomposition matrices.', pt:'LoRA injeta matrizes de decomposição de baixo rank treináveis.' },
          { en:'The pre-trained representations transfer well to this task.', pt:'As representações pré-treinadas transferem bem para esta tarefa.' },
        ],
        exercises:[
          { id:'e1', question:'What is the main advantage of LoRA over full fine-tuning?', options:['It trains only a tiny fraction of parameters, saving memory and compute','It always achieves higher accuracy','It does not require labeled data','It works without a pre-trained model'], answer:0, explanation:'LoRA freezes the pre-trained weights and trains small rank-decomposition matrices (e.g., 0.1-1% of params). Results are often close to full fine-tuning at a fraction of the cost.' },
        ],
      },
      {
        id:'ai-m-02', title:'Prompt Engineering', duration:'65 min',
        source:'NLP with Transformers — Cap. 8',
        description:'Técnicas avançadas para obter o melhor dos LLMs.',
        topics:['Zero-shot e few-shot','Chain-of-thought','Role prompting','Structured output','RAG básico'],
        englishWords:[
          { word:'prompt',       pt:'instrução/prompt', pronunciation:'prɒmpt',         example:'Write a clear and specific prompt.' },
          { word:'zero-shot',    pt:'sem exemplos',      pronunciation:'ˈzɪərəʊ ʃɒt',   example:'Zero-shot: no examples given.' },
          { word:'few-shot',     pt:'poucos exemplos',   pronunciation:'fjuː ʃɒt',       example:'Few-shot: 2-5 examples in the prompt.' },
          { word:'chain-of-thought',pt:'cadeia de pensamento',pronunciation:'tʃeɪn əv θɔːt',example:'CoT improves reasoning tasks.' },
          { word:'hallucination', pt:'alucinação',       pronunciation:'həˌluːsɪˈneɪʃən',example:'The model hallucinated fake citations.' },
        ],
        englishPhrases:[
          { en:"Let's use chain-of-thought to improve the model's reasoning.", pt:"Vamos usar cadeia de pensamento para melhorar o raciocínio do modelo." },
          { en:'The model is hallucinating — add a system prompt to constrain it.', pt:'O modelo está alucinando — adicione um prompt de sistema para restringi-lo.' },
          { en:'Few-shot examples dramatically improve output quality.', pt:'Exemplos few-shot melhoram dramaticamente a qualidade da saída.' },
        ],
        exercises:[
          { id:'e1', question:'What is Chain-of-Thought (CoT) prompting?', options:["Asking the model to show step-by-step reasoning before answering","Providing many examples before the question","Using multiple prompts in sequence","A technique to reduce hallucinations by restricting output"], answer:0, explanation:'CoT (e.g., "Think step by step") encourages the model to reason explicitly. It significantly improves performance on math, logic, and multi-step reasoning tasks.' },
        ],
      },
      {
        id:'ai-m-03', title:'RAG — Retrieval Augmented Generation', duration:'85 min',
        source:'NLP with Transformers — Cap. 9',
        description:'Combinar LLMs com bases de conhecimento externas.',
        topics:['Vector databases','Semantic search','Chunking strategies','Reranking','RAG pipeline completo'],
        englishWords:[
          { word:'retrieval',       pt:'recuperação',    pronunciation:'rɪˈtriːvəl',     example:'Retrieval finds relevant documents.' },
          { word:'vector database', pt:'banco de vetores',pronunciation:'ˈvektər ˈdeɪtəbeɪs',example:'Store embeddings in a vector database.' },
          { word:'chunk',           pt:'trecho/fragmento',pronunciation:'tʃʌŋk',          example:'Split documents into 512-token chunks.' },
          { word:'reranking',       pt:'reordenação',    pronunciation:'riːˈræŋkɪŋ',      example:'Reranking improves retrieval precision.' },
          { word:'context injection',pt:'injeção de contexto',pronunciation:'ˈkɒntekst ɪnˈdʒekʃən',example:'Inject retrieved docs into the prompt.' },
        ],
        englishPhrases:[
          { en:'RAG reduces hallucinations by grounding the model in facts.', pt:'RAG reduz alucinações ao ancorar o modelo em fatos.' },
          { en:'The retriever returns the top-5 most relevant chunks.', pt:'O recuperador retorna os 5 trechos mais relevantes.' },
          { en:'Chunk size affects the quality of retrieved context.', pt:'O tamanho do trecho afeta a qualidade do contexto recuperado.' },
        ],
        exercises:[
          { id:'e1', question:'What problem does RAG primarily solve?', options:['Provides LLMs with up-to-date or domain-specific knowledge beyond training data','Makes LLMs faster','Reduces the cost of training','Improves grammar and fluency'], answer:0, explanation:'LLMs have a knowledge cutoff and limited context. RAG retrieves relevant documents at inference time and injects them into the prompt, enabling accurate, grounded responses.' },
        ],
      },
    ],
    avancado: [
      {
        id:'ai-a-01', title:'RLHF e Alinhamento', duration:'95 min',
        source:'NLP with Transformers — Cap. 11',
        description:'Como modelos como ChatGPT são alinhados com preferências humanas.',
        topics:['Reward model','PPO','DPO','Constitutional AI','Avaliação de alinhamento'],
        englishWords:[
          { word:'alignment',    pt:'alinhamento',     pronunciation:'əˈlaɪnmənt',     example:'Alignment ensures AI behaves safely.' },
          { word:'reward model', pt:'modelo de recompensa',pronunciation:'rɪˈwɔːrd ˈmɒdəl',example:'The reward model scores responses.' },
          { word:'policy',       pt:'política',        pronunciation:'ˈpɒlɪsi',          example:'The LLM is the policy in RL.' },
          { word:'preference',   pt:'preferência',     pronunciation:'ˈprefərəns',       example:'Human preferences guide RLHF.' },
          { word:'Constitutional AI',pt:'IA Constitucional',pronunciation:'ˌkɒnstɪˈtjuːʃənl eɪˈaɪ',example:'Constitutional AI uses AI feedback.' },
        ],
        englishPhrases:[
          { en:'RLHF fine-tunes the model to align with human preferences.', pt:'RLHF ajusta finamente o modelo para alinhar com preferências humanas.' },
          { en:'DPO is simpler than PPO and achieves similar results.', pt:'DPO é mais simples que PPO e alcança resultados semelhantes.' },
          { en:'The reward model scores responses on helpfulness and harmlessness.', pt:'O modelo de recompensa pontua respostas em utilidade e inofensividade.' },
        ],
        exercises:[
          { id:'e1', question:'What is the key innovation of DPO over RLHF with PPO?', options:['DPO directly optimizes on preference pairs without a separate reward model and RL','DPO uses more human feedback','DPO only works on small models','DPO requires less training data'], answer:0, explanation:'RLHF needs a separate reward model + PPO (complex). DPO derives the optimal policy directly from preference pairs using a simple binary cross-entropy loss — no RL needed.' },
        ],
      },
    ],
  },
}

// ── Programação Trail ─────────────────────────────────────
export const PROGRAMACAO = {
  id: 'programacao',
  title: 'Programação',
  icon: '💻',
  color: '#10b981',
  description: 'Python avançado, engenharia de software e MLOps para profissionais de dados.',
  levels: {
    iniciante: [
      {
        id:'pr-i-01', title:'Git e Controle de Versão', duration:'45 min',
        source:'Prática profissional de desenvolvimento',
        description:'Git do zero ao GitHub workflow profissional.',
        topics:['Init, add, commit','Branches e merge','Pull requests','Resolução de conflitos','Git flow'],
        englishWords:[
          { word:'commit',      pt:'confirmar/salvar',pronunciation:'kəˈmɪt',      example:'Commit your changes with a clear message.' },
          { word:'branch',      pt:'ramo/ramificação', pronunciation:'bræntʃ',      example:'Create a feature branch.' },
          { word:'merge',       pt:'mesclar/unir',     pronunciation:'mɜːrdʒ',      example:'Merge the PR after code review.' },
          { word:'pull request', pt:'solicitação de mudança',pronunciation:'pʊl rɪˈkwest',example:'Open a pull request for review.' },
          { word:'repository',  pt:'repositório',      pronunciation:'rɪˈpɒzɪtɔːri',example:'Clone the repository locally.' },
        ],
        englishPhrases:[
          { en:"I'll open a pull request for review.", pt:'Vou abrir um pull request para revisão.' },
          { en:'There is a merge conflict in this file.', pt:'Há um conflito de merge neste arquivo.' },
          { en:"Let's create a feature branch for this task.", pt:'Vamos criar uma branch de feature para esta tarefa.' },
        ],
        exercises:[
          { id:'e1', question:'What does "git commit -m" do?', options:['Saves a snapshot of staged changes with a descriptive message','Pushes changes to GitHub','Creates a new branch','Merges two branches'], answer:0, explanation:'git commit saves your staged changes locally as a snapshot. The -m flag lets you write a message. The change is NOT pushed to GitHub until you run git push.' },
        ],
      },
      {
        id:'pr-i-02', title:'APIs REST e Requests', duration:'55 min',
        source:'Data Science from Scratch — Cap. 9',
        description:'Consumir APIs HTTP e coletar dados via Python.',
        topics:['HTTP e métodos REST','Biblioteca requests','Autenticação Bearer/OAuth','Paginação','Rate limiting'],
        englishWords:[
          { word:'API',         pt:'interface de programação',pronunciation:'eɪ piː aɪ',  example:'Use the REST API to fetch data.' },
          { word:'endpoint',    pt:'ponto de extremidade',pronunciation:'ˈendpɔɪnt',     example:'Call the /users endpoint.' },
          { word:'request',     pt:'requisição',       pronunciation:'rɪˈkwest',          example:'Send a GET request to the API.' },
          { word:'response',    pt:'resposta',         pronunciation:'rɪˈspɒns',          example:'Parse the JSON response.' },
          { word:'authentication',pt:'autenticação',  pronunciation:'ɔːˌθentɪˈkeɪʃən',  example:'Use Bearer token for authentication.' },
        ],
        englishPhrases:[
          { en:'The API returns a 401 — check your authentication token.', pt:'A API retorna 401 — verifique seu token de autenticação.' },
          { en:'We need to handle rate limiting in the request loop.', pt:'Precisamos lidar com rate limiting no loop de requisições.' },
          { en:'Parse the JSON response into a DataFrame.', pt:'Analise a resposta JSON em um DataFrame.' },
        ],
        exercises:[
          { id:'e1', question:'What HTTP status code indicates a successful request?', options:['200 OK','404 Not Found','500 Internal Server Error','401 Unauthorized'], answer:0, explanation:'2xx codes indicate success. 200 OK is the most common. 201 Created is for POST. 4xx = client errors. 5xx = server errors.' },
        ],
      },
      {
        id:'pr-i-03', title:'Docker para Data Scientists', duration:'60 min',
        source:'Prática profissional de MLOps',
        description:'Containerização de projetos de dados e ML.',
        topics:['O que é Docker e por que usar','Dockerfile','Imagens e containers','Docker Compose','Boas práticas'],
        englishWords:[
          { word:'container',   pt:'container/contêiner',pronunciation:'kənˈteɪnər',    example:'Run the app in a Docker container.' },
          { word:'image',       pt:'imagem',           pronunciation:'ˈɪmɪdʒ',           example:'Build the Docker image.' },
          { word:'Dockerfile',  pt:'Dockerfile',       pronunciation:'ˈdɒkərˌfaɪl',     example:'Define the environment in a Dockerfile.' },
          { word:'dependency',  pt:'dependência',      pronunciation:'dɪˈpendənsi',      example:'All dependencies are in requirements.txt.' },
          { word:'environment', pt:'ambiente',         pronunciation:'ɪnˈvaɪrənmənt',    example:'Containerize your environment.' },
        ],
        englishPhrases:[
          { en:'Build and tag the image with docker build -t myapp .', pt:'Build e marque a imagem com docker build -t myapp .' },
          { en:'The container runs in an isolated environment.', pt:'O container roda em um ambiente isolado.' },
          { en:'Mount the data volume to persist files.', pt:'Monte o volume de dados para persistir os arquivos.' },
        ],
        exercises:[
          { id:'e1', question:'What is the main benefit of using Docker in a data science project?', options:['Reproducible environments that work the same on any machine','Faster model training','Better visualizations','Automatic hyperparameter tuning'], answer:0, explanation:"Docker packages your code + dependencies + environment into a container. This solves 'it works on my machine' — any machine runs the same container identically." },
        ],
      },
    ],
    intermediario: [
      {
        id:'pr-m-01', title:'Python Avançado', duration:'75 min',
        source:'Data Science from Scratch — Cap. 2',
        description:'Decorators, generators, async e padrões avançados.',
        topics:['Decorators','Context managers','Generators e yield','Async/await','Type hints e mypy'],
        englishWords:[
          { word:'decorator',    pt:'decorador',       pronunciation:'ˈdekəreɪtər',     example:'Use @timer to measure execution time.' },
          { word:'generator',    pt:'gerador',         pronunciation:'ˈdʒenəreɪtər',    example:'Generators yield values lazily.' },
          { word:'asynchronous', pt:'assíncrono',      pronunciation:'eɪˈsɪŋkrənəs',   example:'Async code does not block execution.' },
          { word:'type hint',    pt:'dica de tipo',    pronunciation:'taɪp hɪnt',        example:'Add type hints for better IDE support.' },
          { word:'context manager',pt:'gerenciador de contexto',pronunciation:'ˈkɒntekst ˈmænɪdʒər',example:'Use with statement for file handling.' },
        ],
        englishPhrases:[
          { en:'This decorator adds caching to the function.', pt:'Este decorador adiciona cache à função.' },
          { en:'Use async/await to handle concurrent API calls.', pt:'Use async/await para lidar com chamadas de API concorrentes.' },
          { en:'Type hints make the codebase much easier to maintain.', pt:'Dicas de tipo tornam a base de código muito mais fácil de manter.' },
        ],
        exercises:[
          { id:'e1', question:'What is a Python decorator?', options:['A function that wraps another function to add behavior without modifying its code','A way to add comments to functions','A class inheritance pattern','A type of generator'], answer:0, explanation:'Decorators use @syntax. Example: @functools.lru_cache adds memoization. @login_required adds auth checks. They wrap a function, extending behavior without changing the original code.' },
        ],
      },
      {
        id:'pr-m-02', title:'MLOps e Deploy de Modelos', duration:'80 min',
        source:'Prática profissional de MLOps',
        description:'Servir modelos de ML em produção com FastAPI e monitoramento.',
        topics:['FastAPI para model serving','Monitoramento de drift','Feature stores','Pipelines MLflow','A/B testing de modelos'],
        englishWords:[
          { word:'deployment',   pt:'implantação',     pronunciation:'dɪˈplɔɪmənt',    example:'Deploy the model to production.' },
          { word:'inference',    pt:'inferência',      pronunciation:'ˈɪnfərəns',       example:'Inference latency must be under 100ms.' },
          { word:'drift',        pt:'deriva',          pronunciation:'drɪft',            example:'Monitor for data drift in production.' },
          { word:'latency',      pt:'latência',        pronunciation:'ˈleɪtənsi',        example:'Reduce inference latency with caching.' },
          { word:'throughput',   pt:'taxa de transferência',pronunciation:'ˈθruːpʊt',   example:'Maximize throughput with batching.' },
        ],
        englishPhrases:[
          { en:'The model is in production and serving 1,000 requests/second.', pt:'O modelo está em produção e atendendo 1.000 requisições/segundo.' },
          { en:'We detected data drift — retrain the model.', pt:'Detectamos deriva de dados — retreine o modelo.' },
          { en:'Use FastAPI to expose the model as a REST endpoint.', pt:'Use FastAPI para expor o modelo como um endpoint REST.' },
        ],
        exercises:[
          { id:'e1', question:'What is model drift?', options:['Degradation in model performance over time due to changes in input data distribution','A bug in the model code','The model learning incorrect patterns','Overfitting in production'], answer:0, explanation:'Data drift: input feature distributions change (e.g., user behavior shifts). Concept drift: the relationship between features and target changes. Both degrade model performance over time.' },
        ],
      },
    ],
    avancado: [
      {
        id:'pr-a-01', title:'System Design para ML', duration:'90 min',
        source:'Prática profissional de engenharia de ML',
        description:'Arquitetura de sistemas de ML em larga escala.',
        topics:['Feature stores','Streaming vs batch','Distributed training','Model registries','CI/CD para ML'],
        englishWords:[
          { word:'scalability',  pt:'escalabilidade',  pronunciation:'ˌskeɪləˈbɪlɪti',  example:'Design for scalability from day one.' },
          { word:'fault tolerance',pt:'tolerância a falhas',pronunciation:'fɔːlt ˈtɒlərəns',example:'Build fault-tolerant pipelines.' },
          { word:'throughput',   pt:'taxa de processamento',pronunciation:'ˈθruːpʊt',    example:'Increase throughput with parallelism.' },
          { word:'bottleneck',   pt:'gargalo',         pronunciation:'ˈbɒtəlnek',        example:'The feature store is the bottleneck.' },
          { word:'orchestration',pt:'orquestração',    pronunciation:'ˌɔːrkɪˈstreɪʃən', example:'Use Airflow for pipeline orchestration.' },
        ],
        englishPhrases:[
          { en:"Let's identify the bottleneck in the pipeline first.", pt:'Vamos identificar o gargalo no pipeline primeiro.' },
          { en:'The system needs to scale to 10,000 requests per second.', pt:'O sistema precisa escalar para 10.000 requisições por segundo.' },
          { en:'Decouple the feature computation from model serving.', pt:'Desacople a computação de features do serviço de modelo.' },
        ],
        exercises:[
          { id:'e1', question:'What is the purpose of a feature store in ML systems?', options:['Centralize feature computation and storage for consistency between training and serving','Store model weights','Cache API responses','Log model predictions'], answer:0, explanation:'Feature stores solve training-serving skew: they compute features once, store them, and serve the same features consistently at training time and inference time.' },
        ],
      },
    ],
  },
}

export const ALL_TRAILS = [DATA_SCIENCE, GENAI, PROGRAMACAO, ESTATISTICA]
