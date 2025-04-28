//imports and configurations
const OpenAIApi = require('openai');
require('dotenv').config()

// middleware
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/users')
const checkUser = async (req, ws) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            ws.close(401, "No token found")
            return
        }
        const token = authHeader.split(' ')[1]
        if (!token) {
            ws.close(401, "No token found")
            return
        }
        const result = jwt.decode(token)
        const data = await userModel.findById(result._id)
        if (!data) {
            ws.close(401, "No data found in user middleware")
            return
        }
        const { password } = data
        const match = await bcrypt.compare(result.password, password)
        if (!match) {
            ws.close(401, "Password didn't match in the middleware of user")
            return
        }
        req.body.assistant_id = data.assistant_id
        req.body.apiKey = data.apiKey
        req.body.threadInfo = { count: data.countReplies, threadId: data.threadId }
        getMessage(req, ws)
    } catch (err) {
        ws.close(401, "Something went wrong in the server middleware")
        console.log(err)
    }
}

const getMessage = async (req, ws) => {
    try {
        const { assistant_id, content, apiKey } = req.body
        const openai = new OpenAIApi({
            apiKey
        });
        const stream = await openai.beta.threads.createAndRun({
            assistant_id,
            thread: {
                messages: [
                    { role: "user", content },
                ],
            },
            stream: true
        })
        for await (const event of stream) {
            if (event.event == 'thread.message.delta') {
                ws.send(event.data.delta.content[0].text.value)
            } else if (event.event == 'thread.message.completed') {
                ws.send(event.event)
            }
        }
    } catch (error) {
        console.log(error)
        ws.send(401, "Something went wrong")
    }
}

//web socket functionality
const webSocket = (ws, req) => {
    // Listen for messages from WebSocket clients
    ws.on('message', (message) => {
        //converting data type
        const msg = Buffer.isBuffer(message) ? message.toString() : message;
        const token = req.url.replace('/?token=', '')

        //attaching respected headers and body to look like a request
        req.headers.authorization = `Bearer ${token}`
        req.body = { content: msg }
        //first authenticate
        checkUser(req, ws)
    });

    ws.on('close', () => {
        console.log('WebSocket client disconnected');
    });
}

module.exports = { webSocket }