/* ==========================================================================
   NITHESH.DEV — RESEARCH LABORATORY CONTROLLER (research.js)
   Renders research highlights on index.html and the searchable, filterable
   research library on research.html from data/research.json
   ========================================================================== */

(function () {
  'use strict';

  const FALLBACK_RESEARCH = [
    {
      id: "res-frisian-lang-spec",
      title: "Frisian / Farisan: Declarative Security Policy Architecture in Programming Languages",
      category: "Programming Languages",
      secondaryCategory: "API Security",
      type: "Research Specification & Architecture Note",
      status: "Working Draft / Active Research",
      date: "2026",
      summary: "Investigates embedding API security constraints, capability boundaries, and static policy verification directly into programming language grammar and AST analysis.",
      tags: ["Programming Languages", "API Security", "Compiler Design", "Frisian/Farisan"],
      documentPath: "research/notes/frisian-language-architecture.md",
      pdfPath: "research/papers/PLACEHOLDER_frisian_spec.pdf"
    },
    {
      id: "res-local-rag-grounding",
      title: "Context Grounding & Chunking Strategies in Local Retrieval-Augmented Generation (RAG)",
      category: "Artificial Intelligence",
      secondaryCategory: "Machine Learning",
      type: "Experimental Technical Note",
      status: "Research Note",
      date: "2026",
      summary: "Explores document chunking granularity, vector retrieval top-k thresholds, and prompt framing techniques to minimize hallucinations in local RAG pipelines.",
      tags: ["Artificial Intelligence", "RAG", "LLMs", "Vector Databases"],
      documentPath: "research/notes/rag-grounding-experiments.md",
      pdfPath: ""
    },
    {
      id: "res-fastapi-security-patterns",
      title: "REST API Security Contracts and Schema Validation Patterns in FastAPI Microservices",
      category: "Backend Engineering",
      secondaryCategory: "Cybersecurity",
      type: "Architecture Documentation",
      status: "Published Note",
      date: "2026",
      summary: "Documents structural patterns for input sanitization, strict Pydantic schema validation, and defensive API design for AI-backed web services.",
      tags: ["Backend Engineering", "FastAPI", "REST APIs", "API Security", "Cybersecurity"],
      documentPath: "research/notes/fastapi-security-patterns.md",
      pdfPath: ""
    },
    {
      id: "res-multimodal-mobile-agents",
      title: "System Architecture for Voice-First & Multimodal AI Assistants on Android",
      category: "Software Architecture",
      secondaryCategory: "Deep Learning",
      type: "System Architecture Blueprint",
      status: "Active Research",
      date: "2026",
      summary: "Architectural study on low-latency command routing, state transitions, and backend orchestration for native Android AI assistants (ARCHON & Project Universal).",
      tags: ["Software Architecture", "Android", "Deep Learning", "AI Infrastructure"],
      documentPath: "research/diagrams/android-ai-architecture.md",
      pdfPath: ""
    }
  ];

  let researchItems = [];
  let activeDomain = 'all';
  let searchQuery = '';

  document.addEventListener('DOMContentLoaded', async function () {
    researchItems = await fetchResearchData();

    // 1. Render Research Highlights on Home Page (index.html)
    const homeHighlights = document.getElementById('home-research-highlights');
    if (homeHighlights) {
      renderHomeHighlights(homeHighlights, researchItems.slice(0, 3));
    }

    // 2. Render Searchable Research Library on Research Page (research.html)
    const libraryGrid = document.getElementById('research-library-grid');
    if (libraryGrid) {
      initResearchLibrary(libraryGrid);
    }
  });

  async function fetchResearchData() {
    try {
      const response = await fetch('data/research.json');
      if (response.ok) {
        const json = await response.json();
        if (Array.isArray(json.entries) && json.entries.length > 0) {
          return json.entries;
        }
      }
    } catch (err) {
      // Use embedded fallback
    }
    return FALLBACK_RESEARCH;
  }

  function renderHomeHighlights(container, list) {
    container.innerHTML = list.map(function (item) {
      return (
        '<article class="panel-card">' +
          '<div class="project-meta-row">' +
            '<span class="mono-text cyan-text">// ' + escapeHtml(item.category) + '</span>' +
            '<span class="mono-text small-text">' + escapeHtml(item.status) + '</span>' +
          '</div>' +
          '<h4>' + escapeHtml(item.title) + '</h4>' +
          '<p class="small-text mt-12">' + escapeHtml(item.summary) + '</p>' +
        '</article>'
      );
    }).join('');
  }

  function renderResearchCards(container, list) {
    if (!list || list.length === 0) {
      container.innerHTML = '<div class="panel-card mono-text">No research documents match the selected category or search query.</div>';
      return;
    }

    container.innerHTML = list.map(function (item) {
      const tagsHtml = (item.tags || []).map(function (tag) {
        return '<span class="tech-pill">' + escapeHtml(tag) + '</span>';
      }).join('');

      const downloadBtn = item.pdfPath
        ? '<a href="' + escapeHtml(item.pdfPath) + '" class="btn btn-outline btn-sm" download>Download PDF &darr;</a>'
        : '<span class="mono-text small-text editable-tag">[PDF Placeholder: Add file in research/papers/]</span>';

      return (
        '<article class="research-card">' +
          '<div class="project-meta-row">' +
            '<span class="mono-text cyan-text">// ' + escapeHtml(item.category) + '</span>' +
            '<span class="status-pill">' + escapeHtml(item.status) + '</span>' +
          '</div>' +
          '<h3>' + escapeHtml(item.title) + '</h3>' +
          '<p class="mono-text small-text mt-12">TYPE: ' + escapeHtml(item.type) + ' | YEAR: ' + escapeHtml(item.date) + '</p>' +
          '<p class="small-text mt-12">' + escapeHtml(item.summary) + '</p>' +
          '<div class="tech-pill-list">' + tagsHtml + '</div>' +
          '<div class="project-card-actions mt-24">' +
            '<a href="' + escapeHtml(item.documentPath) + '" target="_blank" rel="noopener noreferrer" class="card-link mono-text">Open Technical Note &rarr;</a>' +
            downloadBtn +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  function initResearchLibrary(gridContainer) {
    const searchInput = document.getElementById('research-search-input');
    const filterGroup = document.getElementById('research-category-filters');
    const countMeta = document.getElementById('research-count-meta');

    function updateLibraryView() {
      const filtered = researchItems.filter(function (entry) {
        const matchesDomain = activeDomain === 'all' ||
                              entry.category === activeDomain ||
                              entry.secondaryCategory === activeDomain ||
                              (entry.tags && entry.tags.includes(activeDomain));

        const matchesText = window.NitheshSearch
          ? window.NitheshSearch.matchesQuery(entry, searchQuery, ['title', 'summary', 'category', 'type', 'tags'])
          : true;

        return matchesDomain && matchesText;
      });

      if (countMeta) {
        countMeta.textContent = 'INDEXED DOCUMENTS: SHOWING ' + filtered.length + ' OF ' + researchItems.length + ' ENTRIES';
      }
      renderResearchCards(gridContainer, filtered);
    }

    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        searchQuery = e.target.value;
        updateLibraryView();
      });
    }

    if (filterGroup) {
      const buttons = filterGroup.querySelectorAll('.filter-btn');
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          buttons.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          activeDomain = btn.getAttribute('data-category') || 'all';
          updateLibraryView();
        });
      });
    }

    updateLibraryView();
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