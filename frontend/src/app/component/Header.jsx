import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import { getUserFromToken } from "../../utils/TokenVerify";

const Header = () => {
  const location = useLocation();
  const TokenData = ""; // Replace with getUserFromToken();
  const user_role = TokenData?.Role?.toUpperCase();
  const user_id = TokenData?.user_id;
  const exp = TokenData?.exp;

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [notification, setNotification] = useState([]);
  const [logo, setLogo] = useState("/assets/images/logo-light.png");

  // Theme Toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  // Logo Update
  useEffect(() => {
    setLogo(
      theme === "dark"
        ? "/assets/images/logo-dark.png"
        : "/assets/images/logo-light.png"
    );
  }, [theme]);

  // Sample Notification
  useEffect(() => {
    setNotification([
      {
        id: 1,
        message: "New client registered",
        createdAt: new Date(),
        UserName: "John Doe",
      },
      {
        id: 2,
        message: "Payment received",
        createdAt: new Date(),
        UserName: "Jane Smith",
      },
    ]);
  }, []);

  const fDateTime = (date) => new Date(date).toLocaleString();

  const pathSegments = location.pathname.split("/");
  const formattedSegment = pathSegments[pathSegments.length - 1]?.toLowerCase();

  const pageTitles = {
    admin: "Add Admin",
    addmin: "Add Admin",
    adduser: "Add User",
    loginstatus: "Login Status",
    adminuser: "Admin Users",
    adminemployee: "Admin Employees",
    position: "Available Position",
    tradehistory: "Trade History",
    holdoff: "Hold Off",
    changedpassword: "Changed Password",
    addemployees: "Add Employee",
    basicsetting: "Basic Settings",
  };

  const title =
    pageTitles[formattedSegment] ||
    formattedSegment?.charAt(0).toUpperCase() + formattedSegment?.slice(1) ||
    "Dashboard";

  return (
    <header>
      {/* Top Banner */}
      <div
        className="py-2"
        style={{
          backgroundImage: "url(/assets/images/bg-1.png)",
          backgroundSize: "cover",
        }}
      ></div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" height="50" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav align-items-center gap-3">

            {/* Theme Toggle */}
            <li className="nav-item">
              <button className="btn btn-sm btn-light" onClick={toggleTheme}>
                {theme === "light" ? (
                  <i className="fas fa-sun text-warning"></i>
                ) : (
                  <i className="fas fa-moon text-dark"></i>
                )}
              </button>
            </li>

            {/* Notification */}
            {user_role === "ADMIN" && (
              <li className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="fa fa-bell text-white"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end p-2" style={{ width: 300 }}>
                  <h6 className="dropdown-header">Notifications</h6>
                  {notification.map((item) => (
                    <li key={item.id} className="mb-2">
                      <div className="d-flex align-items-start">
                        <img
                          src="/assets/images/avatar/1.png"
                          alt="avatar"
                          className="rounded-circle me-2"
                          width="40"
                          height="40"
                        />
                        <div>
                          <div>{item.message}</div>
                          <small>{fDateTime(item.createdAt)}</small>
                          <div className="fw-bold">{item.UserName}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                  {notification.length > 0 && (
                    <li className="dropdown-footer mt-2 text-center">
                      <a href="#">View all</a>
                    </li>
                  )}
                </ul>
              </li>
            )}

            {/* Profile */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                <img
                  src="/assets/images/avatar/1.png"
                  className="rounded-circle"
                  alt="User"
                  width="40"
                  height="40"
                />
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                {user_role === "ADMIN" && (
                  <li>
                    <Link className="dropdown-item" to="/admin/profile">
                      <i className="fas fa-user me-2"></i>Profile
                    </Link>
                  </li>
                )}

                {user_role === "SUPERADMIN" && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/superadmin/bankdetails">
                        <i className="fas fa-university me-2"></i>Bank Details
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/superadmin/settings">
                        <i className="fas fa-cogs me-2"></i>Settings
                      </Link>
                    </li>
                  </>
                )}

                <li>
                  <Link className="dropdown-item text-danger" to="/login">
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      {/* Page Title Section */}
      <div className="bg-light py-3 px-4 border-bottom">
        <h4 className="mb-0 text-primary">{title}</h4>
      </div>
    </header>
  );
};

export default Header;
