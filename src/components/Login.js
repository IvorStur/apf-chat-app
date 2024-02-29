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
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
// import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const socket = io("http://localhost:3001"); // Replace with your server URL

function App(props) {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = formValue.username;
      const password = formValue.password;
      await axios.post(
        `http://localhost:5000/login`,
        { username, password },
        { withCredentials: true }
      );
      //  localStorage.setItem("username", username)
      //  localStorage.setItem("loggedIn", true);
      //  console.log(localStorage.getItem("loggedIn"))
      localStorage.setItem("username", username);
      props.userLogged();
      navigate("/home");
    } catch (error) {
      console.error("Login failed", error.response.data);
      alert("Wrong password");
    }
  };

  // const handleSubmit = (e) => {
  //   console.log(formValue);
  //   e.preventDefault();
  //   socket.emit("userLogin", formValue);
  // };

  // socket.on("userLogged", (res) => {
  //   console.log(res)
  // })

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  return (
    // <div className=" text-center  flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
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

        <div className="text-center  d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox
            name="flexCheck"
            value=""
            id="flexCheckDefault"
            label="Remember me"
          />
          <a href="!#">Forgot password?</a>
        </div>

        <MDBBtn
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        >
          Sign in
        </MDBBtn>

        <div className="text-center ">
          <p>
            Not a member? <a href="/register">Register</a>
          </p>
          <p>or sign up with:</p>

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
    // </div>
  );
}

export default App;
