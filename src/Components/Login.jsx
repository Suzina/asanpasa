import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";
import axios from '../api/axios';
const LOGIN_URL = '/asanpasa.php';

export default function Login() {

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

  const handleSubmit= async (e) =>
  {
    e.preventDefault();
    try{
        const response = await axios.post(LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
        );
        console.log(JSON.stringify(response?.data?.success));
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        ///setAuth({ user, pwd, roles, accessToken });
        //setUser('');
        //setPwd('');
        //setSuccess(true);
        //console.log("congratulations! You are in!")
    }catch (err){
 if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
    }
  }
  return (
    <>
      {success ? (
                <div>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </div>
            ) : (
              <div>
 <div className="gradient-bg"></div>
    <div className="form-container">
        <div className="logo">
            <i className="fas fa-rocket"></i>
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue</p>
             <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        </div>
        
        <form id="loginForm" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlfor="email">Email Address</label>
                <div className="input-with-icon">
                    <i className="fas fa-envelope"></i>
                    <input type="username" 
                    className="form-control" 
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    placeholder="Enter your email" required />
                </div>
            </div>
            
            <div className="form-group">
                <label htmlfor="password">Password</label>
                <div className="input-with-icon">
                    <i className="fas fa-lock"></i>
                    <input 
                    type="password" 
                    id="password" 
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    className="form-control" 
                    placeholder="Enter your password" required />
                </div>
            </div>
            
            <div className="checkbox-group">
                <input type="checkbox" id="remember" />
                <label htmlfor="remember">Remember me for 30 days</label>
                <a href="#">Forgot password?</a>
            </div>
            
            <button type="submit" className="submit-btn">Sign In</button>
            
            
        </form>
    </div>
              </div>
     
           )}
    
    </>
  )
}
