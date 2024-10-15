import './Reservations.css';
import { BsTrash } from 'react-icons/bs'

//components
import Message from '../../components/Message/Message';

//hooks
import { getMyReserve, deleteReserve, resetMessage } from '../../slices/reserveSlices';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const MyReservations = () => {

    const dispatch = useDispatch();
    const { events, error, message } = useSelector(state => state.reserve)

    useEffect( () => {  
        dispatch(getMyReserve());
        dispatch(resetMessage());
    },[dispatch])

    console.log('reservas', events);

    const groupMyEvents = (events) => {
        return events.reduce((acc, event) => {
            if(!acc[event.area]){
                acc[event.area] = [];
            }
            acc[event.area].push(event);
            return acc;
        },{});
    }

    const groupEvents = groupMyEvents(events);

    const formatDate = (isoDate) => {
		const date = new Date(isoDate);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

    const handleDelete = (id) => {
        dispatch(deleteReserve(id));
        setTimeout( () => {
            dispatch(resetMessage());
        }, 2000)
    }

    const isReservePast = (data) => {
        const currentDate = new Date();
        const eventDate = new Date(`${data}`);
        return eventDate < currentDate;
    }

    return (
        <div className='container-full'>
            <h2>Minhas Reservas</h2>
            <p className='subtitle'>Aqui você encontra todas as suas reservas separadas por categoria.</p>
            
            {Object.keys(groupEvents).length > 0 ? (
                Object.keys(groupEvents).map((area, index) => (
                    <div key={index} className='container-style-1'>
                        <h3>{area}</h3>
                        {groupEvents[area].map(reservation => (
                            <div key={reservation._id} className={`item ${isReservePast(reservation.date) ? 'line-expirou' : ''}`}>
                                <span>{formatDate(reservation.date)}</span>
                                <span>{reservation.startTime}</span>
                                <span>{reservation.endTime}</span>
                                {(isReservePast(reservation.date)) ? (
                                    <span className='expirou'>
                                        expirou
                                    </span>
                                    
                                ):(
                                    <span>
                                        {reservation.status}
                                    </span>
                                )}
                                <span className={`center ${isReservePast(reservation.date) ? '' : 'disabled'}`} onClick={() => handleDelete(reservation._id)}>
                                    <div className='btn-excluir'><BsTrash /></div>
                                </span>
                            </div>
                        ))}
                    
                    </div>
                ))
            ) : (
                <p className='empty'>Você não tem reservas no momento.</p>
            )}
            {error && <Message msg={error} type="error" />}
            {message && <Message msg={message} type="success" />}
        </div>
    )
}

export default MyReservations