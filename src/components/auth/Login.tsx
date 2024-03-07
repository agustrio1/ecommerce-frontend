import React, { useState } from "react";
import useAuthStore from "../../store/authStore";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const login = useAuthStore((state) => state.login);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} className={styles.from}>
        <div className={styles.input__container}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.input__container}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Login</button>
        <Link to="/register" className={styles.link}>Belum punya akun? <span className={styles.span}>Daftar</span></Link>
      </form>
    </div>
  );
};

export default Login;
