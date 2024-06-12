import { useNavigate } from "react-router-dom"
import './Unauthorized.css';

const Unauthorized = () => {
    const navigate = useNavigate();

    const goToManagerLogin = () => navigate('/manager/login');
    const goToUserLogin = () => navigate('/user/login');

    const role = localStorage.getItem('role');
    console.log(role);

    return (
        <section className="unauth">
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button onClick={goToManagerLogin}>Go to manager login</button>
                <br />
                <button onClick={goToUserLogin}>Go to user login</button>
            </div>
        </section>
    )
}

export default Unauthorized;