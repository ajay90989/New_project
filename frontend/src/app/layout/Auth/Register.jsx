import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { SignIn } from "../../Service/Auth/Auth";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      FullName: "",
      UserName: "",
      PhoneNo: "",
      Email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      FullName: Yup.string().required("Full name is required"),
      UserName: Yup.string().required("Username is required"),
      PhoneNo: Yup.string()
        .matches(/^[0-9]+$/, "Phone number is not valid")
        .length(10, "Phone number must be 10 digits")
        .required("Phone number is required"),
      Email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      const { confirmPassword, ...dataToSubmit } = values;
      dataToSubmit.UserName = dataToSubmit.UserName.toLowerCase();
      Object.keys(dataToSubmit).forEach(key => {
        if (typeof dataToSubmit[key] === "string") {
          dataToSubmit[key] = dataToSubmit[key].trim();
        }
      });

      try {
        const response = await SignIn(dataToSubmit);

        if (response.status) {
          Swal.fire({
            icon: "success",
            title: "Registration successful",
            text: response.message,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate("/login");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Registration failed",
            text: response.message || "An error occurred. Please try again.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Registration failed",
          text:
            error.response?.data?.message ||
            "An error occurred. Please try again.",
        });
      }
    },
  });

  return (
    <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
      <div className="login-aside text-center d-flex flex-column flex-row-auto">
        <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <h3 className="mb-2 text-white">Welcome back!</h3>
        </div>
        <div
          className="aside-image position-relative"
          style={{
            backgroundImage: "url(/assets/images/background/pic-2.png)",
          }}
        >
          <img className="img1 move-1" src="assets/images/background/pic3.png" alt="" />
          <img className="img2 move-2" src="assets/images/background/pic4.png" alt="" />
          <img className="img3 move-3" src="assets/images/background/pic5.png" alt="" />
        </div>
      </div>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6">
            <div className="card mb-0 h-auto">
              <div className="card-body">
                <h2 className="text-center mb-2">Sign Up</h2>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="FullName">Full Name</label>
                    <input
                      id="FullName"
                      type="text"
                      className={`form-control ${formik.touched.FullName && formik.errors.FullName ? "is-invalid" : ""}`}
                      {...formik.getFieldProps("FullName")}
                    />
                    {formik.touched.FullName && formik.errors.FullName && (
                      <div className="invalid-feedback">{formik.errors.FullName}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="UserName">Username</label>
                    <input
                      id="UserName"
                      type="text"
                      className={`form-control ${formik.touched.UserName && formik.errors.UserName ? "is-invalid" : ""}`}
                      {...formik.getFieldProps("UserName")}
                      onInput={(e) => (e.target.value = e.target.value.toLowerCase())}
                    />
                    {formik.touched.UserName && formik.errors.UserName && (
                      <div className="invalid-feedback">{formik.errors.UserName}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="PhoneNo">Phone Number</label>
                    <input
                      id="PhoneNo"
                      type="text"
                      maxLength={10}
                      className={`form-control ${formik.touched.PhoneNo && formik.errors.PhoneNo ? "is-invalid" : ""}`}
                      {...formik.getFieldProps("PhoneNo")}
                    />
                    {formik.touched.PhoneNo && formik.errors.PhoneNo && (
                      <div className="invalid-feedback">{formik.errors.PhoneNo}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="Email">Email</label>
                    <input
                      id="Email"
                      type="email"
                      className={`form-control ${formik.touched.Email && formik.errors.Email ? "is-invalid" : ""}`}
                      {...formik.getFieldProps("Email")}
                    />
                    {formik.touched.Email && formik.errors.Email && (
                      <div className="invalid-feedback">{formik.errors.Email}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <div className="input-group">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                        {...formik.getFieldProps("password")}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <div className="invalid-feedback">{formik.errors.password}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                    <div className="input-group">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "is-invalid" : ""}`}
                        {...formik.getFieldProps("confirmPassword")}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                      <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                    )}
                  </div>

                  <div className="mb-3 d-grid">
                    <button className="btn btn-primary" type="submit" disabled={formik.isSubmitting}>
                      {formik.isSubmitting ? "Registering..." : "Register"}
                    </button>
                  </div>

                  <div className="new-account mt-3 text-center">
                    <p className="font-w500">
                      Already have an account?{" "}
                      <Link className="text-primary" to="/login">
                        Back to Login
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
