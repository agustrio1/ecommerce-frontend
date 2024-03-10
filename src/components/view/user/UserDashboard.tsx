import React, { useState } from "react";
import UserProfile from "./UserProfile";
import OrderList from "./OrderList";
import Wishlist from "./Wishlist";
import ReviewList from "./ReviewList";
import CartPage from "../../../pages/cart";
import styles from "./UserDashboard.module.css";

const UserDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("profile");
  const [pageTitle, setPageTitle] = useState<string>("User Profile");

  const renderPage = () => {
    switch (currentPage) {
      case "profile":
        return <UserProfile />;
      case "order":
        return <OrderList />;
      case "wishlist":
        return <Wishlist />;
      case "review":
        return <ReviewList />;
      case "cart":
        return <CartPage />;
      default:
        return null;
    }
  };

  const handlePageChange = (page: string, title: string) => {
    setCurrentPage(page);
    setPageTitle(title);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{pageTitle}</h2>
      <div className={styles.menu__container}>
        <ul className={styles.menu}>
          <li className={styles.menu__sub} onClick={() => handlePageChange("profile", "User Profile")}>
            <a>Profile</a>
          </li>
          <li className={styles.menu__sub} onClick={() => handlePageChange("order", "Orders")}>
            <a>Order</a>
          </li>
          <li className={styles.menu__sub} onClick={() => handlePageChange("wishlist", "Wishlist")}>
            <a>Wishlist</a>
          </li>
          <li className={styles.menu__sub} onClick={() => handlePageChange("review", "Review")}>
            <a>Review</a>
          </li>
          <li className={styles.menu__sub} onClick={() => handlePageChange("cart", "Cart")}>
            <a>Cart</a>
          </li>
        </ul>
      </div>
      <div>{renderPage()}</div>
    </div>
  );
};

export default UserDashboard;
