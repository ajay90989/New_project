import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { LOGIN_API } from "../../Service/Auth/Auth";



const Login = () => {



  const navigate = useNavigate();

  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleUsernameChange = (e) =>
    setUsername(e.target.value.toString().toLowerCase());

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validate = () => {
    let inputErrors = {};
    if (!username) inputErrors.username = "Username is required";
    if (!password) inputErrors.password = "Password is required";
    return inputErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputErrors = validate();
    if (Object.keys(inputErrors).length > 0) {
      setErrors(inputErrors);
      return;
    }

    try {
      const response = await LOGIN_API({
        UserName: username,
        password: password,
      });

      const { Role } = response.data;

      if (response.status) {
        Swal.fire({
          icon: "success",
          title: "Login successful",
          text: "You have successfully logged in!",
          timer: 1500,
          showConfirmButton: false,
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: response.message,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error.msg || "An unexpected error occurred",
        timer: 1500,
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="text-center mb-4">
          <img src="/assets/images/logo.png" alt="Logo" style={{ height: "80px" }} />
          <h3 className="mt-3">Welcome Back</h3>
          <p className="text-muted">Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username <span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              value={username}
              onChange={handleUsernameChange}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label">Password <span className="text-danger">*</span></label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              value={password}
              onChange={handlePasswordChange}
            />
            <span
              onClick={togglePasswordVisibility}
              className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
              style={{ cursor: "pointer" }}
            >
              <i className={`fa ${isPasswordVisible ? "fa-eye" : "fa-eye-slash"}`}></i>
            </span>
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="d-grid mb-3">
            <button className="btn btn-primary" type="submit">
              Sign In
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary fw-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
