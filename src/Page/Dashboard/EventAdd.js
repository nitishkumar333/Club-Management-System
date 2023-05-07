import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

function EventAdd({ societyID, setIsAdding }) {

    const [nameOfEvent, setNameOfEvent] = useState('');
    const [date, setDate] = useState('');

    const onAdd = async (path, newEventData ,eventID) => {
        const dbRef = doc(db, path,eventID);
        await setDoc(dbRef,newEventData);
        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${nameOfEvent}'s data has been Added.`,
            showConfirmButton: false,
            timer: 1500
        });
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!nameOfEvent || !date) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        if (societyID != null) {
            const newEventPath = `societies/${societyID}/events`;
            const eventID = uuidv4();
            const newEventData = {
                eventID,
                societyID,
                nameOfEvent,
                date,
                // societyName
            }
            await onAdd(newEventPath, newEventData, eventID);
            setIsAdding(false);
        }

    }


    return (
        <div className="small-container">
            <form onSubmit={handleAdd}>
                <h1>Add Event Details</h1>
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

export default EventAdd;