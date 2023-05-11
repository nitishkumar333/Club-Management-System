import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2';
import { db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { AuthContext } from '../context';
import styles from './Container.module.css'

function Edit({ selectedMember, setIsEditing, getMembersList }) {
    const {currentUser} = useContext(AuthContext);
    const [fullName, setFullName] = useState(selectedMember.fullName);
    const [deparement, setDeparement] = useState(selectedMember.deparement);
    const [position, setPosition] = useState(selectedMember.position);
    const [email, setEmail] = useState(selectedMember.email);
    const [contactNumber, setContactNumber] = useState(selectedMember.contactNumber);
    const [societyName, setSocietyName] = useState(selectedMember.societyName);
    const societyID = selectedMember.societyID;
    const memID = selectedMember.memID;

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!fullName || !societyName || !deparement || !position || !email || !contactNumber) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }
        const userId = currentUser.uid;
        const member = {
            memID,
            societyID,
            fullName,
            deparement,
            position,
            email,
            contactNumber,
            societyName,
            userId
        };

        try{
            const docRef = await doc(db, `societies/${societyID}/members`, memID);
            await setDoc(docRef, member);
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
            title: 'Updated!',
            text: `${member.fullName}'s data has been updated.`,
            showConfirmButton: false,
            timer: 1500
        });
        getMembersList();
        setIsEditing(false);
    };

    return (
        <div className={styles.smallContainerParent}>
            <div className={styles.smallContainer}>
            <form onSubmit={handleUpdate}>
                <h1>Edit Member</h1>
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
                <label htmlFor="email">Email ($)</label>
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
                <div style={{ marginTop: '20px' }}>
                    <input type="submit" value="Update" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsEditing(false)}
                    />
                </div>
            </form>
        </div>
        </div>
    );
}

export default Edit;