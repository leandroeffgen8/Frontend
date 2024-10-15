import './Profile.css';
import { useForm} from 'react-hook-form';
import { BsCarFrontFill } from 'react-icons/bs';
import { uploads } from '../../utils/config';

//components    
import Message from '../../components/Message/Message';
import Modal from '../../components/Modal/Modal';

//hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//redux
import { resetMessage as resetMessageProfile, profile, updateProfile } from '../../slices/userSlices';
import { resetMessage as resetMessageCar, createCar, getMyCars, updateCar, deleteCar } from '../../slices/carSlices';

const Profile = () => {

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const { user, message: messageProfile, loading } = useSelector(state => state.user);
    const { cars, error: errorCar, message: messageCar} = useSelector(state => state.car);

    const [ preview, setPreview ] = useState('');
    const [isTowerFilled, setIsTowerFilled] = useState(false);
    const [showModal, setShowModal] = useState(false); 

    const [lastAction, setLastAction] = useState('');
  
    useEffect( () => {
        dispatch(profile());
        dispatch(getMyCars());
    },[dispatch]);

    useEffect(() => {
        if(user) {
            setValue('name', user.name);
            setValue('email', user.email);
            setValue('phone', user.phone); 
            setValue('role', user.role);
            setValue('tower', user.tower);
            setValue('apto', user.apto);

            if (user.tower) {
                setIsTowerFilled(true);
            }
        }
    }, [setValue, user]);

    const handleFile = (e) => {
        const image = e.target.files[0];
        if (image) {
            setPreview(image); 
        }
    }

    const onSubmit = async (data) => {
        console.log('Perfil', data);

        const formData = new FormData();
        
        formData.append('name', data.name);
        formData.append('phone', data.phone || ''); 
        formData.append('tower', data.tower || '');

        if (data.profileImage ) {
            formData.append('profileImage', data.profileImage[0]); 
        }

        if (data.password) {
            formData.append('password', data.password);
        }

        await dispatch(updateProfile(formData));

        setTimeout(() => {
            dispatch(resetMessageProfile());
        }, 2000);
    }

    const resetFormCar = () => {
        setTimeout(() => {
            dispatch(resetMessageCar());
        }, 2000);
    }
  
    const handleCarModal = () => {
        if (cars && cars.length > 0) {
            const carData = cars[0]; 
            setValue('modelo', carData.modelo);
            setValue('placa', carData.placa);
            setValue('cor', carData.cor);
            setValue('vagaEstacionamento', carData.vagaEstacionamento);
        }
        setShowModal(true); 
    }

    const onSubmitCar = (data) => {
        if (cars && cars.length > 0) {
            const carData = cars[0];
            dispatch(updateCar({ id: carData._id, ...data })).unwrap()
                .then(() => {
                    setTimeout( () => {
                        dispatch(resetMessageCar()); 
                        dispatch(getMyCars());
                        setShowModal(false); 
                    },2000)
                })
                .catch(() => {
                    setLastAction('cars');
                    resetFormCar()        
                });
        } else {
            dispatch(createCar(data)).unwrap()
                .then(() => {
                    setTimeout( () => {
                        dispatch(resetMessageCar());
                        dispatch(getMyCars());
                        setShowModal(false); 
                    },2000)
                })
                .catch(() => {
                    setLastAction('cars');
                    resetFormCar()
                });
        }
    }

    const handleDelete = (id) => {
        dispatch(deleteCar(id))
        setLastAction('cars');
		setTimeout(() => {
            reset({ modelo: '', placa: '', cor: '', vagaEstacionamento: '' });
			dispatch(resetMessageCar());
            setShowModal(false); 
		}, 2000);
    }

    return (
        <div className='content-grid container-form'>
            <h2>Edite seus dados</h2>
            <p className='subtitle'>Adicione uma imagem para o seu perfil</p>
        
            {( user.profileImage || preview) && (
                <img className='profile-image' src={preview ? URL.createObjectURL(preview) : `${uploads}/${user.profileImage}`}
                />
            )}

            <div className='infoCar'>
                <div onClick={handleCarModal}><BsCarFrontFill /></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Seu nome </label>
                <input type="text" placeholder='Seu nome' {...register('name',  { required: 'O nome é obrigatório', minLength: { value: 5, message: 'O nome deve ter pelo menos 5 caracteres' } })} />
               
                <label>Seu e-mail</label>
                <input type="email" placeholder='Seu e-mail' {...register('email')} disabled />

                <label>Seu Telefone</label>
                <input type="tel" placeholder='Seu telefone' {...register('phone')} />
                
                <div className='arquivo'>
                    <label>Imagem do perfil</label>
                    <div className="custom-file-label">Escolha um arquivo</div>
                    <input id="file-upload" type="file" {...register('profileImage')} onChange={handleFile} />
                </div> 
                
                <label>Sua função</label>
                <input type="text" placeholder='Sua função' {...register('role')} disabled />

                <label>Sua torre</label>
                <div className='tower'>
                    <span>Torre</span>
                    <input type="text" placeholder='Nº' {...register('tower')}  disabled={isTowerFilled} />
                </div>
                
                <label>Unidade</label>
                <input type="text" placeholder='Seu nº do apto' {...register('apto')} disabled />
                
                <label>Quer alterar sua senha?</label>
                <input type="password" placeholder='Digite sua nova senha' {...register('password', { minLength: { value: 5, message: 'A senha precisa ter no minímo 5 caracteres.' } })} />
                
                {!loading &&  <input type="submit" value="Atualizar" />}
                {loading &&  <input type="submit" value="Aguarde..." disabled />}
                {/* {error && <Message msg={error} type="error" />} as mensagem vinda do backend não funcionam com dataForm */}
                {errors.name && <p className="message error">{errors.name.message}</p>}
                {errors.password && <p className="message error">{errors.password.message}</p>} 
                {messageProfile && <Message msg={messageProfile} type="success" />}
            </form>

            {showModal && (
                <Modal title={cars && cars.length > 0 ? "Atualizar dados do carro" : "Cadastrar carro"}>
                    <form onSubmit={handleSubmit(onSubmitCar)} className='formCar'>
                        <>
                            <span className='close' onClick={() => setShowModal(false)}>x</span>
                            <div className='grid-line'>
                                <div className='items'>
                                    <label>Modelo</label>
                                    <input type="text" placeholder='Insira o modelo' {...register('modelo')} />
                                </div>
                                <div className='items'>
                                    <label>Placa</label>
                                    <input type="text" placeholder='Insira a placa' {...register('placa')} />
                                </div>
                                <div className='items'>
                                    <label>Cor</label>
                                    <input type="text" placeholder='Insira a cor' {...register('cor')} />
                                </div>
                                <div className='items'>
                                    <label>Vaga do Estacionamento</label>
                                    <input type="text" placeholder='Insira o numero da vaga' {...register('vagaEstacionamento')} />
                                </div>
                            </div>
                            <button className='btn-edit'>{cars && cars.length > 0 ? "Atualizar carro" : "Cadastrar carro"}</button>
                            {cars && cars.length > 0 && (
                                <button
                                    type="button"
                                    className='btn-excluir'
                                    onClick={() => handleDelete(cars[0]._id)} // Passe o ID do carro para excluir
                                >
                                    Excluir
                                </button>
                            )}

                            {lastAction === 'cars' && errorCar && <Message msg={errorCar} type="error" />}
                            {lastAction === 'cars' && messageCar && <Message msg={messageCar} type="success" />}
                        </>
                    </form>
                </Modal>
            )}

        </div>
    )
}

export default Profile