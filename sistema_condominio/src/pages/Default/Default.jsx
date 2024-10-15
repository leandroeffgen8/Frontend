import './Default.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { BsPinAngleFill, BsMegaphoneFill, BsTools } from 'react-icons/bs'

//hooks
import { getAllNotification } from '../../slices/notificationSlice';
import { getAllAssembly } from '../../slices/assembleiaSlice';
import { getAllReserve } from '../../slices/reserveSlice';


//redux
import { useSelector, useDispatch } from 'react-redux';

const Default = () => {

	const dispatch = useDispatch();
	const { notifications } = useSelector(state => state.notification);
	const { assemblys } = useSelector(state => state.assembleia);
	const { events } = useSelector(state => state.reserve); 

	useEffect( () => {
		dispatch(getAllNotification())
		dispatch(getAllAssembly())
		dispatch(getAllReserve());
	},[dispatch]) 

	useEffect(() => {
		console.log('notifications 1', notifications);
		console.log('assemblys 1', assemblys);
		console.log('events', events);
	}, [notifications, assemblys, events]);



	const formatDate = (isoDate) => {
		const date = new Date(isoDate);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		return `${day}/${month}`;
	}	

	const calculateDays  = (eventDate) => {
		const today = new Date()
		const event = new Date(eventDate)
		const diff = event - today
		const diffDays = Math.ceil(diff /(1000*60*60*24));
		return diffDays
	}

    return (
        <div className='content-grid width-full'>
          
			<div className="grid-box">
				<div className="mudalRecados box-home">
					<header>
						<h2>Mural de Recados </h2>
						<BsPinAngleFill />
					</header>
					<div className='list'>
						{notifications.slice(-4).reverse().map(notification => (
							<div key={notification._id}>
								<span>{notification.title}</span>
							</div>
						))}
					</div>
					<Link to='/notificaticoes' className='link-right'>Veja mais</Link>
				</div>

				<div className="assembleia box-home">
					<header>
						<h2>Assembléia</h2>
						<BsMegaphoneFill />
					</header>

					<div className='box-assembleia'>
						{assemblys.slice(-1).reverse().map(assembly => {
							const daysLeft = calculateDays(assembly.dayOf);
							return(
								<div key={assembly._id}>
									<div className='data'>
										<h3>Faltam</h3>
										<div>
											<span className="day">{daysLeft}</span>
											<span>dias</span>
										</div>
									</div>	
									<div>
										<p>Local: {assembly.local}</p>
										<p>Data: {formatDate(assembly.dayOf)}</p>
										<p>Horário de início: {assembly.startTime}</p>
									</div>
								</div>
							)
						})}

						
					</div>

				</div>
			</div>

			<div className="grid-box">
				<div className="proximosEventos box-home">
					
					<header>
						<h2>Próximos Eventos</h2>
						<BsPinAngleFill />
					</header>

					<div>
						{events.slice(-4).reverse().map(event => (
							<div key={event._id}>
								<div className='date-events'>
									<h3>Evento</h3>
									<span>{formatDate(event.date)}</span>
								</div>
								<span>{event.area}</span>
								<span>Início {event.startTime} até {event.endTime}</span>
							</div>
						))}
						
					</div>
					<Link to='/reservations' className='link-right'>Veja mais</Link>
				</div>
			</div>

			<div className="grid-box">
				<div className="manutencao box-home">
					<header>
						<h2>Manutenção</h2>
						<BsTools />
					</header>
				</div>
			</div>

        </div>
    )
}

export default Default