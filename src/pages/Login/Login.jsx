// import React, { useState } from "react";
// import "./Login.css";
// import logo from "../../logo/pngAsset 6@4x.png";
// import axios from "axios";

// const LogIn = () => {
//     const [username, setUsername] = useState();
//     const [password, setPassword] = useState();

//     const sendData = (event) => {
//         event.preventDefault();
//         axios
//             .post("api", { username: username, password: password })
//             .then((res) => console.log(res));
//     };

//     return (
//         <div className="login">
//             <form onSubmit={() => sendData()}>
//                 <img src={logo} alt="logo" />
//                 <input
//                 type="text"
//                 placeholder="username"
//                 onChange={(event) => setUsername(event.target.value)}
//                 />
//                 <input
//                 type="password"
//                 placeholder="password"
//                 onChange={(event) => setPassword(event.target.value)}
//                 />
//                 <input type="submit" value="Log in" />
//             </form>
//         </div>
//     );
// };

// export default LogIn;



import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../../context/AuthProvider";
import logo from "../../logo/pngAsset 6@4x.png";
import axios from "axios";
import './Login.css';
import { Link } from 'react-router-dom';

const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
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
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
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
                    {/* <p className='signedin'>
                        Need an Account?<br />
                        <span className="line">
                            <Link to="/register">Sign up</Link>
                        </span>
                    </p> */}
                </section>
            )}
        </div>
    )
}

export default Login;