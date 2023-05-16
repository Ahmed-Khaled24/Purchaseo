import { Link } from "react-router-dom";
import "../css/footer.css";
import facebook from "../../public/facebook.png";
import twitter from "../../public/twitter.png";
import instagram from "../../public/instagram.png";
import paypal from "../../public/paypal.png";
import visa from "../../public/visa.png";
import mastercard from "../../public/mastercard.png";
import cash from "../../public/cash.png";
import googleStore from "../../public/googleStore.png";
import appStore from "../../public/appStore.png";

function FooterColumn({ title, links }) {
	return (
		<div className="footer-column">
			<h3 className="footer-title"> {title} </h3>
			{links.map((link) => (
				<Link to={"#"} className="footer-link">
					{link}
				</Link>
			))}
		</div>
	);
}
function FooterColumnImage({ title, images }) {
	return (
		<div className="footer-column">
			<h3 className="footer-title">{title}</h3>
			<div className="footer-images">
				{images.map((image) => (
					<Link to="#">
						<img src={image} alt="" className="footer-logo" />
					</Link>
				))}
			</div>
		</div>
	);
}

export default function Footer() {
	return (
		<footer>
			<section className="footer-section">
				<FooterColumn
					title="Get to know us"
					links={["About Purchaseo", "Careers"]}
				/>
				<FooterColumn
					title="Shop with us"
					links={[
						"Your Account",
						"Your Orders",
						"Your Cart",
						"Your addresses",
					]}
				/>
				<FooterColumn
					title="Let us help you"
					links={["Product Support", "Purchaseo App", "Contact Us"]}
				/>
				<FooterColumn
					title="Make money with us"
					links={[
						"Sell on Purchaseo",
						"Become an Affiliate",
						"Advertise Your Products",
					]}
				/>
			</section>
			<section className="footer-section logos">
				<FooterColumnImage
					title="Join us on"
					images={[facebook, twitter, instagram]}
				/>
				<FooterColumnImage
					title="Payment methods"
					images={[visa, mastercard, paypal, cash]}
				/>
				<FooterColumnImage
					title="download our app"
					images={[googleStore, appStore]}
				/>
			</section>
			<section className="footer-section copyright">
				© Puchaseo 2023
			</section>
		</footer>
	);
}
