import Register from "../../../components/auth/Register";
import useAuthStore from "../../../store/authStore";
import { Link } from "react-router-dom";

const RegisterPage = () => {

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <>
      {isLoggedIn ? <Link to="/" /> : <Register />}
    </>
  );
};

export default RegisterPage;
