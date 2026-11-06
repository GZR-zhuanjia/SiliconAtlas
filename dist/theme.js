(() => {
  const storageKey = 'silicon-theme';
  const controls = '[data-theme-select]';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const valid = (value) => value === 'system' || value === 'light' || value === 'dark';
  let preference = 'system';

  try {
    const saved = localStorage.getItem(storageKey);
    if (valid(saved)) preference = saved;
  } catch { /* The theme still works when storage is unavailable. */ }

  const apply = () => {
    const effective = preference === 'system' ? (system.matches ? 'dark' : 'light') : preference;
    document.documentElement.dataset.theme = effective;
    for (const control of document.querySelectorAll(controls)) control.value = preference;
  };

  apply();
  document.addEventListener('DOMContentLoaded', apply, { once: true });
  document.addEventListener('change', (event) => {
    if (!event.target.matches(controls) || !valid(event.target.value)) return;
    preference = event.target.value;
    try { localStorage.setItem(storageKey, preference); } catch { /* Keep the choice for this page. */ }
    apply();
  });

  const followSystem = () => { if (preference === 'system') apply(); };
  if (system.addEventListener) system.addEventListener('change', followSystem);
  else system.addListener(followSystem);

  window.addEventListener('storage', (event) => {
    if (event.key !== storageKey && event.key !== null) return;
    try { if (event.storageArea !== localStorage) return; } catch { return; }
    preference = valid(event.newValue) ? event.newValue : 'system';
    apply();
  });
})();
