// PromptKits Theme Manager
(function(){
  const STORAGE_KEY = 'pk-theme';
  const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
  applyTheme(saved);

  function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  window.PKTheme = {
    toggle: function(){
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      const btn = document.getElementById('themeBtn');
      if(btn) btn.textContent = next === 'dark' ? '☀️ Light' : '🌙 Dark';
    },
    init: function(){
      const theme = localStorage.getItem(STORAGE_KEY) || 'dark';
      const btn = document.getElementById('themeBtn');
      if(btn) btn.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    }
  };
})();
