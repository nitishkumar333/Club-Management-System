import { useState } from 'react';
import styles from './Login.css'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import { AuthContext } from '../../context';
import { useContext } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext);
    console.log("login",currentUser);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (shouldRedirect) navigate("/");
    }, [shouldRedirect]);

    const loginHandler =async (e)=>{
        e.preventDefault();
        const userCredential = await signInWithEmailAndPassword(auth,email,password);
        setShouldRedirect(true);
        navigate("/");
    }
    
    return (
        <div className="outerbox">
            <div className="innerbox">
                <header className="signup-header">
                    <h1>Login User</h1>
                </header>
                <main className="signup-body">
                    <form onSubmit={loginHandler}>
                        <p>
                            <label htmlFor="email">Username :</label>
                            <input type="email" id="email" placeholder="Enter Your Username" onChange={(e)=>setEmail(e.target.value)} autoComplete="off" />
                        </p>
                        <p>
                            <label htmlFor="password">Password :</label>
                            <input type="password" id="password" placeholder="Enter New Password" onChange={(e)=>setPassword(e.target.value)}  autoComplete="off"/>
                        </p>
                        <p>
                            <input type="submit" id="submit" value="Login" />
                        </p>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default Login;