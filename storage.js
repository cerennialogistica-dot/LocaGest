(function () {
  const PREFIX = 'locagest_v2_';
  window.Store = {
    get(key, fallback = []) {
      try { return JSON.parse(localStorage.getItem(PREFIX + key)) ?? fallback; }
      catch { return fallback; }
    },
    set(key, value) { localStorage.setItem(PREFIX + key, JSON.stringify(value)); },
    remove(key) { localStorage.removeItem(PREFIX + key); },
    id() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  };
})();
