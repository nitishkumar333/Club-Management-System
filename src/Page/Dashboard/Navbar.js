import { useContext } from 'react';
import { AuthContext } from '../context';
import styles from './homepage/Homepage.module.css'
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import Swal from 'sweetalert2';

function Navbar(){
    const {currentUser} = useContext(AuthContext);
    const signOutHandler=()=>{
        signOut(auth).then(()=>{console.log("success logout")})
        .catch(err=>{
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `${err.message}`,
                showConfirmButton: true
            });
        })
    }
    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
            <h1>Raj Kumar Goel Institue Of Technology</h1>
            <button onClick={signOutHandler}>SignOut</button>
            </div>
        </nav>
    )
}

export default Navbar;