import React, { useRef, useEffect } from "react";
import { FiMenu, FiUser } from "react-icons/fi";
import useAuthStore from "../../store/authStore";
import useNavbarStore from "../../store/navbarStore";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

interface MenuItem {
  label: string;
  url: string;
  role?: string;
}

const Navbar: React.FC = () => {
  const setShowSidebar = useNavbarStore(state => state.setShowSidebar);
  const setIsDropdownOpen = useNavbarStore(state => state.setIsDropdownOpen);
  const showSidebar = useNavbarStore(state => state.showSidebar);
  const isDropdownOpen = useNavbarStore(state => state.isDropdownOpen);
  const { isLoggedIn, logout, user } = useAuthStore();
  const submenuRef = useRef<HTMLUListElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    { label: "Home", url: "/" },
    { label: "About", url: "#" },
    { label: "Services", url: "#" },
    { label: "Contact", url: "#" }
  ];

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(event.target as Node) &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [submenuRef, setIsDropdownOpen]);

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>Navbar</h1>
      <ul
        className={`${styles.listNavbar} ${
          showSidebar ? styles.showSidebar : ""
        }`}
        ref={submenuRef}
      >
        {menuItems.map((item, index) => (
          <li key={index} className={styles.listItem}>
            <Link to={item.url} className={styles.link}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      {isLoggedIn ? (
        <div className={styles.userMenu} ref={userMenuRef}>
          <button
            className={styles.dropdownButton}
            aria-label="User Menu"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FiUser size={24} className={styles.userIcon} />
          </button>
          <ul className={`${styles.subMenu} ${isDropdownOpen ? styles.showSubMenu : ""}`}>
            <li className={styles.subMenuItem}>
              <a href={user?.role === "admin" ? "/admin" : "/user"}>Dashboard</a>
            </li>
            <li className={styles.subMenuItem} onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      ) : (
        <a href="/login" className={styles.loginLink}>
          Login
        </a>
      )}
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        <FiMenu size={24} />
      </button>
    </nav>
  );
  
};

export default Navbar;
