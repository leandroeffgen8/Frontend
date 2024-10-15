import './EditProfile.css'
import { useForm} from 'react-hook-form';

import { uploads } from '../../utils/config';

//hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

//redux
import { profile, updateProfile, resetMessage } from '../../slices/userSlice';

//components
import Message from '../../components/Message/Message'; 

const EditProfile = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [ preview, setPreview ] = useState('');

    const dispatch = useDispatch();

    const {user, message, loading} = useSelector(state => state.user);

    useEffect( () => {
        dispatch(profile())
    },[dispatch]);

    useEffect(() => {
        if(user) {
            setValue('name', user.name);
            setValue('email', user.email);
            setValue('phone', user.phone); 
            setValue('role', user.role);
            setValue('apto', user.apto);
        }
    }, [setValue, user]);

    const handleFile = (e) => {
        const image = e.target.files[0];
        if (image) {
            setPreview(image); 
        }
    }

    const onSubmit = async (data) => {

        const formData = new FormData();
        
        formData.append('name', data.name);
        
        if(data.email){
            formData.append('email', data.email);
        }

        formData.append('phone', data.phone || ''); 

        if (data.profileImage && data.profileImage.length > 0) {
            formData.append('profileImage', data.profileImage[0]); 
        }
       
        formData.append('apto', data.apto);

        if (data.password) {
            formData.append('password', data.password);
        }

        await dispatch(updateProfile(formData));

        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);

        console.log(data)
    
    }

    return (
        <div className='content-grid edit-profile'>
            <h2>Edite seus dados</h2>
            <p className='subtitle'>Adicione uma imagem para o seu perfil</p>
            {( user.profileImage || preview) && (
                <img className='profile-image' src={preview ? URL.createObjectURL(preview) : `${uploads}/${user.profileImage}`}
                />
            )}
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
                
                <label>Unidade</label>
                <input type="text" placeholder='Seu nº do apto' {...register('apto')} disabled />
                
                <label>Quer alterar sua senha?</label>
                <input type="password" placeholder='Digite sua nova senha' {...register('password', { minLength: { value: 5, message: 'A senha precisa ter no minímo 5 caracteres.' } })} />
                
                {!loading &&  <input type="submit" value="Atualizar" />}
                {loading &&  <input type="submit" value="Aguarde..." disabled />}
                {/* {error && <Message msg={error} type="error" />} as mensagem vinda do backend não funcionam com dataForm */}
                {errors.name && <p className="message error">{errors.name.message}</p>}
                {errors.password && <p className="message error">{errors.password.message}</p>} 
                {message && <Message msg={message} type="success" />}
            </form>
        </div>
    )
}

export default EditProfile