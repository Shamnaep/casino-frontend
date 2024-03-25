import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import RootLayout from './Routes/RootLayout';
import Errorpage from './ErrorPage';
import GamesPage ,{loader as singlegameloader}from './Routes/GamesPage';
import HomePage,{loader as homeLoader} from './Routes/HomePage';
import About from './Routes/About';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    errorElement: <Errorpage/>,
    children: [
      {
        path: "/",
        element: <HomePage/>,
        loader:homeLoader
      },
      {
        path: "games/:gameId",
        element: <GamesPage/>,
        loader: singlegameloader
        
      },
      {
        path: "about",
        element: <About/>
        
      },
      {
        path: "explore",
        element: <About/>
        
      },
      {
        path: "contact",
        element: <About/>
        
      },
    ],
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
