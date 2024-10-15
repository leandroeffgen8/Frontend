import './Visitantes.css';
import { useEffect } from 'react';

//hooks
import { getAllVisitors } from '../../../slices/visitorsSlice';

//redux
import { useSelector, useDispatch } from 'react-redux';

const Visitantes = () => {

	const dispatch = useDispatch();
	const { visits } = useSelector(state => state.visitors);

	useEffect( () => {
		dispatch(getAllVisitors())
	},[dispatch])

	const formatDate = (isoDate) => {
		const date = new Date(isoDate);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getDate() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}

	const groupApto = (visits) => {
		return visits.reduce((result, visitante) => {

			if(!visitante.resident || !visitante.resident.apto){
				return result;
			}
	
			const { apto, name } = visitante.resident; 
		
			if (!result[apto]) {
				result[apto] = {
					residentName: name, 
					visits: []        
				};
			}
		
			result[apto].visits.push(visitante); 
			
			return result;
			
		}, {});
	}

	const groupForApto = groupApto(visits)

    return (
		<div className='content-grid width-full visitantes'>
			<h2>Visitantes / Prestadores de Serviços</h2>

			<div className="grid-visitors">
				{Object.keys(groupForApto).length > 0 ? (
					Object.keys(groupForApto).map((apto) => (
						<div key={apto} className="my-events">
							<div className="morador">
								<h2>Morador(a)</h2>
								<span>{groupForApto[apto].residentName} - {apto}</span>
							</div>
							{groupForApto[apto].visits.map((visit) => (
								<div key={visit._id} className="listVisitants">
								<span>{visit.name}</span>
								<span>{formatDate(visit.dateOfVisit)}</span>
								<span>{visit.purpose ? visit.purpose : 'Não tem informação'}</span>
								</div>
							))}
						</div>
					))
				) : (
					<h5>Você não tem reservas no momento.</h5>
				)}
			</div>
			
		</div>
    )
}

export default Visitantes