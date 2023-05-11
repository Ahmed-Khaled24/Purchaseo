import React from "react";
import "../css/footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="col1">
        <a href="#" className="footer-links">About us</a>
        <a href="#" className="footer-links">Contact us</a>
        <a href="#" className="footer-links">Terms and Conditions</a>
      </div>
      <div className="col2">
        <h3>Subscribe to Our Newsletter</h3>
        <form>
          <input type="email" id="subscribe" placeholder="Your E-Mail ..." />
          <button id="subscribe-button">Subscribe</button>
        </form>
      </div>
      <div className="col3">
        <h3>Follow us on</h3>
        <div className="icons">
          <a href="#" className="footer-links" ><img src="/facebook.png" alt="facebook" /></a>
          <a href="#" className="footer-links" ><img src="/twitter.png" alt="twitter" /></a>
          <a href="#" className="footer-links" ><img src="/instagram.png" alt="instagram" /></a>
        </div>
      </div>
    </footer>
  )
}