import './ListMaintenance.css';
import { useEffect, useState } from 'react';
import { BsTrash, BsPencilFill } from 'react-icons/bs';

//hooks
import { getAllMaintenance, updateMaintenance, resetMessage } from '../../../slices/maintenanceSlice';
//redux
import { useSelector, useDispatch } from 'react-redux';

const Maintenance = () => {
    const dispatch = useDispatch();
    const { maintenances, message } = useSelector(state => state.maintenance);

    const [editingId, setEditingId] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [showModal, setShowModal] = useState(false); // Estado para exibir o modal

    useEffect(() => {
        dispatch(getAllMaintenance());
        dispatch(resetMessage());
    }, [dispatch]);

    useEffect(() => {
        if (message) {
            setShowModal(false); // Fecha o modal após a atualização
            setEditingId(null); // Reseta o ID de edição
            setNewStatus(''); // Reseta o status selecionado
            dispatch(getAllMaintenance()); // Recarrega os dados para garantir que o estado esteja atualizado
        }
    }, [message, dispatch]);

    const groupMaintenance = (maintenances) => {
        return maintenances.reduce((acc, event) => {
        const residentApto = event.resident?.apto; // Usa o nome do residente como chave
        if (!residentApto) return acc; // Verifica se existe o apto do residente

        if (!acc[residentApto]) {
            acc[residentApto] = []; // Cria um grupo para o residente se não existir
        }
        acc[residentApto].push(event); // Adiciona a manutenção ao grupo do residente
        return acc;
        }, {});
    };

    const groupMyMaintenance = groupMaintenance(maintenances);

    const handleEdit = (maintenance) => {
        setEditingId(maintenance._id); // Define o ID da manutenção sendo editada
        setNewStatus(maintenance.status); // Define o status atual para ser editado
        setShowModal(true); // Exibe o modal
    };
 
    const handleUpdate = () => {
        dispatch(updateMaintenance({ id: editingId, status: newStatus }))
        .unwrap() // Adiciona unwrap() para lidar com o resultado da promise
        .then(() => {
            setShowModal(false); // Fecha o modal após a atualização
            setEditingId(null); // Reseta o ID de edição
            setNewStatus(''); // Reseta o status selecionado
            dispatch(getAllMaintenance()); // Recarrega os dados para garantir que o estado esteja atualizado
        })
        .catch(error => {
            console.error('Error updating maintenance:', error);
        });
    };

  return (
    <div className='content-grid width-full'>
      <h2>Manutenção Interna</h2>
      {Object.entries(groupMyMaintenance).map(([apto, group]) => (
        <div key={apto} className='listApto'>
          <h3>Apto: {apto}</h3>
          {group.map((maintenance) => (
            <div key={maintenance._id} className='listMaintenance'>
              <div className='information'>
                <p>{maintenance.description}</p>
                <div>
                  <span
                    className={`bulltets ${maintenance.status === 'aberto' ? 'aberto' : maintenance.status === 'em processo' ? 'em-processo' : 'resolvido'}`}
                  >
                    <div></div>
                  </span>
                  <span>{maintenance.status}</span>
                </div>
              </div>
              <div className='container_btns'>
                <span className='btn-editar' onClick={() => handleEdit(maintenance)}><BsPencilFill /></span>
                <span className='btn-excluir'><BsTrash /></span>
              </div>
            </div>
          ))}
        </div>
      ))}

      {maintenances.length === 0 && <p>Não há solicitações</p>}

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
    </div>
  );
};

export default Maintenance;
