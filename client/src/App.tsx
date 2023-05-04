import './App.css';
import React, { useState, useEffect } from "react"
import Home from "./components/Home"
import NavBar from "./components/navbar"
import AddProduct from "./components/AddProduct"
import Products from "./components/Products"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from './components/item';

function App() {

  return (
  
 <div className="App">
     
     {/* <Router>
       <NavBar />
       <Routes>
       <Route path="/">
       <Route index element={<Home />} />
       <Route path="/products/:category" element={<Products />} />
       <Route path="/products/:category/:id" element={<Body />} />

       </Route>
       </Routes>
     </Router> */}
       <NavBar />
     <AddProduct />

   </div>

   
  );
}

export default App;
