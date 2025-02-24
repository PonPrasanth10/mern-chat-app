import React , {useState , memo} from 'react'
import { useAuthStore } from '../store/useAuthStore';
import LiquidChrome from '../externalcomponents/LiquidChrome.jsx'
import '../styles/LogInPage.css';

const MemoizedLiquidChrome = memo(() => (
  <LiquidChrome
    baseColor={[0.1, 0.1, 0.1]}
    speed={0.5}
    amplitude={0.1}
    interactive={false}
  />
));


const LogInPage = () => {

  const [ showPassword , setShowPassword ] = useState(false)

  const [formData,setFormData] = useState({
    email:"",
    password:""
  });

  const { login , isLoggingIn } = useAuthStore()

 
  const handleSubmit = (e) => {
     e.preventDefault()
     login(formData)
  }

  return (
    
    <div className='body'>
    <div className='background-login'>
  <MemoizedLiquidChrome />
  </div>
  <div className='login-form'>
  <form onSubmit={handleSubmit}>
    <p className="login">Log-In</p>
    <p className="email-label">Email:</p>
    <div className="email-input-div">
   
    <input type="email"
     placeholder='Enter your e-mail'
    value={formData.email}
    onChange={(e) => setFormData({...formData,email:e.target.value})}
    style={{
      marginBottom:"10px"
    }}
     />
     </div>
    <p className="password-label">Password:</p>
    <div className="password-input-div">

    <input type="password"
     placeholder='Enter your password'
     value={formData.password}
    onChange={(e) => setFormData({...formData,password:e.target.value})} 
     />
    </div>
    <div className="li-button-div">
    <button className="login-button">Login</button>
    </div>
    
    </form>
  </div>
    </div>
    
  )
}

export default LogInPage;