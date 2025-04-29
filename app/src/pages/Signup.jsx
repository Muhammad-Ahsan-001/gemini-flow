import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useStore from "../../store"
import axios from "axios";

import "../css/signup.css";

const Signup = () => {

    //navigate
    const navigate = useNavigate()

    //store variables
    const apiUrl = useStore((state) => state.apiUrl)

    //useState
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    //useEffect
    useEffect(() => {
        setTimeout(() => setError(""), 10000)
    }, [error])

    useEffect(()=>{
        if(localStorage.getItem("token")){
           navigate("/home")
        }
    })

    //event handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        try {

            e.preventDefault();
            if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            await axios.post(`${apiUrl}/user/add`, formData)

            alert("Form submitted! Kindly login to continue.");
            navigate("/login")
        } catch (err) {
            console.log(err)
            setError(err?.response?.data?.err ?? "An error occurred while signing up. Please try again.")
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Create Account</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
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
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
                    title="Must contain at least 8 characters, including uppercase, lowercase, and a number"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Sign Up</button>
                <span className="signup-link">Already have an account? <NavLink to="/login">Login</NavLink></span>

            </form>
        </div>
    );
};

export default Signup;
