/* ==========================================================================
   NITHESH.DEV — NAVIGATION & SCROLL CONTROLLER (navigation.js)
   Handles mobile drawer menu, active route highlighting, and back-to-top UI
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const backToTopBtn = document.getElementById('back-to-top');

    // 1. Mobile Navigation Drawer Toggle
    if (mobileToggle && mainNav) {
      mobileToggle.addEventListener('click', function () {
        const isOpen = mainNav.classList.toggle('nav-open');
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
      });

      // Close mobile drawer when clicking any link inside
      const navLinks = mainNav.querySelectorAll('.nav-link');
      navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          if (mainNav.classList.contains('nav-open')) {
            mainNav.classList.remove('nav-open');
            mobileToggle.setAttribute('aria-expanded', 'false');
          }
        });
      });

      // Close mobile drawer on Escape key
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mainNav.classList.contains('nav-open')) {
          mainNav.classList.remove('nav-open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.focus();
        }
      });
    }

    // 2. Back-to-Top Button Visibility & Smooth Scroll
    if (backToTopBtn) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 360) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }, { passive: true });

      backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  });
})();