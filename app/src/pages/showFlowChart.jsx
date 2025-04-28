import { useEffect, useState, useCallback } from "react"
import { useParams, NavLink } from "react-router-dom"
import axios from "axios"

import '../css/flowchartButtons.css'

import useStore from "../../store"
import FlowChart from "../components/FlowChart"
import Loading from "../components/Loading"

const ShowFlowChart = () => {

    const { id } = useParams()

    const apiUrl = useStore((state) => state.apiUrl)
    const setFlowChartFromStore = useStore((state) => state.setFlowChart)

    //use state
    const [flowChart, setFlowChart] = useState({ edges: [], nodes: [] })

    //functions
    const getFlowChart = useCallback(async () => {
        const { data } = await axios.get(`${apiUrl}/gemini/flowchart/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        setFlowChart({ nodes: data.nodes, edges: data.edges })
        setFlowChartFromStore({ nodes: data.nodes, edges: data.edges })
    }, [])

    useEffect(() => {
        getFlowChart()
    }, [getFlowChart])



    return (
        flowChart.nodes?.length > 0 ?
            <>
                <div className="buttonflow" id="new-flowchart">
                    <NavLink to='/home'>

                        New Flowchart
                    </NavLink>
                </div>
                <FlowChart />
            </>
            :
            <Loading />
    )
}

export default ShowFlowChart