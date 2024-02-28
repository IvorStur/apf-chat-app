import React from "react";
import {
  MDBValidation,
  MDBValidationItem,
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const username = formValue.username
        const password = formValue.password
       await axios.post(`http://localhost:5000/register`, {
          username,
          password,
       });
       navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
       console.error("Registration failed", error.response.data);
       alert("User already exist");
    }
 };

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  return (
    <MDBValidation>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBValidationItem>
          <MDBInput
            value={formValue.fname}
            onChange={onChange}
            required
            wrapperClass="mb-4"
            name="username"
            label="username"
            id="username"
            type="text"
          />
        </MDBValidationItem>

        <MDBValidationItem>
          <MDBInput
            value={formValue.fname}
            onChange={onChange}
            required
            wrapperClass="mb-4"
            name="password"
            label="Password"
            id="password"
            type="password"
          />
        </MDBValidationItem>

        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox
            name="flexCheck"
            value=""
            id="flexCheckDefault"
            label="Remember me"
          />
          <a href="!#">Forgot password?</a>
        </div>

        <MDBBtn onClick={handleSubmit} className="mb-4">
          Register
        </MDBBtn>

        <div className="text-center">
          <p>
            Aready have an account? <a href="/login">Login</a>
          </p>

          <div
            className="d-flex justify-content-between mx-auto"
            style={{ width: "40%" }}
          >
            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="facebook-f" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="twitter" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="google" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="github" size="sm" />
            </MDBBtn>
          </div>
        </div>
      </MDBContainer>
    </MDBValidation>
  );
}

export default App;
