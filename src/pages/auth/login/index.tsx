import useAuthStore from "../../../store/authStore";
import Login from "../../../components/auth/Login";
import { Link } from "react-router-dom";


const LoginPage = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return <>{isLoggedIn ? <Link to="/" /> : <Login />}</>;
};

export default LoginPage;
