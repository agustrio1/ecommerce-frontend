import { FiX } from "react-icons/fi";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

type Propstypes = {
  lists: Array<{
    title: string;
    url: string;
    icon: React.ReactNode;
  }>;
  isMobileOpen: boolean;
  onClose: () => void;
  title?: string;
  pathName?: string;
};

const SidebarMenu = (props: Propstypes) => {
  const { lists, isMobileOpen, onClose, title, pathName } = props;

  return (
    <aside
      className={`${styles.container} ${
        isMobileOpen ? styles.block : styles.hidden
      }`}>
      {""}
      <div className={styles.btn__sidebar__container}>
        <button className={styles.btn__sidebar}>
          <FiX size={24} onClick={onClose} />
        </button>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.lists__container}>
          {lists.map((list) => (
            <Link
              to={list.url}
              key={list.title}
              className={`${styles.list}${
                pathName === list.url ? styles.active : ""
              }`}>
              {list.icon}
              <span>
                <h2 className={styles.list__title}>{list.title}</h2>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SidebarMenu;
