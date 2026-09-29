export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary px-6">
      <p className="label-text text-accent mb-4">404</p>
      <h1 className="text-display-md font-light tracking-tight text-text-primary mb-6">
        Page not found.
      </h1>
      <a
        href="/"
        className="text-sm font-mono tracking-widest uppercase text-text-secondary hover:text-accent transition-colors border-b border-border hover:border-accent pb-0.5"
      >
        ← Back to home
      </a>
    </div>
  )
}
