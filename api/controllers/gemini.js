
require('dotenv').config()
const { GoogleGenAI } = require("@google/genai");
const userModel = require('../models/users')

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const prompt = require('../utils/promptTemplate')

const colorMap = [
    "#16222A", // Charcoal Navy - Deep base
    "#1F3B4D", // Navy Blue - Strong and confident
    "#28536B", // Deep Teal - Cool and modern
    "#3C6997", // Steel Blue - Balanced and calm
    "#4A90A4", // Muted Sky - Transitional
    "#70A9A1", // Desaturated Cyan - Friendly
    "#92B4B1", // Soft Teal - Gentle and subtle
    "#A9BCD0", // Pale Slate - Light and clean
    "#D8DBE2", // Misty Gray-Blue - Minimal and airy
    "#F0F4F8"  // Almost White - For the lightest levels
];


const convertWithD3 = async (json) => {
    try {

        const d3 = await import('d3');
        const root = d3.hierarchy(json);
        const treeLayout = d3.tree().nodeSize([100, 200]);
        treeLayout(root);

        const nodes = [];
        const edges = [];

        root.descendants().forEach((d) => {
            const nodeColor = colorMap[d.depth % colorMap.length];

            nodes.push({
                id: d.data.label,
                data: { label: d.data.label },
                position: { x: d.y, y: d.x }, // D3 flips x and y
                style: {
                    backgroundColor: nodeColor,
                    color: 'white',
                    borderRadius: '10px',
                    padding: '10px'
                }
            });

            if (d.parent) {
                const parentColor = colorMap[d.parent.depth % colorMap.length];

                edges.push({
                    id: `e-${d.parent.data.label}-${d.data.label}`,
                    source: d.parent.data.label,
                    target: d.data.label,
                    type: 'smoothstep',
                    style: {
                        stroke: parentColor,
                        strokeWidth: 2
                    }
                });
            }
        });

        return { nodes, edges };
    }
    catch (error) {
        console.error("Error converting JSON to D3 format:", error);
        return { err: "Error converting JSON to D3 format" };
    }
}


const convertStrToJson = (str) => {
    try {
        // Remove any unwanted characters or whitespace
        str = str.split('```json')[1]?.split('```')[0]?.trim() ?? "{}"

        const json = JSON.parse(str);
        return (json);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return { err: "Error parsing JSON" };
    }
}

const chat = async (req, res) => {
    try {
        const { message } = req.body

        if (!message) {
            return res.status(400).json({ err: "Message is required" })
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: message + "\n" + prompt,
        });

        const json = convertStrToJson(response?.candidates[0]?.content.parts[0]?.text)
        if (!json) return res.status(500).json({ err: json.err })


        const { edges, nodes } = await convertWithD3(json)
        if (json?.err) return res.status(500).json({ err: json?.err })

        //extracting user _id
        const { _id } = req.middlewareData

        // Storing the data in the database
        const updatedUser = await userModel.findByIdAndUpdate(
            _id,
            {
                $push: {
                    flowCharts: {
                        name: json.label || "Flowchart",
                        edges, nodes
                    }
                }
            },
            { new: true }
        );

        const newFlowChartId = updatedUser.flowCharts[updatedUser.flowCharts.length - 1]._id;



        res.status(200).json({ id: newFlowChartId })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

const getFlowChart = async (req, res) => {
    try {
        const { _id } = req.params

        // Storing the data in the database
        const user = await userModel.findById(req.middlewareData._id).select("flowCharts")
        if (!user) return res.status(404).json({ err: "User not found" })

        const flowChart = user.flowCharts.id(_id)

        if (!flowChart) return res.status(404).json({ err: "Flowchart not found" })

        res.status(200).json(flowChart)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

const getAllFlowCharts = async (req, res) => {
    try {
        const { _id } = req.middlewareData
        const { flowCharts } = await userModel.findById(_id).select("flowCharts")

        if (!flowCharts || flowCharts.length === 0) return res.status(404).json({ err: "Flowcharts not found" })

        const onlyNames = flowCharts.map(fc => ({
            _id: fc._id,
            name: fc.name,
        }));

        res.status(200).json(onlyNames)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}


module.exports = {
    chat,
    getAllFlowCharts,
    getFlowChart
}