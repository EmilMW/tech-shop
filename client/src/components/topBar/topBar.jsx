import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/authProvider";
import "./topBar.scss";

const unselectedPaths = ["/edit-product"];

export default function TopBar() {
  const auth = useAuth();
  const location = useLocation();
  const currentRoute = location.pathname;
  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <div id="topBar">
      <Tabs textColor="inherit" value={unselectedPaths.includes(currentRoute) ? false : currentRoute}>
        <Tab label="Home" value="/" to="/" component={Link} />
        <Tab label="About" value="/about" to="/about" component={Link} />
        <Tab label="Shop" value="/shop" to="/shop" component={Link} />
        {auth && auth.user?.type === "admin" ? (
          <Tab label="Add Product" value="/add-product" to="/add-product" component={Link} />
        ) : null}
        {auth.user ? (
          [
            <Tab key="Logout" label="Logout" value="/login" onClick={handleLogout} />,
            <Tab key="Cart" label="Cart" value="/cart" to="/cart" component={Link} />,
          ]
        ) : (
          <Tab label="Login" value="/login" to="/login" component={Link} />
        )}
      </Tabs>
    </div>
  );
}
