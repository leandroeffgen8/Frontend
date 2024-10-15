import './MyCalled.css'
import '../Incident/Incident.css';

import { useEffect, useState } from 'react'
import { BsTrash } from 'react-icons/bs'

import Message from '../../components/Message/Message';

//hooks
import { resetMessage as resetVisitorsMessage, getAllMyVisitors, deleteVisits } from '../../slices/visitorsSlice'
import { resetMessage as resetIncidentMessage, getMyIncidents, deleteIncidents } from '../../slices/IncidentSlice';

//redux
import { useSelector, useDispatch } from 'react-redux'


const MyCalled = () => {

	const dispatch = useDispatch();

	const { visits, error: errorVisits, message: messageVisits } = useSelector(state => state.visitors);
	const { incidents,  error: errorIncident, message: messageIncident, } = useSelector(state => state.incident);

	const [lastAction, setLastAction] = useState('');

	useEffect( () => {
		dispatch(getAllMyVisitors());
		dispatch(getMyIncidents());
	},[dispatch])

  	const formatDate = (isoDate) => {
		const date = new Date(isoDate);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	const groupVisits = (visits) => {
		return visits.reduce((acc, event) => {
			if (!acc[event.visits]) {
				acc[event.visits] = [];
			}
			acc[event.visits].push(event);
			return acc;
		}, {});
	};

	const groupMyVisits = groupVisits(visits);

	const handleDeleteVisits = (id) => {
		dispatch(deleteVisits(id))
		setLastAction('visit');  // Atualiza a última ação
		setTimeout( () => {
			dispatch(resetVisitorsMessage())
		},2000);
	}

	const handleDeleteCalls = (id, status) => {
		console.log('Deletando incidente com ID:', id);
		console.log('Status do incidente:', status); // Certifique-se de que o ID e o status estão corretos
	
		dispatch(deleteIncidents({ id, status })); // Passa o ID e o status
		setLastAction('incident');
		setTimeout(() => {
			dispatch(resetIncidentMessage());
		}, 2000);
	}

	return (
		<>
			<div className='container-events width-full'>
				<h2 className='title'>Minhas Visitas</h2>
					{Object.keys(groupMyVisits).length > 0 ? (
						Object.keys(groupMyVisits).map((area, index) => (
							<div key={index} className='my-events'>
								<h3>{area}</h3>
								{groupMyVisits[area].map(visit => (
									<div key={visit._id} className='container-flex'>
										<span>{visit.name}</span>
										<span>{formatDate(visit.dateOfVisit)}</span>
										{visit.purpose ? (
											<span>{visit.purpose}</span>
										): (
											<span>Não tem informação</span>
										)}
										<span className='center' onClick={() => handleDeleteVisits(visit._id)}>
											<div className='btn-delete'><BsTrash /></div>
										</span>
									</div>
								))}
							
							</div>
						))
					) : (
						<h5>Você não tem reservas no momento.</h5>
					)}

					{lastAction === 'visit' && errorVisits && <Message msg={errorVisits} type="error" />}
					{lastAction === 'visit' && messageVisits && <Message msg={messageVisits} type="success" />}
			</div>

			<div className='container-events width-full'>
				<h2 className='title'>Meus Chamados</h2>
					{incidents.length > 0 ? (
						<div className='my-events'>
							<h3>Chamados</h3>
							{incidents.map(incident => (
								<div key={incident._id} className='container-flex'>
									<span>{incident.title}</span>
									<span>{incident.description}</span>
									<span className={`rows ${incident.status === 'aberto' ? 'aberto' : incident.status === 'em processo' ? 'em-processo' : 'resolvido'}`}><div></div> {incident.status}</span>
									<span className='center' onClick={() => handleDeleteCalls(incident._id, incident.status)}>
										<div className='btn-delete'><BsTrash /></div>
									</span>
								</div>
							))}
						</div>

					):(
						<h5>Você não tem chamados no momento.</h5>
					)}
					
					{lastAction === 'incident' && errorIncident && <Message msg={errorIncident} type="error" />}
					{lastAction === 'incident' && messageIncident && <Message msg={messageIncident} type="success" />}
			</div>

			<div className='container-events width-full'>
				<p>Total de Chamados: {incidents.length}</p>
				<div className="quantidade">
					<div>
						<p>{incidents.filter(incident => incident.status === 'aberto').length}</p>
						<span>Aberto</span>
					</div>
					<div>
						<p>{incidents.filter(incident => incident.status === 'em processo').length}</p>
						<span>Em Processo</span>
					</div>
					<div>
						<p>{incidents.filter(incident => incident.status === 'resolvido').length}</p>
						<span>Resolvido</span>
					</div>
				</div>
			</div>

			
		</>
	)
}

export default MyCalled