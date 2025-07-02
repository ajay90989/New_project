import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { getUserFromToken, getTokenFromCookies } from "../utils/TokenVerify";
import Login from "../layout/Auth/Login";
import Register from "../layout/Auth/Register";
import User from "./User.routes";



const Routing = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const TokenData = getTokenFromCookies();



    // useEffect(() => {
    //     if (location.pathname.startsWith("/updatepassword")) {
    //         navigate(location.pathname);
    //         return;
    //     }

    //     if (location.pathname === "/forget") {
    //         navigate("/forget");
    //         return;
    //     }

    //     if (location.pathname.startsWith("/register")) {
    //         return;
    //     }

    //     if (
    //         !TokenData ||
    //         !roles ||
    //         TokenData === "null" ||
    //         roles === "null" ||
    //         location.pathname === "/login"
    //     ) {
    //         navigate("/login");
    //         return;
    //     }

    //     switch (roles) {
    //         case "SUPERADMIN":
    //             if (
    //                 location.pathname === "/login" ||
    //                 location.pathname === "/" ||
    //                 !location.pathname.startsWith("/superadmin")
    //             ) {
    //                 navigate("/superadmin/dashboard");
    //             }
    //             break;
    //         case "ADMIN":
    //             if (
    //                 location.pathname === "/login" ||
    //                 location.pathname === "/" ||
    //                 !location.pathname.startsWith("/admin")
    //             ) {
    //                 navigate("/admin/dashboard");
    //             }
    //             break;
    //         case "USER":
    //             if (
    //                 location.pathname === "/login" ||
    //                 location.pathname === "/" ||
    //                 !location.pathname.startsWith("/user")
    //             ) {
    //                 navigate("/user/dashboard");
    //             }
    //             break;
    //         case "EMPLOYE":
    //             if (
    //                 location.pathname === "/login" ||
    //                 location.pathname === "/" ||
    //                 !location.pathname.startsWith("/employee")
    //             ) {
    //                 navigate("/employee/dashboard");
    //             }
    //             break;
    //         default:
    //             break;
    //     }
    // }, [navigate, location.pathname, roles, TokenData]);

    return (
        <Routes>
            {/* <Route
                path="/superadmin/*"
                element={roles === "SUPERADMIN" ? <Superadminroutes /> : <Login />}
            />
            <Route
                path="/admin/*"
                element={roles === "ADMIN" ? <Adminroutes /> : <Login />}
            />
            <Route
                path="/employee/*"
                element={roles === "EMPLOYE" ? <EmployeeRoutes /> : <Login />}
            /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


            <Route path="/user/*" element={TokenData ? <User /> : <Login />} />


        </Routes>
    );
};

export default Routing;
