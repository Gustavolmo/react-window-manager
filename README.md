# React Window Manager (RWM)

A flexible window management system for React applications.

---

## INSTALL RWM

### 1. Install Dependencies

Install React Window Manager along with React and React DOM.

React and React DOM (v19+) are peer dependencies.

```bash
pnpm add @gustavolmo/react-window-manager
pnpm add react react-dom
```

```bash
npm install @gustavolmo/react-window-manager
npm install react react-dom
```

```bash
yarn add @gustavolmo/react-window-manager
yarn add react react-dom
```

---

### 2. Import Default Styles

The library includes its own compiled CSS. Import it once at your application root:

```ts
import "@gustavolmo/react-window-manager/index.css"
```

---

## QUICK START

### 1. Create a Window

Call `createWindowStore()` to create a new window instance.

```ts
const myWindow1 = createWindowStore()
const myWindow2 = createWindowStore()
```

Each instance contains everything needed to render and control a window.

---

### 2. Render the Window

All windows must be rendered inside `WorkspaceLayout`.

This component acts as:

* The rendering surface
* The coordinate system
* The stacking context for all windows

```tsx
import { WorkspaceLayout } from "@gustavolmo/react-window-manager"

// ...

<WorkspaceLayout>
  {/* any valid code */}

<myWindow1.Window>
{/* any valid code */}
</myWindow1.Window>

<myWindow2.Window>
{/* any valid code */}
</myWindow2.Window> </WorkspaceLayout>
```

---

### 3. Adjusting the Workspace Layout

By default, the workspace layout is fixed with full width and height. You can override this using `className`.

All windows will adjust their coordinates accordingly.

To prevent visual overflow outside the workspace layout, elements placed outside must have a higher `z-index` than the total number of windows.

Example:

```tsx
// Example with Tailwind (regular CSS also works)

<section className="fixed w-full h-full flex flex-col">
  <WorkspaceLayout className="h-full w-full grow">
    {/* any valid code */}
  </WorkspaceLayout>

  <nav className="w-full h-12 bg-neutral-900 flex gap-2 px-4 z-50">
    {/* any valid code */}
  </nav>
</section>
\`\`\`

---

### 4. Control the Window

Use the `.Button` property from the window store to control visibility.

Buttons can be placed anywhere and can control the same window from multiple locations.

```tsx
<myWindow1.Button>
{/* any valid code */}
</myWindow1.Button>
```

---

### 5. Defaults

The default setup includes:

* Built-in styling
* Docking panel
* Resize edge detection

No additional configuration is required for basic usage.

---

## FURTHER READING

For advanced usage patterns and API details:

* Usage Patterns
* RWM API Reference

---

## Documentation

Full documentation:
https://gustavolmo.github.io/react-window-manager/
