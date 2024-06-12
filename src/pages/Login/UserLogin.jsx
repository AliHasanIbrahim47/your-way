import { useRef, useState, useEffect, useContext } from "react";
import logo from "../../logo/pngAsset 6@4x.png";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const UserLogin = () => {
  const phoneRef = useRef();
  const errRef = useRef();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // const [success, setSuccess] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (phoneRef.current) {
      phoneRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [phone, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/user/login",
        {
          phone,
          password,
        }
      );
      console.log("Response:", response); // Debug: Check the response object

      const token = response.data.data.token;
      const id = response.data.data.data.id;
      console.log("Token:", token); // Debug: Check the token
      console.log("ID:", id);

      if (token) {
        login(token, "user");
        console.log("Token stored:", token); // Debug: Confirm the token is stored
        alert("Login successful!");
        navigate(`/users/${id}`);
      } else {
        alert("Login failed. Token not found in the response.");
      }
    } catch (error) {
      console.error("Error logging in", error);
      alert("Login failed. Please check your phone and password.", error);
    }
  };

  return (
    <div className="login">
      <section>
        <img src={logo} alt="logo" />
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="phone">Email:</label>
          <input
            type="text"
            id="phone"
            ref={phoneRef}
            autoComplete="off"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button>Sign In</button>
        </form>
      </section>
    </div>
  );
};

export default UserLogin;
