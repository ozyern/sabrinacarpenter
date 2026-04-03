(() => {
  "use strict";

  const now = new Date();
  const isMayEleven = now.getMonth() === 4 && now.getDate() === 11;
  if (!isMayEleven) return;

  const root = document.documentElement;
  const body = document.body;
  if (!body || root.dataset.sabrinaBirthday === "on") return;

  root.dataset.sabrinaBirthday = "on";
  body.classList.add("birthday-day");

  const styleId = "sabrina-birthday-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .birthday-banner {
        position: fixed;
        left: 50%;
        top: 84px;
        transform: translate(-50%, -8px);
        opacity: 0;
        width: min(92vw, 700px);
        z-index: 700;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 18px;
        border-radius: 999px;
        border: 1px solid rgba(255, 193, 7, 0.45);
        background: linear-gradient(130deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 248, 220, 0.95) 45%, rgba(224, 255, 255, 0.92) 100%);
        box-shadow: 0 16px 36px rgba(13, 31, 45, 0.16);
        backdrop-filter: blur(10px);
        transition: opacity 0.45s cubic-bezier(.22,.61,.36,1), transform 0.45s cubic-bezier(.22,.61,.36,1), box-shadow 0.45s ease;
      }

      .birthday-banner.is-visible {
        opacity: 1;
        transform: translate(-50%, 0);
      }

      .birthday-banner-message {
        margin: 0;
        font-family: 'Jost', sans-serif;
        font-size: 0.76rem;
        font-weight: 400;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #003d5c;
      }

      .birthday-banner-close {
        border: 1px solid rgba(47, 127, 161, 0.35);
        background: rgba(255, 255, 255, 0.75);
        color: #2f7fa1;
        border-radius: 999px;
        width: 28px;
        height: 28px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
        line-height: 1;
        cursor: pointer;
        transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
      }

      .birthday-banner-close:hover,
      .birthday-banner-close:focus-visible {
        transform: scale(1.05);
        background: rgba(255, 248, 220, 0.95);
        border-color: rgba(255, 193, 7, 0.55);
        outline: none;
      }

      .birthday-day .timeline::before {
        background: linear-gradient(to bottom, transparent, rgba(255, 193, 7, 0.9) 10%, rgba(255, 193, 7, 0.9) 90%, transparent);
      }

      .birthday-day .tl-item,
      .birthday-day .show-card {
        border-color: rgba(255, 193, 7, 0.45);
        box-shadow: 0 18px 40px rgba(13, 31, 45, 0.12);
      }

      .birthday-day .birthday-timeline-year::after {
        content: " 11 MAY";
        margin-left: 6px;
        font-size: 0.52rem;
        font-weight: 400;
        letter-spacing: 0.14em;
        color: #2f7fa1;
        opacity: 0.86;
      }

      @media (max-width: 760px) {
        .birthday-banner {
          top: 74px;
          width: min(94vw, 700px);
          padding: 10px 14px;
          gap: 10px;
        }

        .birthday-banner-message {
          font-size: 0.66rem;
          letter-spacing: 0.14em;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .birthday-banner {
          transition: none;
          transform: translate(-50%, 0);
        }
      }
    `;

    document.head.appendChild(style);
  }

  const banner = document.createElement("section");
  banner.className = "birthday-banner";
  banner.setAttribute("role", "status");
  banner.setAttribute("aria-live", "polite");
  banner.innerHTML = `
    <p class="birthday-banner-message">Happy Birthday, Sabrina! May 11 looks good on you.</p>
    <button class="birthday-banner-close" type="button" aria-label="Dismiss birthday message">x</button>
  `;

  const nav = document.getElementById("nav");
  if (nav && nav.parentNode) {
    nav.insertAdjacentElement("afterend", banner);
  } else {
    body.insertBefore(banner, body.firstChild);
  }

  requestAnimationFrame(() => {
    banner.classList.add("is-visible");
  });

  banner.querySelector(".birthday-banner-close")?.addEventListener("click", () => {
    banner.remove();
  });

  function markTimelineYears(scope) {
    if (!scope || !scope.querySelectorAll) return;

    const yearNodes = scope.querySelectorAll(".tl-year, .show-year, [data-year]");
    yearNodes.forEach((node) => {
      node.classList.add("birthday-timeline-year");
    });
  }

  markTimelineYears(document);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;

        if (node.matches(".tl-year, .show-year, [data-year]")) {
          node.classList.add("birthday-timeline-year");
        }

        markTimelineYears(node);
      });
    });
  });

  observer.observe(body, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 15000);
})();
