import './MyReservations.css'

import { BsTrash } from 'react-icons/bs'

//hooks
import { resetMessage, getAllReservation, deleteReservation } from '../../slices/reserveSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const MyReservations = () => {

    const dispatch = useDispatch();
	const { events } = useSelector(state => state.reserve);

    useEffect(() => {
        dispatch(getAllReservation());
        dispatch(resetMessage())       
    },[dispatch]);

    const formatDate = (isoDate) => {
		const date = new Date(isoDate);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

    //console.log('events', events)

    const groupEventsByArea = (events) => {
        return events.reduce((acc, event) => {
            if (!acc[event.area]) {
                acc[event.area] = [];
            }
            acc[event.area].push(event);
            return acc;
        }, {});
    };

    const groupedEvents = groupEventsByArea(events);

    const handleDelete = (id) => {
        dispatch(deleteReservation(id));
        setTimeout( () => {
            dispatch(resetMessage());
        }, 2000)
    };

    return (
        <div className='container-events width-full'>
            <h2>Minhas Reservas</h2>
            <p className='subtitle'>Aqui você encontra todas as suas reservas separadas por categoria.</p>
                {Object.keys(groupedEvents).length > 0 ? (
                    Object.keys(groupedEvents).map((area, index) => (
                        <div key={index} className={`my-events style-${(index + 1)}`}>
                            <h3>{area}</h3>
                            {groupedEvents[area].map(reservation => (
                                <div key={reservation._id} className='container-flex'>
                                    <span>{formatDate(reservation.date)}</span>
                                    <span>{reservation.startTime}</span>
                                    <span>{reservation.endTime}</span>
                                    <span>{reservation.status}</span>
                                    <span className='center' onClick={() => handleDelete(reservation._id)}>
                                        <div className='btn-delete'><BsTrash /></div>
                                    </span>
                                </div>
                            ))}
                        
                        </div>
                    ))
                ) : (
                    <p>Você não tem reservas no momento.</p>
                )}
		</div>
    )
}

export default MyReservations