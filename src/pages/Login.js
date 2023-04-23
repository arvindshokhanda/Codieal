import { useState } from 'react';
import styles from '../styles/login.module.css';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';


const Login = ()=>{
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loggingIn, setLoggingIn] = useState(false);
const {addToast} = useToasts();
const auth = useAuth();

const navigate = useNavigate();
const handleSubmit = async (e)=>{
    e.preventDefault();
    setLoggingIn(true)

    if(!email || !password){
        return addToast('fields are requires', {
            appearance: "error"
        })
    }
    const response  = await auth.login(email, password);
    if(response.success){
         addToast(response.message, {
            appearance: "success"
        })
    }else{
        return addToast(response.message, {
            appearance: "error"
        })
    }
}
    if(auth.user){
        navigate('/');
    }
    return(
       <form className={styles.loginForm} onSubmit={handleSubmit}>
            <span className={styles.loginSignupHeader}>
                Log In
            </span>
            <div className={styles.field}>
                <input type = "email" placeholder="Email"  value = {email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className={styles.field}>
                <input type = "password" placeholder="password"   value = {password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className={styles.field}  > 
                <button disabled = {loggingIn}> {loggingIn? 'Logging in...' : 'Log in'}</button>
            </div>
       </form>
    )
}
export default Login;