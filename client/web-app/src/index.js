import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import routes from './Routes';
import SignIn from "./components/SignIn";
import CreateService from "./components/CreateService"
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";

const root = ReactDOM.createRoot(document.getElementById('root'));

const auth_client = new ApolloClient({
    uri: 'http://127.0.0.1:3001/api/v1/graphql_auth',
    fetchOptions: {
        mode: 'no-cors',
    },
    cache: new InMemoryCache()
});

const client = new ApolloClient({
    uri: 'http://127.0.0.1:3001/api/v1/graphql',
    fetchOptions: {
        mode: 'no-cors',
    },
    cache: new InMemoryCache(),
    headers: JSON.parse(localStorage.getItem('cred'))
});

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path={routes.sign_in} element={<ApolloProvider client={auth_client}><SignIn/></ApolloProvider>}/>
                <Route path={routes.sign_up} element={<ApolloProvider client={auth_client}><SignUp/></ApolloProvider>}/>
                <Route path={routes.landing} element={<ApolloProvider client={auth_client}><App/></ApolloProvider>}/>
                <Route path={routes.home} element={<ApolloProvider client={auth_client}><Dashboard/></ApolloProvider>}/>
                <Route path={routes.create_service} element={<ApolloProvider client={auth_client}><CreateService/></ApolloProvider>}/>
            </Routes>
        </BrowserRouter>

    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
