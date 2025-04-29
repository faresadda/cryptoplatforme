import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LandingPage from './components/landingPage';
import Login from './components/loginUser';
import SignUp from './components/signUp';
import Sidebar from './components/sidebar'
import NavbarUser from './components/navbarUser';
import Convert from './components/convert';
import Home from './components/Home'
import Markets from './components/markets';
import Mining from './components/Mining'
import Assets from './components/assets';
import Profile from './components/profile';
import Settings from './components/settings'
import Admin from './components/dashboard'
import LoginAdmin from './components/loginAdmin'
import NavbarAdmin from './components/navbarAdmin'

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>

          <Route index element={<LandingPage/>}/>

          <Route path='/login' element={<Login/>}/>

          <Route path='/signup' element={<SignUp />}/>

          <Route path="/user" element={<><NavbarUser /><Sidebar /><Outlet /></>}>
            <Route index element={<Home />}/>
            <Route path='convert' element={<Convert/>}/>
            <Route path='markets' element={<Markets />}/>
            <Route path='mining' element={<Mining />}/>
            <Route path='assets' element={<Assets />}/>
            <Route path='profile' element={<Profile />}/>
            <Route path='settings' element={<Settings />}/>
          </Route>


          <Route path='/admin' element={<Outlet />}>
            <Route index element={<LoginAdmin />} />
            <Route path='dashboard' element={<><NavbarAdmin /><Outlet /></>} >
              <Route index element={<Admin />} />
            </Route>
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


