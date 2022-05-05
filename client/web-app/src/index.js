import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import routes from './Routes';
import SignIn from "./components/SignIn";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path={routes.landing} element={<App />} />
              <Route path={routes.sign_in} element={<SignIn />} />
              <Route path={routes.sign_up} element={<SignUp />} />
              <Route path={routes.home} element={<Dashboard />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
