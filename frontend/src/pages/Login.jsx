import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const authHighlights = [
  {
    title: "Focused sign-in flow",
    description: "High-contrast fields and cleaner layout reduce friction for daily use.",
  },
  {
    title: "Safer access",
    description: "JWT authentication keeps operational data protected behind a simple login flow.",
  },
  {
    title: "Consistent product feel",
    description: "The auth experience now matches the dashboard instead of feeling like a separate template.",
  },
];

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch {
      setError("Incorrect email or password. Please try again.");
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
              <span>Premium inventory operations</span>
            </div>
          </div>

          <div className="eyebrow" style={{ marginTop: "1.6rem" }}>
            <span className="eyebrow-dot" />
            Welcome back
          </div>
          <h2>Step back into your inventory command center.</h2>
          <p className="muted">
            Access stock visibility, analytics, and product workflows from a single polished workspace.
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
              <strong>Sign in</strong>
              <span>Use your registered credentials</span>
            </div>
          </div>

          <header>
            <h1>Access your dashboard</h1>
            <p>Enter your email and password to continue managing your inventory.</p>
          </header>

          {error && <div className="error-banner">{error}</div>}

          <form className="form-grid" onSubmit={handleLogin}>
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
                placeholder="Enter your password"
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
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="form-footer">
            Do not have an account?{" "}
            <button className="link-button" onClick={() => navigate("/register")} type="button">
              Create one
            </button>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Login;
