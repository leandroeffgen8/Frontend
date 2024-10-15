import './Modal.css';
 
const Modal = ({ title, onClose, children }) => {
    return (
        <div className='modal'>
            <div className='modal-content'>
                <h3>{title}</h3>
                {children} {/* Renderiza os filhos passados para o modal */}
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default Modal