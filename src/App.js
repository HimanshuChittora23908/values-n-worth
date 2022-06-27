import React from 'react'
import { Routes, Route, useParams } from "react-router-dom";
import Home from './Landing/Home';
import Archive from './Landing/Archive';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/:user" element={<Home />} />
        <Route path="/:user/archive" element={<Archive />} />
      </Routes>
    </div>
  )
}