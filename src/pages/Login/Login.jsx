import { useRef, useState, useEffect, useContext } from 'react';
import logo from "../../logo/pngAsset 6@4x.png";
import './Login.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const phoneRef = useRef();
    const errRef = useRef();

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false); 
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (phoneRef.current) {
            phoneRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [phone, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // try {
        //     const response = await axios.post(LOGIN_URL,
        //         JSON.stringify({ phone: phone, password: pwd }),
        //         {
        //             headers: { 'Content-Type': 'application/json' }
        //         }
        //     );
        //     // console.log(JSON.stringify(response?.data));
        //     // const accessToken = response?.data?.token;
            
        //     // setAuth({ phone, token: accessToken });
        //     // setPhone('');
        //     // setPwd('');
        //     // setSuccess(true);


        //     console.log('Response:', response); // Debug: Check the response object
        //     const token = response.data.data.token;
        //     console.log('Token:', token); // Debug: Check the token
        //     if (token) {
        //         localStorage.setItem('token', token); // Store the token
        //         console.log('Token stored:', token); // Debug: Confirm the token is stored
        //         alert('Login successful!');
        //     } else {
        //         alert('Login failed. Token not found in the response.');
        //     }
        //     setSuccess(true);
        // } catch (err) {
        //     if (!err?.response) {
        //         setErrMsg('No Server Response');
        //     } else if (err.response?.status === 400) {
        //         setErrMsg('Missing Phone or Password');
        //     } else if (err.response?.status === 401) {
        //         setErrMsg('Unauthorized');
        //     } else {
        //         setErrMsg('Login Failed');
        //     }
        //     if (errRef.current) {
        //         errRef.current.focus();
        //     }
        // }

        try {
            const response = await axios.post('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/login', {
              phone,
              password,
            });
            console.log('Response:', response); // Debug: Check the response object
      
            const token = response.data.data.token;
            console.log('Token:', token); // Debug: Check the token
      
            if (token) {
              login(token, 'manager');
              console.log('Token stored:', token); // Debug: Confirm the token is stored
              alert('Login successful!');
              navigate('/');
            } else {
              alert('Login failed. Token not found in the response.');
            }
          } catch (error) {
            console.error('Error logging in', error);
            alert('Login failed. Please check your phone and password.');
          }
    }

    return (
        <div className='login'>
             
                <section>
                    <img src={logo} alt="logo" />
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="phone">Email:</label>
                        <input
                            type="text"
                            id="phone"
                            ref={phoneRef}
                            autoComplete="off"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <button onClick={() => {navigate('/user/login')}}>Go to User Login</button>
                </section>
            
        </div>
    )
}

export default Login;
