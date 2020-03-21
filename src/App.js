import React from 'react';
import logo from './logo.svg';
import './App.css';


function getTitle(title){
  return title
}


function App() {

  const title = "React"

  return (
    <div>
      <h1>Hello {getTitle(title)}</h1>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
  );
}

export default App;
