import React, { useState } from "react";
import useAuthStore from "../../store/authStore";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    general: "",
  });

  const register = useAuthStore((state) => state.register);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(formData);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error registering:", error);
      setFormErrors({ ...formErrors, general: "Failed to register user" });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Daftar</h2>
      <form onSubmit={handleSubmit} className={styles.from}>
        <div className={styles.input__container}>
          <label className={styles.label}>Nama:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
          {formErrors.name && <span className={styles.error}>{formErrors.name}</span>}
        </div>
        <div className={styles.input__container}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
          {formErrors.email && <span className={styles.error}>{formErrors.email}</span>}
        </div>
        <div className={styles.input__container}>
          <label className={styles.label}>No Telepon:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
          />
          {formErrors.phone && <span className={styles.error}>{formErrors.phone}</span>}
        </div>
        <div className={styles.input__container}>
          <label className={styles.label}>Kata Sandi:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />
          {formErrors.password && <span className={styles.error}>{formErrors.password}</span>}
        </div>
        <div className={styles.input__container}>
          <label className={styles.label}>Alamat:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={styles.input}
          />
          {formErrors.address && <span className={styles.error}>{formErrors.address}</span>}
        </div>
        {formErrors.general && <span className={styles.error}>{formErrors.general}</span>}
        <button type="submit" className={styles.button}>Daftar</button>
        <Link to="/login" className={styles.link}>Sudah punya akun?<span className={styles.span}>Masuk</span></Link>
      </form>
    </div>
  );
};

export default Register;
