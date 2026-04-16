import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Greeting1 from './pages/Greeting1';
import Greeting2 from './pages/Greeting2';
import Greeting3 from './pages/Greeting3';
import Greeting4 from './pages/Greeting4';
import Greeting5 from './pages/Greeting5';
import Greeting6 from './pages/Greeting6';
import Greeting7 from './pages/Greeting7';
import Greeting8 from './pages/Greeting8';
import { GreetingProvider } from './context/GreetingProvider';

function App() {
  return (
    <GreetingProvider>
      <Router>
        <div className="relative w-full m-0 p-0">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Greeting1 />} />
              <Route path="/greeting2" element={<Greeting2 />} />
              <Route path="/greeting3" element={<Greeting3 />} />
              <Route path="/greeting4" element={<Greeting4 />} />
              <Route path="/greeting5" element={<Greeting5 />} />
              <Route path="/greeting6" element={<Greeting6 />} />
              <Route path="/greeting7" element={<Greeting7 />} />
              <Route path="/greeting8" element={<Greeting8 />} />
            </Routes>
          </main>
        </div>
      </Router>
    </GreetingProvider>
  );
}

export default App;
