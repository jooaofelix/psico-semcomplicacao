/*
  CONTEÚDO DO SITE
  ================
  Este é o único arquivo que você precisa editar para adicionar resumos.

  Como publicar um resumo:
    1. Coloque o PDF na pasta "pdfs/" (ex.: pdfs/etica/codigo-de-etica.pdf).
    2. Ache o tema na lista abaixo e preencha o campo "pdf" com o caminho do arquivo:
         { titulo: 'Código de Ética do Psicólogo', pdf: 'pdfs/etica/codigo-de-etica.pdf' },
    3. Pronto. Temas com "pdf" vazio aparecem no site como "em breve".

  Para criar um tema novo, copie uma linha { titulo: '...', pdf: '' } dentro da matéria.
  Para criar uma matéria nova, copie um bloco inteiro de matéria e troque o "id" (sem espaços nem acentos).
*/

const FASES = [
  {
    id: 'comeco',
    nome: 'Começo do curso',
    descricao: 'As bases que aparecem nos primeiros semestres.',
  },
  {
    id: 'meio',
    nome: 'Meio do curso',
    descricao: 'Abordagens, psicopatologia e avaliação psicológica.',
  },
  {
    id: 'final',
    nome: 'Reta final',
    descricao: 'Ética, políticas públicas e as áreas onde o psicólogo trabalha.',
  },
];

const MATERIAS = [
  // ---------- COMEÇO DO CURSO ----------
  {
    id: 'historia',
    fase: 'comeco',
    nome: 'História da Psicologia',
    descricao: 'De onde a psicologia veio e como virou ciência e profissão.',
    topicos: [
      { titulo: 'Da filosofia à ciência: as origens da psicologia', pdf: '' },
      { titulo: 'Wundt e o primeiro laboratório de psicologia', pdf: '' },
      { titulo: 'Estruturalismo e funcionalismo', pdf: '' },
      { titulo: 'As grandes escolas: behaviorismo, Gestalt e psicanálise', pdf: '' },
      { titulo: 'A psicologia no Brasil e a regulamentação da profissão', pdf: '' },
    ],
  },
  {
    id: 'processos-basicos',
    fase: 'comeco',
    nome: 'Processos Psicológicos Básicos',
    descricao: 'Como a gente percebe, presta atenção, lembra, pensa e sente.',
    topicos: [
      { titulo: 'Sensação e percepção', pdf: 'pdfs/processos-basicos/sensacao-e-percepcao.pdf' },
      { titulo: 'Atenção', pdf: 'pdfs/processos-basicos/atencao.pdf' },
      { titulo: 'Memória', pdf: 'pdfs/processos-basicos/memoria.pdf' },
      { titulo: 'Linguagem e pensamento', pdf: 'pdfs/processos-basicos/linguagem-e-pensamento.pdf' },
      { titulo: 'Emoção e motivação', pdf: 'pdfs/processos-basicos/emocao-e-motivacao.pdf' },
    ],
  },
  {
    id: 'bases-biologicas',
    fase: 'comeco',
    nome: 'Bases Biológicas do Comportamento',
    descricao: 'O cérebro e o sistema nervoso por trás do comportamento.',
    topicos: [
      { titulo: 'Neurônio e sinapse', pdf: '' },
      { titulo: 'Neurotransmissores', pdf: '' },
      { titulo: 'Sistema nervoso central e periférico', pdf: '' },
      { titulo: 'Lobos cerebrais e suas funções', pdf: '' },
      { titulo: 'Sistema límbico e emoções', pdf: '' },
    ],
  },
  {
    id: 'desenvolvimento',
    fase: 'comeco',
    nome: 'Psicologia do Desenvolvimento',
    descricao: 'Como a pessoa muda da infância até o envelhecimento.',
    topicos: [
      { titulo: 'Piaget: os estágios do desenvolvimento cognitivo', pdf: '' },
      { titulo: 'Vygotsky: mediação e zona de desenvolvimento proximal', pdf: '' },
      { titulo: 'Erikson: os estágios psicossociais', pdf: '' },
      { titulo: 'Freud: as fases do desenvolvimento psicossexual', pdf: '' },
      { titulo: 'Teoria do apego: Bowlby e Ainsworth', pdf: '' },
      { titulo: 'Adolescência, vida adulta e envelhecimento', pdf: '' },
    ],
  },
  {
    id: 'social',
    fase: 'comeco',
    nome: 'Psicologia Social',
    descricao: 'Como os grupos e a sociedade influenciam quem somos.',
    topicos: [
      { titulo: 'Percepção e cognição social', pdf: '' },
      { titulo: 'Atitudes, estereótipos e preconceito', pdf: '' },
      { titulo: 'Conformidade e obediência: Asch e Milgram', pdf: '' },
      { titulo: 'Grupos e fenômenos grupais', pdf: '' },
      { titulo: 'Identidade e socialização', pdf: '' },
      { titulo: 'Psicologia social crítica no Brasil', pdf: '' },
    ],
  },
  {
    id: 'pesquisa',
    fase: 'comeco',
    nome: 'Métodos de Pesquisa e Estatística',
    descricao: 'Como a psicologia produz conhecimento e lê os dados.',
    topicos: [
      { titulo: 'O método científico na psicologia', pdf: '' },
      { titulo: 'Pesquisa quantitativa e qualitativa', pdf: '' },
      { titulo: 'Tipos de estudo: experimental, correlacional e estudo de caso', pdf: '' },
      { titulo: 'Estatística descritiva: média, mediana e desvio padrão', pdf: '' },
      { titulo: 'Ética em pesquisa com seres humanos', pdf: '' },
    ],
  },

  // ---------- MEIO DO CURSO ----------
  {
    id: 'comportamento',
    fase: 'meio',
    nome: 'Análise do Comportamento',
    descricao: 'Behaviorismo, condicionamento e análise funcional.',
    topicos: [
      { titulo: 'Behaviorismo metodológico e radical', pdf: '' },
      { titulo: 'Condicionamento respondente: Pavlov', pdf: '' },
      { titulo: 'Condicionamento operante: Skinner', pdf: '' },
      { titulo: 'Reforço, punição e extinção', pdf: '' },
      { titulo: 'Esquemas de reforçamento', pdf: '' },
      { titulo: 'Análise funcional do comportamento', pdf: '' },
    ],
  },
  {
    id: 'psicanalise',
    fase: 'meio',
    nome: 'Psicanálise',
    descricao: 'Freud, o inconsciente e quem veio depois dele.',
    topicos: [
      { titulo: 'O inconsciente e as tópicas de Freud', pdf: '' },
      { titulo: 'Id, ego e superego', pdf: '' },
      { titulo: 'Mecanismos de defesa', pdf: '' },
      { titulo: 'Pulsão, recalque e sintoma', pdf: '' },
      { titulo: 'Transferência e contratransferência', pdf: '' },
      { titulo: 'Depois de Freud: Klein, Winnicott e Lacan', pdf: '' },
    ],
  },
  {
    id: 'humanismo',
    fase: 'meio',
    nome: 'Humanismo, Fenomenologia e Gestalt',
    descricao: 'Abordagens que colocam a experiência da pessoa no centro.',
    topicos: [
      { titulo: 'Fenomenologia e existencialismo na psicologia', pdf: '' },
      { titulo: 'Carl Rogers e a abordagem centrada na pessoa', pdf: '' },
      { titulo: 'Maslow e a hierarquia de necessidades', pdf: '' },
      { titulo: 'Gestalt-terapia: Fritz Perls', pdf: '' },
    ],
  },
  {
    id: 'tcc',
    fase: 'meio',
    nome: 'Terapia Cognitivo-Comportamental',
    descricao: 'Pensamentos, crenças e como eles afetam o que sentimos.',
    topicos: [
      { titulo: 'O modelo cognitivo de Beck', pdf: '' },
      { titulo: 'Pensamentos automáticos e crenças', pdf: '' },
      { titulo: 'Distorções cognitivas', pdf: '' },
      { titulo: 'Conceitualização de caso', pdf: '' },
      { titulo: 'Terapias de terceira onda: ACT, DBT e mindfulness', pdf: '' },
    ],
  },
  {
    id: 'personalidade',
    fase: 'meio',
    nome: 'Teorias da Personalidade',
    descricao: 'O que faz cada pessoa ser do jeito que é.',
    topicos: [
      { titulo: 'O que é personalidade', pdf: '' },
      { titulo: 'Teoria dos traços e o Big Five', pdf: '' },
      { titulo: 'Jung: tipos psicológicos e arquétipos', pdf: '' },
      { titulo: 'Adler e a psicologia individual', pdf: '' },
    ],
  },
  {
    id: 'psicopatologia',
    fase: 'meio',
    nome: 'Psicopatologia',
    descricao: 'Sofrimento psíquico, funções psíquicas e os principais transtornos.',
    topicos: [
      { titulo: 'Normal e patológico', pdf: '' },
      { titulo: 'Funções psíquicas e exame do estado mental', pdf: '' },
      { titulo: 'DSM-5-TR e CID-11', pdf: '' },
      { titulo: 'Transtornos de ansiedade', pdf: '' },
      { titulo: 'Transtornos do humor: depressão e bipolaridade', pdf: '' },
      { titulo: 'Esquizofrenia e transtornos psicóticos', pdf: '' },
      { titulo: 'Transtornos de personalidade', pdf: '' },
      { titulo: 'TDAH e autismo (TEA)', pdf: '' },
    ],
  },
  {
    id: 'avaliacao',
    fase: 'meio',
    nome: 'Avaliação Psicológica',
    descricao: 'Testes, psicometria, psicodiagnóstico e documentos.',
    topicos: [
      { titulo: 'O que é avaliação psicológica', pdf: '' },
      { titulo: 'Psicometria: validade, precisão e normas', pdf: '' },
      { titulo: 'SATEPSI e o uso de testes', pdf: '' },
      { titulo: 'Entrevista e observação', pdf: '' },
      { titulo: 'Psicodiagnóstico', pdf: '' },
      { titulo: 'Documentos psicológicos: laudo, relatório, parecer e atestado', pdf: '' },
    ],
  },
  {
    id: 'neuropsicologia',
    fase: 'meio',
    nome: 'Neuropsicologia',
    descricao: 'A relação entre o cérebro e as funções mentais.',
    topicos: [
      { titulo: 'Funções executivas', pdf: '' },
      { titulo: 'Avaliação neuropsicológica', pdf: '' },
      { titulo: 'Memória e suas alterações', pdf: '' },
      { titulo: 'Reabilitação neuropsicológica', pdf: '' },
    ],
  },

  // ---------- RETA FINAL ----------
  {
    id: 'etica',
    fase: 'final',
    nome: 'Ética Profissional',
    descricao: 'Código de Ética, sigilo e o que o psicólogo pode e não pode fazer.',
    topicos: [
      { titulo: 'Código de Ética Profissional do Psicólogo', pdf: '' },
      { titulo: 'Princípios fundamentais', pdf: '' },
      { titulo: 'Sigilo profissional e quando ele pode ser quebrado', pdf: '' },
      { titulo: 'Deveres e proibições', pdf: '' },
      { titulo: 'Conselhos de Psicologia: CFP e CRPs', pdf: '' },
      { titulo: 'Atendimento psicológico online', pdf: '' },
    ],
  },
  {
    id: 'saude-mental',
    fase: 'final',
    nome: 'Saúde Mental e Políticas Públicas',
    descricao: 'Reforma psiquiátrica, SUS, SUAS e a rede de atenção psicossocial.',
    topicos: [
      { titulo: 'Reforma psiquiátrica e luta antimanicomial', pdf: '' },
      { titulo: 'Lei 10.216/2001', pdf: '' },
      { titulo: 'RAPS e os tipos de CAPS', pdf: '' },
      { titulo: 'SUS: princípios e atenção básica', pdf: '' },
      { titulo: 'SUAS: CRAS e CREAS', pdf: '' },
    ],
  },
  {
    id: 'escolar',
    fase: 'final',
    nome: 'Psicologia Escolar e Educacional',
    descricao: 'O psicólogo na escola e os processos de ensino e aprendizagem.',
    topicos: [
      { titulo: 'Psicologia escolar crítica', pdf: '' },
      { titulo: 'Queixa escolar e medicalização da educação', pdf: '' },
      { titulo: 'Dificuldades e transtornos de aprendizagem', pdf: '' },
      { titulo: 'Inclusão escolar', pdf: '' },
      { titulo: 'O psicólogo na educação básica', pdf: '' },
    ],
  },
  {
    id: 'trabalho',
    fase: 'final',
    nome: 'Psicologia Organizacional e do Trabalho',
    descricao: 'Pessoas, empresas e saúde no trabalho.',
    topicos: [
      { titulo: 'Recrutamento e seleção', pdf: '' },
      { titulo: 'Treinamento e desenvolvimento', pdf: '' },
      { titulo: 'Clima e cultura organizacional', pdf: '' },
      { titulo: 'Saúde mental no trabalho e burnout', pdf: '' },
      { titulo: 'Liderança e motivação', pdf: '' },
    ],
  },
  {
    id: 'saude',
    fase: 'final',
    nome: 'Psicologia da Saúde e Hospitalar',
    descricao: 'O cuidado psicológico em hospitais e serviços de saúde.',
    topicos: [
      { titulo: 'Psicologia da saúde e o modelo biopsicossocial', pdf: '' },
      { titulo: 'Psicologia hospitalar', pdf: '' },
      { titulo: 'Luto e cuidados paliativos', pdf: '' },
      { titulo: 'Adesão ao tratamento', pdf: '' },
    ],
  },
  {
    id: 'juridica',
    fase: 'final',
    nome: 'Psicologia Jurídica',
    descricao: 'A psicologia no sistema de justiça.',
    topicos: [
      { titulo: 'Campos de atuação da psicologia jurídica', pdf: '' },
      { titulo: 'Perícia psicológica', pdf: '' },
      { titulo: 'Violência doméstica e familiar', pdf: '' },
      { titulo: 'ECA: Estatuto da Criança e do Adolescente', pdf: '' },
      { titulo: 'Guarda e conflitos familiares', pdf: '' },
    ],
  },
];

// Atalhos que aparecem embaixo da busca, na página inicial (use o "id" da matéria).
const MAIS_PROCURADAS = ['etica', 'psicopatologia', 'avaliacao', 'desenvolvimento', 'psicanalise'];

/*
  VÍDEOS
  Para cada vídeo, preencha UM destes:
    youtube: só o código do vídeo (em youtube.com/watch?v=ABC123 o código é ABC123).
             A capa aparece sozinha.
    link + capa: para Reels ou outro site. "capa" é uma imagem na pasta img/ (ex.: 'img/videos/etica.jpg').
  Vídeo sem link aparece como "em breve".
*/
const VIDEOS = [
  { titulo: 'Código de Ética em 10 minutos', materia: 'etica', youtube: '', link: '', capa: '' },
  { titulo: 'Piaget sem decoreba', materia: 'desenvolvimento', youtube: '', link: '', capa: '' },
  { titulo: 'Mecanismos de defesa no dia a dia', materia: 'psicanalise', youtube: '', link: '', capa: '' },
  { titulo: 'Como funciona a RAPS', materia: 'saude-mental', youtube: '', link: '', capa: '' },
];
