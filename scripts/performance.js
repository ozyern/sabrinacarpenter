(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
  const lowMem = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
  const saveData = !!(navigator.connection && navigator.connection.saveData);

  const perfMode = reducedMotion || coarsePointer || lowCpu || lowMem || saveData;
  window.__SAB_PERF_MODE__ = perfMode;

  if (!perfMode) {
    return;
  }

  document.documentElement.classList.add('perf-mode');
  document.documentElement.style.scrollBehavior = 'auto';

  let scrollTimer = 0;
  window.addEventListener('scroll', () => {
    document.documentElement.classList.add('is-scrolling');
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
      document.documentElement.classList.remove('is-scrolling');
    }, 140);
  }, { passive: true });
})();
