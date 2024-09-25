import { Link } from "react-router-dom";
import { useContext } from "react";
import LoginContext, { useLoginDispatch, removeUser } from "./LoginContext";
//import { useSelector, useDispatch } from 'react-redux'
//import { handleLogout } from '../reducers/userReducer'

const Menu = () => {
  const loginDispatch = useLoginDispatch();

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedBlogappUser");
      removeUser(loginDispatch);
    } catch (exception) {
      console.log(exception);
    }
  };
  const padding = {
    padding: 5,
  };
  const [user] = useContext(LoginContext);
  //const dispatch = useDispatch();
  console.log(user);

  return (
    <div>
      <Link style={padding} to="/">
        Blogs home
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
      {user ? (
        <span>
          {user.name} logged in.
          <button onClick={handleLogout} type="submit">
            logout
          </button>
        </span>
      ) : (
        <Link style={padding} to="/login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Menu;
