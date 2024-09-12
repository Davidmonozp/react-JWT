
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ClientApp } from './ClientApp';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ClientApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import './styles.css'
// import { ClientApp } from './ClientApp.jsx'
// import { BrowserRouter } from 'react-router-dom'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <ClientApp />
//     </BrowserRouter>
//   </React.StrictMode>,
// )
