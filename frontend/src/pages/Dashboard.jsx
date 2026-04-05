import { startTransition, useEffect, useMemo, useState, useCallback } from "react";
import API from "../services/api";
import InventoryChart from "../components/InventoryChart";
import Sidebar from "../components/Sidebar";
import ItemForm from "../components/ItemForm";
import InventoryList from "../components/InventoryList";

const formatCurrency = (value) =>
  `Rs ${Number(value).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

function Dashboard() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editItemDetails, setEditItemDetails] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const getItems = async () => {
      try {
        const response = await API.get(
          `/items?page=${page}&search=${encodeURIComponent(searchQuery)}`
        );

        if (cancelled) return;

        startTransition(() => {
          setItems(response.data.items);
          setTotalPages(response.data.totalPages);
        });
      } catch (error) {
        if (!cancelled) {
          console.error(error);
        }
      }
    };

    getItems();

    return () => {
      cancelled = true;
    };
  }, [page, searchQuery]);

  const refreshItems = async () => {
    try {
      const response = await API.get(
        `/items?page=${page}&search=${encodeURIComponent(searchQuery)}`
      );

      startTransition(() => {
        setItems(response.data.items);
        setTotalPages(response.data.totalPages);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (payload) => {
    try {
      if (editItemDetails) {
        await API.put(`/items/${editItemDetails._id}`, payload);
      } else {
        await API.post("/items", payload);
      }
      setEditItemDetails(null);
      refreshItems();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Remove this item from inventory?")) return;

    try {
      await API.delete(`/items/${id}`);
      refreshItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = useCallback((item) => {
    setEditItemDetails(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSearchChange = useCallback((query) => {
    startTransition(() => {
      setPage(1);
      setSearchQuery(query);
    });
  }, []);

  const metrics = useMemo(() => {
    const totalProducts = items.length;
    const totalStock = items.reduce((total, item) => total + Number(item.quantity), 0);
    const totalValue = items.reduce(
      (total, item) => total + Number(item.quantity) * Number(item.price),
      0
    );
    const lowStockCount = items.filter((item) => Number(item.quantity) < 5).length;
    const categoriesCount = new Set(items.map((item) => item.category?.trim()).filter(Boolean)).size;
    const averagePrice = totalProducts ? totalValue / totalProducts : 0;

    return {
      averagePrice,
      categoriesCount,
      lowStockCount,
      totalProducts,
      totalStock,
      totalValue,
    };
  }, [items]);

  return (
    <div className="page-shell dashboard-page">
      <div className="dashboard-shell">
        <Sidebar
          categoriesCount={metrics.categoriesCount}
          inventoryValue={formatCurrency(metrics.totalValue)}
          lowStockCount={metrics.lowStockCount}
          onLogout={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          totalProducts={metrics.totalProducts}
        />

        <main className="dashboard-main">
          <header className="dashboard-header">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                Operations dashboard
              </div>
              <h1>Inventory at a glance.</h1>
              <p>
                A shadcn-inspired control room for products, stock movement, and action-ready insights.
              </p>
            </div>
          </header>

          <section className="stats-grid">
            <article className="dashboard-stat">
              <span className="panel-kicker">Products</span>
              <strong>{metrics.totalProducts}</strong>
              <span>Visible in the current page results.</span>
            </article>
            <article className="dashboard-stat">
              <span className="panel-kicker">Stock units</span>
              <strong>{metrics.totalStock}</strong>
              <span>Total quantity across loaded items.</span>
            </article>
            <article className="dashboard-stat">
              <span className="panel-kicker">Inventory value</span>
              <strong className="mono">{formatCurrency(metrics.totalValue)}</strong>
              <span>Estimated worth based on price and quantity.</span>
            </article>
            <article className="dashboard-stat">
              <span className="panel-kicker">Low stock</span>
              <strong>{metrics.lowStockCount}</strong>
              <span>Items below the suggested threshold of 5 units.</span>
            </article>
          </section>

          <section className="dashboard-grid">
            <div className="panel-subgrid">
              <ItemForm
                editItem={editItemDetails}
                onSubmit={handleFormSubmit}
                onCancel={() => setEditItemDetails(null)}
              />

              <InventoryList
                items={items}
                page={page}
                totalPages={totalPages}
                setPage={setPage}
                onEdit={handleEdit}
                onDelete={deleteItem}
                lowStockCount={metrics.lowStockCount}
                onSearchChange={handleSearchChange}
              />
            </div>

            <div className="panel-subgrid">
              <article className="dashboard-panel">
                <header>
                  <div>
                    <span className="panel-kicker">Analytics</span>
                    <h3>Stock by category</h3>
                    <p>See where your inventory is concentrated across the current dataset.</p>
                  </div>
                </header>
                <InventoryChart items={items} />
              </article>

              <article className="dashboard-panel">
                <header>
                  <div>
                    <span className="panel-kicker">Pulse</span>
                    <h3>Operational notes</h3>
                    <p>Useful reference metrics for making quick decisions while you work.</p>
                  </div>
                </header>

                <div className="mini-stats-grid">
                  <div className="mini-card">
                    <span className="panel-kicker">Average item value</span>
                    <strong className="mono">{formatCurrency(metrics.averagePrice)}</strong>
                    <p>Average listed value per loaded product.</p>
                  </div>
                  <div className="mini-card">
                    <span className="panel-kicker">Categories</span>
                    <strong>{metrics.categoriesCount || 0}</strong>
                    <p>Distinct categories represented right now.</p>
                  </div>
                  <div className="mini-card">
                    <span className="panel-kicker">Search state</span>
                    <strong>{searchQuery ? "Filtered" : "All items"}</strong>
                    <p>
                      {searchQuery
                        ? `Showing results for "${searchQuery}".`
                        : "No search filter is active."}
                    </p>
                  </div>
                  <div className="mini-card">
                    <span className="panel-kicker">Editing mode</span>
                    <strong>{editItemDetails ? "Active" : "Idle"}</strong>
                    <p>{editItemDetails ? "Form is prefilled for updates." : "Ready to create a new inventory item."}</p>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
