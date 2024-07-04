import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Context/ContextApi';
import { SearchProvider } from './Context/Search';
import { CartProvider } from './Context/Cart';
import { ChatProvider } from './Context/ChatContext';
import { MessageProvider } from './Context/MessageContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <ChatProvider>
          <MessageProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </MessageProvider>
        </ChatProvider>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
