import React from 'react';
import Detail from './pages/Detail';
import Home from './pages/Home';
import './style/App.css';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import NoMatch from './pages/NoMatch';


function App() {
  return <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="detail/:id" element={<Detail />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </Router>




}

export default App;