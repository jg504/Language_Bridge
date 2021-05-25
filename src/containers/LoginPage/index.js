import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import { signin, isLoggedInUser } from '../../actions';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';

/**
* @author
* @function LoginPage
**/

const LoginPage = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  // useEffect(() => {
  //   if(!auth.authenticated){
  //     dispatch(isLoggedInUser())
  //   }
  // }, []);




  const userLogin = (e) => {
    e.preventDefault();

    if(email == ""){
      alert("Email is required");
      return;
    }
    if(password == ""){
      alert("Password is required");
      return;
    }

    dispatch(signin({ email, password }));
    




  }


  if(auth.authenticated){
    return <Redirect to={`/`} />
  }



  return(
    
      <Layout>
      <div className="base-container">
        <div className="content">
                
      <div className="form">
            
        <Card>
        
        <div className="heading"> Log In </div>
        
          <form onSubmit={userLogin}>
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
            /></div>
             
             
            <div className="form-group">

              Don't have an account? <NavLink to={'/signup'}>Sign up</NavLink>
            </div>


            <div className="footer">
              <button type="button" className="btn">
                Login</button>
            </div>

          </form>
        </Card>
        
      </div>
      </div></div>
      </Layout>
    
   )

 }

export default LoginPage