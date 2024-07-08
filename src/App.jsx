import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Home from './routes/home/Home'
import Auth from './routes/auth/Auth'
import Admin from './routes/admin/Admin'
import Login from './routes/auth/login/Login'
import Register from './routes/auth/register/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'




function App() {

  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      <Route path="/auth" element={<Auth />} >
          <Route path="" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
