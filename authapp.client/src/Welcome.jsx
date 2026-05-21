import { useLocation, useNavigate } from "react-router-dom";

function Welcome() {
    const location = useLocation();
    const navigate = useNavigate();

    const username = location.state?.username || "User";

    const logout = () => {
        navigate("/signin");
    };

    return (
        <div className="welcome-page">
            <div className="welcome-card">

                <h1>Welcome, {username}!</h1>

                <p>
                    You have successfully logged in.
                </p>

                <button onClick={logout}>
                    Logout
                </button>

            </div>
        </div>
    );
}

export default Welcome;