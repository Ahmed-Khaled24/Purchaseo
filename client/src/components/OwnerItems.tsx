import React from "react";
import OwnerProduct from "./Owner-Product";

export default function OwnerItems() {
  return (
    <div className="owner-items">
      <OwnerProduct name="Item 1" rate={3} reviews={50} desc="Lorem ipsum dolor sit amet, aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." />
      <OwnerProduct name="Item 2" rate={4} reviews={20} desc="Lorem ipsum dolor sit amet, aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." />
      <OwnerProduct name="Item 3" rate={5} reviews={10} desc="Lorem ipsum dolor sit amet, aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." />
      <OwnerProduct name="Item 4" rate={2} reviews={30} desc="Lorem ipsum dolor sit amet, aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." />
      <OwnerProduct name="Item 5" rate={1} reviews={40} desc="Lorem ipsum dolor sit amet, aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." />
    </div>
  )
}