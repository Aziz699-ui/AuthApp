import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            const response = await fetch(
                "/api/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: form.username,
                        email: form.email,
                        password: form.password
                    })
                }
            );

            if (!response.ok) {
                const error = await response.text();
                alert(error);
                return;
            }

            alert("Registration successful");

            navigate("/signin");

        } catch (error) {
            console.log(error);
            alert("Server error");
        }
    };

    return (
        <div className="page">
            <div className="card">

                <h2>Sign Up</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                username: e.target.value
                            })
                        }
                    />

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

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                confirmPassword: e.target.value
                            })
                        }
                    />

                    <button type="submit">
                        Register
                    </button>

                </form>

                <p>Already have an account?</p>

                <Link to="/signin">
                    Sign In
                </Link>

            </div>
        </div>
    );
}

export default SignUp;