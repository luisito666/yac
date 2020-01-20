import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

// Components
import LoginComponent from './login';
import ChatComponent from './chat';

const App: React.FC = () => {
  return (
    <BrowserRouter>

      <Route exact path="/" component={LoginComponent} />
      <Route exact path="/chat" component={ChatComponent} />

    </BrowserRouter>
  );
}

export default App;
