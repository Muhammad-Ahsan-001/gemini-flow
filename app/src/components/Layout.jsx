import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import axios from "axios"
import useStore from "../../store"

import '../css/index.css'

const Layout = () => {

    const token = localStorage.getItem("token")

    const apiUrl = useStore((state) => state.apiUrl)

    const navigate = useNavigate()

    useEffect(() => {
        const func = async () => {
            try {
                const data = await axios.get(`${apiUrl}/home`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Proper header name for JWT tokens is 'Authorization'
                    }
                })
                if (data.status !== 200) {
                    navigate('/login')
                }
            } catch (err) {
                console.log(err)
                navigate('/login')
            }
        }
        func()
    })

    return (
        <div className="mainApp">
            <Outlet />
        </div>
    )
}

export default Layout