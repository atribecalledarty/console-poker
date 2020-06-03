import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import wsMiddleware from './redux/wsMiddleware';
import resourceReducer from './redux/resourceReducer';
import authReducer from './redux/authReducer';
import wsReducer from './redux/wsReducer';
import WebSocketConnection from './components/WebSocketConnection';

const middleware = [wsMiddleware, thunk]
const reducer = combineReducers({ resourceReducer, authReducer, wsReducer })
const store = createStore (reducer, applyMiddleware(...middleware))
window.store = store;

const Root = ({store}) => (
  <Router>
    <Provider store={store}>
      <WebSocketConnection host={`ws://127.0.0.1:3001/cable?token=${localStorage.getItem('token')}`} />
      <Route path="/" component={App}/>

      {/* <Route path="/" component={App}/> */}
    </Provider>
  </Router>
)

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
