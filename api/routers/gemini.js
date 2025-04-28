const Router = require("express").Router()
const { chat, getFlowChart, getAllFlowCharts } = require('../controllers/gemini')

Router.post('/chat', chat)
Router.get('/flowchart/:_id', getFlowChart)
Router.get('/flowcharts', getAllFlowCharts)

module.exports = Router