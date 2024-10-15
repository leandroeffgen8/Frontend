import './ListNotification.css';
import { useEffect } from "react";

//hooks
import { resetMessage, getAllNotification } from '../../../slices/notificationSlice';
//redux
import { useSelector, useDispatch } from "react-redux";

const Notificacoes = () => {

    const dispatch = useDispatch();
    const { notifications } = useSelector(state => state.notification);

    useEffect( () => {
        dispatch(getAllNotification());
        dispatch(resetMessage());
    },[dispatch])

    const formatDate = (isoDate) => {
		const date = new Date(isoDate);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		return `${day}/${month}`;
	};

    const sortedNotifications = [...notifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className='content-grid width-full notification'>
		    <h2>Notificações</h2>  
            {sortedNotifications && sortedNotifications .length > 0 ? (
                sortedNotifications.map((notification) => (
                    <div key={notification._id} className='container-list'>
                        <div className="data">{formatDate(notification.createdAt)}</div>
                        <div className='description'>
                            <h3>{notification.title}</h3>
                            <p>{notification.message}</p>
                        </div>
                    </div>
                ))
                ) : (
                <p>Não há notificações para exibir.</p>
            )}

        </div>
    )
}

export default Notificacoes
