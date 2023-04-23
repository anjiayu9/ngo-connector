import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from '@aws-amplify/auth';

function Navbar() {
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

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/ngo">NGO</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/auth">{user ? user.username : 'Login/Signup'}</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
