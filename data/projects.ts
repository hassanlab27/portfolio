export type ProjectCategory =
  | 'AI PRODUCT'
  | 'AI / DATA SYSTEM'
  | 'COMPUTER VISION'
  | 'AUTOMATION / UTILITY'
  | 'AUTOMATION'
  | 'NLP / RAG'
  | 'NLP'
  | 'COMPUTER VISION / ML'
  | 'MACHINE LEARNING'

export type ArchiveFilterCategory =
  | 'ALL'
  | 'AI PRODUCTS'
  | 'AI / DATA'
  | 'COMPUTER VISION'
  | 'NLP / RAG'
  | 'MACHINE LEARNING'
  | 'AUTOMATION'

export type ProjectTier = 'featured' | 'engineering' | 'experiment'

export interface Project {
  slug:             string
  id:               string          // kept as alias to slug for backwards compatibility
  number:           string
  title:            string
  category:         string
  tags:             string[]
  date:             string
  shortDescription: string
  overview:         string
  idea?:            string
  workflow:         string[]        // ordered steps like ["USER", "ROADMAP", ...]
  features:         string[]
  technologies:     string[]
  engineeringNotes: string
  visualType:       string          // key used to render the right canvas visual
  github?:          string
  liveDemo?:        string
  featured:         boolean         // true for ORVIX and AUTODATABOT only
  tier?:            ProjectTier
}

export const projects: Project[] = [
  // ── 01 ─────────────────────────────────────────────────────────────────
  {
    slug:     'orvix',
    id:       'orvix',
    number:   '01',
    title:    'ORVIX',
    date:     'DEC 2025 — APR 2026',
    category: 'AI PRODUCT',
    featured: true,
    tags:     ['AI PRODUCT', 'ADAPTIVE LEARNING', 'CAREER DEVELOPMENT', 'FULL-STACK AI'],
    shortDescription:
      'An AI-powered adaptive learning and career upskilling platform that creates personalized learning roadmaps, structures progress through phases, and evaluates knowledge through phase-based testing.',
    overview:
      'Orvix is a full-stack adaptive learning application designed to help users build structured career development paths through AI-generated roadmaps, phased learning modules, and intelligent knowledge assessment.',
    idea:
      'Generic learning platforms deliver the same static content to every learner regardless of background, pace, or goals. Orvix solves this by using AI to adaptively personalize every stage — from initial roadmap generation to phase-by-phase evaluation and scoring.',
    workflow:  ['USER', 'ROADMAP', 'LEARNING', 'TESTING', 'SCORING'],
    features: [
      'User authentication and account profile creation',
      'Personalized career roadmap generation',
      'Structured phase-based learning modules',
      'Phase-based knowledge testing and verification',
      'Dynamic scoring and assessment system',
      'Continuous progress tracking across learning phases',
    ],
    technologies:     ['Next.js', 'Gemini', 'Mistral 7B', 'GPT'],
    engineeringNotes:
      'Orvix integrates multiple LLM providers to power roadmap generation, phase content curation, and adaptive assessment workflows. The frontend is built with Next.js and React server components for fast page rendering. The core engineering challenge was maintaining coherent roadmap context across user sessions while keeping LLM response quality consistent across multiple model providers.',
    visualType: 'orvix',
    github:    undefined,
    liveDemo:  undefined,
  },

  // ── 02 ─────────────────────────────────────────────────────────────────
  {
    slug:     'autodatabot',
    id:       'autodatabot',
    number:   '02',
    title:    'AUTODATABOT',
    date:     'AUG 2025 — SEP 2025',
    category: 'AI / DATA SYSTEM',
    featured: true,
    tags:     ['AUTOMATED DATA ANALYSIS', 'AUTOML', 'DATA CLEANING', 'MACHINE LEARNING', 'AI'],
    shortDescription:
      'An end-to-end automated data-analysis and machine-learning platform that accepts raw datasets, executes automated cleaning and quality analysis, trains machine-learning models, and generates comprehensive analysis summaries.',
    overview:
      'AutoDataBot automates the entire data science pipeline from raw CSV ingestion through to model training and report generation — removing manual preprocessing, model selection, and evaluation overhead.',
    idea:
      'Data scientists spend the majority of project time on repetitive, low-value tasks: cleaning data, selecting models, and writing evaluation reports. AutoDataBot automates this entire pipeline to let practitioners focus on interpretation and high-level decision-making.',
    workflow:  ['DATASET', 'CLEAN', 'ANALYZE', 'TRAIN', 'EVALUATE', 'OUTPUT'],
    features: [
      'Dataset upload and ingestion',
      'Automated data cleaning and imputation pipeline',
      'Data quality evaluation and exploratory reporting',
      'Machine learning model training workflow',
      'Multi-framework AutoML engine',
      'Model evaluation and metric scoring',
      'Cleaned dataset export',
      'Trained model persistence and export',
      'Automated analysis summary generation',
    ],
    technologies:     ['Python', 'FastAPI', 'Pandas', 'Scikit-learn', 'AutoGluon', 'FLAML', 'LightGBM', 'XGBoost', 'CatBoost', 'SHAP', 'SQLite'],
    engineeringNotes:
      'AutoDataBot orchestrates multiple AutoML frameworks (AutoGluon, FLAML) with a unified evaluation interface. SHAP values are computed post-training for model explainability. FastAPI serves the pipeline as a REST interface, and SQLite tracks experiment runs. The core challenge was designing a flexible preprocessing pipeline that handles heterogeneous CSV schemas without manual intervention.',
    visualType: 'autodatabot',
    github:    undefined,
    liveDemo:  undefined,
  },

  // ── 03 ─────────────────────────────────────────────────────────────────
  {
    slug:     'open-cv-dashboard',
    id:       'open-cv-dashboard',
    number:   '03',
    title:    'OPEN CV DASHBOARD',
    date:     'OCT 2025',
    category: 'COMPUTER VISION',
    featured: false,
    tags:     ['COMPUTER VISION', 'OPENCV', 'OBJECT DETECTION', 'FACE DETECTION'],
    shortDescription:
      'A three-in-one computer vision dashboard combining face detection, animal herd detection, and universal object detection with counting in a unified interface.',
    overview:
      'A multi-mode computer vision application that consolidates three detection capabilities — face detection, animal herd detection, and universal object detection with counting — into a single interactive dashboard.',
    idea:
      'Build a practical computer vision interface that demonstrates multiple detection modes in a single, unified application rather than three separate isolated tools.',
    workflow:  ['IMAGE', 'DETECTION', 'OBJECTS', 'COUNT'],
    features: [
      '3-in-1 unified computer vision platform',
      'YOLOv8 universal object detection with live item counting',
      'Animal herd tracking and live monitoring module',
      'Dlib facial analysis and landmark detection',
      'Unified mode-switching dashboard interface',
    ],
    technologies:     ['Python', 'Flask', 'OpenCV', 'YOLOv8', 'Dlib'],
    engineeringNotes:
      'Each detection module operates as an independent processing pipeline within the Flask backend. YOLOv8 handles high-throughput object detection and counting, Dlib performs facial landmark analysis, and OpenCV provides frame capture and geometric preprocessing.',
    visualType: 'open-cv-dashboard',
    github:    undefined,
    liveDemo:  undefined,
  },

  // ── 04 ─────────────────────────────────────────────────────────────────
  {
    slug:     'ai-utility-dashboard',
    id:       'ai-utility-dashboard',
    number:   '04',
    title:    'AI UTILITY DASHBOARD',
    date:     'NOV 2025',
    category: 'AUTOMATION / UTILITY',
    featured: false,
    tags:     ['AI UTILITY', 'API INTEGRATION', 'WEB APPLICATION', 'AUTOMATION'],
    shortDescription:
      'A multi-utility information dashboard aggregating daily news, live weather conditions, NASA imagery, vehicle data, and everyday utilities into a single responsive interface.',
    overview:
      'A web application that aggregates data from multiple public APIs into a unified utility dashboard, providing daily news, weather conditions, NASA\'s picture of the day, car information, and jokes in one interface.',
    idea:
      'Build a practical full-stack web application that integrates multiple third-party APIs and presents disparate information streams in a clean, usable dashboard format.',
    workflow:  ['WEATHER', 'NEWS', 'NASA', 'CAR', 'JOKES'],
    features: [
      'Live weather data and forecasts',
      'Daily news headlines and categorization',
      'NASA picture of the day integration',
      'Car specification information lookup',
      'Interactive joke generator',
    ],
    technologies:     ['JavaScript', 'React', 'REST APIs'],
    engineeringNotes:
      'Each utility module connects to a separate public REST API. State management handles loading, error, and data states independently per module so that an issue with one provider never blocks the rest of the dashboard.',
    visualType: 'ai-utility-dashboard',
    github:    undefined,
    liveDemo:  undefined,
  },

  // ── 05 ─────────────────────────────────────────────────────────────────
  {
    slug:     'email-scraper',
    id:       'email-scraper',
    number:   '05',
    title:    'EMAIL SCRAPER',
    date:     'DEC 2025',
    category: 'AUTOMATION',
    featured: false,
    tags:     ['WEB SCRAPING', 'AUTOMATION', 'DATA EXTRACTION'],
    shortDescription:
      'A public email extraction and Excel export tool that automatically discovers publicly available contact emails across websites and formats structured outputs.',
    overview:
      'An automated extraction tool that crawls specified websites, identifies publicly listed email addresses, deduplicates entries, and organizes the collected results into a structured Excel export.',
    idea:
      'Build a practical web automation tool that handles the repetitive task of manually collecting publicly available contact information from web domains.',
    workflow:  ['WEBSITE', 'EXTRACTION', 'ORGANIZATION', 'EXCEL'],
    features: [
      'Target website URL ingestion',
      'Public email pattern extraction via regex',
      'Automated deduplication and normalization',
      'Structured contact organization',
      'Formatted Excel (.xlsx) file export',
    ],
    technologies:     ['Python', 'BeautifulSoup', 'Requests'],
    engineeringNotes:
      'The scraper uses BeautifulSoup to parse HTML and extract email patterns via regular expressions. Only publicly visible email addresses on target pages are parsed. Results are deduplicated before serialization into Excel format.',
    visualType: 'email-scraper',
    github:    undefined,
    liveDemo:  undefined,
  },

  // ── 06 ─────────────────────────────────────────────────────────────────
  {
    slug:     'rag-bot',
    id:       'rag-bot',
    number:   '06',
    title:    'RAG BOT',
    date:     'JAN 2026',
    category: 'NLP / RAG',
    featured: false,
    tags:     ['RAG', 'NLP', 'SEMANTIC SEARCH', 'VECTOR DATABASE', 'QUESTION ANSWERING'],
    shortDescription:
      'Semantic retrieval and question-answering systems using vector embeddings and similarity search to answer contextual queries grounded in document corpora.',
    overview:
      'RAG Bot explores multiple specialized retrieval-augmented generation workflows, each designed to retrieve contextually relevant information from document collections and generate accurate responses using modern NLP techniques.',
    idea:
      'Investigate and implement Retrieval-Augmented Generation as a practical architecture for domain-specific question-answering systems that ground responses in verified document content rather than relying on model memory alone.',
    workflow:  ['DOCUMENTS', 'EMBEDDINGS', 'VECTOR SEARCH', 'RETRIEVAL', 'ANSWER'],
    features: [
      'Document ingestion and chunking pipeline',
      'Semantic embedding generation',
      'Vector similarity search with Qdrant',
      'Context retrieval and ranking pipeline',
      'Response generation grounded in retrieved context',
      'Specialized QA configurations for custom corpora',
    ],
    technologies:     ['Python', 'LangChain', 'Qdrant'],
    engineeringNotes:
      'Documents are chunked and embedded into a Qdrant vector store. At query time, semantic similarity search retrieves the most relevant chunks, which are passed as grounded context for response generation via LangChain orchestration.',
    visualType: 'rag-bot',
    github:    undefined,
    liveDemo:  undefined,
  },

  // ── 07 ─────────────────────────────────────────────────────────────────
  {
    slug:     'nlp-chatbot',
    id:       'nlp-chatbot',
    number:   '07',
    title:    'NLP CHATBOT',
    date:     'FEB 2026',
    category: 'NLP',
    featured: false,
    tags:     ['NLP', 'CHATBOT', 'NATURAL LANGUAGE PROCESSING'],
    shortDescription:
      'An NLP chatbot using structured JSON data as its knowledge source, parsing conversational user queries and returning relevant context through a responsive web interface.',
    overview:
      'A conversational chatbot that uses NLP processing to understand user queries, match them against a structured JSON knowledge base, and return relevant responses through a clean web interface.',
    idea:
      'Build a functional chatbot without relying on large language models — using NLP text processing and structured data as a lightweight, fully controllable knowledge source.',
    workflow:  ['JSON', 'NLP', 'RESPONSE'],
    features: [
      'Structured JSON-based knowledge store',
      'NLP text tokenization and intent matching',
      'Deterministic question-answering pipeline',
      'Conversational web UI with chat history',
      'Lightweight and responsive architecture',
    ],
    technologies:     ['Python', 'Flask', 'JavaScript'],
    engineeringNotes:
      'User input is tokenized and similarity-matched against key patterns in the structured JSON knowledge base. Flask exposes the intent-matching logic as a REST endpoint, paired with a lightweight web frontend.',
    visualType: 'nlp-chatbot',
    github:    undefined,
    liveDemo:  undefined,
  },

  // ── 08 ─────────────────────────────────────────────────────────────────
  {
    slug:     'skin-cancer-prediction',
    id:       'skin-cancer-prediction',
    number:   '08',
    title:    'SKIN CANCER PREDICTION',
    date:     'MAR 2026',
    category: 'COMPUTER VISION / ML',
    featured: false,
    tags:     ['COMPUTER VISION', 'CNN', 'DEEP LEARNING', 'IMAGE CLASSIFICATION'],
    shortDescription:
      'A CNN-based image classification project exploring deep learning convolutional architectures for classifying skin image datasets.',
    overview:
      'A computer-vision image classification project applying convolutional neural networks to classify benchmark skin image datasets. This project is an engineering and machine learning experiment — not a medical diagnostic tool.',
    idea:
      'Apply CNN-based image classification to an image dataset as a practical deep learning study in image preprocessing, convolutional architecture design, training, and test set evaluation.',
    workflow:  ['IMAGE', 'PREPROCESSING', 'CNN', 'CLASSIFICATION'],
    features: [
      'Image input and normalization pipeline',
      'Convolutional neural network architecture',
      'Training and validation workflow',
      'Multi-class classification output',
      'Model evaluation on benchmark test data',
    ],
    technologies:     ['Python', 'TensorFlow', 'Keras'],
    engineeringNotes:
      'The pipeline applies image resizing, normalization, and standard augmentation prior to training. A CNN architecture is trained and evaluated on the classification task. Note: this is an academic computer-vision image classification experiment and not a medical diagnostic tool.',
    visualType: 'skin-cancer-prediction',
    github:    undefined,
    liveDemo:  undefined,
  },

  // ── 09 ─────────────────────────────────────────────────────────────────
  {
    slug:     'house-titanic-prediction',
    id:       'house-titanic-prediction',
    number:   '09',
    title:    'HOUSE / TITANIC PREDICTION',
    date:     'APR 2026',
    category: 'MACHINE LEARNING',
    featured: false,
    tags:     ['MACHINE LEARNING', 'REGRESSION', 'CLASSIFICATION', 'FEATURE ENGINEERING'],
    shortDescription:
      'Machine-learning prediction experiments using feature engineering and model evaluation across benchmark regression and classification datasets.',
    overview:
      'A machine-learning experimentation project covering predictive modeling on the House Prices (regression) and Titanic (classification) benchmark datasets, implementing end-to-end data cleaning, feature engineering, and cross-validated evaluation.',
    idea:
      'Use classic benchmark datasets to implement and compare standard ML approaches end-to-end, evaluating how feature engineering directly impacts model performance.',
    workflow:  ['DATA', 'FEATURES', 'MODEL', 'PREDICTION', 'EVALUATION'],
    features: [
      'Data preprocessing and missing-value imputation',
      'Categorical encoding and feature scaling',
      'Regression modeling on House Prices dataset',
      'Binary classification modeling on Titanic dataset',
      'Model training and cross-validation',
      'Evaluation metrics and error inspection',
    ],
    technologies:     ['Python', 'Pandas', 'Scikit-learn'],
    engineeringNotes:
      'Both datasets are processed through standard preprocessing pipelines tailored to regression and classification tasks respectively. Models are evaluated using cross-validation and standard evaluation metrics.',
    visualType: 'house-titanic-prediction',
    github:    undefined,
    liveDemo:  undefined,
  },
]

// ── Helper: filter projects by category ─────────────────────────────────────
export function filterProjects(
  all:      Project[],
  category: ArchiveFilterCategory | string
): Project[] {
  if (category === 'ALL') return all
  if (category === 'AI PRODUCTS') {
    return all.filter((p) => p.category.includes('AI PRODUCT'))
  }
  if (category === 'AI / DATA') {
    return all.filter((p) => p.category.includes('AI / DATA'))
  }
  if (category === 'COMPUTER VISION') {
    return all.filter((p) => p.category.includes('COMPUTER VISION'))
  }
  if (category === 'NLP / RAG') {
    return all.filter((p) => p.category.includes('NLP'))
  }
  if (category === 'MACHINE LEARNING') {
    return all.filter((p) => p.category.includes('MACHINE LEARNING') || p.category.includes('ML'))
  }
  if (category === 'AUTOMATION') {
    return all.filter((p) => p.category.includes('AUTOMATION'))
  }
  return all.filter((p) => p.category.toLowerCase().includes(category.toLowerCase()))
}

// ── Helper: get by slug or id ──────────────────────────────────────────────
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug || p.id === slug)
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.slug === id || p.id === id)
}
