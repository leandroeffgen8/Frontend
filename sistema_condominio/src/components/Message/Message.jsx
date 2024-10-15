import './Message.css';

const Message = ({ msg, type }) => {
  return (
    <div className={`message ${type}`}>
        <span>{msg}</span>
    </div>
  )
}

export default Message
