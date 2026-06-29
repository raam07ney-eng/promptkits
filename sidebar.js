(function() {

var SIDEBAR_HTML = `
<div id="pk-toggle" onclick="PKSidebar.toggle()" title="Open Library & Learn">
  <span id="pk-toggle-icon">❮</span>
</div>
<div id="pk-overlay" onclick="PKSidebar.close()"></div>
<div id="pk-sidebar">
  <div id="pk-sidebar-inner">
    <div class="pk-sb-header">
      <a href="/" class="pk-sb-logo">PromptKits</a>
      <button onclick="PKSidebar.close()" class="pk-sb-close">✕</button>
    </div>

    <div class="pk-sb-section">
      <button class="pk-sb-btn" id="pk-btn-library" onclick="PKSidebar.toggleSection('library')">
        <div class="pk-sb-btn-left"><span>📚</span> Library</div>
        <span class="pk-sb-chev" id="pk-chev-library">▼</span>
      </button>
      <div class="pk-sb-drop" id="pk-drop-library">

        <button class="pk-sb-sub-btn" id="pk-btn-image" onclick="PKSidebar.toggleSection('image')">
          <div class="pk-sb-btn-left" style="padding-left:8px;"><span>🖼</span> Image prompts</div>
          <span class="pk-sb-chev" id="pk-chev-image">▼</span>
        </button>
        <div class="pk-sb-drop" id="pk-drop-image">
          <a class="pk-sb-item" href="/100-midjourney-portrait-prompts.html">Portrait prompts <span class="pk-sb-count">100</span></a>
          <a class="pk-sb-item" href="/100-food-photography-ai-prompts.html">Food photography <span class="pk-sb-count">100</span></a>
          <a class="pk-sb-item" href="/50-wedding-cinematic-ai-prompts.html">Wedding cinematic <span class="pk-sb-count">50</span></a>
          <a class="pk-sb-item" href="/100-portrait-lighting-ai-prompts.html">Portrait lighting <span class="pk-sb-count">100</span></a>
        </div>

        <button class="pk-sb-sub-btn" id="pk-btn-video" onclick="PKSidebar.toggleSection('video')">
          <div class="pk-sb-btn-left" style="padding-left:8px;"><span>🎬</span> Video prompts</div>
          <span class="pk-sb-chev" id="pk-chev-video">▼</span>
        </button>
        <div class="pk-sb-drop" id="pk-drop-video">
          <a class="pk-sb-item" href="/100-cinematic-ai-video-prompts.html">Cinematic video <span class="pk-sb-count">100</span></a>
          <a class="pk-sb-item" href="/50-horror-ai-video-prompts.html">Horror scenes <span class="pk-sb-count">50</span></a>
          <a class="pk-sb-item" href="/100-drone-shot-prompts.html">Drone shots <span class="pk-sb-count">100</span></a>
          <a class="pk-sb-item" href="/100-scifi-ai-video-prompts.html">Sci-fi video <span class="pk-sb-count">100</span></a>
          <a class="pk-sb-item" href="/100-nature-wildlife-ai-prompts.html">Nature & wildlife <span class="pk-sb-count">100</span></a>
        </div>

      </div>
    </div>

    <div class="pk-sb-divider"></div>

    <div class="pk-sb-section">
      <button class="pk-sb-btn" id="pk-btn-learn" onclick="PKSidebar.toggleSection('learn')">
        <div class="pk-sb-btn-left"><span>🎓</span> Learn</div>
        <span class="pk-sb-chev" id="pk-chev-learn">▼</span>
      </button>
      <div class="pk-sb-drop" id="pk-drop-learn">
        <a class="pk-sb-item" href="/learn.html#beginner">Beginner guide <span class="pk-sb-count">4</span></a>
        <a class="pk-sb-item" href="/learn.html#intermediate">Camera & lighting <span class="pk-sb-count">4</span></a>
        <a class="pk-sb-item" href="/learn.html#advanced">Advanced <span class="pk-sb-count">2</span></a>
        <a class="pk-sb-item" href="/learn.html#consistency">Consistency <span class="pk-sb-count">3</span></a>
        <a class="pk-sb-item" href="/learn.html#tools">Tool guides <span class="pk-sb-count">4</span></a>
      </div>
    </div>

    <div class="pk-sb-divider"></div>

    <div class="pk-sb-footer">
      <a href="/image-prompt.html" class="pk-sb-tool-link">🖼 Image generator</a>
      <a href="/video-prompt.html" class="pk-sb-tool-link">🎬 Video generator</a>
      <a href="/enhancer.html" class="pk-sb-tool-link">✨ Prompt enhancer</a>
      <a href="/negative-prompt.html" class="pk-sb-tool-link">🚫 Negative prompt</a>
      <a href="/image-to-prompt.html" class="pk-sb-tool-link">🔍 Image to prompt</a>
    </div>

  </div>
</div>`;

var SIDEBAR_CSS = `
#pk-toggle {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 48px;
  background: #a89eff;
  border-radius: 0 8px 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  transition: width 0.2s;
}
#pk-toggle:hover { width: 24px; }
#pk-toggle-icon { font-size: 11px; color: #0d0d14; font-weight: 700; }

#pk-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  z-index: 1000;
}
#pk-overlay.open { display: block; }

#pk-sidebar {
  position: fixed;
  left: -280px;
  top: 0;
  width: 260px;
  height: 100vh;
  background: var(--bg-card, #13131f);
  border-right: 1px solid var(--border-card, rgba(255,255,255,0.08));
  z-index: 1001;
  transition: left 0.25s ease;
  overflow-y: auto;
  font-family: 'Inter', sans-serif;
}
#pk-sidebar.open { left: 0; }

#pk-sidebar-inner { padding: 0 0 40px; }

.pk-sb-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-card, rgba(255,255,255,0.08));
}
.pk-sb-logo {
  font-size: 14px;
  font-weight: 700;
  color: #a89eff;
  text-decoration: none;
}
.pk-sb-close {
  background: transparent;
  border: none;
  color: var(--text-secondary, #8888aa);
  font-size: 16px;
  cursor: pointer;
  padding: 4px 8px;
}

.pk-sb-section { padding: 4px 0; }

.pk-sb-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: background 0.15s;
}
.pk-sb-btn:hover { background: var(--bg-adv, rgba(255,255,255,0.04)); }
.pk-sb-btn.open { background: var(--bg-adv, rgba(255,255,255,0.04)); }
.pk-sb-btn-left {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary, #f0eeff);
}
.pk-sb-chev {
  font-size: 10px;
  color: var(--text-muted, #55556a);
  transition: transform 0.2s;
}
.pk-sb-chev.open { transform: rotate(180deg); }

.pk-sb-sub-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 16px 7px 24px;
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: background 0.15s;
}
.pk-sb-sub-btn:hover { background: var(--bg-adv, rgba(255,255,255,0.04)); }
.pk-sb-sub-btn.open { background: var(--bg-adv, rgba(255,255,255,0.04)); }

.pk-sb-drop {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.25s ease;
}
.pk-sb-drop.open { max-height: 500px; }

.pk-sb-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px 6px 40px;
  font-size: 12px;
  color: var(--text-secondary, #8888aa);
  text-decoration: none;
  transition: background 0.1s;
}
.pk-sb-item:hover {
  background: var(--bg-adv, rgba(255,255,255,0.04));
  color: var(--text-primary, #f0eeff);
}
.pk-sb-item.active {
  background: rgba(168,158,255,0.1);
  color: #a89eff;
  font-weight: 500;
}
.pk-sb-count {
  font-size: 10px;
  color: var(--text-muted, #55556a);
  background: rgba(255,255,255,0.05);
  padding: 1px 7px;
  border-radius: 10px;
  flex-shrink: 0;
}

.pk-sb-divider {
  height: 1px;
  background: var(--border-card, rgba(255,255,255,0.08));
  margin: 6px 0;
}

.pk-sb-footer {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.pk-sb-tool-link {
  padding: 6px 8px;
  font-size: 12px;
  color: var(--text-secondary, #8888aa);
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.1s;
}
.pk-sb-tool-link:hover {
  background: var(--bg-adv, rgba(255,255,255,0.04));
  color: var(--text-primary, #f0eeff);
}
`;

var style = document.createElement('style');
style.textContent = SIDEBAR_CSS;
document.head.appendChild(style);

var div = document.createElement('div');
div.innerHTML = SIDEBAR_HTML;
document.body.appendChild(div);

var path = window.location.pathname;
document.querySelectorAll('.pk-sb-item').forEach(function(el) {
  if (el.getAttribute('href') && path.includes(el.getAttribute('href').replace('/', ''))) {
    el.classList.add('active');
  }
});

window.PKSidebar = {
  open: function() {
    document.getElementById('pk-sidebar').classList.add('open');
    document.getElementById('pk-overlay').classList.add('open');
    document.getElementById('pk-toggle-icon').textContent = '❯';
  },
  close: function() {
    document.getElementById('pk-sidebar').classList.remove('open');
    document.getElementById('pk-overlay').classList.remove('open');
    document.getElementById('pk-toggle-icon').textContent = '❮';
  },
  toggle: function() {
    var isOpen = document.getElementById('pk-sidebar').classList.contains('open');
    isOpen ? this.close() : this.open();
  },
  toggleSection: function(key) {
    var drop = document.getElementById('pk-drop-' + key);
    var chev = document.getElementById('pk-chev-' + key);
    var btn  = document.getElementById('pk-btn-' + key);
    var isOpen = drop.classList.contains('open');
    drop.classList.toggle('open', !isOpen);
    if (chev) chev.classList.toggle('open', !isOpen);
    if (btn)  btn.classList.toggle('open', !isOpen);
  }
};

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') PKSidebar.close();
});

if (path.includes('library') || path.includes('learn') || path.includes('prompt-library')) {
  PKSidebar.open();
  PKSidebar.toggleSection('library');
  PKSidebar.toggleSection('image');
}

})();
