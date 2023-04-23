// Auth.js
import React, { useState, useEffect } from 'react';
import Amplify from '@aws-amplify/core';
import { Auth } from '@aws-amplify/auth';
import awsConfig from '../aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsConfig);

function AuthComponent() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
  }

  async function handleLogout() {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <div>
      {user ? (
        <>
          <h1>Logged in as {user.username}!</h1>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
}

const AuthPage = withAuthenticator(AuthComponent, {
  signUpConfig: {
    hiddenDefaults: ['phone_number'],
  },
  includeGreetings: false,
  usernameAttributes: 'email',
  hideAllDefaultsExcept: ['signIn', 'signUp', 'confirmSignUp', 'forgotPassword'],
});

export default AuthPage;