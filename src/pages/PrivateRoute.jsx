import { Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "../components/Spinner";
export default function PrivateRoute({ children }) {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Spinner />;
  }
  if (!loggedIn) {
    return <Navigate to="/" />;
  }
  return children;
}
