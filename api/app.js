// Getting dependencies
const express = require('express');
const cors = require('cors');
const cp = require("cookie-parser");
const http = require('http');
const WebSocket = require('ws')
require("dotenv").config();

// Starting app and socket
const app = express();
const server = http.createServer(app);
const { webSocket } = require('./controllers/openai')
// WebSocket Server
const wss = new WebSocket.Server({ server });


// Functions
const cnt = require("./db/connect");
const router = require('./routers/app');
const loginRouter = require('./routers/login');
const chatRouter = require('./routers/gemini');

//middlewares
const checkUser = require('./middleware/checkUser');

// CORS for Express
app.use(cors({
    origin: ["http://localhost:5173", "https://gemini-flow-react-git-main-muhammad-ahsans-projects-789c2ac2.vercel.app"], 
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token']
}));

// Cookie-parser
app.use(cp());

// Accessing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', router);
app.use('/login', loginRouter);
app.use('/gemini', checkUser, chatRouter);

// Handle WebSocket connections
wss.on('connection', (ws, req) => webSocket(ws, req));

// Function to start the API
const run = async () => {
    // Connect to the database
    await cnt(process.env.DB_URL);

    // Starting the app
    const port = process.env.PORT || 3000;
    server.listen(port, '0.0.0.0', () => { // Changed to server.listen
        console.log(`Running on port ${port}`);
    });
}

run();
