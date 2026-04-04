// ── Clipboard helpers ──

function copyText(text, btn) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  const container = btn.closest('dialog') || document.body;
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
  container.appendChild(ta);
  ta.focus();
  ta.select();
  document.execCommand('copy');
  container.removeChild(ta);
  return Promise.resolve();
}

function copyCode(btn) {
  const pre = btn.closest('pre') || btn.closest('.demo-code, .ui-dialog-body').querySelector('pre');
  const parent = btn.parentNode;
  const nextSibling = btn.nextSibling;
  btn.remove();
  const text = pre.textContent;
  if (parent) parent.insertBefore(btn, nextSibling);
  copyText(text, btn).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 1500);
  });
}

// ── Dialog helpers ──

function openDialog(id) {
  document.getElementById(id).classList.add('open');
}

function closeDialog(id) {
  document.getElementById(id).classList.remove('open');
}

// ── Dropdown toggle ──

function toggleDropdown(id) {
  const dd = document.getElementById(id);
  document.querySelectorAll('.ui-dropdown.open').forEach(d => {
    if (d.id !== id) d.classList.remove('open');
  });
  dd.classList.toggle('open');
}

// ── Tab switcher ──

function switchTab(tabsId, index) {
  const tabs = document.getElementById(tabsId);
  tabs.querySelectorAll('.ui-tab-list .ui-tab').forEach((t, i) => t.classList.toggle('active', i === index));
  tabs.querySelectorAll('.ui-tab-panel').forEach((p, i) => p.classList.toggle('active', i === index));
}

// ── Autocomplete helpers ──

function acGetVisible(ac) {
  return [...ac.querySelectorAll('.ui-dropdown-item:not(.hidden)')];
}

function acClearFocus(ac) {
  ac.querySelectorAll('.ui-dropdown-item.focused').forEach(i => i.classList.remove('focused'));
}

function filterAutocomplete(id) {
  const ac = document.getElementById(id);
  const query = ac.querySelector('.ui-autocomplete-input').value.toLowerCase();
  const items = ac.querySelectorAll('.ui-dropdown-item');
  let visible = 0;
  items.forEach(item => {
    const match = item.textContent.toLowerCase().includes(query);
    item.classList.toggle('hidden', !match);
    if (match) ++visible;
  });
  ac.querySelector('.ui-autocomplete-empty').classList.toggle('visible', visible === 0);
  acClearFocus(ac);
  ac.classList.add('open');
}

function pickAutocomplete(btn) {
  const ac = btn.closest('.ui-autocomplete');
  const input = ac.querySelector('.ui-autocomplete-input');
  input.value = btn.textContent.trim();
  acClearFocus(ac);
  ac.querySelectorAll('.ui-dropdown-item.selected').forEach(i => i.classList.remove('selected'));
  btn.classList.add('selected');
  ac.classList.remove('open');
  ac.classList.add('has-value');
}

function clearAutocomplete(btn) {
  const ac = btn.closest('.ui-autocomplete');
  const input = ac.querySelector('.ui-autocomplete-input');
  input.value = '';
  ac.classList.remove('has-value');
  ac.querySelectorAll('.ui-dropdown-item').forEach(i => i.classList.remove('hidden', 'focused', 'selected'));
  ac.querySelector('.ui-autocomplete-empty').classList.remove('visible');
  ac.classList.remove('open');
  input.focus();
}

// ── Install snippet: CDN copy buttons ──

(function() {
  const cdnBase = 'https://cdn.jsdelivr.net/gh/az-code-lab/ui@';

  window.__uiUpdateSnippets = function(version) {
    window.__uiCdnVersion = version;
    document.querySelectorAll('.install-snippet[data-cdn-file]').forEach(el => {
      const url = cdnBase + version + '/src/' + el.dataset.cdnFile;
      el.dataset.copyTag = '<link rel="stylesheet" href="' + url + '">';
      el.dataset.copyUrl = url;
      const fileSpan = el.querySelector('.hl-file');
      if (fileSpan) fileSpan.textContent = url;
      el.querySelectorAll('.copy-btn').forEach(btn => {
        btn.dataset.tooltip = btn.dataset.copyType === 'url' ? url : el.dataset.copyTag;
      });
    });
  };

  document.querySelectorAll('.install-snippet[data-cdn-file]').forEach(el => {
    el.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.copyType;
        copyText(type === 'url' ? el.dataset.copyUrl : el.dataset.copyTag, btn);
        const icon = btn.querySelector('.ui-icon');
        const origClass = icon.className;
        icon.className = 'ui-icon ui-icon-check';
        btn.classList.add('copied');
        setTimeout(() => {
          icon.className = origClass;
          btn.classList.remove('copied');
        }, 1500);
      });
    });
  });

  fetch('version.json')
    .then(r => r.json())
    .then(data => window.__uiUpdateSnippets(data.version))
    .catch(() => {});
})();
