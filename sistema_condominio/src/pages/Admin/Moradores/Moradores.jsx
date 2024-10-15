import './Moradores.css';
import { useEffect } from 'react';
import { uploads } from '../../../utils/config';

import { Link } from 'react-router-dom';

import { BsPersonFill, BsEnvelope, BsGeoFill } from 'react-icons/bs';

//hooks
import { resetMessage, getUserAll } from '../../../slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const Moradores = () => {

    const dispatch = useDispatch();
    const { moradores, loading, error } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getUserAll());
        dispatch(resetMessage());
    },[dispatch])

    console.log('MORADORES', moradores);

    return (
    <div className='content-grid width-full moradores'>
        <h2>Moradores do Park Central Reserva</h2>
        <p>Abaixo estão listados todos os morados de park central reserva</p>

        {loading && <p>Carregando...</p>}
        {error && <p>Erro ao carregar moradores: {error}</p>}

        <div className='grid-moradores'>
            {moradores.length > 0 ? (
                moradores.map(morador => (
                    morador.role === 'morador' && (
                        <div key={morador._id} className='container-grid'>
                            <div className="line">
                                <div className='image'>
                                    {morador.profileImage ? (
                                        <img src={`${uploads}/${morador.profileImage}`} alt='' />
                                    ):(
                                        <div className='image-sem-foto'>
                                            <h3>SEM FOTO</h3>
                                        </div>
                                    )}
                                    
                                </div>
                                <div className='details'>
                                    <p><BsPersonFill /> {morador.name}</p>
                                    <p><BsEnvelope /> {morador.email}</p>
                                    <p><BsGeoFill /> {morador.apto}</p>
                                    <div>
                                        <span><Link to='/admin-advertencia'>Advertência</Link></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ))
            ) : (
                <p>Não há moradores cadastrados.</p>
            )}
        </div>
    </div>
  )
}

export default Moradores