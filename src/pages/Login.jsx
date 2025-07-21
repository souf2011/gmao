import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import logo from "../assets/images/logo.png";
import axiosClent from "../Api/AxiosClent";
import { useStateContext } from "../context/AppContext";

function Login() {
  // داخل function Login
  const { setUser, setToken } = useStateContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axiosClent.post(
        "/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      // Store user data in context
      localStorage.setItem("ACCESS_TOKEN", response.data.token); // مثال
      localStorage.setItem("User", JSON.stringify(response.data.user)); // مثال
      setToken(response.data.token); // مثلا
      setUser(response.data.user);

      navigate("/admin");
    } catch (err) {
      console.error("Login error:", err);
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="SGTM Logo" className="logo" />
        <h2 className="login-subtitle">Connexion à votre compte</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-fields">
            <div className="form-field">
              <input
                type="email"
                className="field-input"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-field">
              <input
                type="password"
                className="field-input"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="forgot-password">
            <a href="#">Mot de passe oublié ?</a>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Chargement..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
