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
import Product from './pages/Product'
import Ajustes from './pages/Ajustes';
import ComentariosDeLaApp from './pages/ComentariosDeLaApp'
import AtencionAlCliente from './pages/AtencionAlCliente'
import CompraRealizada  from './pages/CompraRealizada'
import Tiendas from './pages/Tiendas'
import Favorites from './pages/Favorites';
import Coupons from './pages/Coupons'
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
        <Route path='/Product' element={<ProtectedRoute><Product /></ProtectedRoute>} />
        <Route path='/Ajustes' element={<ProtectedRoute><Ajustes /></ProtectedRoute>} />
        <Route path='/Comentarios' element={<ProtectedRoute><ComentariosDeLaApp /></ProtectedRoute>} />
        <Route path='/Atencion' element={<ProtectedRoute><AtencionAlCliente /></ProtectedRoute>} />
        <Route path='/Comprado' element={<ProtectedRoute><CompraRealizada  /></ProtectedRoute>} />
        <Route path='/Tiendas' element={<ProtectedRoute><Tiendas/></ProtectedRoute>} />
        <Route path='/Favorites' element={<ProtectedRoute><Favorites/></ProtectedRoute>} />
        <Route path='/Redeem' element={<ProtectedRoute><Coupons/></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
