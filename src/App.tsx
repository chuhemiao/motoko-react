import React, { useState } from 'react';
import './App.css';
import AppRouter from './router';

function App() {
  const [count, setCount] = useState(0);
  console.log(`canisterType`, process.env);
  console.log(`import.meta.env`, import.meta.env);

  return (
    <div className="App">
      <AppRouter></AppRouter>
    </div>
  );
}

export default App;
