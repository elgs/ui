# UI CSS

A pure CSS component library that works with any framework. No build step, no JavaScript dependencies — just drop in a stylesheet and go.

**[Live Demo](https://uilib.dev)** | **[GitHub](https://github.com/az-code-lab/ui)**

## Features

- Pure CSS — no JavaScript required for styling
- Works with any framework (React, Vue, Svelte, vanilla HTML)
- 33 core components + 9 extended components
- 447 icons (pure CSS, no image files)
- 23 built-in themes + dark mode
- Fully customizable via CSS custom properties
- Gradient mode for richer visuals
- No build step — just link the CSS

## Quick Start

Add the stylesheet to your HTML:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/az-code-lab/ui@latest/src/ui.css">
```

Optionally add icons:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/az-code-lab/ui@latest/src/icons.css">
```

Then use any component:

```html
<button class="ui-btn">Click me</button>
<button class="ui-btn success">Save</button>
<button class="ui-btn outline danger">Delete</button>
```

## Components

### Core (ui.css)

| Category | Components |
|---|---|
| **Form controls** | Buttons, Checkboxes, Dropdowns, Inputs, Radios, Sliders, Toggles |
| **Data display** | Accordions, Avatars, Badges, Cards, Numbered Badge, Panels, Status Dots, Tables, Tags |
| **Navigation** | Breadcrumbs, Pagination, Tabs |
| **Feedback** | Alerts, Dialogs, Progress, Skeletons, Spinners, Toasts, Tooltips |
| **Utilities** | Dark Mode, Gradient Mode, Layout Utilities, Icons |

### Extended (uix.css)

| Category | Components |
|---|---|
| **Form controls** | Input OTP |
| **Navigation** | Menu |
| **Data display** | Timeline, Stepper, Code Block, Diff, Empty State, Chat Bubble |
| **Feedback** | Popover |

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/az-code-lab/ui@latest/src/uix.css">
```

## Customization

All colors, spacing, and radii are controlled by CSS custom properties:

```css
:root {
  --ui-primary: #2095f3;
  --ui-secondary: #8590a2;
  --ui-success: #34c379;
  --ui-danger: #f06272;
  --ui-warning: #f5a623;
  --ui-bg: #ffffff;
  --ui-text: #1a1d26;
  --ui-border: #e8ecf1;
  --ui-radius: 6px;
  --ui-font: system-ui, -apple-system, sans-serif;
}
```

Override any property to match your brand:

```css
:root {
  --ui-primary: #6366f1;
  --ui-radius: 12px;
}
```

## Themes

23 built-in themes available as separate CSS files:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/az-code-lab/ui@latest/src/themes/ocean.css">
```

Available themes: ocean, forest, rose, metal, desert, neptune, saturn, jupiter, mars, nord, mercury, gold, silver, copper, fire, ice, wood, olive, young, midnight, sunflower, sky, github.

## Dark Mode

Add `data-theme="dark"` to the root element:

```html
<html data-theme="dark">
```

Or toggle it with JavaScript:

```js
document.documentElement.setAttribute('data-theme', 'dark');
```

## Gradient Mode

Add `data-ui-gradient` for gradient-enhanced buttons and components:

```html
<html data-ui-gradient>
```

## Icons

447 icons available as pure CSS classes:

```html
<i class="ui-icon ui-icon-home"></i>
<i class="ui-icon ui-icon-settings"></i>
<i class="ui-icon ui-icon-search"></i>
```

Icons inherit `color` and `font-size` from their parent, and support size variants: `sm`, `lg`, `xl`.

Browse the full catalog at [uilib.dev/icons.html](https://uilib.dev/icons.html).

## Sizing

Most components support `sm` and `lg` size variants:

```html
<button class="ui-btn sm">Small</button>
<button class="ui-btn">Default</button>
<button class="ui-btn lg">Large</button>

<input class="ui-input sm" placeholder="Small">
<input class="ui-input" placeholder="Default">
<input class="ui-input lg" placeholder="Large">
```

## Browser Support

Evergreen browsers (Chrome, Firefox, Safari, Edge).

## License

See the repository for license details.