import { Terminal } from 'lucide-react'

export default function ReadMe() {
  return (
    <div className="w-full h-full p-6 md:p-10 flex justify-center">
      <section className="max-w-xl w-full flex flex-col gap-12">
        {/* Read me Section */}
        <section className="border-t border-zinc-200 pt-8">
          <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <Terminal size={14} /> READ ME
          </h2>

          <div className="flex flex-col gap-6 text-zinc-600 text-sm leading-relaxed">
            {/* Overview */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-zinc-800">React Window Manager</h3>
              <p>
                A lightweight window manager built with React and Zustand. Each window instance is
                fully isolated, draggable, dockable, and externally controllable via its own store.
              </p>
            </div>

            {/* Step 1 */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-zinc-800">1. Create a Window Store</h3>
              <pre className="bg-zinc-100 p-3 rounded-md overflow-x-auto text-xs">
                {`const myWindow = createWindowStore('window-my-id')`}
              </pre>
              <p>
                The ID must be unique. The return value is a standard Zustand hook and is
                automatically registered internally.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-zinc-800">2. Wrap with WorkspaceLayout</h3>
              <pre className="bg-zinc-100 p-3 rounded-md overflow-x-auto text-xs">
                {`<WorkspaceLayout>
  {/* WindowLayout components */}
</WorkspaceLayout>`}
              </pre>
              <p>
                The workspace acts as the rendering surface and stacking context for all windows.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-zinc-800">3. Render a Window</h3>
              <pre className="bg-zinc-100 p-3 rounded-md overflow-x-auto text-xs">
                {`<WindowLayout
  useWindowStore={myWindow}
  windowName="My Window"
  defaultDock="right"
>
  <div>Any content</div>
</WindowLayout>`}
              </pre>
              <p>
                Windows accept arbitrary React content (apps, iframes, components). Supported
                deafult docking: <span className="font-mono">left</span>,{' '}
                <span className="font-mono">right</span>, <span className="font-mono">full</span>.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-zinc-800">4. Control with WindowButton</h3>
              <pre className="bg-zinc-100 p-3 rounded-md overflow-x-auto text-xs">
                {`<WindowButton useWindowStore={myWindow}>
  <p>Open Window</p>
</WindowButton>`}
              </pre>
              <p>
                Buttons can be placed anywhere and can control the same window from multiple
                locations.
              </p>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-zinc-800">5. Access Window State</h3>
              <pre className="bg-zinc-100 p-3 rounded-md overflow-x-auto text-xs">
                {`const { isDragging, isResizing } = myWindow()`}
              </pre>
              <p>
                Because the store is a standard Zustand hook, window state can be used for
                conditional UI logic (e.g., disabling pointer events during drag).
              </p>
            </div>

            {/* Architecture */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-zinc-800">Architecture</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-mono">createWindowStore(id)</span> - isolated state per
                  window
                </li>
                <li>
                  <span className="font-mono">WorkspaceLayout</span> - shared render surface
                </li>
                <li>
                  <span className="font-mono">WindowLayout</span> - draggable/dockable container
                </li>
                <li>
                  <span className="font-mono">WindowButton</span> - external controller
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer Info */}
        <footer className="mt-auto pt-8 pb-4 text-[10px] text-zinc-400 uppercase tracking-widest flex justify-between items-center">
          <span>Last Updated: Mar 2026</span>
          <div className="flex gap-4">
            <a
              target="_blank"
              href="https://github.com/Gustavolmo/react-window-manager"
              className="hover:text-zinc-900 transition-colors"
            >
              GitHub
            </a>
          </div>
        </footer>
      </section>
    </div>
  )
}
