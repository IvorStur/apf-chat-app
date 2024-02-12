import React from 'react';
import {
    MDBValidation,
  MDBValidationItem,
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { useState } from "react";

function App() {
    const [formValue, setFormValue] = useState({
        username: '',
        password: '',
      });

    const handleSubmit = (e) => {console.log(formValue)}

    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
      };
  return (
    <MDBValidation >

   
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
    <MDBValidationItem >
      <MDBInput value={formValue.fname} onChange={onChange} required wrapperClass='mb-4' name="username" label='username' id='username' type='text'/>
    </MDBValidationItem>

    <MDBValidationItem >
      <MDBInput value={formValue.fname} onChange={onChange} required wrapperClass='mb-4' name="password" label='Password' id='password' type='password'/>
    </MDBValidationItem>

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        <a href="!#">Forgot password?</a>
      </div>

      <MDBBtn onClick={handleSubmit} className="mb-4">Sign in</MDBBtn>

      <div className="text-center">
        <p>Not a member? <a href="#!">Register</a></p>
        <p>or sign up with:</p>

        <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='facebook-f' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='twitter' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='google' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='github' size="sm"/>
          </MDBBtn>

        </div>
      </div>

    </MDBContainer>
    </MDBValidation>
  );
}

export default App;