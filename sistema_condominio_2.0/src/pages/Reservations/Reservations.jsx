import './Reservations.css';
import { useEffect } from 'react';

//hooks
import { getAllReserve, resetMessage } from '../../slices/reserveSlices'
import { useSelector, useDispatch } from 'react-redux';


const Reservations = () => {

	const dispatch = useDispatch();
	const { events } = useSelector(state => state.reserve);

	useEffect(() => {
        dispatch(getAllReserve());
		dispatch(resetMessage());
	},[dispatch]);

  	const formatDate = (isoDate) => {
		const date = new Date(isoDate);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	// Função para verificar se o evento já passou
    const isEventPast = (eventDate) => {
        const currentDateTime = new Date();
        const eventDateTime = new Date(`${eventDate}`);
        return eventDateTime < currentDateTime;
    };

	return (
		<div className='container-full'>
			{events.length === 0 ? (
				<h2>Não há eventos reservados no momento!</h2>
				) : (
				<>
					<h2>Grade de Eventos</h2>
					<p className='subtitle'>Aqui estão todos as áreas reservadas. Fique atendo nas datas e horários das reservas.</p>

					<div className='grid-box'>
						{events.map(event => (
							<div key={event._id} className={`list ${isEventPast(event.date) ? 'past-event' : ''}`}>
								<span>{event.area}</span>
								<span>{formatDate(event.date)}</span>
								<span>{event.startTime} às {event.endTime}</span>
							</div>
						))} 
		
					</div>
				</>
			)}
		</div>
	)
}

export default Reservations