import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProtectedRoute from './token/ProtectedRoute';
import Start from "./pages/Start"
import Init_register from "./pages/Init_register"
import Init_login from "./pages/Init_login"
import Login from './pages/Login'
import Register from './pages/Register'
import Home from "./pages/Home"
import Categories from './pages/Categories'
import Workshops from './pages/Workshops'
import Profile from './pages/Profile'
import Carrito from './pages/Carrito'
import Workshop from './pages/Workshop';
import InfoWorkshops from './pages/InfoWorkshops';
import Redeem from './pages/Redeem';
import Register_workshop from './pages/Register_workshop';
import Discounts from './pages/Discounts';
import Favorites from './pages/Favorites';
import Purchases from './pages/Purchases';

function App() {
  return (
    <Router>
<Routes>
        <Route path='/' element={<Start />} />
        <Route path='/init-register' element={<Init_register />} />
        <Route path='/init-login' element={<Init_login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
        <Route path='/Carrito' element={<ProtectedRoute><Carrito /></ProtectedRoute>} />
        <Route path='/workshops' element={<ProtectedRoute><Workshops /></ProtectedRoute> } />
        <Route path='/Profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/workshop' element={<ProtectedRoute><Workshop /></ProtectedRoute>}/>
        <Route path='/infoworkshops' element={<ProtectedRoute><InfoWorkshops /></ProtectedRoute>}/>
        <Route path='/redeem' element={<ProtectedRoute> <Redeem /> </ProtectedRoute>}/>
        <Route path='/register-workshop' element={<ProtectedRoute><Register_workshop /></ProtectedRoute>}/>
        <Route path='/discounts' element={<ProtectedRoute><Discounts /></ProtectedRoute>}/>
        <Route path='/favorites' element={<ProtectedRoute><Favorites /></ProtectedRoute>}/>
        <Route path='/purchases' element={<Purchases />}/>
      </Routes>
    </Router>
  )
}

export default App
