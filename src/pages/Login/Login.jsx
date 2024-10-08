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
    const [loading, setLoading] = useState(false);
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
        setLoading(true);

        try {
            const response = await axios.post('https://jawak.jawaktarekak.top/jawak-wa-tareekak/manager/login', {
              phone,
              password,
            });
      
            const token = response.data.data.token;
      
            if (token) {
              login(token);
              setSuccess(true);
              navigate("/users");
            } else {
              alert('Login failed. Token not found in the response.');
            }
          } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 400) {
                    setErrMsg('Missing Email or Password');
                } else if (err.response?.status === 401) {
                    setErrMsg('Unauthorized');
                } else {
                    setErrMsg('Not Correct Email or Password');
                }
                if (errRef.current) {
                    errRef.current.focus();
                }
            } finally {
                setLoading(false);
            }
    }

    return (
        <div className='login'>
            {/* { success ? (
                <section>
                    <p>Login Successful</p>
                    <Link to='dashboard'>Go To Dashboard</Link>
                </section>
            ) : ( */}
                    <section>
                        <img src={logo} alt="logo" />
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        {loading ? "" : <h1>Sign In</h1>}
                        {loading ? ( 
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
                {/* )} */}
        </div>
    )
}

export default Login;
