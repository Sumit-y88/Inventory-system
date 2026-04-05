function Sidebar({ totalProducts, lowStockCount, categoriesCount, inventoryValue, onLogout }) {
  const navItems = [
    { label: "Overview", hint: "Live dashboard", active: true },
    { label: "Inventory", hint: `${totalProducts} products` },
    { label: "Alerts", hint: `${lowStockCount} low stock` },
    { label: "Categories", hint: `${categoriesCount} tracked` },
  ];

  return (
    <aside className="dashboard-sidebar">
      <div className="brand">
        <div className="brand-mark">I</div>
        <div className="brand-copy">
          <strong>InventoryPro</strong>
          <span>Operations cockpit</span>
        </div>
      </div>

      <div className="sidebar-section">
        <span className="panel-kicker">Workspace</span>
        <div className="sidebar-nav">
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`sidebar-link ${item.active ? "active" : ""}`}
            >
              <span>{item.label}</span>
              <span className="sidebar-badge">{item.hint}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <span className="panel-kicker">Snapshot</span>
        <div className="panel-subgrid">
          <div className="mini-card">
            <span className="panel-kicker">Inventory Value</span>
            <strong className="mono">{inventoryValue}</strong>
            <p className="muted">Total estimated value across current page results.</p>
          </div>
          <div className="mini-card">
            <span className="panel-kicker">Low Stock Pressure</span>
            <strong>{lowStockCount}</strong>
            <p className="muted">Items that likely need replenishment soon.</p>
          </div>
        </div>
      </div>

      <div className="sidebar-foot">
        <button className="button button-secondary" onClick={onLogout} type="button">
          Sign out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
