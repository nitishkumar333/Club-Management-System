import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import styles from './Container.module.css'
import { AuthContext } from '../context';

function Add({ societyID, setIsAdding, getMembersList }) {
    const {currentUser} = useContext(AuthContext);
    const [fullName, setFullName] = useState('');
    const [deparement, setDeparement] = useState('');
    const [position, setPosition] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [societyName, setSocietyName] = useState('');

    const onAdd = async (path, newMemberObject, memID) => {
        const dbRef = doc(db, path, memID);
        await setDoc(dbRef,newMemberObject);
        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${fullName}'s data has been Added.`,
            showConfirmButton: false,
            timer: 1500
        });
    }

    // const getDocId = async (societyname) => {
    //     const societyRef = collection(db, "societies");
    //     const societyDocs = await getDocs(societyRef);
    //     let mId = null;
    //     await societyDocs.docs.map((doc) => {
    //         if (doc.data().societyName === 'pushpak') {
    //             mId = doc.id;
    //         }
    //     })
    //     return mId;
    // }

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!fullName || !deparement || !position || !email || !contactNumber) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        if (societyID != null) {
            const newMemberPath = `societies/${societyID}/members`;
            const memID = uuidv4();
            const userId = currentUser.uid;
            const newMember = {
                memID,
                societyID,
                fullName,
                deparement,
                position,
                email,
                contactNumber,
                societyName,
                userId
            }
            try{
                await onAdd(newMemberPath, newMember, memID);
            }catch(err){
                return Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: `${err.message}`,
                    showConfirmButton: true
                });
            }
            getMembersList();
            setIsAdding(false);
        }

    }


    return (
        <div className={styles.smallContainerParent}>
            <div className={styles.smallContainer}>
            <form onSubmit={handleAdd}>
                <h1>Add Member</h1>
                <label htmlFor="societyName">Society Name</label>
                <input
                    id="societyName"
                    type="text"
                    name="societyName"
                    value={societyName}
                    placeholder="Enter Society Name"
                    onChange={e => setSocietyName(e.target.value)}
                />
                <label htmlFor="fullName">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={fullName}
                    placeholder="Enter Full Name"
                    onChange={e => setFullName(e.target.value)}
                />
                <label htmlFor="deparement">Deparement</label>
                <input
                    id="deparement"
                    type="text"
                    name="deparement"
                    value={deparement}
                    placeholder="Enter Deparement Name"
                    onChange={e => setDeparement(e.target.value)}
                />
                <label htmlFor="position">Position</label>
                <input
                    id="position"
                    type="text"
                    name="position"
                    value={position}
                    placeholder="Enter Position Of Member"
                    onChange={e => setPosition(e.target.value)}
                />
                <label htmlFor="email">Email (@)</label>
                <input
                    id="email"
                    type="text"
                    name="email"
                    value={email}
                    placeholder="Enter Email Address"
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                    id="contactNumber"
                    type="text"
                    name="contactNumber"
                    value={contactNumber}
                    placeholder="Enter Contact Number"
                    onChange={e => setContactNumber(e.target.value)}
                />
                <div style={{ marginTop: '20px' }}>
                    <input type="submit" value="Add" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsAdding(false)}
                    />
                </div>
            </form>
        </div>
        </div>
    );
}

export default Add