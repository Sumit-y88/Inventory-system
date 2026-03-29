import { useEffect, useState } from "react";
import API from "../services/api";

import InventoryChart from "../components/InventoryChart";

function Dashboard() {

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editId, setEditId] = useState(null);

  // GET ITEMS
  const getItems = async () => {
    try {

      const res = await API.get(`/items?page=${page}&search=${search}`);

      setItems(res.data.items);
      setTotalPages(res.data.totalPages);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, [page, search]);
  // ADD OR UPDATE ITEM
  const handleSubmit = async () => {
    try {

      if (editId) {
        await API.put(`/items/${editId}`, {
          itemName,
          category,
          quantity,
          price
        });
        setEditId(null);
      } else {
        await API.post("/items", {
          itemName,
          category,
          quantity,
          price
        });
      }

      setItemName("");
      setCategory("");
      setQuantity("");
      setPrice("");

      getItems();

    } catch (error) {
      console.log(error);
    }
  };

  // DELETE ITEM
  const deleteItem = async (id) => {
    try {
      await API.delete(`/items/${id}`);
      getItems();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT ITEM
  const editItem = (item) => {
    setEditId(item._id);
    setItemName(item.itemName);
    setCategory(item.category);
    setQuantity(item.quantity);
    setPrice(item.price);
  };

  // SEARCH
  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(search.toLowerCase())
  );

  // STATS
  const totalProducts = items.length;

  const totalStock = items.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );

  const totalValue = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-6">
        Inventory Dashboard
      </h1>
        <button 
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="bg-red-500 text-white px-4 py-2 rounded mb-2.5"
        >
          Logout
        </button>
      </div>



      {/* STATS */}

      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Total Products</h3>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Total Stock</h3>
          <p className="text-2xl font-bold">{totalStock}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Inventory Value</h3>
          <p className="text-2xl font-bold">₹{totalValue}</p>
        </div>

      </div>

      {/* ADD ITEM FORM */}

      <div className="bg-white p-6 rounded shadow mb-8">

        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Update Item" : "Add Item"}
        </h2>

        <div className="grid grid-cols-4 gap-4">

          <input
            className="border p-2 rounded"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Item" : "Add Item"}
        </button>

      </div>

      {/* SEARCH */}

      <input
        className="border p-2 rounded mb-4 w-full"
        placeholder="Search items..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}

      <div className="bg-white rounded shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredItems.map((item) => (

              <tr
                key={item._id}
                className={
                  item.quantity < 5
                    ? "bg-red-100"
                    : "border-t"
                }
              >

                <td className="p-3">{item.itemName}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">₹{item.price}</td>

                <td className="p-3 flex gap-3">

                  <button
                    onClick={() => editItem(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteItem(item._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <InventoryChart items={items} />

      <div className="flex justify-center gap-4 mt-6">

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Next
        </button>

      </div>


    </div>
  );
}

export default Dashboard;