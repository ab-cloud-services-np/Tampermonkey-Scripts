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
  "use strict";

  const path = location.pathname;

  /* ------------------------------
   * 1. Redirect / → /nepse-chart
   * ------------------------------ */
  if (path === "/") {
    location.replace("/nepse-chart");
    return;
  }

  /* ---------------------------------
   * 2. Remove ad on /nepse-chart
   * --------------------------------- */
  if (path === "/nepse-chart") {
    const removeAd = () => {
      document.querySelectorAll("div.card").forEach((el) => {
        const text = el.innerText || "";

        if (
          text.includes("SastoShare") ||
          text.includes("Please click here to subscribe") ||
          text.includes("NPR")
        ) {
          el.remove();
        }
      });
    };

    // Run immediately
    removeAd();

    // Observe future DOM changes (AJAX / delayed injection)
    const observer = new MutationObserver(removeAd);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }
})();
