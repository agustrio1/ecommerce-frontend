import AdminDashboard from "../../../components/view/admin/AdminDashboard";
import UserTable from "../../../components/view/admin/user/UserTable";
import useAuthStore from "../../../store/authStore";

const UserAdminPage = () => {
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
        <UserTable />
      </AdminDashboard>
    </>
  );
};

export default UserAdminPage;
