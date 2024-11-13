import { createRoot } from 'react-dom/client'
import './index.css'
import store from "./store/store"
import App from './App'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastContainer/>
    <App />
  </Provider>,
)
