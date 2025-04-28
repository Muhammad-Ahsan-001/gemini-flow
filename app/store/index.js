import { create } from 'zustand'

export default create((set) => ({
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    flowChart: { nodes: [], edges: [] },
    setFlowChart: (flowChart) => set({ flowChart }),
}))
