import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import { signup } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

/**
* @author
* @function RegisterPage
**/

const RegisterPage = (props) => {


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [knownLanguage, setKnownLanguage] = useState('');
  const [unknownLanguage, setUnknownLanguage] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);


  const registerUser = (e) => {
    
    e.preventDefault();

    const user = {
      firstName, lastName, email, password, knownLanguage, unknownLanguage
    }
    
    dispatch(signup(user))
  }


  if(auth.authenticated){
    return <Redirect to={`/`} />
  }

  return(
    <Layout>
      <div className="registerContainer">
        <Card>
          <form onSubmit={registerUser}>

            <h3>Sign up</h3>

          <input 
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />

            <input 
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />

            <input 
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <input 
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <label > Known Language: 
            <select name='knownLanguage' onChange={(e) => setKnownLanguage(e.target.value)}>
            
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="french">French</option>
            <option value="mandarin">Mandarin</option>
            </select></label>
            <p></p>
            <label> Unknown Language: 
            <select name='unknownLanguage' onChange={(e) => setUnknownLanguage(e.target.value)}>
            
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="french">French</option>
            <option value="mandarin">Mandarin</option>
            </select></label>
            
            
            <div>
              <button>Sign up</button>
            </div>



          </form>
        </Card>
      </div>
    </Layout>
   )

 }

export default RegisterPage