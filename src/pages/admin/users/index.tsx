import AdminDashboard from "../../../components/view/admin/AdminDashboard"
import useAuthStore from "../../../store/authStore"

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
            <div>hai</div>
        </AdminDashboard>
        </>
    )
};

export default UserAdminPage