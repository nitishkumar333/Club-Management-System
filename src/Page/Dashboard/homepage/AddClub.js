import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '../../../config/firebase';
import { doc, setDoc} from 'firebase/firestore';
import styles from '../Container.module.css'
import { AuthContext } from '../../context';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function AddClub({ setClubIsAdding, loader }) {
    const { currentUser } = useContext(AuthContext);
    const [societyName, setSocietyName] = useState('');
    const [clubLogo, setClubLogo] = useState();
    const [submitBtn, setSubmitBtn] = useState(true);
    const [progress,setProgress] = useState(null);

    const clubLogoUploadHandler = (e) => {
        const logo = e.target.files[0];
        const filetype = logo.type;
        if(!filetype.includes('image')){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Only Images are allowed',
                showConfirmButton: true
            });
            setClubIsAdding(false);
        } else{
            setClubLogo(logo);
        }
    }
    const afterFileUploaded = async (logoURL,societyID)=>{
        const newClub = {
            societyName,
            logoURL
        }
        try{
            const dbRef = doc(db, 'societies', societyID);
            await setDoc(dbRef,newClub);
        } catch(err){
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `${err.message}`,
                showConfirmButton: true
            });
        }
        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${societyName}'s has been Added.`,
            showConfirmButton: false,
            timer: 1500
        });
        loader();
        setClubIsAdding(false);
    }
    const uploadLogo = async (file,societyID)=>{
        if(!file) return;
        const storageRef = ref(storage,`/clubLogos/${societyID}/${file.name}`);
        const UploadTask = uploadBytesResumable(storageRef,file);
        UploadTask.on('state_changed',(snapshot)=>{
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
            setProgress(prog);
        },(err)=>{
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `${err.message}`,
                showConfirmButton: true
            });
        },
        ()=>{
            getDownloadURL(UploadTask.snapshot.ref).then((url)=>{afterFileUploaded(url,societyID)});
        })
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!societyName || !clubLogo) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }
        setSubmitBtn(false);
        try {
            const societyID = uuidv4();
            await uploadLogo(clubLogo,societyID);
        } catch (err) {
            
        }
    }


    return (
        <div className={styles.smallContainerParent}>
            <div className={styles.smallContainer}>
                <form onSubmit={handleAdd}>
                    <h1>Add New Club</h1>
                    <label htmlFor="societyName">Society Name</label>
                    <input
                        id="societyName"
                        type="text"
                        name="societyName"
                        value={societyName}
                        placeholder="Enter Society Name"
                        onChange={e => setSocietyName(e.target.value)}
                    />
                    <label htmlFor="clubLogo">Upload Club Logo</label>
                    <input type="file" onChange={clubLogoUploadHandler} accept="image/*" />
                    {progress && <label style={{ display: 'inline-block', margin: '0', padding: '0' }}>{progress}%
                    </label>}
                    <div style={{ marginTop: '20px' }}>
                        {submitBtn && <input type="submit" value="Add" />}
                        {submitBtn && <input
                            style={{ marginLeft: '12px' }}
                            className="muted-button"
                            type="button"
                            value="Cancel"
                            onClick={() => setClubIsAdding(false)}
                        />}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddClub;