import { useRef, useState, useEffect, useContext } from 'react';
import logo from "../../logo/pngAsset 6@4x.png";
import './Login.css';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Spinner from '../../components/Spinner';

const Login = () => {
    const phoneRef = useRef();
    const errRef = useRef();

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false); 
    const [loading, setLoading] = useState(false); // Add loader state
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
        setLoading(true); // Start loading

        try {
            const response = await axios.post('https://jawak-wa-tareekak.onrender.com/jawak-wa-tareekak/manager/login', {
              phone,
              password,
            });
      
            const token = response.data.data.token;
      
            if (token) {
              login(token);
              setSuccess(true);
            } else {
              alert('Login failed. Token not found in the response.');
            }
          } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 400) {
                    setErrMsg('Missing Phone or Password');
                } else if (err.response?.status === 401) {
                    setErrMsg('Unauthorized');
                } else {
                    setErrMsg('Not Correct Phone or Password');
                }
                if (errRef.current) {
                    errRef.current.focus();
                }
            }
          setLoading(false); // Stop loading
    }

    return (
        <div className='login'>
            { success ? (
                <section>
                    <p>Login Successful</p>
                    <Link to='dashboard'>Go To Dashboard</Link>
                </section>
            ) : (
                    <section>
                        <img src={logo} alt="logo" />
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        {loading ? "" : <h1>Sign In</h1>}
                        {loading ? ( // Display loader when loading
                            <div className="loader"><Spinner /></div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="phone">Email</label>
                                <input
                                    type="text"
                                    id="phone"
                                    ref={phoneRef}
                                    autoComplete="off"
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                    required
                                />

                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                                <button>Sign In</button>
                            </form>
                        )}
                    </section>
                )
            }
        </div>
    )
}

export default Login;
