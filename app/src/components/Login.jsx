/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useStore from "../../store"
import axios from "axios";

import "../css/signup.css";

const Login = ({ url }) => {

    //navigate
    const navigate = useNavigate()

    //store variables
    const apiUrl = useStore((state) => state.apiUrl)

    //useState
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    //useEffect
    useEffect(() => {
        setTimeout(() => setError(""), 10000)
    }, [error])

    //event handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        try {

            e.preventDefault();

            const { data } = await axios.post(`${apiUrl + url}`, formData)

            if (!data.token) return setError(data.err ?? "An error occurred while logging in. Please try again later.")

            localStorage.setItem("token", data.token)

            navigate("/home")
        } catch (err) {
            console.log(err)
            setError(err?.response?.data?.err ?? "An error occurred while logging in. Please try again.")
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
                <span className="signup-link">Don&apos;t have an account? <NavLink to="/signup">Sign up</NavLink></span>
            </form>
        </div>
    );
};

export default Login;
