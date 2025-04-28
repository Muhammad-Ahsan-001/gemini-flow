import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import useStore from "../../store";
import "../css/chatFlow.css";
import logoimg from "../assets/logo.png";

const ChatFlow = () => {

    const apiUrl = useStore((state) => state.apiUrl)

    const navigate = useNavigate()

    //use state
    const [input, setInput] = useState("");
    const [flowcharts, setFlowcharts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //use effects
    useEffect(() => {
        getFlowCharts()
    }, [])

    //event handlers
    const handleSend = async (e) => {
        try {
            e.preventDefault();

            if (!input.trim()) return;

            setIsLoading(true);
            setInput(""); // Clear the input field

            await axios.post(`${apiUrl}/gemini/chat`, { message: input }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            getFlowCharts()
            setIsLoading(false)

        } catch (err) {
            alert("An error occurred while sending the message. Please try again later.")
            setIsLoading(false)
            console.error("Error sending message:", err);
        }
    };

    //functions
    const getFlowCharts = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/gemini/flowcharts`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            setFlowcharts(data);
        } catch (err) {
            console.error("Error fetching flowcharts:", err);
        }
    }

    return (
        <div className="chatflow-container">
            <div className="sidebar">
                <h3>Flowcharts</h3>
                {flowcharts.map((flowchart) => (
                    <div key={flowchart._id} className="flowchart-item">
                        <h4 onClick={() => navigate(`/flowchart/${flowchart._id}`)}>{flowchart.name}</h4>
                        {/* You can add more details about the flowchart here */}
                    </div>
                ))}
                {/* You can map real data here */}
            </div>

            <div className="chat-area">
                <div className="messages">
                    {isLoading ? <Loading /> : ""}

                    <div> <img src={logoimg} alt="logo of geminin flow" className="logo-image" /></div>


                </div>

                <form className="input-area" onSubmit={handleSend}>
                    <input
                        type="text"
                        placeholder="Type an idea for your flowchart! (e.g., How to learn Python)"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ChatFlow;