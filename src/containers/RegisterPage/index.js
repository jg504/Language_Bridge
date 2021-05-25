import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import { signup } from '../../actions';
import { NavLink, Link } from 'react-router-dom';

/**
* @author
* @function RegisterPage
* */

const RegisterPage = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [known, setKnown] = useState('');
  const [unknown, setUnknown] = useState('');
  const [interests, setinterests] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const registerUser = (e) => {
    e.preventDefault();

    const user = {
      firstName, lastName, email, password, known, unknown, interests,
    };

    dispatch(signup(user));
  };

  if (auth.authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Layout>
      <div className="base-container">
      <div className="content">
                
                <div className="form">
        <Card>
          <form onSubmit={registerUser}>

            <div className="heading">Sign Up</div>
            <div className="form-group">
            <input
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            </div>
            <div className="form-group">
            <input
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
            </div>
            <div className="form-group">
            <input
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            </div>
            <div className="form-group">
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            </div>
            <div className="form-group">
            <input
              name="knownL"
              type="text"
              value={known}
              onChange={(e) => setKnown(e.target.value)}
              placeholder="Known languages"
            />
            </div>
            <div className="form-group">
            <input
              name="unknownL"
              type="text"
              value={unknown}
              onChange={(e) => setUnknown(e.target.value)}
              placeholder="Unknown languages"
            />
            </div>
            <div className="form-group">
            <input
              name="interests"
              type="text"
              value={interests}
              onChange={(e) => setinterests(e.target.value)}
              placeholder="Interests"
            />
</div>
<div className="form-group">

              Already have an account? <NavLink to={'/login'}>Log in</NavLink>
            </div>
            <div className="footer">
              <button type="submit" >Sign up</button>
            </div>

          </form>
        </Card>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
