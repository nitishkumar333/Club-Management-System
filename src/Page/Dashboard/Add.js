import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import styles from './Container.module.css'
import { AuthContext } from '../context';

function Add({ societyID, setIsAdding }) {
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
            await onAdd(newMemberPath, newMember, memID);
            setIsAdding(false);
        }

    }


    return (
        <div className={styles.smallContainer}>
            <form onSubmit={handleAdd}>
                <h1>Add Member</h1>
                <label htmlFor="societyName">Society Name</label>
                <input
                    id="societyName"
                    type="text"
                    name="societyName"
                    value={societyName}
                    onChange={e => setSocietyName(e.target.value)}
                />
                <label htmlFor="fullName">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                />
                <label htmlFor="deparement">Deparement</label>
                <input
                    id="deparement"
                    type="text"
                    name="deparement"
                    value={deparement}
                    onChange={e => setDeparement(e.target.value)}
                />
                <label htmlFor="position">Position</label>
                <input
                    id="position"
                    type="text"
                    name="position"
                    value={position}
                    onChange={e => setPosition(e.target.value)}
                />
                <label htmlFor="email">Email (@)</label>
                <input
                    id="email"
                    type="text"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                    id="contactNumber"
                    type="text"
                    name="contactNumber"
                    value={contactNumber}
                    onChange={e => setContactNumber(e.target.value)}
                />
                <div style={{ marginTop: '30px' }}>
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
    );
}

export default Add