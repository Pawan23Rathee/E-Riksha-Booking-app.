import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Simulate sign-up process
    navigate('/login');  // Redirect to login after sign-up
  };

  return (
    <div>
      <h2>Sign Up Page</h2>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUpPage;
