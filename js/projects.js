/* ==========================================================================
   NITHESH.DEV — PROJECTS CATALOG & SPECIFICATION CONTROLLER (projects.js)
   Renders featured projects on index.html, searchable project directory on
   projects.html, and individual project specification on project-detail.html
   ========================================================================== */

(function () {
  'use strict';

  const FALLBACK_PROJECTS = [
    {
      id: "resume-analyzer",
      name: "Resume Analyzer",
      category: "AI & ML",
      featured: true,
      status: "Completed / Active Prototype",
      shortDescription: "AI-driven resume intelligence and evaluation system designed to parse candidate resumes and evaluate alignment against target software and AI roles.",
      problemStatement: "Recruiters and candidates struggle with manual resume screening and opaque ATS keyword matching, making it difficult to objectively assess technical skill alignment.",
      proposedSolution: "An automated backend analysis service built with Python and FastAPI that extracts structured sections from resumes, compares skills against role requirements, and generates actionable evaluation feedback.",
      techStack: ["Python", "FastAPI", "NLP", "LLMs", "REST APIs", "JSON"],
      architecture: "Client Upload -> FastAPI Ingestion Endpoint -> Document Text Extractor -> NLP/LLM Evaluation Pipeline -> Structured JSON Assessment Report.",
      features: [
        "Automated extraction of education, skills, and project experience from PDF/text resumes",
        "Structured REST API endpoint design using FastAPI and Pydantic schemas",
        "Role-alignment evaluation and missing-skill identification",
        "[EDITABLE PLACEHOLDER]: Add additional custom scoring metrics or UI details"
      ],
      screenshots: ["assets/images/projects/resume-analyzer-placeholder.png"],
      githubUrl: "https://github.com/nithesh3-code",
      liveDemoUrl: "#",
      documentationPath: "projects/project-details/resume-analyzer.md"
    },
    {
      id: "local-rag-chatbot",
      name: "Local RAG Chatbot",
      category: "AI & ML",
      featured: true,
      status: "Active Prototype",
      shortDescription: "Retrieval-Augmented Generation (RAG) conversational system engineered to query local technical documents and knowledge bases with grounded context.",
      problemStatement: "Standard LLM interactions suffer from hallucinations and lack access to private, local engineering documentation without sending sensitive files to third-party servers.",
      proposedSolution: "A modular local RAG pipeline that ingests custom documents, splits text into semantic chunks, indexes vector embeddings, and retrieves top-k relevant passages to ground LLM responses.",
      techStack: ["Python", "RAG", "LLMs", "Vector Databases", "FastAPI"],
      architecture: "Document Loader -> Semantic Text Chunker -> Embedding Model -> Local Vector Store -> Context Retriever -> LLM Response Generator.",
      features: [
        "Local document ingestion and configurable chunk size/overlap",
        "Vector similarity search for high-precision context retrieval",
        "Grounded prompt synthesis to minimize hallucinated answers",
        "[EDITABLE PLACEHOLDER]: Specify exact embedding model and vector store used"
      ],
      screenshots: ["assets/images/projects/local-rag-placeholder.png"],
      githubUrl: "https://github.com/nithesh3-code",
      liveDemoUrl: "#",
      documentationPath: "projects/project-details/local-rag-chatbot.md"
    },
    {
      id: "archon-android-ai",
      name: "ARCHON — Android AI Assistant",
      category: "Android & AI",
      featured: true,
      status: "In Development",
      shortDescription: "Voice-first native Android AI assistant featuring custom interface state animations, intelligent command routing, and system-level task execution.",
      problemStatement: "Conventional mobile assistants often lack customizable developer workflows, transparent command routing, and modern low-latency visual feedback.",
      proposedSolution: "A dedicated Android AI assistant engineered with a dark titanium and electric cyan UI, structured voice command parsing, and modular intent routing.",
      techStack: ["Android Studio", "Kotlin", "Java", "Voice Processing", "REST APIs"],
      architecture: "Voice/Text Input Layer -> Android UI State Controller -> Command Router -> Local Action Executor / AI Backend API.",
      features: [
        "Voice-first interaction workflow with responsive visual state feedback",
        "Modular command routing architecture for device and AI tasks",
        "Custom futuristic dark titanium and cyan interface theme",
        "[EDITABLE PLACEHOLDER]: Add specific Android permissions and API integrations"
      ],
      screenshots: ["assets/images/projects/archon-placeholder.png"],
      githubUrl: "https://github.com/nithesh3-code",
      liveDemoUrl: "#",
      documentationPath: "projects/project-details/archon.md"
    },
    {
      id: "project-universal",
      name: "Project Universal — Native Android Application",
      category: "Android & AI",
      featured: true,
      status: "In Development",
      shortDescription: "Multimodal AI assistant mobile application engineered to help users interpret physical surroundings, documents, and voice queries through a unified interface.",
      problemStatement: "Users interacting with complex physical environments or dense documents need a unified mobile interface that seamlessly bridges camera input, voice, and AI reasoning.",
      proposedSolution: "A mobile-to-backend architecture pairing an Android client with a Python FastAPI and vector-enabled backend to process multimodal inputs in real time.",
      techStack: ["Android", "Kotlin", "Java", "Python", "FastAPI", "Multimodal AI"],
      architecture: "Android Client (Camera/Voice/Doc Input) -> FastAPI Gateway -> Multimodal LLM & Vector Search Pipeline -> Structured Client Response.",
      features: [
        "Multimodal input support for visual, voice, and document queries",
        "Clean REST API communication between mobile client and Python backend",
        "Modular architecture designed for extensibility",
        "[EDITABLE PLACEHOLDER]: Add specific mobile modules and deployment details"
      ],
      screenshots: ["assets/images/projects/project-universal-placeholder.png"],
      githubUrl: "https://github.com/nithesh3-code",
      liveDemoUrl: "#",
      documentationPath: "projects/project-details/project-universal.md"
    },
    {
      id: "friday-ai",
      name: "FridayAI",
      category: "AI & ML",
      featured: false,
      status: "Prototype",
      shortDescription: "Personal AI assistant and automation experiment exploring conversational task execution, developer productivity workflows, and modular LLM integration.",
      problemStatement: "Developers perform repetitive query and automation tasks across multiple tools without a centralized, programmable assistant layer.",
      proposedSolution: "A Python-based modular AI assistant capable of processing natural language commands, invoking local utility functions, and interfacing with language models.",
      techStack: ["Python", "LLMs", "NLP", "REST APIs"],
      architecture: "User Command Input -> Intent Classifier / Prompt Router -> Tool Execution Module -> Response Formatter.",
      features: [
        "Extensible command and plugin structure in Python",
        "Natural language query handling and context management",
        "[EDITABLE PLACEHOLDER]: Add specific FridayAI modules and capabilities"
      ],
      screenshots: ["assets/images/projects/friday-ai-placeholder.png"],
      githubUrl: "https://github.com/nithesh3-code",
      liveDemoUrl: "#",
      documentationPath: "projects/project-details/friday-ai.md"
    },
    {
      id: "smart-governance-compliance",
      name: "Smart Governance and Compliance Monitoring System",
      category: "Backend & Governance",
      featured: false,
      status: "Architecture & Prototype",
      shortDescription: "Automated governance and policy compliance tracking system designed to evaluate operational data and workflows against regulatory rules.",
      problemStatement: "Manual compliance auditing across digital workflows is error-prone, slow, and lacks real-time visibility into policy violations.",
      proposedSolution: "A structured backend monitoring system that ingests operational records, evaluates them against configurable compliance rules, and generates audit reports.",
      techStack: ["Python", "FastAPI", "REST APIs", "Data Analysis", "Machine Learning"],
      architecture: "Data Ingestion API -> Rule & Anomaly Evaluation Engine -> Compliance Audit Logger -> Reporting Interface.",
      features: [
        "Automated rule checking and compliance status classification",
        "Structured API endpoints for audit log retrieval",
        "[EDITABLE PLACEHOLDER]: Add specific governance domain rules and dataset details"
      ],
      screenshots: ["assets/images/projects/smart-governance-placeholder.png"],
      githubUrl: "https://github.com/nithesh3-code",
      liveDemoUrl: "#",
      documentationPath: "projects/project-details/smart-governance.md"
    },
    {
      id: "smart-feed-guard",
      name: "SmartFeedGuard — AI-Based Feed Quality Assessment",
      category: "AI & ML",
      featured: true,
      status: "Prototype / Research Build",
      shortDescription: "AI-driven assessment system engineered to analyze, classify, and validate feed quality using machine learning and data analysis pipelines.",
      problemStatement: "Assessing quality and detecting anomalies or low-quality inputs across continuous feeds (agricultural/nutritional or digital data streams) requires automated, objective evaluation.",
      proposedSolution: "An AI-based classification and quality scoring pipeline using Python and machine learning libraries to inspect input attributes and output quality grades.",
      techStack: ["Python", "Machine Learning", "Scikit-learn", "Pandas", "NumPy", "FastAPI"],
      architecture: "Input Feed Data -> Feature Extraction & Preprocessing (Pandas/NumPy) -> ML Quality Classifier -> Quality Assessment Output.",
      features: [
        "Automated feature preprocessing and quality classification pipeline",
        "Data-driven scoring and anomaly flagging",
        "[EDITABLE PLACEHOLDER]: Customize specific feed domain parameters and accuracy metrics"
      ],
      screenshots: ["assets/images/projects/smart-feed-guard-placeholder.png"],
      githubUrl: "https://github.com/nithesh3-code",
      liveDemoUrl: "#",
      documentationPath: "projects/project-details/smart-feed-guard.md"
    }
  ];

  let allProjects = [];
  let activeCategory = 'all';
  let currentSearchQuery = '';

  document.addEventListener('DOMContentLoaded', async function () {
    allProjects = await fetchProjectsData();

    // 1. Render Featured Projects on Home Page (index.html)
    const featuredGrid = document.getElementById('featured-projects-grid');
    if (featuredGrid) {
      const featuredList = allProjects.filter(function (p) { return p.featured; }).slice(0, 6);
      renderProjectCards(featuredGrid, featuredList);
    }

    // 2. Render Full Filterable Catalog on Projects Page (projects.html)
    const allProjectsGrid = document.getElementById('all-projects-grid');
    if (allProjectsGrid) {
      initProjectsDirectory(allProjectsGrid);
    }

    // 3. Render Single Project Specification on Detail Page (project-detail.html)
    const detailContainer = document.getElementById('project-detail-container');
    if (detailContainer) {
      renderProjectDetailPage(detailContainer);
    }
  });

  async function fetchProjectsData() {
    try {
      const response = await fetch('data/projects.json');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.projects) && data.projects.length > 0) {
          return data.projects;
        }
      }
    } catch (err) {
      // Fallback to embedded array
    }
    return FALLBACK_PROJECTS;
  }

  function renderProjectCards(container, projectsList) {
    if (!projectsList || projectsList.length === 0) {
      container.innerHTML = '<div class="panel-card mono-text">No matching engineering systems found for your filter criteria.</div>';
      return;
    }

    container.innerHTML = projectsList.map(function (project) {
      const techPills = (project.techStack || []).slice(0, 5).map(function (t) {
        return '<span class="tech-pill">' + escapeHtml(t) + '</span>';
      }).join('');

      return (
        '<article class="project-card">' +
          '<div class="project-card-top">' +
            '<div class="project-meta-row">' +
              '<span class="mono-text cyan-text">// ' + escapeHtml(project.category) + '</span>' +
              '<span class="status-pill">' + escapeHtml(project.status) + '</span>' +
            '</div>' +
            '<h3>' + escapeHtml(project.name) + '</h3>' +
            '<p class="small-text">' + escapeHtml(project.shortDescription) + '</p>' +
            '<div class="tech-pill-list">' + techPills + '</div>' +
          '</div>' +
          '<div class="project-card-actions">' +
            '<a href="project-detail.html?id=' + encodeURIComponent(project.id) + '" class="btn btn-outline btn-sm">System Spec &rarr;</a>' +
            '<a href="' + escapeHtml(project.githubUrl) + '" target="_blank" rel="noopener noreferrer" class="card-link mono-text">GitHub &nearr;</a>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  function initProjectsDirectory(gridContainer) {
    const searchInput = document.getElementById('project-search-input');
    const filterContainer = document.getElementById('project-category-filters');
    const countMeta = document.getElementById('projects-count-meta');

    function updateDirectoryView() {
      const filtered = allProjects.filter(function (proj) {
        const matchesCat = activeCategory === 'all' || proj.category === activeCategory;
        const matchesSearch = window.NitheshSearch
          ? window.NitheshSearch.matchesQuery(proj, currentSearchQuery, ['name', 'shortDescription', 'problemStatement', 'techStack', 'category'])
          : true;
        return matchesCat && matchesSearch;
      });

      if (countMeta) {
        countMeta.textContent = 'DISPLAYING ' + filtered.length + ' OF ' + allProjects.length + ' ENGINEERING SYSTEMS';
      }
      renderProjectCards(gridContainer, filtered);
    }

    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        currentSearchQuery = e.target.value;
        updateDirectoryView();
      });
    }

    if (filterContainer) {
      const buttons = filterContainer.querySelectorAll('.filter-btn');
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          buttons.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          activeCategory = btn.getAttribute('data-category') || 'all';
          updateDirectoryView();
        });
      });
    }

    updateDirectoryView();
  }

  function renderProjectDetailPage(container) {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    const project = allProjects.find(function (p) { return p.id === projectId; }) || allProjects[0];

    if (!project) {
      container.innerHTML = '<div class="panel-card">Project specification not found.</div>';
      return;
    }

    document.title = project.name + ' | Engineering Specification — NITHESH.DEV';

    const techBadges = (project.techStack || []).map(function (t) {
      return '<span class="skill-badge">' + escapeHtml(t) + '</span>';
    }).join('');

    const featureItems = (project.features || []).map(function (f) {
      return '<li>' + escapeHtml(f) + '</li>';
    }).join('');

    const liveDemoButton = (project.liveDemoUrl && project.liveDemoUrl !== '#')
      ? '<a href="' + escapeHtml(project.liveDemoUrl) + '" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Live Demo &nearr;</a>'
      : '<span class="btn btn-outline btn-sm mono-text" title="Edit liveDemoUrl in data/projects.json">Live Demo: [Editable Placeholder in data/projects.json]</span>';

    container.innerHTML =
      '<div class="spec-header-card">' +
        '<div class="project-meta-row">' +
          '<span class="mono-text cyan-text">// SYSTEM SPECIFICATION: ' + escapeHtml(project.category) + '</span>' +
          '<span class="status-pill">' + escapeHtml(project.status) + '</span>' +
        '</div>' +
        '<h1 class="page-title">' + escapeHtml(project.name) + '</h1>' +
        '<p class="page-subtitle">' + escapeHtml(project.shortDescription) + '</p>' +
        '<div class="hero-actions mt-24">' +
          '<a href="' + escapeHtml(project.githubUrl) + '" target="_blank" rel="noopener noreferrer" class="btn btn-primary">GitHub Repository &nearr;</a>' +
          liveDemoButton +
        '</div>' +
      '</div>' +

      '<div class="spec-grid">' +
        '<div class="spec-main">' +
          '<div class="panel-card mb-24">' +
            '<span class="mono-text cyan-text">01 // PROBLEM STATEMENT</span>' +
            '<h2 class="panel-title">Engineering Challenge</h2>' +
            '<p>' + escapeHtml(project.problemStatement) + '</p>' +
          '</div>' +

          '<div class="panel-card mb-24">' +
            '<span class="mono-text cyan-text">02 // PROPOSED SOLUTION</span>' +
            '<h2 class="panel-title">System Solution</h2>' +
            '<p>' + escapeHtml(project.proposedSolution) + '</p>' +
          '</div>' +

          '<div class="panel-card mb-24">' +
            '<span class="mono-text cyan-text">03 // SYSTEM ARCHITECTURE</span>' +
            '<h2 class="panel-title">Architecture &amp; Data Flow</h2>' +
            '<pre class="arch-diagram mono-text">' + escapeHtml(project.architecture) + '</pre>' +
          '</div>' +

          '<div class="panel-card mb-24">' +
            '<span class="mono-text cyan-text">04 // CAPABILITIES</span>' +
            '<h2 class="panel-title">Key System Features</h2>' +
            '<ul class="bullet-list">' + featureItems + '</ul>' +
          '</div>' +

          '<div class="panel-card">' +
            '<span class="mono-text cyan-text">05 // VISUAL TELEMETRY</span>' +
            '<h2 class="panel-title">Screenshots &amp; Interface Previews</h2>' +
            '<div class="screenshot-placeholder">' +
              '[SCREENSHOT PLACEHOLDER]<br>' +
              'Place project screenshot at: <code>' + escapeHtml((project.screenshots && project.screenshots[0]) || 'assets/images/projects/') + '</code><br>' +
              'and update the image path in <code>data/projects.json</code>.' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<aside class="spec-sidebar">' +
          '<div class="panel-card mb-24">' +
            '<h3 class="mono-text panel-subtitle">// TECHNOLOGY STACK</h3>' +
            '<div class="skill-tags-wrap">' + techBadges + '</div>' +
          '</div>' +

          '<div class="panel-card">' +
            '<h3 class="mono-text panel-subtitle">// DOCUMENTATION NODE</h3>' +
            '<p class="small-text">Extended markdown notes and implementation logs for this project are indexed at:</p>' +
            '<p class="mono-text cyan-text small-text mt-12">' + escapeHtml(project.documentationPath) + '</p>' +
            '<hr style="border-color: rgba(148,163,184,0.14); margin: 1.25rem 0;">' +
            '<h4 class="mono-text small-text mb-24">QUICK PROJECT SWITCHER</h4>' +
            '<div class="stack-list">' +
              allProjects.map(function (p) {
                return '<a href="project-detail.html?id=' + encodeURIComponent(p.id) + '" class="card-link mono-text">' +
                  (p.id === project.id ? '&rarr; ' : '') + escapeHtml(p.name) +
                '</a>';
              }).join('') +
            '</div>' +
          '</div>' +
        '</aside>' +
      '</div>';
  }

  function escapeHtml(str) {
    if (window.NitheshSearch && window.NitheshSearch.escapeHtml) {
      return window.NitheshSearch.escapeHtml(str);
    }
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();