import { useForm } from "react-hook-form"

const Advertencia = () => {

	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		console.log(data)
	}

	return (
		<div className='content-grid formWidthFull'>
		<h2>Advertencias</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<label>Valor a ser pago</label>
				<input type="number" placeholder='Insira um valor' {...register('amount')} />
				<label>Data de pagamento</label>
				<input type="date" {...register('dueDate')} />
				<label>Descrição</label>
				<input type="text" placeholder='Insira uma descrição' {...register('description')} />
				<input type="submit" value="Cadastrar" />
				{/* {!loading &&  <input type="submit" value="Cadastrar" />} */}
				{/* {loading &&  <input type="submit" value="Aguarde..." disabled />}
				{error && <Message msg={error} type="error" />}
				{message && <Message msg={message} type="success" />} */}
			</form>

		</div>
	)
}

export default Advertencia