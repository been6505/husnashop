import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { resetPasswordConfirm } from "../actions/userActions";

function ResetPasswordConfirmScreen( {match, resetPassword }) {
  const [requestSent,setRequestSent] = useState(false);
  // State to manage the email input
  const [formData, setFormData] = useState({
    new_password:'',
    re_new_password:''
  });
  
  const {new_password,re_new_password}= formData;
  // Access the Redux dispatch function

  const onChange =e => setFormData({...formData,[e.target.name] : e.target.value});

  // Select relevant data from the Redux store
  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { loading, error, success } = setRequestSent;

  // Function to handle form submission
  const submitHandler = (e) => {

    const uid = match.params.uid
    const token = match.params.token
    e.preventDefault();
    resetPasswordConfirm(uid , token , new_password,re_new_password);
    setRequestSent(true);
  };

  return (
    // Container for the form
    <FormContainer>
      {/* Card for styling */}
      <Card className="m-3 p-3 bg-light">
        {/* Title */}
        <h1 className="text-center">Reset Password</h1>
        
        {/* Display an error message if there's an error */}
        {error && <Message variant="danger">{error}</Message>}
        
        {/* Display a loader while the request is loading */}
        {loading && <Loader />}

        {/* Form for submitting the email */}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            
            <Form.Control
              type="password"
              placeholder="New password"
              value={new_password}
              onChange={(e) => onChange(e)} // Update email state on change
            />
          </Form.Group>

          <Form.Group controlId="password">
            
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={re_new_password}
              onChange={(e) => onChange(e)} // Update email state on change
            />
          </Form.Group>

          {/* Submit button */}
          <Button
            type="submit"
            variant="primary"
            className="mt-3 w-100"
            style={{ borderRadius: "2rem" }}
          >
            Request Reset
          </Button>
        </Form>

        {/* Link to navigate back to the login page */}
        <hr />
        <Link to="/login" className="text-decoration-none">
          Back to Login
        </Link>
      </Card>
    </FormContainer>
  );
}

export default connect(null ,{resetPasswordConfirm})(ResetPasswordConfirmScreen) ;
