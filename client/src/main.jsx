import { createRoot } from 'react-dom/client'
import './index.css'
import store from "./store/store"
import { persistor } from './store/store'
import App from './App'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>   
    <ToastContainer/>
    <App />
    </PersistGate>
  </Provider>,
)
