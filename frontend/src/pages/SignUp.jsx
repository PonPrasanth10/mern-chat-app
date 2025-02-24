import React , {useState,memo} from 'react'
import { useAuthStore } from '../store/useAuthStore';
import '../styles/SignUp.css'
import { Link } from 'react-router-dom';
import LiquidChrome from '../externalcomponents/LiquidChrome.jsx'
import toast from 'react-hot-toast';


const MemoizedLiquidChrome = memo(() => (
  <LiquidChrome
  baseColor={[0.1, 0.1, 0.1]}
  speed={0.5}
  amplitude={0.1}
  interactive={false}
/>
));


const SignUp = () => {

  const [ showPassword , setShowPassword ] = useState(false)

  const [formData,setFormData] = useState({
    fullName:"",
    email:"",
    password:""
  });

  const { signup , isSigningUp } = useAuthStore()

  const validateForm = () => {
    
    const {fullName,email,password} = formData;

    // Validation
    if (!email || !fullName || !password) {
        toast.error("All fields are required!");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        toast.error("Invalid email format!");
        return;
    }

    if (fullName.length < 3) {
      toast.error("Username must be 3 characters long!");
        return;
    }

    if (password.length < 6) {
      toast.error("Password must be 6 characters long!");
        return;
    }

    
    return true;

  }
  const handleSubmit = (e) => {
     e.preventDefault()

     const success = validateForm()

     if(success===true) signup(formData)
     
  }


  return (
    
    <div className='body'>
    <div className='background-signup'>
  <MemoizedLiquidChrome />
  </div>
  <div className={`signup-form`}>
  <form onSubmit={handleSubmit}>
    <h2 className="signup">Create an account</h2>
    <p className="username-label">Username:</p>
    <div className="username-input-div">
    
    <input type="text"
     placeholder='Enter your name'
    value={formData.fullName}
    onChange={(e) => setFormData({...formData,fullName:e.target.value})}
     />
    </div>
    <p className="email-label">Email:</p>
    <div className="email-input-div">

    <input type="email"
     placeholder='Enter your e-mail'
    value={formData.email}
    onChange={(e) => setFormData({...formData,email:e.target.value})}
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
    <div className="su-button-div" >
    <button className="signup-button">Create Account</button>
    </div>
    <p className='navigate-link'>Already Have an Account ? 
    <Link to="/home" className='signin-link'>
    Login
    </Link>
    </p>
    </form>
  </div>
    </div>
  )
}

export default SignUp