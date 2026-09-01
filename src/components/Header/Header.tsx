export function Header() {
  return (
    <header className="site-header shell">
      <a className="brand" href="#main-content" aria-label="What Can My Mac Play? home">
        <span className="brand__mark" aria-hidden="true">
          W<span>?</span>
        </span>
        <span className="brand__name">
          What Can My Mac Play<span>?</span>
        </span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="#sample-library">Sample library</a>
        <a href="#method">Method</a>
        <a
          href="https://github.com/onovich/what-can-my-mac-play"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </nav>
      <span className="status-pill">
        <span aria-hidden="true" /> Research preview
      </span>
    </header>
  )
}
