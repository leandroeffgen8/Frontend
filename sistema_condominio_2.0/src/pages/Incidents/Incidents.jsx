import './Incidents.css'

import { useEffect, useState } from 'react';
import { BsPencilFill } from "react-icons/bs";

import Message from '../../components/Message/Message';
import Modal from '../../components/Modal/Modal';

//hooks
import useAutoResetMessage from '../../hooks/useAutoResetMessage';
import { resetMessage, getllIncidents, updateIncidentStatus } from '../../slices/incidentsSlices';

//redux
import { useSelector, useDispatch } from "react-redux";

const Incidents = () => {

    const dispatch = useDispatch();
    const { incidents, error, message } = useSelector(state => state.incident);

    const [editingId, setEditingId] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [showModal, setShowModal] = useState(false); 

    useEffect(() => {
        dispatch(getllIncidents());
        dispatch(resetMessage());
    }, [dispatch]);

    useAutoResetMessage(message, error, resetMessage)

    const handleEdit = (incident) => {
        setEditingId(incident._id); 
        setNewStatus(incident.status); 
        setShowModal(true); 
    };

    const handleUpdate = () => {
        dispatch(updateIncidentStatus({id: editingId, status: newStatus}))
        .unwrap()
        .then(() => {
            setShowModal(false); 
            setEditingId(null); 
            setNewStatus(''); 
            dispatch(getllIncidents());
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <>
            <div className='container-full'>
                <div className="grid-title">
                    <h2 className='title'>Ocorrências reportadas</h2>
                    <span>Faltam <strong>{incidents.filter(incident => incident.status === 'aberto').length}</strong> chamado(s) em aberto à serem resolvidos.</span>
                </div> 

                {incidents.length > 0 ? (
                    <>
                        {incidents.map(incident => (
                            <div key={incident._id} className='container-style-1'>
                                <div className='box-title'>
                                    <h3>{incident.title}</h3>
                                    <span className='btn-editar' onClick={() => handleEdit(incident)}><BsPencilFill /></span>
                                </div>
                                <div className='line-2'>
                                    <p>{incident.description}</p>
                                    <p className={`bullets ${incident.status === 'aberto' ? 'aberto' : incident.status === 'em processo' ? 'em-processo' : 'resolvido'}`}><div></div> 
                                        {incident.status}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {error && <Message msg={error} type="error" />}
                        {message && <Message msg={message} type="success" />}
                    </>
                ) : (
                    <>
                        <p className='empty'>Não tem incidentes no momento.</p>
                    </>
                )}
                
            </div>

            {showModal && (
                <Modal title="Atualizar Incidente" onClose={() => setShowModal(false)} >
                    <label>Status</label>
                    <select value={newStatus}  onChange={(e) => setNewStatus(e.target.value)}>
                        <option value='aberto'>Aberto</option>
                        <option value='em processo'>Em Processo</option>
                        <option value='resolvido'>Resolvido</option>
                    </select>
                    <button onClick={handleUpdate}>Atualizar</button>
                </Modal>
            )}
        </>
    )
}

export default Incidents
