import './CalledByUser.css';
import { useEffect } from 'react'
import { BsTrash } from 'react-icons/bs';

//components
import Message from '../../components/Message/Message';

//hooks
import useAutoResetMessage from '../../hooks/useAutoResetMessage';
import { resetMessage, getMyIncidents, deleteIncidents } from '../../slices/incidentsSlices';

//redux
import { useSelector, useDispatch } from 'react-redux'


const CalledByUser = () => {

    const dispatch = useDispatch();
    const { incidents, error, message, } = useSelector(state => state.incident);

    useEffect( () => {
		dispatch(getMyIncidents());
        dispatch(resetMessage());
	},[dispatch])

    useAutoResetMessage(message, error, resetMessage)

    const handleDeleteCalls = (id, status) => {
        dispatch(deleteIncidents({ id, status }));
    }

    return (
        <>
            <div className='container-full'>
                <h2 className='title'>Meus Chamados</h2>

                    {incidents.length > 0 ? (
                        <>
                            {incidents.map(incident => (
                                <div key={incident._id} className='container-style-1'>
                                    <div className='box-title'>
                                        <h3>{incident.title}</h3>
                                        <span className='btn-excluir' onClick={() => handleDeleteCalls(incident._id, incident.status)}><BsTrash /></span>
                                    </div>

                                    <div className='line-2'>
                                        <p>{incident.description}</p>
                                        <div className={`bullets ${incident.status === 'aberto' ? 'aberto' : incident.status === 'em processo' ? 'em-processo' : 'resolvido'}`}><div></div> {incident.status}</div>
                                    </div>
                                </div>
                            ))}

                            {error && <Message msg={error} type="error" />}
                            {message && <Message msg={message} type="success" />}
                        </>

					):(
						<p className='empty'>Você não tem chamados no momento.</p>
					)}
            </div>

            <div className='container-full'>
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

export default CalledByUser