import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUserFromToken } from "../../app/utils/TokenVerify";



const Header = () => {

  const location = useLocation();

  const TokenData = getUserFromToken();

  const user_role = TokenData?.Role?.toUpperCase();
  const user_id = TokenData?.user_id;
  const exp = TokenData?.exp;

  const [isActive, setIsActive] = useState(false);
  const [notification, setNotification] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [logo, setLogo] = useState("");

  // Hamburger toggle
  const toggleHamburger = () => {
    setIsActive(!isActive);
  };

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  // Set logo based on theme
  useEffect(() => {
    if (theme === "dark") {
      setLogo("/assets/images/logo-dark.png");
    } else {
      setLogo("/assets/images/logo-light.png");
    }
  }, [theme]);

  // Optional: Sample notification
  useEffect(() => {
    // Replace with real API call if needed
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

  // Format date/time
  const fDateTime = (date) => {
    const d = new Date(date);
    return d.toLocaleString();
  };

  // Get current path for title
  const pathSegments = location.pathname.split("/");
  const formattedSegment =
    pathSegments[pathSegments.length - 1]?.replace(/-/g, "").toLowerCase();

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
    <div>
      <div
        className="header-banner"
        style={{ backgroundImage: "url(/assets/images/bg-1.png)" }}
      ></div>

      <div className="nav-header">
        <a href="/" className="">
          <img src={logo} width={"250px"} height={"83px"} alt="" className="w-100" />
          <div className="brand-title"></div>
        </a>

        <div className="nav-control">
          <div
            className={`hamburger ${isActive ? "is-active" : ""}`}
            onClick={toggleHamburger}
          >
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </div>
        </div>
      </div>

      <div className="header home">
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="header-left"></div>

              <ul className="navbar-nav header-right">
                {/* Theme Toggle */}
                <li className="nav-item dropdown notification_dropdown">
                  <a className="nav-link dz-theme-mode" onClick={toggleTheme}>
                    {theme.includes("light") ? (
                      <i className="fas fa-sun" style={{ color: "#ffff" }} />
                    ) : (
                      <i className="fas fa-moon" style={{ color: "#ffff" }} />
                    )}
                  </a>
                </li>

                {/* Notifications */}
                {user_role === "ADMIN" && (
                  <li className="nav-item dropdown notification_dropdown">
                    <a
                      href="#"
                      className="nav-link"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa fa-bell" style={{ color: "white" }} />
                    </a>
                    <div className="dropdown-menu dropdown-menu-end of-visible">
                      <div
                        id="DZ_W_Notification3"
                        className="widget-media dlab-scroll p-3"
                        style={{ maxHeight: 380, overflowY: "auto" }}
                      >
                        <ul className="timeline">
                          {notification.map((item) => (
                            <li key={item.id}>
                              <div className="timeline-panel">
                                <div className="media me-2">
                                  <img
                                    alt={`Avatar of ${item.UserName}`}
                                    width={40}
                                    src="/assets/images/avatar/1.png"
                                  />
                                </div>
                                <div className="media-body">
                                  <h6 className="mb-1">{item.message}</h6>
                                  <small className="d-block">
                                    {fDateTime(item.createdAt)}
                                  </small>
                                  <h6 className="mb-0 mt-2">{item.UserName}</h6>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {notification.length !== 0 && (
                        <a href="#" className="all-notification">
                          See all notifications <i className="ti-arrow-end" />
                        </a>
                      )}
                    </div>
                  </li>
                )}

                {/* Profile Menu */}
                <li>
                  <div className="dropdown header-profile2">
                    <a
                      className="nav-link"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="header-info2 d-flex align-items-center">
                        <img src="/assets/images/avatar/1.png" alt="User Avatar" />
                      </div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      {user_role === "ADMIN" && (
                        <Link
                          to="/admin/profile"
                          className="dropdown-item ai-icon"
                        >
                          <i
                            className="fas fa-user"
                            style={{ fontSize: "18px", color: "#000" }}
                          />
                          <span className="ms-2">Profile</span>
                        </Link>
                      )}

                      {user_role === "SUPERADMIN" && (
                        <>
                          <Link
                            to="/superadmin/bankdetails"
                            className="dropdown-item ai-icon"
                          >
                            <i
                              className="fas fa-university"
                              style={{ fontSize: "18px", color: "#000" }}
                            />
                            <span className="ms-2">Bank Details</span>
                          </Link>
                          <Link
                            to="/superadmin/settings"
                            className="dropdown-item ai-icon"
                          >
                            <i
                              className="fas fa-cogs"
                              style={{ fontSize: "18px", color: "#000" }}
                            />
                            <span className="ms-2">Settings</span>
                          </Link>
                        </>
                      )}

                      <Link to="/login" className="dropdown-item ai-icon">
                        <i
                          className="fas fa-sign-out-alt"
                          style={{ fontSize: "18px", color: "#fd5353" }}
                        />
                        <span className="ms-2 text-danger">Logout</span>
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Page Title */}
        <div className="page-titles">
          <div className="sub-dz-head">
            <div className="d-flex align-items-center dz-head-title">
              <h2 className="text-white m-0">{title}</h2>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Header;
