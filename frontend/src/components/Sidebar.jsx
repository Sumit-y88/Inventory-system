function Sidebar() {
  return (
    <div style={{
      width: "200px",
      background: "#1e293b",
      color: "white",
      height: "100vh",
      padding: "20px"
    }}>
      <h2>Inventory</h2>

      <ul style={{marginTop:"20px"}}>
        <li>Dashboard</li>
        <li>Products</li>
        <li>Reports</li>
        <li>Logout</li>
      </ul>
    </div>
  );
}

export default Sidebar;