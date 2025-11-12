# iblokz-snabbdom-helpers

[![npm version](https://img.shields.io/npm/v/iblokz-snabbdom-helpers.svg)](https://www.npmjs.com/package/iblokz-snabbdom-helpers)
[![CI](https://github.com/iblokz/snabbdom-helpers/workflows/CI/badge.svg)](https://github.com/iblokz/snabbdom-helpers/actions)
[![codecov](https://codecov.io/gh/iblokz/snabbdom-helpers/branch/master/graph/badge.svg)](https://codecov.io/gh/iblokz/snabbdom-helpers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.12.0-brightgreen)](https://nodejs.org/)

Snabbdom virtual DOM helpers with enhanced hyperscript syntax sugar, providing convenient shortcuts for HTML elements and attribute selectors.

Part of the **iblokz** family of functional utilities, designed to work seamlessly with [snabbdom](https://github.com/snabbdom/snabbdom), [iblokz-data](https://github.com/iblokz/data), and [RxJS](https://rxjs.dev/).

## Features

- 🏷️ **HTML Tag Helpers** - Convenient functions for all HTML elements (div, span, input, etc.)
- 🎨 **Enhanced Selectors** - Support for CSS-style selectors including classes, IDs, and attributes
- 📡 **RxJS Integration** - `patchStream` for reactive virtual DOM updates
- 🔧 **Attribute Syntax** - Parse attributes from selectors: `input('[type=email][required=true]')`
- 📦 **Modern ESM/CJS** - Dual module format with TypeScript definitions
- ⚡ **Snabbdom 3.x** - Built on the latest version with all standard modules
- ✅ **Well-tested** - 17 tests with 98.61% coverage

## Installation

**Requirements:** Node.js ≥ 18.12.0

```bash
npm install iblokz-snabbdom-helpers
# or
pnpm install iblokz-snabbdom-helpers
```

## Usage

This library is published as **ESM-first** with a CommonJS build for compatibility.

### Basic Example

```javascript
import {div, span, button, h, patch} from 'iblokz-snabbdom-helpers';

// Create vnodes using tag helpers
const vnode = div([
  h1('Hello World'),
  p('This is a paragraph'),
  button('Click me!')
]);

// Patch to DOM
const container = document.getElementById('app');
patch(container, vnode);
```

### Enhanced Selector Syntax

```javascript
import {div, input, button} from 'iblokz-snabbdom-helpers';

// Classes and IDs
const vnode = div('#app.container.main', [
  input('.form-control#email'),
  button('.btn.btn-primary')
]);

// Attribute selectors
const emailInput = input('[type=email][name=email][required=true]');
const checkbox = input('[type=checkbox][checked=true]');
```

### Reactive Patching with RxJS

```javascript
import {div, h, patchStream} from 'iblokz-snabbdom-helpers';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

const count$ = new BehaviorSubject(0);

// Create vnode stream
const vnode$ = count$.pipe(
  map(count => div([
    h('h1', `Count: ${count}`),
    button('.btn', {on: {click: () => count$.next(count + 1)}}, 'Increment')
  ]))
);

// Patch stream to DOM
patchStream(vnode$, '#app');
```

### Nested Components

```javascript
import {div, h1, h2, p, section, article} from 'iblokz-snabbdom-helpers';

const header = () => 
  section('.header', [
    h1('My App'),
    p('.subtitle', 'A simple example')
  ]);

const content = (data) =>
  article('.content', data.items.map(item =>
    div('.item', [
      h2(item.title),
      p(item.description)
    ])
  ));

const app = (data) =>
  div('#app', [
    header(),
    content(data)
  ]);
```

## API

### HTML Tag Helpers

All standard HTML5 tags are available as helper functions:

```javascript
a, abbr, address, area, article, aside, audio, b, base, bdi, bdo, 
blockquote, body, br, button, canvas, caption, cite, code, col, 
colgroup, data, datalist, dd, del, details, dfn, dialog, div, dl, 
dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, 
h3, h4, h5, h6, head, header, hgroup, hr, html, i, iframe, img, 
input, ins, kbd, label, legend, li, link, main, map, mark, menu, 
meta, meter, nav, noscript, object, ol, optgroup, option, output, 
p, picture, pre, progress, q, rp, rt, ruby, s, samp, script, 
search, section, select, slot, small, source, span, strong, style, 
sub, summary, sup, table, tbody, td, template, textarea, tfoot, 
th, thead, time, title, tr, track, u, ul, video, wbr
```

Each helper can be called with:
- **Text**: `div('Hello')`
- **Selector + Text**: `div('.class#id', 'Hello')`
- **Data + Children**: `div({class: {active: true}}, [...])`
- **Selector + Data + Children**: `div('.class', {props: {value: 'x'}}, [...])`

### Core Functions

#### `h(selector, data?, children?)`
Direct access to snabbdom's hyperscript function.

```javascript
import {h} from 'iblokz-snabbdom-helpers';

const vnode = h('div.class', {props: {id: 'test'}}, 'Content');
```

#### `patch(oldVnode, newVnode)`
Patch function with all standard snabbdom modules.

```javascript
import {patch, div} from 'iblokz-snabbdom-helpers';

const container = document.getElementById('app');
const vnode = div('Hello');
const patched = patch(container, vnode);

// Update
const newVnode = div('World');
patch(patched, newVnode);
```

#### `patchStream(stream$, element)`
Patch an observable stream of vnodes to a DOM element.

```javascript
import {patchStream} from 'iblokz-snabbdom-helpers';
import {interval} from 'rxjs';
import {map} from 'rxjs/operators';

const vnode$ = interval(1000).pipe(
  map(n => div(`Count: ${n}`))
);

patchStream(vnode$, '#app');
```

### Attribute Selector Syntax

Parse attributes directly from selectors:

```javascript
// These produce vnodes with attributes
input('[type=text][name=username][placeholder="Enter name"]')
button('[type=submit][disabled=true]')
a('[href="/home"][target=_blank]')

// Type parsing
input('[age=25]')           // {attrs: {age: 25}} (number)
input('[required=true]')    // {attrs: {required: true}} (boolean)
input('[value="hello"]')    // {attrs: {value: "hello"}} (string)
```

### Modules Included

The library initializes snabbdom with these modules:
- **class** - Toggle classes
- **props** - Set DOM properties
- **attributes** - Set DOM attributes
- **style** - Styling with animation support
- **eventListeners** - Attach event listeners

## TypeScript

Full TypeScript definitions are included:

```typescript
import {div, h, patch, patchStream, VNode} from 'iblokz-snabbdom-helpers';
import {Observable} from 'rxjs';

const vnode: VNode = div('Hello');
const stream$: Observable<VNode> = ...;
patchStream(stream$, '#app');
```

## Migration from 1.x

Version 2.0 includes breaking changes:

### Updated Dependencies
- **snabbdom**: 0.6.x → 3.6.x (ESM, new API)
- **rxjs**: Added as dependency (7.8.x)
- **html-tags**: 2.x → 5.x
- **iblokz-data**: 1.1.x → 1.6.x

### Module Format
- Now **ESM-first** with CJS build
- Use named imports: `import {div, h} from 'iblokz-snabbdom-helpers'`
- CommonJS still supported: `const {div, h} = require('iblokz-snabbdom-helpers')`

### API Changes
- `patchStream` now uses RxJS `pipe()` and `scan()` operators
- Module imports updated to snabbdom 3.x format

### Node.js Requirement
- Minimum Node.js version: 18.12.0 (was previously lower)

## Examples

Check the `test/` directory for comprehensive usage examples including:
- Basic vnode creation
- Selector syntax variations
- Attribute parsing
- DOM patching
- Reactive streams

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Build CJS bundle
pnpm build

# Lint
pnpm lint
```

## Related Projects

- [snabbdom](https://github.com/snabbdom/snabbdom) - The virtual DOM library
- [iblokz-data](https://github.com/iblokz/data) - Immutable data utilities
- [iblokz-state](https://github.com/iblokz/state) - State management with RxJS

## License

MIT © [iblokz](https://github.com/iblokz)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

