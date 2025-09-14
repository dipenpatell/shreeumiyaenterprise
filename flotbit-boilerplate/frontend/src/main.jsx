import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './common/styles/index.css';
import App from './App/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './App/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
  </StrictMode>,
)
