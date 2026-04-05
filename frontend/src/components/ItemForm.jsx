import { useState, useEffect } from "react";

export default function ItemForm({ editItem, onSubmit, onCancel }) {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editItem) {
      setItemName(editItem.itemName);
      setCategory(editItem.category);
      setQuantity(editItem.quantity);
      setPrice(editItem.price);
    } else {
      resetLocal();
    }
  }, [editItem]);

  const resetLocal = () => {
    setItemName("");
    setCategory("");
    setQuantity("");
    setPrice("");
  };

  const handleLocalSubmit = async () => {
    if (!itemName.trim()) return;

    setSubmitting(true);
    try {
      await onSubmit({ itemName, category, quantity, price });
      if (!editItem) {
        resetLocal();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    resetLocal();
    onCancel();
  };

  return (
    <article className="dashboard-panel">
      <header>
        <div>
          <span className="panel-kicker">{editItem ? "Editing product" : "Create product"}</span>
          <h3>{editItem ? "Update inventory item" : "Add a new inventory item"}</h3>
          <p>Keep the catalog accurate with fast, clean product entry.</p>
        </div>
      </header>

      <div className="form-grid two-col">
        <div className="field-group">
          <label htmlFor="itemName">Item name</label>
          <input
            className="field"
            id="itemName"
            placeholder="Wireless Mouse"
            value={itemName}
            onChange={(event) => setItemName(event.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="category">Category</label>
          <input
            className="field"
            id="category"
            placeholder="Electronics"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            className="field"
            id="quantity"
            min="0"
            placeholder="0"
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="price">Price</label>
          <input
            className="field"
            id="price"
            min="0"
            placeholder="0.00"
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
      </div>

      <div className="inline-actions" style={{ marginTop: "1.5rem" }}>
        <button
          className="button button-primary"
          onClick={handleLocalSubmit}
          type="button"
          disabled={submitting}
        >
          {submitting && <span className="spinner" />}
          {submitting ? "Saving..." : editItem ? "Update item" : "Add item"}
        </button>
        {editItem && (
          <button className="button button-ghost" onClick={handleCancel} type="button">
            Cancel editing
          </button>
        )}
      </div>
    </article>
  );
}
