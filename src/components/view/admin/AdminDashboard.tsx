import { useState, useEffect } from "react";
import { FaBox, FaHome, FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import styles from "./AdminDashboard.module.css";
import Sidebar from "../../ui/Sidebar";

type Proptypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: <FaHome size={24} />,
  },
  {
    title: "Produk",
    url: "/admin/product",
    icon: <FaBox size={24} />,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: <FaUser size={24} />,
  },
];

const AdminDashboard: React.FC<Proptypes> = (props: Proptypes) => {
  const { children } = props;
  const [showSidebar, setShowSidebar] = useState(false);

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setShowSidebar(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={styles.container}>
      <div className={styles.btn__sidebar__container}>
        <button onClick={toggleSidebar} className={styles.btn__sidebar}>
          <FiMenu size={24} />
        </button>
      </div>
      <Sidebar 
      lists={listSidebarItem}
      isMobileOpen={showSidebar}
      onClose={() => setShowSidebar(false)}
      title="Admin Dashboard"
      />
      <div>{children}</div>
    </div>
  );
};

export default AdminDashboard;
