# React Window Library – Read Me

## Overview

A lightweight desktop-style window manager built with:

- **React**
- **Zustand** (isolated state per window)
- A shared **WorkspaceLayout**
- Independent **WindowLayout** instances
- External **WindowButton** controllers

Each window instance is fully isolated, draggable, dockable, and externally controllable via its own store.

---

## 1. Create a Window Store

Initialize a window instance early (module scope recommended):

```ts
const myWindow = createWindowStore('window-my-id')
```

- The ID must be unique.
- The return value is a standard Zustand hook.
- Each window is automatically registered internally.

You can create multiple windows:

```ts
const firstWindow = createWindowStore('window-first')
const secondWindow = createWindowStore('window-second')
```

---

## 2. Wrap Everything in `WorkspaceLayout`

All windows must be rendered inside a shared workspace:

```tsx
<WorkspaceLayout>
  {/* WindowLayout components */}
</WorkspaceLayout>
```

The workspace acts as:

- The rendering surface  
- The stacking context  
- The coordinate system for all windows  

---

## 3. Render a Window

Use `WindowLayout` and pass:

- `useWindowStore` → the store instance  
- `windowName` → title (string or ReactNode)  
- `defaultDock` → initial docking behavior (optional) 

```tsx
<WindowLayout
  useWindowStore={myWindow}
  windowName="My Window"
  defaultDock="right"
>
  <div>Any React content</div>
</WindowLayout>
```

Supported docking modes:

- `"left"`
- `"right"`
- `"full"`

Responsive docking can be computed:

```tsx
defaultDock={window.innerWidth < 800 ? 'full' : 'left'}
```

---

## 4. Control a Window with `WindowButton`

Place a control button anywhere in your UI:

```tsx
<WindowButton useWindowStore={myWindow}>
  <p>Open Window</p>
</WindowButton>
```

- Multiple buttons can control the same window.
- Buttons are fully decoupled from layout.
- No prop drilling is required.

---

## 5. Access Window State

Since the store is a standard Zustand hook, you can read window state directly:

```ts
const { isDragging, isResizing } = myWindow()
```

Example use case:

```tsx
className={
  isDragging || isResizing
    ? 'pointer-events-none'
    : 'pointer-events-auto'
}
```

This is useful when embedding iframes or other complex interactive content.

---

## 6. Access via Registry (Optional)

Windows are also registered globally by ID:

```ts
const { isOpen } = windowRegistry['window-my-id']()
```

This is useful when you do not have direct access to the original store reference.

---

## Architecture Summary

- `createWindowStore(id)` → creates isolated window state  
- `WorkspaceLayout` → shared window surface  
- `WindowLayout` → draggable and dockable container  
- `WindowButton` → external controller  
- Zustand → reactive state management  

---

## Design Principles

- Fully decoupled window instances  
- No global prop chains  
- Arbitrary React content support (apps, iframes, components)  
- Independent lifecycle per window  
- Scalable to many concurrent windows  

This enables building browser-based desktop-style interfaces with minimal setup and clean separation of concerns.