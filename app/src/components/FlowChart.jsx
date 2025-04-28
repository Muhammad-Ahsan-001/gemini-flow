/* eslint-disable react/prop-types */
import { useCallback } from 'react';
import {
    ReactFlow, MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import DownloadButton from './DownloadButton'

import store from '../../store';


function Flow() {

    const flowChartFromStore = store(s => s.flowChart)

    const { nodes: initialNodes, edges: initialEdges } = flowChartFromStore ?? { nodes: [], edges: [] };

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            minZoom={0.0000001}
        >
            <MiniMap />
            <Controls style={{ color: 'black' }} />
            <Background />
            <DownloadButton />
        </ReactFlow>
    );
}


export default function App() {

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Flow />
        </div>
    );
}