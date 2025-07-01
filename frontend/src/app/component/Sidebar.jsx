import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { superadmin_header, admin_header, employee_header } from "./Sidebar_path";

const Sidebar = () => {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname);


  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  const getIconClass = (name) => {
    switch (name.toLowerCase()) {
      case "dashboard":
        return "fa-solid fa-house";
      case "employees":
        return "fa-solid fa-users";
      case "users":
        return "fa fa-user";
      case "position":
        return "fa fa-id-badge";
      case "transaction":
        return "fa-solid fa-money-bill-transfer";
      case "license history":
        return "fa-solid fa-money-bill-transfer";
      case "withdrawal":
        return "fa-solid fa-money-simple-from-bracket";
      case "deposit":
        return "fa-sharp fa-light fa-money-bill";
      case "reports":
        return "fa fa-file-text";
      case "trade history":
        return "fa-sharp fa-solid fa-clock-rotate-left";
      case "login status":
        return "fa-solid fa-signal-bars";
      case "broadcast":
        return "fa-solid fa-tower-broadcast";
      case "hold off":
        return "fa-solid fa-power-off";
      case "available positions":
        return "fa-solid fa-crosshairs";
      case "admin":
        return "fa fa-user";
      case "currency setup":
        return "fa-regular fa-coin";
      case "sign up":
        return "fa-solid fa-right-to-bracket";
      case "brokerage":
        return "fa fa-hand-holding-usd";
      case "bonus":
        return "fa fa-hand-holding-usd";
      case "research":
        return "fa-solid fa-money-bill-transfer";
      case "chat-box":
        return "fa-solid fa-comments";
      case "user detail":
        return "fa fa-user";
      default:
        return "";
    }
  };

  // 🧭 Use any one you want (superadmin_header, admin_header, employee_header)
  const routes = superadmin_header; // or admin_header or employee_header

  return (
    <div className="dlabnav follow-info">
      <div className="menu-scroll">
        <div className="dlabnav-scroll mm-active">
          <ul className="metismenu mm-show" id="menu">
            {routes &&
              routes.map((data) => (
                <li
                  key={data.id}
                  className={`mm ${activeRoute === data.route ? "mm-active" : ""}`}
                  onClick={() => setActiveRoute(data.route)}
                >
                  <Link to={data.route} aria-expanded="false">
                    <i className={getIconClass(data.name)}></i>
                    <span className="nav-text">{data.name}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
