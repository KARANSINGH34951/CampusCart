import './App.css'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import AuthLayout from './components/auth/AuthLayout'
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import AdminLayout from './components/admin-view/Layout'
import AdminDashboard from './pages/admin-view/AdminDashboard'
import AdminProducts from './pages/admin-view/AdminProducts'
import AdminOrders from './pages/admin-view/AdminOrders'
import AdminFeatures from './pages/admin-view/AdminFeatures'
import ShoppingLayout from './components/shopping-view/ShoppingLayout'
import NotFound from './pages/NotFound/NotFound'
import Home from "./pages/shopping-view/Home"
import Listing from './pages/shopping-view/Listing'
import Checkout from './pages/shopping-view/Checkout'
import Account from './pages/shopping-view/Account'

function App() {
 
  return (
<>
   <Router>
    <Routes>
      
      <Route path='/' element={<AuthLayout />} >
        <Route index element={<Register/>} />
        <Route path='login' element={<Login/>}/>
      </Route>

      <Route path='/admin' element={<AdminLayout/>}>
        <Route path='dashboard' element={<AdminDashboard/>}/>
        <Route path='products' element={<AdminProducts/>}/>
        <Route path='orders' element={<AdminOrders/>}/>
        <Route path='feature' element={<AdminFeatures/>}/>
      </Route>

      <Route path='/shop' element={<ShoppingLayout/>}>
        <Route path='home' element={<Home/>}/>
        <Route path='listing' element={<Listing/>}/>
        <Route path='checkout' element={<Checkout/>}/>
        <Route path='account' element={<Account/>}/>
      </Route>

      <Route path='*' element={<NotFound/>}/>
      
    </Routes>
   </Router>
</>
  )
}

export default App
