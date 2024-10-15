import './Assembly.css';
import { useEffect } from 'react';

//hooks
import { getAllAssembly } from '../../slices/assemblySlices';

//redux
import { useSelector, useDispatch } from 'react-redux';

const Assembly = () => {

    const dispatch = useDispatch();
    const { assemblys } = useSelector(state => state.assembly);

    useEffect( () => {
        dispatch(getAllAssembly())
    },[dispatch])

    const formatData = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        return `${day}/${month}`;
    };

    // Função de ordenação por data crescente
    const sortedAssemblies = assemblys?.slice().sort((a, b) => {
        const dateA = new Date(a.dayOf).getTime();
        const dateB = new Date(b.dayOf).getTime();
        return dateA - dateB;
    });


    return (
        <div className='container-full'>
            <h2>Agenda da assembleia</h2>
            
            <div className='assembly'>
                {sortedAssemblies && sortedAssemblies.length > 0 ? (
                    sortedAssemblies.map(assembly => (
                        <div key={assembly._id} className='container-list'>
                            <div className="data">{formatData(assembly.dayOf)}</div>
                            <div className="description">
                                <h3><strong>Local:</strong> {assembly.local}</h3>
                                <p><strong>Horário de início:</strong> {assembly.startTime}</p>
                                {assembly.subject ? (
                                    <p><strong>Assunto:</strong> {assembly.subject}</p> 
                                ) : (
                                    <p>Não há informação</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='empty'>No momento, não há registro de datas para a Assembleia.</p>
                )}
            </div>
        </div>
    )
}

export default Assembly