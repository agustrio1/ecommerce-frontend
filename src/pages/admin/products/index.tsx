import AdminDashboard from "../../../components/view/admin/AdminDashboard";
import ProductTable from "../../../components/view/admin/product/ProductTable";
import useAuthStore from "../../../store/authStore";

const ProductAdminPage = () => {
  const { user, isLoggedIn } = useAuthStore((state) => ({
    user: state.user,
    isLoggedIn: state.isLoggedIn,
  }));

  if (!isLoggedIn) {
    window.location.href = "/login";
  }

  if (isLoggedIn && user?.role !== "admin") {
    window.location.href = "/";
  }

  return (
    <>
      <AdminDashboard>
        <ProductTable />
      </AdminDashboard>
    </>
  );
};

export default ProductAdminPage;
