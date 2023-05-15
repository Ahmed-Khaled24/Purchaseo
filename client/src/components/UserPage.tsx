import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../../server/types/User';
import { Product } from '../../../server/types/Product';
import { putUser } from '../features/userSlice';

import defaultProfilePic from '../../public/images/defaultProfilePic.jpg';
import '../css/userPage.css';

const API_URL = 'https://localhost:8000';

function PictureSection({ image_url }) {
	function handleUploadButton() {
		const fileInput = document.getElementById('UploadNewProfilePic');
		fileInput.click();
	}
	function handleUploadPhoto(event) {
		const file = event.target.files[0];
		// TODO: send to /image/upload
	}
	return (
		<section className='picture-section'>
			<img src={image_url || defaultProfilePic} alt='' />
			<div>
				<label> Upload new photo </label>
				<input
					type='file'
					accept='image/*'
					id='UploadNewProfilePic'
					onChange={handleUploadPhoto}
				/>
				<button onClick={handleUploadButton}> New photo </button>
			</div>
		</section>
	);
}

function InfoItem({ itemValue, itemName, editable, updateInputValue }) {
	return (
		<div className='info-item'>
			<label>{`${itemName}`} </label>
			<input
				name={itemName}
				type='text'
				value={itemValue}
				disabled={!editable}
				onChange={updateInputValue}
			/>
		</div>
	);
}

function InfoSection({ user, editable, updateInputValue }) {
	return (
		<section className='info-section'>
			<h1>User information:</h1>
			<div className='info-list'>
				<InfoItem
					itemName='email'
					itemValue={user?.email}
					editable={editable}
					updateInputValue={updateInputValue}
				/>
				<InfoItem
					itemName={'First name'}
					itemValue={`${user?.Fname}`}
					editable={editable}
					updateInputValue={updateInputValue}
				/>
				<InfoItem
					itemName={'Last name'}
					itemValue={`${user?.Lname}`}
					editable={editable}
					updateInputValue={updateInputValue}
				/>
			</div>
		</section>
	);
}

function EditSection({ triggerEditable, saveChanges }) {
	return (
		<section className='edit-section'>
			<button onClick={saveChanges}>Save</button>
			<button onClick={triggerEditable}>Edit</button>
		</section>
	);
}

function PreviousProduct({ product }) {
	return (
		<div className='previous-product'>
			<img src={product.image_url} />
			<p className='date'> {product.product_name}</p>
		</div>
	);
}

function PreviousBoughtProducts({ userId }: { userId: number }) {
	const [products, setProduct] = useState<Product[]>([]);
	useEffect(() => {
		(async () => {
			const response = await axios.get(
				`${API_URL}/product/customer/${userId}`
			);
			setProduct(response.data);
		})();
	}, [userId]);
	return (
		<section className='previous-orders-section'>
			<h1> Previous orders: </h1>
			<div className='previous-products-list'>
				{products.map((product) => (
					<PreviousProduct product={product} />
				))}
			</div>
		</section>
	);
}

function UserPage() {
	const dispatch = useDispatch();
	const user = useSelector((state: any) => state.user);
	const [editable, setEditable] = useState<boolean>(false);

	function triggerEditable() {
		userBeforeEdit = { ...user };
		setEditable(true);
	}
	let userBeforeEdit: User;
	async function saveChanges() {
		setEditable(false);
		// TODO: find the updates
		// TODO: send to /user/update
	}

	function updateInputValue(event: React.ChangeEvent<HTMLInputElement>) {
		let newValue = event.target.value;
		let changedInputName = event.target.name;
		if (changedInputName.includes('First')) {
			changedInputName = 'Fname';
		} else if (changedInputName.includes('Last')) {
			changedInputName = 'Lname';
		}
		const newUser: User = { ...user, [changedInputName]: newValue };
		dispatch(putUser(newUser));
	}

	return (
		<div className='profile-container'>
			<div className='profile-page'>
				<PictureSection image_url={user.image_url} />
				<InfoSection
					user={user}
					editable={editable}
					updateInputValue={updateInputValue}
				/>
				<EditSection
					triggerEditable={triggerEditable}
					saveChanges={saveChanges}
				/>
				<PreviousBoughtProducts userId={user.user_id} />
			</div>
		</div>
	);
}

export default UserPage;
