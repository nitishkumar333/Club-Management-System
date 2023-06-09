import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2';
import { db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import styles from './Container.module.css'
import { AuthContext } from '../context';

function EventEdit({ selectedEvent, setIsEditing, getEventsList }) {
    const {currentUser} = useContext(AuthContext);
    const [nameOfEvent, setNameOfEvent] = useState(selectedEvent.nameOfEvent);
    const [date, setDate] = useState(selectedEvent.date);
    const [description, setDescription] = useState(selectedEvent.description);
    const societyID = selectedEvent.societyID;
    const eventID = selectedEvent.eventID;
    const fileurl = selectedEvent.fileurl;
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!nameOfEvent || !date) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }
        const userId = currentUser.uid;
        const newEvent = {
            nameOfEvent,
            date,
            societyID,
            eventID,
            description,
            fileurl,
            userId
        };
        try{
            const docRef = await doc(db, `societies/${selectedEvent.societyID}/events`, eventID );
            await setDoc(docRef, newEvent);
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
            text: `${selectedEvent.nameOfEvent}'s data has been updated.`,
            showConfirmButton: false,
            timer: 1500
        });
        getEventsList();
        setIsEditing(false);
    };

    return (
        <div className={styles.smallContainerParent}>
            <div className={styles.smallContainer}>
            <form onSubmit={handleUpdate}>
                <h1>Edit Event Details</h1>
                <label htmlFor="nameOfEvent">Name Of Event</label>
                <input
                    id="nameOfEvent"
                    type="text"
                    name="nameOfEvent"
                    value={nameOfEvent}    
                    onChange={e => setNameOfEvent(e.target.value)}
                />
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="text"
                    name="date"
                    value={date}    
                    onChange={e => setDate(e.target.value)}
                />
                <label htmlFor="description">Description</label>
                <input
                    id="description"
                    type="text"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
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

export default EventEdit;