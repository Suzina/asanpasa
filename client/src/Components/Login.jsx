import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/custom.css'

const LOGIN_URL = '/auth/login';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Login() 
{
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUser] = useState('');
  const [password, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success] = useState(false);

  useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

  const handleSubmit= async (e) =>
  {
    e.preventDefault();
    console.log(JSON.stringify({ username, password }));
    try
    {
        const response = await axios.post(LOGIN_URL,
        JSON.stringify({ username, password }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
        );

        if (response.data.error) 
        {
            setErrMsg(response.data.error);
        } 
        else 
        {
            sessionStorage.setItem("accessToken", response.data);
            sessionStorage.setItem("username", username);
            const accessToken = response.data;

            setAuth({ username, accessToken });
            navigate('/admin/dashboard');
        }
        console.log(JSON.stringify(response?.data));
    }
    catch (err)
    {
        console.log(err)

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
                
    	<div className="container d-flex align-items-center justify-content-center form-height-login pt-24px pb-24px">
			 <div className="gradient-bg"></div>
                <div className="row justify-content-center">
				<div className="col-lg-6 col-md-10">
					<div className="card">
						<div className="card-header bg-primary">
							<div className="ec-brand">
								<a href={`${baseUrl}/admin/products`} title="AsanPasa">
									AsanPasa
								</a>
							</div>
						</div>
						<div className="card-body p-5">
							<h4 className="text-dark mb-5">Sign In</h4>
             <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

							<form id="loginForm" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                    <i className="fas fa-envelope"></i>
                    <input type="username" 
                    className="form-control" 
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={username}
                    placeholder="Enter your email" required />
                </div>
            </div>
            
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                    <i className="fas fa-lock"></i>
                    <input 
                    type="password" 
                    id="password" 
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                    className="form-control" 
                    placeholder="Enter your password" required />
                </div>
            </div>
            
            <div className="checkbox-group">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me for 30 days</label>
                <a href="#">Forgot password?</a>
            </div>
            
            <button type="submit" className="submit-btn">Sign In</button>
            
            
        </form>
						
						</div>
					</div>
				</div>
			</div>
		</div>
	  )}
      
    
    </>
  )
}
