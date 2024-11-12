import { createRoot } from 'react-dom/client'
import './index.css'
import store from "./store/store"
import App from './App'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
