import React from 'react'
import './css/App.css'
import NavBar from './components/NavBar'
import Body from './components/item'
import OwnerProduct from './components/owner-product'

export default function App() {
  const items = ["item1"];
  const desc = "Lorem ipsum dolor sit amet,  minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
  return (
    <div className="app">
      <NavBar />
      {/* <OwnerProduct /> */}
      <Body name="Item 1" img={`items/${items[0]}.png`} alt={items[0]} rate={3} desc={desc} price={60} reviews={554} />
    </div>
  )
}