import { useRef, useState, useEffect } from 'react';
import logo from "../../logo/pngAsset 6@4x.png";
import './Login.css';
import { Link } from 'react-router-dom';
import axios from "../../api/axios";

const LOGIN_URL = '/jawak-wa-tareekak/user/login';

const Login = () => {
    const phoneRef = useRef();
    const errRef = useRef();

    const [phone, setPhone] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (phoneRef.current) {
            phoneRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [phone, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ phone: phone, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            // console.log(JSON.stringify(response?.data));
            // const accessToken = response?.data?.token;
            
            // setAuth({ phone, token: accessToken });
            // setPhone('');
            // setPwd('');
            // setSuccess(true);


            console.log('Response:', response); // Debug: Check the response object
            const token = response.data.data.token;
            console.log('Token:', token); // Debug: Check the token
            if (token) {
                localStorage.setItem('token', token); // Store the token
                console.log('Token stored:', token); // Debug: Confirm the token is stored
                alert('Login successful!');
            } else {
                alert('Login failed. Token not found in the response.');
            }
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Phone or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            if (errRef.current) {
                errRef.current.focus();
            }
        }
    }

    return (
        <div className='login'>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <Link to="/">Go to Home</Link>
                    </p>
                </section>
            ) : (
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
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                </section>
            )}
        </div>
    )
}

export default Login;
