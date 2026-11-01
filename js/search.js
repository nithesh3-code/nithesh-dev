/* ==========================================================================
   NITHESH.DEV — SHARED SEARCH & FILTER UTILITIES (search.js)
   Provides normalized string matching for projects and research libraries
   ========================================================================== */

window.NitheshSearch = (function () {
  'use strict';

  /**
   * Normalizes text for case-insensitive search comparisons
   * @param {string} value
   * @returns {string}
   */
  function normalize(value) {
    if (!value) return '';
    return String(value).toLowerCase().trim();
  }

  /**
   * Checks if an item matches a query across an array of text fields or arrays
   * @param {Object} item
   * @param {string} query
   * @param {Array<string>} fields
   * @returns {boolean}
   */
  function matchesQuery(item, query, fields) {
    const cleanQuery = normalize(query);
    if (!cleanQuery) return true;

    return fields.some(function (field) {
      const val = item[field];
      if (!val) return false;
      if (Array.isArray(val)) {
        return val.some(function (entry) {
          return normalize(entry).includes(cleanQuery);
        });
      }
      return normalize(val).includes(cleanQuery);
    });
  }

  /**
   * Escapes HTML special characters to prevent XSS in dynamic rendering
   * @param {string} unsafe
   * @returns {string}
   */
  function escapeHtml(unsafe) {
    if (unsafe === null || unsafe === undefined) return '';
    return String(unsafe)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  return {
    normalize: normalize,
    matchesQuery: matchesQuery,
    escapeHtml: escapeHtml
  };
})();