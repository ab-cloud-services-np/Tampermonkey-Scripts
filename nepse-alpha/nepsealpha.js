// ==UserScript==
// @name         NepseAlpha Redirect + Remove Ads
// @namespace    https://nepsealpha.com/
// @version      1.0.0
// @description  Redirect home to chart and remove subscription ad
// @match        https://nepsealpha.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Redirect home -> chart
  if (location.pathname === '/' || location.pathname === '') {
    location.replace('https://nepsealpha.com/trading/chart');
  }

  const SELECTOR = '.card.d-flex.justify-content-center.text-center.border.border-danger';

  function removeAd(root = document) {
    root.querySelectorAll(SELECTOR).forEach((el) => el.remove());
  }

  // Run once DOM is ready
  document.addEventListener('DOMContentLoaded', () => removeAd());

  // Catch dynamically injected nodes
  const observer = new MutationObserver(() => removeAd());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
