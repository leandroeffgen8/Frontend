import './Assembly.css';
import { useEffect } from 'react';

//hooks
import { getAllAssembly, resetMessage } from '../../slices/assembleiaSlice';

//redux
import { useSelector, useDispatch } from 'react-redux';

const Assembly = () => {

    const dispatch = useDispatch();
    const { assemblys } = useSelector(state => state.assembleia)

    useEffect( () => {
        dispatch(getAllAssembly())
        dispatch(resetMessage());
    },[dispatch])

    console.log('assemblys', assemblys)

    const formatData = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day}/${month}`;
    }

    return (
        <div className='content-grid width-full assembly'>
		    <h2>Agenda da assembleia</h2>
            {assemblys && assemblys.length > 0 ? (
                assemblys.map(assembly => (
                    <div key={assembly._id} className='container-list'>
                        <div className="data">{formatData(assembly.dayOf)}</div>
                        <div className="description">
                            <h3><strong>Local:</strong> {assembly.local}</h3>
                            <p><strong>Horário de início:</strong> {assembly.startTime}</p>
                            {assembly.assunto ? (
                                <p><strong>Assunto:</strong> {assembly.assunto}</p>
                            ):(
                                <p>Não há informação</p>
                            )}
                           
                        </div>
                    </div>
                ))
            ):(
                <h5>No momento, não há registro de datas para a Assembleia.</h5>
            )}
        </div>
    )
}

export default Assembly