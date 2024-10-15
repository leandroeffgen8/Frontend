import './Default.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { BsPinAngleFill, BsMegaphoneFill, BsTools } from 'react-icons/bs'

//hooks
import { getAllNotification } from '../../slices/notificationSlices';
import { getAllAssembly } from '../../slices/assemblySlices';
import { getAllReserve } from '../../slices/reserveSlices';


//redux
import { useSelector, useDispatch } from 'react-redux';

const Default = () => {
	const dispatch = useDispatch();
	const { notifications } = useSelector(state => state.notification);
	const { assemblys } = useSelector(state => state.assembly);
	const { events } = useSelector(state => state.reserve); 

	useEffect(() => {
		dispatch(getAllNotification());
		dispatch(getAllAssembly());
		dispatch(getAllReserve());
	}, [dispatch]);

	const formatDate = (isoDate) => {
		const date = new Date(isoDate);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		return `${day}/${month}`;
	};

	const calculateDays = (eventDate) => {
		const today = new Date();
		const event = new Date(eventDate);
		const diff = event - today;
		const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
		return diffDays;
	};

	// Função para filtrar e encontrar a próxima assembleia
	const getNextAssembly = (assemblies) => {
		const today = new Date();

		// Filtra assembleias futuras
		const futureAssemblies = assemblies.filter(assembly => {
			const assemblyDate = new Date(assembly.dayOf);
			return assemblyDate >= today;
		});

		// Ordena assembleias pela data (mais próxima primeiro)
		futureAssemblies.sort((a, b) => new Date(a.dayOf) - new Date(b.dayOf));

		// Retorna a próxima assembleia (a primeira da lista)
		return futureAssemblies.length > 0 ? futureAssemblies[0] : null;
	};

	// Obter a próxima assembleia
	const nextAssembly = getNextAssembly(assemblys);

	return (
		<div className='container-full'>
			<div className="grid-default">
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
					<Link to='/notifications' className='link-right'>Veja mais</Link>
				</div>

				<div className="assembleia box-home">
					<header>
						<h2>Assembléia</h2>
						<BsMegaphoneFill />
					</header>

					<div className='box-assembleia'>
						{nextAssembly ? (
							<div key={nextAssembly._id}>
								<div className='data'>
									<h3>Faltam</h3>
									<div>
										<span className="day">{calculateDays(nextAssembly.dayOf)}</span>
										<span>dias</span>
									</div>
								</div>
								<div>
									<p>Local: {nextAssembly.local}</p>
									<p>Data: {formatDate(nextAssembly.dayOf)}</p>
									<p>Horário de início: {nextAssembly.startTime}</p>
								</div>
							</div>
						) : (
							<p>Não há próximas assembleias agendadas.</p>
						)}
					</div>
				</div>
			</div>

			<div className="grid-default">
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

			<div className="grid-default">
				<div className="manutencao box-home">
					<header>
						<h2>Manutenção</h2>
						<BsTools />
					</header>
				</div>
			</div>
		</div>
	);
};

export default Default