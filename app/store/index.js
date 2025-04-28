import { create } from 'zustand'

export default create((set) => ({
    apiUrl: import.meta.env.NODE_ENV === 'production' ? 'https://something.com' : 'http://localhost:3000',
    flowChart: { nodes: [], edges: [] },
    setFlowChart: (flowChart) => set({ flowChart }),
}))