import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import TableScreen from "./screens/TableScreen";

import './utils/axios-middleware'


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeScreen/>,
    },
    {
        path: "/list/:tableName",
        element: <TableScreen/>,
    },
]);


root.render(
    <RouterProvider router={router}/>
);

reportWebVitals();
