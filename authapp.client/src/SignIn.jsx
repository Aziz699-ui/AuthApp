import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "/api/auth/signin",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                }
            );

            if (!response.ok) {
                alert("Invalid credentials");
                return;
            }

            const data = await response.json();

            navigate("/welcome", {
                state: {
                    username: data.username
                }
            });

        } catch (error) {
            console.log(error);
            alert("Server error");
        }
    };

    return (
        <div className="page">

            <div className="card">

                <h2>Sign In</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                email: e.target.value
                            })
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                password: e.target.value
                            })
                        }
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p>Don't have an account?</p>

                <Link to="/signup">
                    Sign Up
                </Link>

            </div>

        </div>
    );
}

export default SignIn;