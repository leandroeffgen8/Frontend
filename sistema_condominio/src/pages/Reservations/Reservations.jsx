import './Reservations.css';

import { useEffect } from 'react';

//hooks
import { resetMessage, getAllReserve } from '../../slices/reserveSlice';
import { useSelector, useDispatch } from 'react-redux';

const Reservations = () => {

	const dispatch = useDispatch();
	const { user } = useSelector(state => state.user);
	const { events } = useSelector(state => state.reserve);
	
	useEffect(() => {
        dispatch(getAllReserve());
		dispatch(resetMessage());
	},[dispatch]);

	const formatDate = (isoDate) => {
		const date = new Date(isoDate);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	return (
		<div className={`width-full container-events ${user.role === 'admin' ? 'admin' : 'grid-events' }`}>
			{events.length === 0 ? (
				<h2>Não há eventos reservados no momento!</h2>
				) : (
				<>
					<h2>Grade de Eventos</h2>
					<p className='subtitle'>Aqui estão todos as áreas reservadas. Fique atendo nas datas e horários das reservas.</p>

					<div className='grid-line'>
						
						{user && user.role !== 'admin' && (
							<div className='list list-title'>
								<span>Ambiente</span>
								<span>Dia</span>
								<span>Entrada</span>
								<span>Saída</span>
							</div>
						)}

					
						{user && user.role === 'admin' ? (
							<div className='box'>
								{events.map(event => (
									<div key={event._id} className='list list-events'>
										<span><strong>Nome:</strong> {event.reservedBy?.name}</span>
										<div>{event.reservedBy?.apto}</div>
										<span className='email'><strong>Email:</strong> {event.reservedBy?.email}</span>
										<span><strong>Ambiente:</strong> {event.area}</span>
										<span><strong>Data:</strong> {formatDate(event.date)}</span>
										<span><strong>Hora:</strong> {event.startTime} às {event.endTime}</span>
									</div>
								))}
							</div>
						):(
							<>
								{events.map(event => (
									<div key={event._id} className='list list-events'>
										<span>{event.area}</span>
										<span>{formatDate(event.date)}</span>
										<span>{event.startTime}</span>
										<span>{event.endTime}</span>
									</div>
								))}
							</>
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default Reservations