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
        background: linear-gradient(130deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 248, 220, 0.96) 45%, rgba(224, 255, 255, 0.94) 100%);
        box-shadow: 0 16px 36px rgba(13, 31, 45, 0.16), 0 0 0 rgba(255, 193, 7, 0);
        backdrop-filter: blur(10px);
        overflow: hidden;
        transition: opacity 0.62s cubic-bezier(.2,.7,.2,1), transform 0.62s cubic-bezier(.2,.7,.2,1), box-shadow 0.62s cubic-bezier(.22,.61,.36,1);
      }

      .birthday-banner.is-visible {
        opacity: 1;
        transform: translate(-50%, 0);
        animation: birthdayBannerPulse 3.6s cubic-bezier(.28,.58,.26,1) 0.45s 2;
      }

      .birthday-banner::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, transparent 12%, rgba(255,255,255,.62) 42%, transparent 72%);
        transform: translateX(-140%);
        pointer-events: none;
        animation: birthdayBannerShine 5.8s cubic-bezier(.26,.59,.28,1) 0.65s infinite;
      }

      .birthday-banner-message {
        margin: 0;
        font-family: 'Jost', sans-serif;
        font-size: 0.78rem;
        font-weight: 500;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #003d5c;
        text-shadow: 0 1px 0 rgba(255,255,255,.55);
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
        transition: transform 0.26s cubic-bezier(.22,.61,.36,1), background 0.26s cubic-bezier(.22,.61,.36,1), border-color 0.26s cubic-bezier(.22,.61,.36,1);
      }

      .birthday-banner-close:hover,
      .birthday-banner-close:focus-visible {
        transform: scale(1.03);
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
      .birthday-fireworks,
      .birthday-atmosphere,
      .birthday-ribbons {
        position: fixed;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
      }

      .birthday-atmosphere {
        z-index: 560;
      }

      .birthday-atmosphere::before,
      .birthday-atmosphere::after {
        content: "";
        position: absolute;
        inset: -18%;
        opacity: .58;
      }

      .birthday-atmosphere::before {
        background:
          radial-gradient(38vw 38vw at 14% 66%, rgba(255, 238, 176, .42), transparent 70%),
          radial-gradient(36vw 36vw at 83% 26%, rgba(173, 216, 230, .35), transparent 70%),
          radial-gradient(26vw 26vw at 52% 12%, rgba(255, 193, 7, .25), transparent 72%);
        animation: birthdayAuraPulse 7.2s cubic-bezier(.25,.56,.28,1) infinite;
      }

      .birthday-atmosphere::after {
        background: conic-gradient(from 110deg at 50% 50%, rgba(255,255,255,.08), rgba(255,215,0,.16), rgba(173,216,230,.18), rgba(255,255,255,.08));
        filter: blur(42px);
        mix-blend-mode: screen;
        animation: birthdayAuraDrift 10.4s cubic-bezier(.3,.55,.25,1) infinite;
      }

      @keyframes birthdayAuraPulse {
        0%,
        100% {
          opacity: .44;
          transform: scale(1);
        }

        50% {
          opacity: .62;
          transform: scale(1.04);
        }
      }

      @keyframes birthdayAuraDrift {
        0% {
          transform: rotate(0deg) scale(1);
        }

        50% {
          transform: rotate(3deg) scale(1.03);
        }

        100% {
          transform: rotate(0deg) scale(1);
        }
      }

      .birthday-twinkle {
        position: absolute;
        left: var(--x, 50%);
        top: var(--y, 50%);
        width: var(--size, 8px);
        height: var(--size, 8px);
        opacity: 0;
        transform: translate(-50%, -50%) scale(.35);
        animation: birthdayTwinkle var(--dur, 3.4s) cubic-bezier(.3,.55,.28,1) var(--delay, 0ms) infinite;
        will-change: transform, opacity;
      }

      .birthday-twinkle::before,
      .birthday-twinkle::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 999px;
        background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,.9), rgba(255,255,255,0));
      }

      .birthday-twinkle::before {
        width: 100%;
        height: 2px;
      }

      .birthday-twinkle::after {
        width: 2px;
        height: 100%;
      }

      @keyframes birthdayTwinkle {
        0%,
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(.35);
        }

        42% {
          opacity: .72;
          transform: translate(-50%, -50%) scale(.98);
        }

        72% {
          opacity: .28;
          transform: translate(-50%, -50%) scale(.76);
        }
      }

      .birthday-balloons {
        z-index: 620;
      }

      .birthday-ribbons {
        z-index: 640;
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
        transform: translate3d(0, 0, 0) rotate(var(--rot-start, -6deg));
        animation: birthdayBalloonRise var(--dur, 11.8s) cubic-bezier(.27,.62,.2,1) forwards;
        will-change: transform, opacity;
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
          transform: translate3d(0, 0, 0) rotate(var(--rot-start, -6deg));
        }

        10% {
          opacity: .86;
          transform: translate3d(calc(var(--drift, 0px) * .08), -10vh, 0) rotate(calc(var(--rot-start, -6deg) + 2deg));
        }

        55% {
          opacity: .95;
          transform: translate3d(calc(var(--drift, 0px) * .48), -58vh, 0) rotate(var(--rot-mid, 6deg));
        }

        84% {
          opacity: .62;
          transform: translate3d(calc(var(--drift, 0px) * .82), -96vh, 0) rotate(calc(var(--rot-mid, 6deg) + 2deg));
        }

        100% {
          opacity: 0;
          transform: translate3d(var(--drift, 0px), -122vh, 0) rotate(var(--rot-end, 10deg));
        }
      }

      .birthday-ribbon {
        position: absolute;
        top: -14vh;
        left: var(--x, 50%);
        width: var(--w, 10px);
        height: var(--h, 22px);
        border-radius: 4px;
        background: linear-gradient(160deg, rgba(255,255,255,.8) 0%, var(--color, #ffd700) 42%, rgba(13,31,45,.2) 100%);
        box-shadow: 0 10px 18px rgba(13,31,45,.16);
        opacity: 0;
        transform: translate3d(0, 0, 0) rotate(var(--spin, 0deg));
        animation: birthdayRibbonFall var(--dur, 6.4s) cubic-bezier(.22,.66,.2,1) forwards;
        will-change: transform, opacity;
      }

      .birthday-ribbon::after {
        content: "";
        position: absolute;
        inset: 2px;
        border-radius: 3px;
        background: linear-gradient(180deg, rgba(255,255,255,.45), rgba(255,255,255,0));
      }

      @keyframes birthdayRibbonFall {
        0% {
          opacity: 0;
          transform: translate3d(0, 0, 0) rotate(var(--spin, 0deg));
        }

        10% {
          opacity: .9;
          transform: translate3d(calc(var(--drift, 0px) * .06), 10vh, 0) rotate(calc(var(--spin, 0deg) + 120deg));
        }

        58% {
          opacity: .92;
          transform: translate3d(calc(var(--drift, 0px) * .58), 62vh, 0) rotate(calc(var(--spin, 0deg) + 560deg));
        }

        84% {
          opacity: .52;
          transform: translate3d(calc(var(--drift, 0px) * .86), 96vh, 0) rotate(calc(var(--spin, 0deg) + 760deg));
        }

        100% {
          opacity: 0;
          transform: translate3d(var(--drift, 0px), 122vh, 0) rotate(calc(var(--spin, 0deg) + 920deg));
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
        animation: birthdaySparkFly .96s cubic-bezier(.2,.72,.28,1) forwards;
        will-change: transform, opacity;
      }

      @keyframes birthdaySparkFly {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(var(--angle, 0deg)) translateY(0) scaleY(.25);
        }

        18% {
          opacity: .95;
          transform: translate(-50%, -50%) rotate(var(--angle, 0deg)) translateY(calc(-0.18 * var(--distance, 34px))) scaleY(.74);
        }

        72% {
          opacity: .56;
          transform: translate(-50%, -50%) rotate(var(--angle, 0deg)) translateY(calc(-0.82 * var(--distance, 34px))) scaleY(1);
        }

        100% {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(var(--angle, 0deg)) translateY(calc(-1 * var(--distance, 34px))) scaleY(1);
        }
      }

      @keyframes birthdayBannerPulse {
        0%,
        100% {
          box-shadow: 0 16px 36px rgba(13,31,45,.16), 0 0 0 rgba(255,193,7,0);
        }

        48% {
          box-shadow: 0 18px 40px rgba(13,31,45,.19), 0 0 0 8px rgba(255,193,7,.12);
        }
      }

      @keyframes birthdayBannerShine {
        0%,
        28% {
          transform: translateX(-140%);
          opacity: 0;
        }

        42% {
          opacity: .82;
        }

        68% {
          transform: translateX(140%);
          opacity: .72;
        }

        100% {
          transform: translateX(140%);
          opacity: 0;
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
          animation: none;
        }

        .birthday-banner::before {
          display: none;
        }

        .birthday-balloons,
        .birthday-fireworks,
        .birthday-atmosphere,
        .birthday-ribbons {
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
    <p class="birthday-banner-message">Happy Birthday, Sabrina! Mommy Sabrina, your light makes every moment glow.</p>
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
    const atmosphereLayer = document.createElement("div");
    atmosphereLayer.className = "birthday-atmosphere";
    atmosphereLayer.setAttribute("aria-hidden", "true");
    body.appendChild(atmosphereLayer);

    const balloonsLayer = document.createElement("div");
    balloonsLayer.className = "birthday-balloons";
    balloonsLayer.setAttribute("aria-hidden", "true");
    body.appendChild(balloonsLayer);

    const ribbonsLayer = document.createElement("div");
    ribbonsLayer.className = "birthday-ribbons";
    ribbonsLayer.setAttribute("aria-hidden", "true");
    body.appendChild(ribbonsLayer);

    const fireworksLayer = document.createElement("div");
    fireworksLayer.className = "birthday-fireworks";
    fireworksLayer.setAttribute("aria-hidden", "true");
    body.appendChild(fireworksLayer);

    spawnAtmosphere(atmosphereLayer);
    spawnBalloonSet(balloonsLayer, fireworksLayer, 0);
    spawnBalloonSet(balloonsLayer, fireworksLayer, 2600);
    spawnFirecrackerSet(fireworksLayer, 0);
    spawnFirecrackerSet(fireworksLayer, 2800);
    spawnRibbonShower(ribbonsLayer, fireworksLayer);
    spawnGrandFinale(fireworksLayer);

    window.setTimeout(() => {
      atmosphereLayer.remove();
      balloonsLayer.remove();
      ribbonsLayer.remove();
      fireworksLayer.remove();
    }, 23200);
  }

  function spawnAtmosphere(layer) {
    if (!layer || !layer.isConnected) return;

    const totalTwinkles = window.matchMedia("(max-width: 760px)").matches ? 14 : 24;

    for (let i = 0; i < totalTwinkles; i += 1) {
      const twinkle = document.createElement("span");
      twinkle.className = "birthday-twinkle";
      twinkle.style.setProperty("--x", `${5 + Math.random() * 90}%`);
      twinkle.style.setProperty("--y", `${8 + Math.random() * 74}%`);
      twinkle.style.setProperty("--size", `${6 + Math.random() * 8}px`);
      twinkle.style.setProperty("--dur", `${3.1 + Math.random() * 2.1}s`);
      twinkle.style.setProperty("--delay", `${Math.round(Math.random() * 1800)}ms`);
      layer.appendChild(twinkle);
    }
  }

  function createBurst(layer, x, y, color, opts = {}) {
    if (!layer || !layer.isConnected) return;

    const burst = document.createElement("span");
    burst.className = "birthday-burst";
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;
    burst.style.setProperty("--spark", color);

    const sparkCount = opts.sparkCount || 10;
    const jitter = opts.jitter || 8;
    const distanceMin = opts.distanceMin || 24;
    const distanceRange = opts.distanceRange || 30;

    for (let s = 0; s < sparkCount; s += 1) {
      const spark = document.createElement("span");
      spark.className = "birthday-spark";
      spark.style.setProperty("--spark", color);

      const angle = s * (360 / sparkCount) + (Math.random() * jitter - jitter / 2);
      spark.style.setProperty("--angle", `${angle}deg`);
      spark.style.setProperty("--distance", `${distanceMin + Math.random() * distanceRange}px`);
      spark.style.animationDelay = `${Math.random() * 160}ms`;
      burst.appendChild(spark);
    }

    layer.appendChild(burst);
    window.setTimeout(() => burst.remove(), 1450);
  }

  function popBalloon(balloon, burstLayer) {
    if (!balloon || !balloon.isConnected) return;

    const rect = balloon.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = Math.max(24, Math.min(window.innerHeight - 24, rect.top + rect.height * 0.35));
    const color = balloon.style.getPropertyValue("--color") || "#ffd700";

    createBurst(burstLayer, x, y, color.trim(), {
      sparkCount: 11,
      jitter: 10,
      distanceMin: 22,
      distanceRange: 36,
    });

    balloon.remove();
  }

  function spawnBalloonSet(layer, burstLayer, startDelay = 0) {
    const palette = ["#ffd700", "#ffe8a3", "#add8e6", "#c9f2ff", "#f8c8dc"];
    const total = window.matchMedia("(max-width: 760px)").matches ? 8 : 14;

    for (let i = 0; i < total; i += 1) {
      const delay = startDelay + 160 + i * 260 + Math.random() * 230;
      window.setTimeout(() => {
        if (!layer.isConnected) return;

        const balloon = document.createElement("span");
        balloon.className = "birthday-balloon";
        balloon.style.left = `${6 + Math.random() * 88}%`;
        balloon.style.setProperty("--size", `${26 + Math.random() * 26}px`);
        const riseDuration = 9.8 + Math.random() * 4.8;
        balloon.style.setProperty("--dur", `${riseDuration}s`);
        balloon.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
        balloon.style.setProperty("--rot-start", `${-10 + Math.random() * 8}deg`);
        balloon.style.setProperty("--rot-mid", `${-2 + Math.random() * 10}deg`);
        balloon.style.setProperty("--rot-end", `${4 + Math.random() * 12}deg`);
        balloon.style.setProperty("--color", palette[Math.floor(Math.random() * palette.length)]);
        layer.appendChild(balloon);

        let popped = false;
        const popDelay = Math.round(riseDuration * 1000 * (0.74 + Math.random() * 0.14));
        const popTimer = window.setTimeout(() => {
          if (!layer.isConnected || !burstLayer.isConnected || popped) return;
          popped = true;
          popBalloon(balloon, burstLayer);
        }, popDelay);

        balloon.addEventListener("animationend", () => {
          window.clearTimeout(popTimer);
          if (!popped) {
            balloon.remove();
          }
        }, { once: true });
      }, delay);
    }
  }

  function spawnRibbonShower(layer, burstLayer) {
    const palette = ["#ffd700", "#ffefb0", "#add8e6", "#7fd8ff", "#f8c8dc"];
    const total = window.matchMedia("(max-width: 760px)").matches ? 26 : 44;

    for (let i = 0; i < total; i += 1) {
      const delay = 280 + i * 120 + Math.random() * 140;
      window.setTimeout(() => {
        if (!layer.isConnected) return;

        const ribbon = document.createElement("span");
        ribbon.className = "birthday-ribbon";
        ribbon.style.setProperty("--x", `${4 + Math.random() * 92}%`);
        ribbon.style.setProperty("--w", `${7 + Math.random() * 7}px`);
        ribbon.style.setProperty("--h", `${18 + Math.random() * 18}px`);
        ribbon.style.setProperty("--dur", `${5.8 + Math.random() * 2.8}s`);
        ribbon.style.setProperty("--drift", `${-96 + Math.random() * 192}px`);
        ribbon.style.setProperty("--spin", `${Math.round(Math.random() * 360)}deg`);
        ribbon.style.setProperty("--color", palette[Math.floor(Math.random() * palette.length)]);
        layer.appendChild(ribbon);

        if (burstLayer && burstLayer.isConnected && Math.random() < 0.15) {
          createBurst(
            burstLayer,
            window.innerWidth * (0.1 + Math.random() * 0.8),
            window.innerHeight * (0.2 + Math.random() * 0.28),
            palette[Math.floor(Math.random() * palette.length)],
            { sparkCount: 8, jitter: 12, distanceMin: 18, distanceRange: 18 }
          );
        }

        ribbon.addEventListener("animationend", () => {
          ribbon.remove();
        }, { once: true });
      }, delay);
    }
  }

  function spawnFirecrackerSet(layer, startDelay = 0) {
    const palette = ["#ffd700", "#ffefb0", "#add8e6", "#87ceeb", "#ffe1f2"];
    const total = window.matchMedia("(max-width: 760px)").matches ? 5 : 8;

    for (let i = 0; i < total; i += 1) {
      const delay = startDelay + 460 + i * 420 + Math.random() * 250;
      window.setTimeout(() => {
        if (!layer.isConnected) return;

        const color = palette[Math.floor(Math.random() * palette.length)];
        createBurst(
          layer,
          window.innerWidth * (0.1 + Math.random() * 0.8),
          window.innerHeight * (0.12 + Math.random() * 0.42),
          color,
          {
            sparkCount: 10 + Math.round(Math.random() * 3),
            jitter: 11,
            distanceMin: 22,
            distanceRange: 30,
          }
        );
      }, delay);
    }
  }

  function spawnGrandFinale(layer) {
    const finalePalette = ["#ffd700", "#ffefb0", "#add8e6", "#f8c8dc"];
    const burstTimes = [12800, 13220, 13680, 14150, 14720, 15300];

    burstTimes.forEach((time, index) => {
      window.setTimeout(() => {
        if (!layer || !layer.isConnected) return;

        createBurst(
          layer,
          window.innerWidth * (0.22 + Math.random() * 0.56),
          window.innerHeight * (0.1 + Math.random() * 0.26),
          finalePalette[index % finalePalette.length],
          {
            sparkCount: 12 + (index % 3),
            jitter: 9,
            distanceMin: 28,
            distanceRange: 34,
          }
        );
      }, time);
    });

    window.setTimeout(() => {
      if (!layer || !layer.isConnected) return;

      createBurst(
        layer,
        window.innerWidth * 0.5,
        window.innerHeight * 0.18,
        "#ffd700",
        {
          sparkCount: 18,
          jitter: 7,
          distanceMin: 34,
          distanceRange: 42,
        }
      );
    }, 16040);
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
