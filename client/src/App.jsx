
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Start from "./pages/Start"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Start}/>
        <Route path='/register' Component={Register}/>
        <Route path='/login' Component={Login}/>
        <Route path='/home' Component={Home}/>
      </Routes>
    </Router>
  )
}

export default App
