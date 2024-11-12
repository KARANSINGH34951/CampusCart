import './App.css'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import AuthLayout from './components/auth/AuthLayout'
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import AdminLayout from './components/admin-view/Layout'

function App() {
 
  return (
<>
   <Router>
    <Routes>
      <Route path='/' element={<AuthLayout />} >
        <Route path='register' element={<Register/>} />
        <Route path='login' element={<Login/>}/>
      </Route>

      <Route path='/admin' element={<AdminLayout/>}>
        <Route path='dashboard' element={<div>Dashboard</div>}/>
        <Route path='products' element={<div>Products</div>}/>
        <Route path='orders' element={<div>Orders</div>}/>
      </Route>
    </Routes>
   </Router>
</>
  )
}

export default App
