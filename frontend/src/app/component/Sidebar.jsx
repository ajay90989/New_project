import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  superadmin_header,
  admin_header,
  employee_header,
} from "./Sidebar_path";

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
      case "user detail":
        return "fa fa-user";
      case "currency setup":
        return "fa-regular fa-coin";
      case "sign up":
        return "fa-solid fa-right-to-bracket";
      case "brokerage":
      case "bonus":
        return "fa fa-hand-holding-usd";
      case "research":
        return "fa-solid fa-money-bill-transfer";
      case "chat-box":
        return "fa-solid fa-comments";
      default:
        return "fa-solid fa-circle-dot";
    }
  };

  const routes = superadmin_header;

  return (
    <aside
      className="bg-dark text-white vh-100 position-fixed"
      style={{ width: "250px", overflowY: "auto", top: 0, left: 0 }}
    >
      <div className="p-3 border-bottom border-secondary text-center">
        <h4 className="text-white mb-0">Admin Panel</h4>
      </div>

      <ul className="nav flex-column p-2">
        {routes &&
          routes.map((data) => (
            <li key={data.id} className="nav-item">
              <Link
                to={data.route}
                onClick={() => setActiveRoute(data.route)}
                className={`nav-link d-flex align-items-center px-3 py-2 rounded ${activeRoute === data.route
                  ? "bg-primary text-white"
                  : "text-white"
                  }`}
                style={{
                  transition: "all 0.2s",
                  fontWeight: "500",
                }}
              >
                <i className={`${getIconClass(data.name)} me-3`}></i>
                <span>{data.name}</span>
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
