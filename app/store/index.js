import { create } from 'zustand'

export default create((set) => ({
    apiUrl: import.meta.env.NODE_ENV === 'production' ? 'http://193.203.191.142:5000' : 'http://localhost:3000',
    flowChart: { nodes: [], edges: [] },
    setFlowChart: (flowChart) => set({ flowChart }),
}))
