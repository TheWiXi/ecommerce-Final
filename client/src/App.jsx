import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Start from "./pages/Start"
import Init_register from "./pages/Init_register"
import Init_login from "./pages/Init_login"
import Login from './pages/Login'
import register from './pages/Register'
import Home from "./pages/Home"
import Categories from './pages/Categories'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Start}/>
        <Route path='/init-register' Component={Init_register}/>
        <Route path='/init-login' Component={Init_login}/>
        <Route path='/register' Component={register}/>
        <Route path='/login' Component={Login}/>
        <Route path='/home' Component={Home}/>
        <Route path='/categories' Component={Categories}/>
      </Routes>
    </Router>
  )
}

export default App
