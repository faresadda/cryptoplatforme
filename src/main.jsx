import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LandingPage from './components/landingPage';
import Login from './components/login';
import SignUp from './components/signUp';
import Sidebar from './components/sidebar'
import Navbar from './components/navbar';
import Convert from './components/convert';

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>

          <Route index element={<LandingPage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path="/dashboard" element={
            <>
            <Navbar />
            <Sidebar />
            <Outlet />
            </>}>
            <Route index element={<Convert/>}/>
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>
)


