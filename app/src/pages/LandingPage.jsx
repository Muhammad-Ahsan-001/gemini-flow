import "../css/LandingPage.css";
import logo from "../assets/logo.png";
import hero from "../assets/hero.png";
import about from "../assets/about.png";
import demo from "../assets/demo.mp4";
import insta from "../assets/insta.png";
import wapn from "../assets/wapn.png";
import gmail from "../assets/gmail.png";
import fb from "../assets/fb.png";
import { NavLink } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="landing-page">

            {/* Navbar */}
            <header className="navbar">
                <nav className="navbar-container">
                    <div className="logo">
                        <img src={logo} alt="logo of geminin flow" />
                        Gemini Flow
                    </div>
                    <ul className="nav-links">
                        <li><a href="#home">Home</a></li>
                        <li>|</li>
                        <li><a href="#how">How It Works</a></li>
                        <li>|</li>
                        <li><a href="#demo">Demo</a></li>
                        <li>|</li>
                        <li><a href="#features">Features</a></li>
                        <li>|</li>
                        <li><a href="#about">About</a></li>
                        <li>|</li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                    <div className="login-button">
                        <NavLink to="/login">Login</NavLink>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section id="home" className="hero">
                <div className="hero-text">
                    <h1>Turn Ideas into Flowcharts Instantly</h1>
                    <p>Use the power of Gemini AI to transform your thoughts into intelligent, structured visual flows with zero effort.</p>
                    <div className="primary-button">
                        <NavLink to="/signup">Generate Your First Flowchart</NavLink>
                    </div>
                </div>
                <div>
                    <img src={hero} alt="photo showing networks" className="hero-image" />
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how" className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps-grid">
                    {/* Simple 4-step explanation */}
                    {['Enter Prompt', 'Process with Gemini', 'Convert to JSON', 'Render Flowchart'].map((step, index) => (
                        <div key={index} className="step-box">
                            <div className="step-number">{index + 1}</div>
                            <p>{step}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Demo Section */}
            <section id="demo" className="demo-section">
                <h2 className="demo-heading">Live Demo</h2>
                <div className="demo-main-container">
                    <div className="video-container">
                        {/* Demo video showing real action */}
                        <video src={demo} controls autoPlay loop muted className="demo-video"></video>
                    </div>
                    <div className="demo-text">
                        <p>
                            Watch how you can instantly transform natural language prompts into fully editable flowcharts. This demo showcases how our tool uses the Gemini API to process input, convert it into structured JSON, and render a dynamic flowchart using React Flow — all in real-time.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <h2>Why Gemini Flow?</h2>
                <div className="features-grid">
                    {/* Highlighting key strengths */}
                    {['AI Powered', 'No Code Needed', 'Real-time Output', 'Exportable Charts'].map((feature, index) => (
                        <div key={index} className="feature-box">{feature}</div>
                    ))}
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about">
                <h2 className="about-heading">About This Tool</h2>
                <div className="about-main-container">
                    <div>
                        <img src={about} alt="photo showing chart formation" className="about-image" />
                    </div>
                    <div className="about-text">
                        <p>
                            This platform is built using Gemini API and React Flow to let you turn natural language into structured, editable flowcharts. Ideal for developers, students, designers, and anyone who thinks in systems.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-icons" id="contact">
                <h2>Connect with Me</h2>
                <div className="icon-grid">
                    {/* Social and contact icons */}
                    <div className="icon-box">
                        <img src={gmail} alt="Gmail" />
                        <span>mahsan7861100@gmail.com</span>
                    </div>
                    <div className="icon-box">
                        <img src={insta} alt="Instagram" />
                        <span>hey_im_ahsani</span>
                    </div>
                    <div className="icon-box">
                        <img src={fb} alt="Facebook" />
                        <span>Muhammad Ahsan</span>
                    </div>
                    <div className="icon-box">
                        <img src={wapn} alt="Phone" />
                        <span>+92 31 77 88 00 59</span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2025 Gemini Flow. All rights reserved.</p>
            </footer>

        </div>
    );
}
