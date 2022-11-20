import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '~/App';
import GlobalStyles from './components/GlobalStyles';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from '~/components/context/UserContext';
import { BookProvider } from '~/components/context/BookContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GlobalStyles>
        <UserProvider>
            <BookProvider>
                <App />
            </BookProvider>
        </UserProvider>
    </GlobalStyles>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
