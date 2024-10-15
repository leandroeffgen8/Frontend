import './Residents.css';
import { useEffect } from 'react';
import { uploads } from '../../utils/config';

import { Link } from 'react-router-dom';

import { BsPersonFill, BsEnvelope, BsGeoFill, BsBuildingsFill } from 'react-icons/bs';

//hooks
import { resetMessage, getUserAll } from '../../slices/userSlices';
import { useSelector, useDispatch } from 'react-redux';

const Residents = () => {

    const dispatch = useDispatch();
    const { moradores, loading, error } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getUserAll());
        dispatch(resetMessage());
    },[dispatch]);


    const groupResidents = (moradores) => {
        return moradores.reduce((acc, num) => {
        const residentApto = num.tower; // Usa o nome do residente como chave
        console.log('residentApto', residentApto);
        if (!residentApto) return acc; // Verifica se existe o apto do residente

        if (!acc[residentApto]) {
            acc[residentApto] = []; // Cria um grupo para o residente se não existir
        }
        acc[residentApto].push(num); // Adiciona a manutenção ao grupo do residente
        return acc;
        }, {});
    };
  

    const groupMyResident = groupResidents(moradores);

    console.log('MORADORES', groupMyResident);

    return (
    <div className='container-full'>
        <h2>Moradores do Park Central Reserva</h2>
        <p className='subtitle'>Abaixo estão listados todos os morados de park central reserva</p>

        {loading && <p>Carregando...</p>}
        {error && <p>Erro ao carregar moradores: {error}</p>}

        <div className='grid-residents'>
            {Object.entries(groupMyResident).map(([num, group]) => (
                <>
                    <h3><BsBuildingsFill /> Torre <span>{num}</span></h3>
                    <div key={num} className='residents'>
                        {group.map((list) => (
                        <div key={list._id} className='container-grid'>
                            <div className="line">
                                <div className='image'>
                                    {list.profileImage ? (
                                        <img src={`${uploads}/${list.profileImage}`} alt='' />
                                    ):(
                                        <div className='image-sem-foto'>
                                            <h3>SEM FOTO</h3>
                                        </div>
                                    )}
                                    
                                </div>
                                <div className='details'>
                                    <p><BsPersonFill /> {list.name}</p>
                                    <p><BsEnvelope /> {list.email}</p>
                                    <p><BsGeoFill /> {list.apto}</p>
                                    <div>
                                        <span><Link to='/admin-advertencia'>Advertência</Link></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </>
            ))}
            {/* {moradores.length > 0 ? (
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
                <p className='empty'>Não há moradores cadastrados.</p>
            )} */}
        </div>
    </div>
  )
}

export default Residents