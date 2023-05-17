import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ModalComponent({ isOpen, closeModal, text, targetAction, modalTitle }) {
	return (
		<Modal isOpen={isOpen} onRequestClose={closeModal} className="modal" overlayClassName="overlay">
			<h2>{modalTitle}</h2>
			<p>{text}</p>
			<div className="modal-buttons">
				<button onClick={closeModal}>Cancel</button>
				<button onClick={targetAction}>I'm sure</button>
			</div>
		</Modal>
	);
}
