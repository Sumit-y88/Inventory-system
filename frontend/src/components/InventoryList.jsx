import { memo, useState, useEffect } from "react";

const formatCurrency = (value) =>
  `Rs ${Number(value).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

function InventoryList({
  items,
  page,
  totalPages,
  setPage,
  onEdit,
  onDelete,
  lowStockCount,
  onSearchChange,
}) {
  const [localSearch, setLocalSearch] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      onSearchChange(localSearch.trim());
    }, 250);
    return () => window.clearTimeout(timeoutId);
  }, [localSearch, onSearchChange]);

  return (
    <article className="dashboard-panel">
      <header>
        <div>
          <span className="panel-kicker">Inventory list</span>
          <h3>Search and manage products</h3>
          <p>Quickly find products, inspect stock levels, and act without leaving the page.</p>
        </div>
      </header>

      <div className="search-wrap">
        <div className="search-shell">
          <span className="icon">S</span>
          <input
            className="search-input"
            placeholder="Search items by name..."
            value={localSearch}
            onChange={(event) => setLocalSearch(event.target.value)}
          />
        </div>
      </div>

      {lowStockCount > 0 && (
        <div className="alert-strip">
          <span className="icon">!</span>
          <span>{lowStockCount} item(s) are running low and may need replenishment soon.</span>
        </div>
      )}

      <div className="table-wrap">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className="table-empty">
                    <h3>No items found</h3>
                    <p>Try another search term or add your first inventory item.</p>
                  </div>
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const isLow = Number(item.quantity) < 5;

                return (
                  <tr key={item._id}>
                    <td>
                      <strong>{item.itemName}</strong>
                    </td>
                    <td>
                      <span className={`category-pill ${isLow ? "low" : ""}`}>
                        {item.category || "Uncategorized"}
                      </span>
                    </td>
                    <td>
                      <span className={isLow ? "low-indicator mono" : "mono"}>
                        {item.quantity} {isLow ? "low" : ""}
                      </span>
                    </td>
                    <td>
                      <span className="inventory-value mono">{formatCurrency(item.price)}</span>
                    </td>
                    <td>
                      <div className="inline-actions" style={{ marginTop: 0 }}>
                        <button
                          className="button button-secondary button-icon"
                          onClick={() => onEdit(item)}
                          type="button"
                        >
                          E
                        </button>
                        <button
                          className="button button-danger button-icon"
                          onClick={() => onDelete(item._id)}
                          type="button"
                        >
                          X
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="inline-actions">
        <button
          className="button button-ghost"
          disabled={page === 1}
          onClick={() => setPage((currentPage) => currentPage - 1)}
          type="button"
        >
          Previous
        </button>
        <span className="status-pill">
          Page {page} of {totalPages}
        </span>
        <button
          className="button button-ghost"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((currentPage) => currentPage + 1)}
          type="button"
        >
          Next
        </button>
      </div>
    </article>
  );
}

export default memo(InventoryList);
