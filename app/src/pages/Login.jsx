import { useEffect } from 'react'
import Login from '../components/Login'
import { useNavigate } from 'react-router-dom'
const App = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/home")
        }
    })

    return <Login url='/login/user' />
}

export default App