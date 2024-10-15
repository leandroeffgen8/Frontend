import './Welcome.css'

const Welcome = () => {
  return (
    <div className="welcome">
        {/* <h2>Bem Vindo</h2>
        <h3>Novo Login</h3>
        <span><Link to='/register'>Criar conta</Link></span>
        <span className='icon'><i className="fa fa-arrow-right-arrow-left"></i></span> */}

        <h2 style={{ whiteSpace: 'pre-line' }}>Faça o login ou {'\n'} cadastra-se em nosso site.</h2>
    </div>
  )
}

export default Welcome
