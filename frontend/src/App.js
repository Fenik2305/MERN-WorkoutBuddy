import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './components/Home.js'
import Navbar from './components/Navbar.js'
import Signup from './components/Signup.js';
import Login from './components/Login.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route 
              path="/signup" 
              element={<Signup />} 
            />
            <Route 
              path="/login" 
              element={<Login />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
