import { useContext } from "react";
import authContext from "../contexts/authContext";
import { Navigate } from "react-router-dom";

//if things are ok, I let you through 
//if they're not, I kick you out to the login page

export default function RequireAuth({ children }) {
  const { isLoggedIn } = useContext(authContext);
  return isLoggedIn ? children : <Navigate to="/" />;
}