import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: "[]",
    title: "Elegant command center",
    description: "Monitor stock, value, and category movement from one polished control room designed for speed.",
  },
  {
    icon: "o",
    title: "Low-stock visibility",
    description: "Spot weak inventory positions quickly with clear thresholds, warning states, and smarter prioritization.",
  },
  {
    icon: "#",
    title: "Fast CRUD workflows",
    description: "Add, edit, search, and clean up inventory without digging through dense tables or cluttered forms.",
  },
  {
    icon: "~",
    title: "Analytics-first layout",
    description: "Understand category health at a glance with lightweight visual summaries built into the experience.",
  },
  {
    icon: "/\\",
    title: "Secure team access",
    description: "Authentication keeps dashboards protected so staff can manage stock confidently.",
  },
  {
    icon: "*",
    title: "Built to feel premium",
    description: "A shadcn-inspired visual language gives the product depth, hierarchy, and a more modern identity.",
  },
];

const inventoryRows = [
  { name: "Wireless Mouse", status: "Healthy", value: "124 units" },
  { name: "Office Chair", status: "Low stock", value: "8 units" },
  { name: "USB-C Dock", status: "Healthy", value: "46 units" },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-shell hero-layout">
      <nav className="topbar glass-panel">
        <div className="brand">
          <div className="brand-mark">I</div>
          <div className="brand-copy">
            <strong>InventoryPro</strong>
            <span>Inventory intelligence</span>
          </div>
        </div>

        <div className="nav-links">
          <a className="nav-link" href="#features">Features</a>
          <a className="nav-link" href="#showcase">Showcase</a>
          <button className="button button-ghost" onClick={() => navigate("/login")} type="button">
            Sign in
          </button>
          <button className="button button-primary" onClick={() => navigate("/register")} type="button">
            Create account
          </button>
        </div>
      </nav>

      <main className="container">
        <section className="hero-grid fade-in">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Shadcn-inspired inventory workspace
            </div>
            <h1 className="hero-title">
              <span>Make operations</span>
              <strong>look as sharp as they run.</strong>
            </h1>
            <p className="hero-copy">
              InventoryPro turns a plain stock tracker into a modern operations surface with clearer hierarchy,
              richer visual feedback, and a dashboard people actually enjoy using.
            </p>

            <div className="hero-actions">
              <button className="button button-primary" onClick={() => navigate("/register")} type="button">
                Start free
              </button>
              <button className="button button-secondary" onClick={() => navigate("/login")} type="button">
                Open dashboard
              </button>
            </div>

            <div className="hero-metrics">
              <div className="metric-card">
                <strong>4.2k</strong>
                <span>Tracked units</span>
              </div>
              <div className="metric-card">
                <strong>28%</strong>
                <span>Faster stock lookup</span>
              </div>
              <div className="metric-card">
                <strong>24/7</strong>
                <span>Inventory visibility</span>
              </div>
            </div>
          </div>

          <div className="hero-preview glass-panel">
            <div className="preview-window">
              <div className="preview-header">
                <div className="preview-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="status-pill">Live inventory sync</div>
              </div>

              <div className="preview-grid">
                <div className="preview-stats">
                  <div className="preview-stat">
                    <label>Products</label>
                    <strong>248</strong>
                  </div>
                  <div className="preview-stat">
                    <label>Stock Units</label>
                    <strong>4.2k</strong>
                  </div>
                  <div className="preview-stat">
                    <label>Value</label>
                    <strong className="mono">Rs 8.1L</strong>
                  </div>
                </div>

                <div className="preview-chart">
                  <span className="section-label">Category movement</span>
                  <div className="bar-row">
                    <span>Electronics</span>
                    <div className="bar-track"><div className="bar-fill" style={{ width: "88%" }} /></div>
                    <span className="mono">88</span>
                  </div>
                  <div className="bar-row">
                    <span>Furniture</span>
                    <div className="bar-track"><div className="bar-fill" style={{ width: "61%" }} /></div>
                    <span className="mono">61</span>
                  </div>
                  <div className="bar-row">
                    <span>Stationery</span>
                    <div className="bar-track"><div className="bar-fill" style={{ width: "34%" }} /></div>
                    <span className="mono">34</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block" id="features">
          <div className="section-heading">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Designed with product UI discipline
            </div>
            <h2>Stronger hierarchy, cleaner forms, and a dashboard that feels production-ready.</h2>
            <p>
              The new direction borrows the compositional feel of shadcn dashboards: elevated cards, muted surfaces,
              careful spacing, and focused typography instead of generic admin styling.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" id="showcase">
          <div className="showcase-grid">
            <div className="showcase-card">
              <span className="section-label">Daily workflow</span>
              <h3>Scan the room in seconds.</h3>
              <p>
                Summary cards, searchable inventory, and chart insights live together so staff can move from signal to action quickly.
              </p>

              <div className="showcase-list">
                {inventoryRows.map((row) => (
                  <div className="showcase-item" key={row.name}>
                    <div>
                      <strong>{row.name}</strong>
                      <p className="muted">{row.value}</p>
                    </div>
                    <span className={`category-pill ${row.status === "Low stock" ? "low" : ""}`}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="cta-card">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                Ready to upgrade the interface
              </div>
              <h2>Bring a more premium feel to inventory management.</h2>
              <p>
                Sign up to start using the refreshed experience with cleaner data presentation, better form ergonomics,
                and a more confident visual system.
              </p>

              <div className="inline-actions">
                <button className="button button-primary" onClick={() => navigate("/register")} type="button">
                  Create free account
                </button>
                <button className="button button-secondary" onClick={() => navigate("/login")} type="button">
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
