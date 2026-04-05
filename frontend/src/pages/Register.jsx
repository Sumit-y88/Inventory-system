import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const authHighlights = [
  {
    title: "Quick onboarding",
    description: "Create an account and start organizing products without fighting the interface.",
  },
  {
    title: "Built for teams",
    description: "Separate personal and company details so inventory stays tied to the right business context.",
  },
  {
    title: "Modern product feel",
    description: "The registration flow now shares the same premium visual identity as the dashboard.",
  },
];

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("/api/auth/register", { name, companyName, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell auth-shell">
      <div className="auth-layout">
        <section className="auth-showcase surface-card">
          <div className="brand">
            <div className="brand-mark">I</div>
            <div className="brand-copy">
              <strong>InventoryPro</strong>
              <span>Operational clarity for growing teams</span>
            </div>
          </div>

          <div className="eyebrow" style={{ marginTop: "1.6rem" }}>
            <span className="eyebrow-dot" />
            Start your workspace
          </div>
          <h2>Launch a cleaner way to manage stock.</h2>
          <p className="muted">
            Set up your account and move into a dashboard with better hierarchy, sharper surfaces, and less visual noise.
          </p>

          <div className="auth-feature-list">
            {authHighlights.map((item) => (
              <article className="auth-feature" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="auth-card">
          <div className="brand">
            <div className="brand-mark">I</div>
            <div className="brand-copy">
              <strong>Create account</strong>
              <span>Get started in a minute</span>
            </div>
          </div>

          <header>
            <h1>Set up your inventory workspace</h1>
            <p>Add your details below and we will get your dashboard ready.</p>
          </header>

          {error && <div className="error-banner">{error}</div>}

          <form className="form-grid" onSubmit={handleRegister}>
            <div className="form-grid two-col">
              <div className="field-group">
                <label htmlFor="name">Full name</label>
                <input
                  className={`field ${error ? "error" : ""}`}
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError("");
                  }}
                  required
                />
              </div>

              <div className="field-group">
                <label htmlFor="companyName">Company or shop</label>
                <input
                  className={`field ${error ? "error" : ""}`}
                  id="companyName"
                  type="text"
                  placeholder="Acme Supply"
                  value={companyName}
                  onChange={(event) => {
                    setCompanyName(event.target.value);
                    setError("");
                  }}
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="email">Email address</label>
              <input
                className={`field ${error ? "error" : ""}`}
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="password">Password</label>
              <input
                className={`field ${error ? "error" : ""}`}
                id="password"
                type="password"
                placeholder="Choose a strong password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                required
              />
            </div>

            <button className="button button-primary" disabled={loading} type="submit">
              {loading && <span className="spinner" />}
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="form-footer">
            Already have an account?{" "}
            <button className="link-button" onClick={() => navigate("/login")} type="button">
              Sign in
            </button>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Register;
