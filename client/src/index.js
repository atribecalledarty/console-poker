import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './redux/reducer';
import './fonts/stylesheet.css';
import cableMiddleware from './redux/cableMiddleware';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// const store = createStore(reducer, applyMiddleware(thunk, cableMiddleware))
const store = createStore(reducer, applyMiddleware(cableMiddleware(), thunk))
const stripePromise = loadStripe("pk_test_51GqNn2Kj8jVe4aIu3gu8fP0a3Y8ltGdN66FAP1vq1K2jt3PUvI9STlO8JrGOXAr3DQBx1FRNCZ7Ye5KByzTu7Hmx00LAxaeYGP");

window.store = store;

// const fonts = [
//   {
//     src: ("https://db.onlinewebfonts.com/t/1481ee4d30d9e1d35c84e09e69e14e92.woff"),
//     family: "Atari",
//     style: "normal"
//   }
// ]

ReactDOM.render(
  <Provider store={store}>
    <Elements stripe={stripePromise}>
    {/* <Elements stripe={stripePromise} options={{fonts: fonts}}> */}
      <App />
    </Elements>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
