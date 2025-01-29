import { useState } from 'react';

const AuthComponent = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowSignupForm(false);
  };

  const handleSignupClick = () => {
    setShowSignupForm(true);
    setShowLoginForm(false);
  };

  const handleContinueWithGoogle = () => {
    // Handle Google authentication logic here
    console.log('Continue with Google');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (showLoginForm) {
      console.log('Login form submitted');
    } else if (showSignupForm) {
      console.log('Signup form submitted');
    }
  };

  return (
    <div>
      {!showLoginForm && !showSignupForm && (
        <div className='text-white flex flex-col'>
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleSignupClick}>Sign Up</button>
          <button onClick={handleContinueWithGoogle}>Continue with Google</button>
        </div>
      )}

      {showLoginForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" required />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}

      {showSignupForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" required />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default AuthComponent;