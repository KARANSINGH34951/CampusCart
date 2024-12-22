import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthLayout from './components/auth/AuthLayout';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import AdminLayout from './components/admin-view/Layout';
import AdminDashboard from './pages/admin-view/AdminDashboard';
import AdminProducts from './pages/admin-view/AdminProducts';
import AdminOrders from './pages/admin-view/AdminOrders';
import AdminFeatures from './pages/admin-view/AdminFeatures';
import ShoppingLayout from './components/shopping-view/ShoppingLayout';
import NotFound from './pages/NotFound/NotFound';
import Home from './pages/shopping-view/Home';
import BuyNow from './pages/shopping-view/BuyNow';
import Listing from './pages/shopping-view/Listing';
import Checkout from './pages/shopping-view/Checkout';
import Account from './pages/shopping-view/Account';
import CheckAuth from './components/Common/ChechAuth';  
import UnauthPage from './pages/auth-page/UnauthPage';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
// import AddProducts from './pages/shopping-view/AddProducts';
import AddProductForm from "./pages/shopping-view/AddProductForm"

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user=useSelector((state)=>state.auth.user)

  return (
    <>
    <ToastContainer/>
      <Router>
        <Routes>

          <Route path="/" element={<Navigate to={isAuthenticated ? '/shop/home' : '/'} replace />} />

          <Route path='/' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }>
            <Route index element={<Register />} />
            <Route path='login' element={<Login />} />
          </Route>

          <Route path='/admin' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }>
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='products' element={<AdminProducts />} />
            <Route path='orders' element={<AdminOrders />} />
            <Route path='feature' element={<AdminFeatures />} />
          </Route>

          <Route path='/shop' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }>
            <Route path='home' element={<Home />} />
            <Route path='listing' element={<Listing />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='account' element={<Account />} />
            <Route path='addproduct' element={<AddProductForm />} />
            {/* <Route path='addproduct' element={<AddProducts />} /> */}
            <Route path='buynow' element={<BuyNow/>} />
          </Route>

          <Route path='/unauthpage' element={<UnauthPage />} />
          <Route path='*' element={<NotFound />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
