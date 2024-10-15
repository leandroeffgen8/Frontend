import './Notifications.css';
import { useEffect, useState } from 'react';
import { BsTrash, BsPencilFill } from 'react-icons/bs'

//components
import Message from '../../components/Message/Message';
import Modal from '../../components/Modal/Modal';
//hooks
import useAutoResetMessage from '../../hooks/useAutoResetMessage';
import { resetMessage, getAllNotification, updateNotification, deleteNotification } from '../../slices/notificationSlices';
//redux
import { useSelector, useDispatch } from 'react-redux';

const Notifications = () => {

    const dispatch = useDispatch();
    const { notifications, error, message } = useSelector(state => state.notification);
    const { user } = useSelector(state => state.user);

    const [editingId, setEditingId] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [showModal, setShowModal] = useState(false); 

    useEffect( () => {
        dispatch(getAllNotification());
        dispatch(resetMessage());
    },[dispatch]);

    useAutoResetMessage(message, error, resetMessage)
 
    const handleEdit = (notification) => {
        setEditingId(notification._id); 
        setNewTitle(notification.title); 
        setNewMessage(notification.message); 
        setShowModal(true); 
    };

    const handleUpdate = () => {
        dispatch(updateNotification({id: editingId, title: newTitle, message: newMessage}))
        .unwrap()
        .then(() => {
            setShowModal(false); 
            setEditingId(null); 
            setNewTitle(''); 
            setNewMessage(''); 
            dispatch(getAllNotification());
        })
        .catch(error => {
            console.log(error);
        });
    };

    const handleDelete = (id) => {
        dispatch(deleteNotification(id));
    }

    return (
        <>
            <div className='container-full'>
                <h2 className='title'>Notificações</h2> 
                {notifications && notifications.length > 0 ? (
                    <>
                        {notifications.map(notification => (
                            <div className='container-style-1' key={notification._id}>
                                    <div className='box-title'>
                                    <h3>{notification.title}</h3>
                                        {user && user.role === 'admin' && (
                                            <span>
                                                <div className='btn-editar' onClick={() => handleEdit(notification)}><BsPencilFill /></div>
                                                <div className='btn-excluir' onClick={() => handleDelete(notification._id)}><BsTrash /></div>
                                            </span>
                                        )} 
                                    </div>
                                <p>{notification.message}</p>
                                
                            </div>
                        ))}

                        {error && <Message msg={error} type="error" />}
                        {message && <Message msg={message} type="success" />}
                    </> 
                ) : (
                    <p className='empty'>Nenhuma notificação encontrada.</p>
                )}
            </div>

            {showModal && (
                <Modal title="Atualizar Notificação" onClose={() => setShowModal(false)} >
                    <label>Título</label>
                    <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                 
                    <label>Mensagem</label>
                    <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                    
                    <button onClick={handleUpdate}>Atualizar</button>
                </Modal>
            )}
        </>

    )
}

export default Notifications