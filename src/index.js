import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import App from './App';
import './index.css'



//! No Strict mode in production
ReactDOM.render(


    <React.StrictMode>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        <App />

    </React.StrictMode>,

    document.getElementById('root')


);