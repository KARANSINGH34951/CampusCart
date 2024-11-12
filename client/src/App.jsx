import './App.css'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import AuthLayout from './components/auth/AuthLayout'
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"

function App() {
 
  return (
<>
   <Router>
    <Routes>
      <Route path='/' element={<AuthLayout />} >
        <Route path='register' element={<Register/>} />
        <Route path='login' element={<Login/>}/>
      </Route>
    </Routes>
   </Router>
</>
  )
}

export default App
