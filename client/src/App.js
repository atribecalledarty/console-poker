import React from 'react';
import LoginForm from './LoginForm'
import { connect } from 'react-redux';
import { setLogin } from './dispatchActions';

class App extends React.Component {
  componentDidMount() {
    this.props.setLogin();
  }

  render() {
    return (
      <div className="App">
        <LoginForm/>      
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLogin: () => dispatch(setLogin())
  }
}

export default connect(null, mapDispatchToProps)(App);
