import './app.css';
import React, { useState, useEffect } from "react"
import Home from "./components/Home"
import NavBar from "./components/NavBarNormal"
import Products from "./components/Products"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Item from './components/Item';
import Cart from './components/Cart';
import AddReview from './components/Add-Review'
import Footer from './components/Footer'
import Reviews from './components/Reviews'
import OwnerProduct from './components/Owner-Product'
import UserPage from './components/UserPage';
import Container from './components/Container'
import CreateAccountContainer from './components/CreateAccountContainer'
import ResetPass from './components/ResetPass'
import NewPass from './components/NewPass'
import AddProduct from './components/AddProduct';

function App() {

  const items = ["item1"];
  const desc1 = "Lorem ipsum dolor sit amet, aute irure ";
  const desc2 = "Lorem ipsum dolor sit amet, aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

  const navbar = () => {

  }

  return (

    <div className="App">

      <Router>
        <NavBar />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/seller-products" element={<OwnerProduct name="Item 1" rate={3} reviews={50} desc={desc2} />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/products/:category/:id" element={<Item name="Item 1" img={`/items/${items[0]}.png`} alt={items[0]} rate={3} desc={desc2} price={60} reviews={554} />} >
              <Route path="" element={<Reviews />} />
              <Route path="add-review" element={<AddReview />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/myPage" element={<UserPage />} />
            <Route path="/sign-in" element={<Container />} />
            <Route path="/sign-up" element={<CreateAccountContainer />} />
            <Route path="/forget-password" element={<ResetPass />} />
            <Route path="/reset-password/:token" element={<NewPass />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Route>
        </Routes>
        <Footer />
      </Router>

    </div>


  );
}

export default App;
