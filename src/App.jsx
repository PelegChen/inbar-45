import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
 
import MainPage from './pages/MainPage'; 
import { GreetingProvider } from './context/GreetingProvider';

function App() {
  return (
    <GreetingProvider>
      <Router>
        <div className="relative w-full m-0 p-0"> 
          <main>
            <Routes>
              <Route path="/" element={<MainPage />} /> 
            </Routes>
          </main>
        </div>
      </Router>
    </GreetingProvider>
  );
}

export default App;
