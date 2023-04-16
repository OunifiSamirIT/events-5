import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useLocation, useNavigate } from "react-router-dom";
import Inputs from "../components/AkremComponents/Inputs";
import { LoginAction } from "../redux/actions/authActions";
import illustrationsLight from "../assets/login-v2.svg";
import logo from "../assets/logo192.png";
import { Row, Col, CardText, CardTitle } from "reactstrap";


function Login() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginAction(form), navigate);

  };

  return (
    <Fragment>
      <div className="bodylogin">
        <div className="auth-wrapper auth-cover">
          <Row className="auth-inner m-0">
            
            <a
              className="brand-logo"
              href="/"
              
            >
              <img
                // className="link"
                src={logo}
                alt="logo"
                style={{ height: 50 }}
              />
            </a>
            <Col
              className="d-none d-lg-flex align-items-center p-5"
              lg="8"
              sm="12"
            >
              <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
                <img
                  className="img-fluid"
                  src={illustrationsLight}
                  alt="Login Cover"
                />
              </div>
            </Col>
            <Col
              className="d-flex align-items-center auth-bg px-2 p-lg-5"
              lg="4"
              sm="12"
            >
              <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
                <CardTitle tag="h2" className="fw-bold mb-1">
                  <h2 className="h2login"> Welcome to our site ! 👋</h2>
                </CardTitle>
                <CardText className="mb-2">
                  <h3 className="h3login">Please sign-in to your account</h3>
                </CardText>

                <form onSubmit={onSubmit}>
                  <br></br>
                  <label style={{ color: "white" }}>Email</label>

                  <Inputs
                    name="email"
                    type="text"
                    icon="fa-solid fa-at"
                    onChangeHandler={onChangeHandler}
                    errors={errors.email}
                  />
                  <label style={{ color: "white" }}>Password</label>

                  <Inputs
                    name="password"
                    type="password"
                    icon="fa-solid fa-key"
                    onChangeHandler={onChangeHandler}
                    errors={errors.password}
                  />
                  <div className="d-flex justify-content-between">
                   
                   
                   
                     <button type="submit" className="btn btn-outline-primary">
                      
                      Connect <i className="fa-solid fa-floppy-disk"></i>
                    </button>
                    <Link to="/register">I don't have account</Link>
                  </div>
                </form>
              </Col>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
