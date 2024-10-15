import './Ocorrencias.css';

import { useEffect, useState } from 'react';
import { BsPencilFill } from "react-icons/bs";

import Message from '../../../components/Message/Message';

//hooks
import { resetMessage, geAllIncidents, updateIncidentStatus } from "../../../slices/incidentSlice"; 

//redux
import { useSelector, useDispatch } from "react-redux";

const Visitantes = () => {
    const dispatch = useDispatch();
    const { incidents, error, message } = useSelector(state => state.incident);

    const [editingId, setEditingId] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [showModal, setShowModal] = useState(false); // Estado para exibir o modal

    useEffect(() => {
        dispatch(geAllIncidents());
        dispatch(resetMessage());
    }, [dispatch]);

    useEffect(() => {
        if (message) {
            setShowModal(false); // Fecha o modal após a atualização
            setEditingId(null); // Reseta o ID de edição
            setNewStatus(''); // Reseta o status selecionado
            dispatch(geAllIncidents()); // Recarrega os dados para garantir que o estado esteja atualizado
        }
    }, [message, dispatch]);

    const handleEdit = (maintenance) => {
        setEditingId(maintenance._id); // Define o ID da manutenção sendo editada
        setNewStatus(maintenance.status); // Define o status atual para ser editado
        setShowModal(true); // Exibe o modal
    };

    const handleUpdate = () => {
        dispatch(updateIncidentStatus({ id: editingId, status: newStatus }))
        .unwrap() // Adiciona unwrap() para lidar com o resultado da promise
        .then(() => {
            setShowModal(false); // Fecha o modal após a atualização
            setEditingId(null); // Reseta o ID de edição
            setNewStatus(''); // Reseta o status selecionado
            dispatch(geAllIncidents()); // Recarrega os dados para garantir que o estado esteja atualizado
            setTimeout(() => {
                dispatch(resetMessage());
            },2000)
        })
        .catch(error => {
            console.error('Error updating maintenance:', error);
        });
    };

    return (
        <div className='container-events width-full'>
            <div className="grid-title">
                <h2 className='title'>OCorrências</h2>
                <span>Faltam <strong>{incidents.filter(incident => incident.status === 'aberto').length}</strong> chamado(s) em aberto à serem resolvidos.</span>
            </div>            
            {incidents.length > 0 ? (
                <div className='boxVisitantes'>
                    {incidents.map(incident => (
                        <div key={incident._id} className='container-flex-collumn'>
                            <h3>{incident.title}</h3>
                            <p>{incident.description}</p>
                            <div className='line'>
                                <p className={`center ${incident.status === 'aberto' ? 'aberto' : incident.status === 'em processo' ? 'em-processo' : 'resolvido'}`}><div></div> 
                                    {incident.status}
                                </p>
                                <span className='btn-icons' onClick={() => handleEdit(incident)}><BsPencilFill /></span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <h5>Não tem incidentes no momento.</h5>
                </>
            )}

            {showModal && (
            <div className='modal'>
                <div className='modal-content'>
                <h3>Atualizar Status da Manutenção</h3>
                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                    <option value='aberto'>Aberto</option>
                    <option value='em processo'>Em Processo</option>
                    <option value='resolvido'>Resolvido</option>
                </select>
                <button onClick={handleUpdate}>Atualizar</button>
                <button onClick={() => setShowModal(false)}>Cancelar</button>
                </div>
            </div>
            )}

            {error && <Message msg={error} type="error" />}
            {message && <Message msg={message} type="success" />}
        </div>
    );
};


export default Visitantes;
