// Shared theme logic for UI Library
(function() {
  var lightDefaults = {
    primary: '#2095f3', secondary: '#8590a2', success: '#34c379',
    danger: '#f06272', warning: '#f5a623', bg: '#ffffff', text: '#1a1d26',
  };
  var darkDefaults = {
    primary: '#4dabf7', secondary: '#8590a2', success: '#51cf96',
    danger: '#ff7b8a', warning: '#ffc048', bg: '#1a1d26', text: '#e4e6eb',
  };
  var semanticColors = ['primary', 'secondary', 'success', 'danger', 'warning'];
  var html = document.documentElement;
  var modeOrder = ['system', 'light', 'dark'];

  function relativeLuminance(hex) {
    var r = parseInt(hex.slice(1,3),16)/255, g = parseInt(hex.slice(3,5),16)/255, b = parseInt(hex.slice(5,7),16)/255;
    function toLinear(v) { return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); }
    return 0.2126*toLinear(r) + 0.7152*toLinear(g) + 0.0722*toLinear(b);
  }

  function contrastText(hex) {
    return relativeLuminance(hex) > 0.4 ? '#1a1d26' : '#ffffff';
  }

  function resolveMode(m) {
    if (m === 'system') return window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
    return m;
  }

  function applyCustomColors(isDark) {
    var defaults = isDark ? darkDefaults : lightDefaults;
    var root = html.style;

    // Clear previous custom properties
    var names = Object.keys(lightDefaults);
    for (var i = 0; i < names.length; i++) {
      root.removeProperty('--ui-' + names[i]);
      if (semanticColors.indexOf(names[i]) !== -1) root.removeProperty('--ui-' + names[i] + '-text');
    }
    root.removeProperty('--ui-surface');
    root.removeProperty('--ui-bg-subtle');

    // Skip custom color overrides when a named theme is active
    if (html.getAttribute('data-ui-theme')) return;

    // Apply saved custom colors
    try {
      var saved = localStorage.getItem('ui-custom-colors');
      if (saved) {
        var colors = JSON.parse(saved);
        var keys = Object.keys(colors);
        for (var j = 0; j < keys.length; j++) {
          var name = keys[j];
          var hex = colors[name];
          if (hex !== defaults[name]) {
            root.setProperty('--ui-' + name, hex);
            if (semanticColors.indexOf(name) !== -1) root.setProperty('--ui-' + name + '-text', contrastText(hex));
            if (name === 'bg') {
              root.setProperty('--ui-surface', hex);
              var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
              var shift = isDark ? 12 : 8;
              function adj(v) { return Math.max(0, Math.min(255, v - shift)); }
              root.setProperty('--ui-bg-subtle', '#' + [r,g,b].map(function(v) { return adj(v).toString(16).padStart(2,'0'); }).join(''));
            }
          }
        }
      }
    } catch(e) {}
  }

  var themeIcons = {
    system: '<i class="ui-icon ui-icon-monitor"></i>',
    light:  '<i class="ui-icon ui-icon-sun"></i>',
    dark:   '<i class="ui-icon ui-icon-moon"></i>'
  };

  function applyThemeMode(mode) {
    window.__uiThemeMode = mode;
    var isDark = resolveMode(mode) === 'dark';
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
    try { localStorage.setItem('ui-theme-mode', mode); } catch(e) {}
    applyCustomColors(isDark);
    // Update toggle button icon
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.innerHTML = themeIcons[mode] || themeIcons.system;
      btn.setAttribute('data-tooltip', 'Theme: ' + mode);
    }
  }

  // Named theme support
  function setTheme(name) {
    if (name) {
      html.setAttribute('data-ui-theme', name);
    } else {
      html.removeAttribute('data-ui-theme');
    }
    try {
      localStorage.setItem('ui-theme', name || '');
      localStorage.removeItem('ui-custom-colors');
    } catch(e) {}
    // Re-apply current mode to clear inline overrides
    applyThemeMode(window.__uiThemeMode || 'system');
  }

  function getTheme() {
    return html.getAttribute('data-ui-theme') || '';
  }

  // Restore saved theme BEFORE applying mode so applyCustomColors sees it
  try {
    var savedTheme = localStorage.getItem('ui-theme');
    if (savedTheme) html.setAttribute('data-ui-theme', savedTheme);
  } catch(e) {}

  // Initialize on load
  var savedMode = 'system';
  try { savedMode = localStorage.getItem('ui-theme-mode') || 'system'; } catch(e) {}
  applyThemeMode(savedMode);

  // Follow system changes
  try {
    window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change', function() {
      if (window.__uiThemeMode === 'system') applyThemeMode('system');
    });
  } catch(e) {}

  // Bind toggle button
  var btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', function() {
      var current = window.__uiThemeMode || 'system';
      var idx = modeOrder.indexOf(current);
      var next = modeOrder[(idx + 1) % 3];
      applyThemeMode(next);
    });
  }

  // Expose for docs page
  window.__uiTheme = {
    applyMode: applyThemeMode,
    applyCustomColors: applyCustomColors,
    resolveMode: resolveMode,
    contrastText: contrastText,
    lightDefaults: lightDefaults,
    darkDefaults: darkDefaults,
    semanticColors: semanticColors,
    setTheme: setTheme,
    getTheme: getTheme,
  };
})();
