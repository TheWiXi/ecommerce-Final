import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Start from "./pages/Start"
import init_register from "./pages/init_register"
import init_login from "./pages/init_login"
import login from './pages/Login'
import register from './pages/Register'
import Home from "./pages/Home"
import ProtectedRoute from './token/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Start}/>
        <Route path='/init-register' Component={init_register}/>
        <Route path='/init-login' Component={init_login}/>
        <Route path='/register' Component={register}/>
        <Route path='/login' Component={login}/>
        <Route path='/home'element={<ProtectedRoute><Home /></ProtectedRoute>}/>
      </Routes>
    </Router>
  )
}

export default App
