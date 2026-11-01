/* ==========================================================================
   NITHESH.DEV — CORE APPLICATION CONTROLLER (main.js)
   Handles dynamic year, skills matrix hydration from data/skills.json,
   and local/Netlify contact form feedback
   ========================================================================== */

(function () {
  'use strict';

  // Fallback skills data matching data/skills.json
  const FALLBACK_SKILLS = [
    {
      id: "01 // LANGUAGES",
      category: "Programming",
      description: "Primary languages used for backend services, AI scripting, and native Android development.",
      items: ["Python", "Java", "Kotlin"]
    },
    {
      id: "02 // INTELLIGENCE",
      category: "AI / ML",
      description: "Core artificial intelligence and machine learning paradigms applied in research and project builds.",
      items: ["Machine Learning", "Deep Learning", "NLP", "LLMs", "RAG"]
    },
    {
      id: "03 // SERVICES & APIS",
      category: "Backend",
      description: "Designing and building asynchronous API endpoints, web services, and data contracts.",
      items: ["FastAPI", "REST APIs", "HTTP Fundamentals"]
    },
    {
      id: "04 // ANALYTICS & COMPUTATION",
      category: "Data",
      description: "Python scientific computing, tabular manipulation, visualization, and classical ML toolkits.",
      items: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"]
    },
    {
      id: "05 // ENVIRONMENT & WORKFLOW",
      category: "Tools",
      description: "Version control, integrated development environments, and mobile build systems.",
      items: ["Git", "GitHub", "VS Code", "Android Studio"]
    }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    // 1. Update Footer Year
    const yearSpans = document.querySelectorAll('#current-year');
    const currentYear = new Date().getFullYear();
    yearSpans.forEach(function (el) {
      el.textContent = String(currentYear);
    });

    // 2. Hydrate Skills Matrix if on skills.html
    const skillsContainer = document.getElementById('skills-matrix-container');
    if (skillsContainer) {
      loadSkillsMatrix(skillsContainer);
    }

    // 3. Contact Form Progressive Enhancement
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status-msg');
    if (contactForm && formStatus) {
      contactForm.addEventListener('submit', function (e) {
        // When running locally on localhost/file://, show a helpful preview notice
        const isLocal = window.location.hostname === 'localhost' ||
                        window.location.hostname === '127.0.0.1' ||
                        window.location.protocol === 'file:';
        if (isLocal) {
          e.preventDefault();
          formStatus.innerHTML = '<span class="cyan-text">[LOCAL PREVIEW MODE]: Form validated successfully. Once deployed to Netlify, submissions are stored directly in your Netlify Forms dashboard.</span>';
          contactForm.reset();
        }
      });
    }
  });

  async function loadSkillsMatrix(container) {
    let skillsData = FALLBACK_SKILLS;
    try {
      const response = await fetch('data/skills.json');
      if (response.ok) {
        const json = await response.json();
        if (Array.isArray(json.categories) && json.categories.length > 0) {
          skillsData = json.categories;
        }
      }
    } catch (err) {
      // Fallback already assigned
    }

    container.innerHTML = skillsData.map(function (group) {
      const badges = (group.items || []).map(function (skill) {
        return '<span class="skill-badge">' + escapeText(skill) + '</span>';
      }).join('');

      return (
        '<article class="panel-card">' +
          '<span class="mono-text cyan-text">' + escapeText(group.id) + '</span>' +
          '<h2 class="panel-title">' + escapeText(group.category) + '</h2>' +
          '<p class="small-text">' + escapeText(group.description) + '</p>' +
          '<div class="skill-tags-wrap">' + badges + '</div>' +
        '</article>'
      );
    }).join('');
  }

  function escapeText(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();