import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Layout from './components/Layout.jsx'
import Signup from './pages/Signup.jsx'

import Home from './pages/Home.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ShowFlowChart from './pages/showFlowChart.jsx'


const App = () => {
  return <Routes>

    <Route path='/' element={<LandingPage />} />

    <Route element={<Layout />}>
      <Route path='/home' element={<Home />} />
      <Route path='/flowchart/:id' element={<ShowFlowChart />} />
    </Route>

    <Route path='/login' element={<Login />}></Route>
    <Route path='/signup' element={<Signup />} />
  </Routes >

}

export default App