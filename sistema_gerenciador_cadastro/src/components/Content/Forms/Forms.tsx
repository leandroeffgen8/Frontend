import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { isEmail } from 'validator';
import bcrypt from 'bcryptjs'; 

import './Forms.css';
 
import Users from '../Users/Users';
import { IUser, IUserDados } from '../../../interfaces/IUser';
import Modal from '../../Modal/Modal';

const Forms = () => { 
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<IUser>();
    const [ preview, setPreview ] = useState<string | null>(null);
    const [ results, setResults ] = useState<IUserDados[]>([]);
    const [ editingIndex, setEditingIndex ] = useState<number | null>(null);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<IUserDados | null>(null);

    useEffect( () => {

        const storageDados = localStorage.getItem('DadosUser');
        if(storageDados){
            setResults(JSON.parse(storageDados));
        }

    }, [])


    useEffect( () => {
       
        results.length > 0 ? localStorage.setItem('DadosUser', JSON.stringify(results)) : localStorage.removeItem('DadosUser');

    }, [results])
    

    function formatDateToBR(dateStr:string) {
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    }

    const onSubmit = async (data: IUser) => {
        const file = data.photo[0];
        let imagePreview: string | null = null;

        const hashPassword = await bcrypt.hash(data.password, 10);

        // Converte a data para o formato brasileiro ao salvar
        const birthDateBR = formatDateToBR(data.birthDate);
        
        if(file){
            const reader = new FileReader();

            reader.onloadend = async () => {
                imagePreview = reader.result as string;
                setPreview(imagePreview);

                const newObj = {
                    name: data.name,
                    email: data.email,
                    password: hashPassword,
                    gender: data.gender,
                    birthDate: birthDateBR,
                    area: data.area,
                    photo: imagePreview,
                    isAdmin: data.isAdmin
                };

                if (editingIndex !== null) { 
                    const id = results[editingIndex]?._id; // Verifique se o ID é corretamente obtido

                    if (!id) {
                        console.error('Erro: O ID do usuário é undefined.');
                        return;
                    }

                    await fetch(`http://localhost:5000/api/user/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-type':'application/json'
                        },
                        body: JSON.stringify(newObj)
                    })
                    .then( response => response.json())
                    .then(() => {
                        // Atualiza o item existente
                        setResults(prevResult => prevResult.map((result, index) => index === editingIndex ? { ...result, ...newObj } : result));
                        setEditingIndex(null);
                        console.log('Atualiza dados no banco de dados', newObj)
                    })

                } else {
                
                    await fetch('http://localhost:5000/api/user/register',{
                        method: 'POST',
                        headers: {
                            'Content-type' : 'application/json'
                        },
                        body: JSON.stringify(newObj)
                    })
                    .then( response => response.json())
                    .then((data: IUserDados) => {
                        // Adiciona um novo item
                        setResults(prevResults => [...prevResults, data]);

                        console.log('Dados enviados para o banco de dados', newObj)
                    })
                    .catch((error) => {
                        console.error('Erro:', error);
                    }); 
                }

                reset();
                setPreview(null);
            }
            reader.readAsDataURL(file)
        }else {

            const newObj = {
                name: data.name,
                email: data.email,
                password: hashPassword,
                gender: data.gender,
                birthDate: birthDateBR,
                area: data.area,
                photo: imagePreview, 
                isAdmin: data.isAdmin
            };
            console.log('4', newObj)

            if (editingIndex !== null) {
                const id = results[editingIndex]?._id; 

                await fetch(`http://localhost:5000/api/user/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-type':'application/json'
                    },
                    body: JSON.stringify(newObj)
                })
                .then(response => response.json())
                .then(() => {
                    // Atualiza o item existente sem a imagem
                    setResults(prevResult => prevResult.map((result, index) => index === editingIndex ? { ...result, name: data.name, email: data.email, password: hashPassword, gender: data.gender, birthDate: birthDateBR, area: data.area, isAdmin: data.isAdmin, photo: preview } : result))
                    setEditingIndex(null);
                    console.log('Atualiza dados sem imagem', newObj)
                })
 
            } else {
               

                await fetch('http://localhost:5000/api/user/register',{
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application/json'
                    },
                    body: JSON.stringify(newObj)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na resposta do servidor.');
                    }
                    return response.json();
                })
                .then((data: IUserDados) => {
                    // Adiciona um novo item sem a imagem
                    setResults(prevResults => [...prevResults, data]);
                    console.log('6', newObj)
                })
                .catch((error) => {
                    console.error('Erro:', error);
                }); 
            }
      
            reset();
            setPreview(null);
          }
    }

    function formatDateToInput(dateStr:string) {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`;
    }

    const handleEdit = (index: number) => {
        const response = results[index];
        if (response) { 
            setValue('name', response.name);
            setValue('email', response.email);
            setValue('password', response.password);
            setValue('gender', response.gender);
            if (response.birthDate) {
                const formattedDate = formatDateToInput(response.birthDate);
                setValue('birthDate', formattedDate);
            }
            setValue('area', response.area);
            setValue('isAdmin', response.isAdmin ? true : false);
            setPreview(response.photo);
            setEditingIndex(index);
        }

        console.log(response);
      
    };

    const handleDelete = async (index: number) => {
        const id = results[index]._id;

        await fetch(`http://localhost:5000/api/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if(!response.ok){
                throw new Error('Erro na resposta do servidor.')
            }

            return response.json();
        })
        .then(() => {
            setResults(prevResults => prevResults.filter(result  => result._id  !== id));
            reset();
            setPreview(null);
            setEditingIndex(null);
        });        
    } 

    const handleModalOpen = (index: number) => {
        const result = results[index];
        setModalData(result);
        setModalOpen(true);
    }
    
    const handleClose = () => {
        setModalOpen(false)
    }

    const countAdmin = results.filter(result => result.isAdmin).length;
    const countUser = results.length - countAdmin;

    return (
        <>
            <div className="grid">
                <div className="content-form">
                    <div className="show-users">
                        <div className="new-user users">
                            <span className="qtda">{countUser}</span>
                            <span className="title">Novos Usuários</span>
                        </div>
                        <div className="new-admin users">
                            <span className="qtda">{countAdmin}</span>
                            <span className="title">Administradores</span>
                        </div>
                    </div>
                    <div className={editingIndex !== null ? 'container-register edit' : 'container-register'}>
                        <h2>{editingIndex !== null ? 'Editar Usuário' : 'Novo Usuário'}</h2>   
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-body">
                                <div className="form-group">
                                    <label>Nome</label>
                                    <input type="text"
                                        placeholder='Digite o nome de usuário'
                                        {...register('name', { required: true, minLength: 5 })}    
                                    />
                                    {errors.name?.type === 'required' && <p className="error-message">O nome é obrigatório.</p>}
                                    {errors.name?.type === 'minLength' && <p className="error-message">O nome precisa ter no minímo 5 caracteres.</p>}
                                </div>
                                <div className="form-group block">
                                    <label>Sexo</label>
                                    <div>
                                        <label>Masculino</label>
                                        <input type="radio" value="Masculino" {...register('gender')} />
                                    </div>
                                    <div>
                                        <label>Feminino</label>
                                        <input type="radio" value="Feminino" {...register('gender')}  />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Data de Nascimento</label>
                                    <input type="date" {...register('birthDate', { required: true })} />
                                    {errors.birthDate && <p className="error-message">A data de nascimento é obrigatório.</p>}
                                </div>
                                <div className="form-group">
                                    <label>Área de atuação</label>
                                    <select {...register('area', { required: true, validate: (value) => value !== '0' })} >
                                        <option value="0">Selecione uma área</option>
                                        <option value="desenvolvedor">Desenvolvedor</option>
                                        <option value="analista">Analista</option>
                                        <option value="projetos">Projetos</option>
                                        <option value="qa">QA</option>
                                    </select>
                                    {errors.area && <p className="error-message">A área é obrigatória.</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">E-mail</label>
                                    <input type="text"
                                        placeholder='Digite o email de usuário'
                                        {...register('email', {required: true, validate: (value) => isEmail(value)})} />
                                        {errors?.email?.type === "required" && <p className="error-message">O e-mail é obrigatório.</p>}
                                        {errors.email?.type === 'validate' ? <p className="error-message">Insira um e-mail válido.</p> : ''}
                                </div>
                                <div className="form-group">
                                    <label>Senha</label>
                                    <input type="password"
                                        placeholder='Crie uma senha'
                                        {...register("password", { required: true, minLength: 5 })} />
                                        {errors.password?.type === 'required' && <p className="error-message">A senha é obrigatória.</p>}
                                        {errors.password?.type === 'minLength' && <p className="error-message">A senha precisa ter no minímo 5 caracteres.</p>}
                                </div>
                                <div className="form-group">
                                    <label>Foto</label>
                                    <input type="file" {...register("photo") }  />
                                    {preview && (
                                        <div className='box-preview'>
                                            <div className='img-preview'>
                                                <img src={preview} alt="Preview da imagem" />
                                            </div>
                                            <p>Preview da imagem</p>
                                        </div>
                                    )}
                                </div>
                                <div className="form-group block">
                                    <div>
                                        <label>Administrador</label>
                                        <input type="checkbox"
                                            {...register('isAdmin')}
                                        />
                                    </div>
                                </div>
                                <button className='btn-sucsess'>{editingIndex !== null ? 'Editar' : 'Enviar'}</button>
                            </div>
                        </form>
                    </div>
                </div>
                                   
                <Users results={results} onModal={handleModalOpen} onEdit={handleEdit} onDelete={handleDelete} />
                {modalOpen && modalData && (
                    <Modal data={modalData} onClose={handleClose} />
                )}
            </div> 
        </>
        
    )
}

export default Forms