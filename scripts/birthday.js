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

      .birthday-balloons,
      .birthday-fireworks {
        position: fixed;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
      }

      .birthday-balloons {
        z-index: 620;
      }

      .birthday-fireworks {
        z-index: 680;
      }

      .birthday-balloon {
        position: absolute;
        bottom: -150px;
        left: 50%;
        width: var(--size, 36px);
        height: calc(var(--size, 36px) * 1.24);
        border-radius: 50% 50% 46% 46%;
        background:
          radial-gradient(circle at 30% 28%, rgba(255,255,255,.66) 0 24%, transparent 26%),
          var(--color, #ffd700);
        box-shadow: inset -8px -12px 16px rgba(13,31,45,.1), 0 10px 18px rgba(13,31,45,.12);
        opacity: 0;
        transform: translate3d(0, 0, 0);
        animation: birthdayBalloonRise var(--dur, 10.5s) linear forwards;
      }

      .birthday-balloon::before {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -6px;
        width: 8px;
        height: 8px;
        background: rgba(47, 127, 161, 0.7);
        clip-path: polygon(50% 100%, 0 0, 100% 0);
        transform: translateX(-50%);
        opacity: .9;
      }

      .birthday-balloon::after {
        content: "";
        position: absolute;
        left: 50%;
        top: calc(100% + 1px);
        width: 1px;
        height: 72px;
        background: linear-gradient(to bottom, rgba(47,127,161,.55), rgba(47,127,161,0));
        transform: translateX(-50%);
      }

      @keyframes birthdayBalloonRise {
        0% {
          opacity: 0;
          transform: translate3d(0, 0, 0) rotate(-4deg);
        }

        8% {
          opacity: .92;
        }

        100% {
          opacity: 0;
          transform: translate3d(var(--drift, 0px), -122vh, 0) rotate(8deg);
        }
      }

      .birthday-burst {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 10px;
        height: 10px;
        transform: translate(-50%, -50%);
        --spark: #ffd700;
      }

      .birthday-burst::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: var(--spark);
        transform: translate(-50%, -50%) scale(.25);
        opacity: .9;
        filter: blur(.4px);
        animation: birthdayCorePop .8s ease-out forwards;
      }

      @keyframes birthdayCorePop {
        0% {
          opacity: .95;
          transform: translate(-50%, -50%) scale(.24);
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(2.2);
        }
      }

      .birthday-spark {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 2px;
        height: 18px;
        border-radius: 999px;
        background: linear-gradient(to top, rgba(255,255,255,0), var(--spark) 70%, rgba(255,255,255,.95));
        transform-origin: 50% 100%;
        opacity: 0;
        transform: translate(-50%, -50%) rotate(var(--angle, 0deg));
        animation: birthdaySparkFly .82s cubic-bezier(.16,.84,.44,1) forwards;
      }

      @keyframes birthdaySparkFly {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(var(--angle, 0deg)) translateY(0) scaleY(.2);
        }

        22% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(var(--angle, 0deg)) translateY(calc(-1 * var(--distance, 34px))) scaleY(1);
        }
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

        .birthday-balloons,
        .birthday-fireworks {
          display: none;
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
    <p class="birthday-banner-message">Happy Birthday, Sabrina! Balloons up, firecrackers bright.</p>
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

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReducedMotion) {
    launchBirthdayFx();
  }

  function launchBirthdayFx() {
    const balloonsLayer = document.createElement("div");
    balloonsLayer.className = "birthday-balloons";
    balloonsLayer.setAttribute("aria-hidden", "true");
    body.appendChild(balloonsLayer);

    const fireworksLayer = document.createElement("div");
    fireworksLayer.className = "birthday-fireworks";
    fireworksLayer.setAttribute("aria-hidden", "true");
    body.appendChild(fireworksLayer);

    spawnBalloonSet(balloonsLayer);
    spawnFirecrackerSet(fireworksLayer);
  }

  function spawnBalloonSet(layer) {
    const palette = ["#ffd700", "#ffe8a3", "#add8e6", "#c9f2ff", "#f8c8dc"];
    const total = window.matchMedia("(max-width: 760px)").matches ? 9 : 15;

    for (let i = 0; i < total; i += 1) {
      const delay = 150 + i * 230 + Math.random() * 180;
      window.setTimeout(() => {
        if (!layer.isConnected) return;

        const balloon = document.createElement("span");
        balloon.className = "birthday-balloon";
        balloon.style.left = `${6 + Math.random() * 88}%`;
        balloon.style.setProperty("--size", `${26 + Math.random() * 26}px`);
        balloon.style.setProperty("--dur", `${8.8 + Math.random() * 4.6}s`);
        balloon.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
        balloon.style.setProperty("--color", palette[Math.floor(Math.random() * palette.length)]);
        layer.appendChild(balloon);

        balloon.addEventListener("animationend", () => balloon.remove(), { once: true });
      }, delay);
    }

    window.setTimeout(() => {
      layer.remove();
    }, 14000);
  }

  function spawnFirecrackerSet(layer) {
    const palette = ["#ffd700", "#ffefb0", "#add8e6", "#87ceeb", "#ffe1f2"];
    const total = window.matchMedia("(max-width: 760px)").matches ? 5 : 8;

    for (let i = 0; i < total; i += 1) {
      const delay = 450 + i * 420 + Math.random() * 220;
      window.setTimeout(() => {
        if (!layer.isConnected) return;

        const burst = document.createElement("span");
        burst.className = "birthday-burst";
        burst.style.left = `${10 + Math.random() * 80}%`;
        burst.style.top = `${12 + Math.random() * 42}%`;

        const color = palette[Math.floor(Math.random() * palette.length)];
        burst.style.setProperty("--spark", color);

        const sparkCount = 10;
        for (let s = 0; s < sparkCount; s += 1) {
          const spark = document.createElement("span");
          spark.className = "birthday-spark";
          spark.style.setProperty("--spark", color);

          const angle = s * (360 / sparkCount) + (Math.random() * 8 - 4);
          spark.style.setProperty("--angle", `${angle}deg`);
          spark.style.setProperty("--distance", `${24 + Math.random() * 30}px`);
          spark.style.animationDelay = `${Math.random() * 120}ms`;
          burst.appendChild(spark);
        }

        layer.appendChild(burst);
        window.setTimeout(() => burst.remove(), 1100);
      }, delay);
    }

    window.setTimeout(() => {
      layer.remove();
    }, 6200);
  }

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
