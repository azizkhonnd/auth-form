import Button from '../../../utils'
import './Login.scss'

const Login = () => {
  return (
    <div className='form__wrapper'>
      <h1 className='text'>Login</h1>
      <form className="auth-form">
        <input type="email" placeholder='email' />
        <input type="password" placeholder='password' />
        <Button btnType='submit'>Login</Button>
      </form>


    </div>
  )
}

export default Login