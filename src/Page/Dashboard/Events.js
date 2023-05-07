import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { db } from '../../config/firebase';
import { doc, getDoc, collection,getDocs, deleteDoc } from 'firebase/firestore';
import Header from './Header';
import EventList from './EventList';
import EventAdd from './EventAdd';
import EventEdit from './EventEdit';

function Events({ societyID, societyName, setEventIsEditing, setEventIsAdding }) {

    const [eventDocs, setEventDocs] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setEventIsEditing(isEditing);
    }, [isEditing])
    useEffect(() => {
        setEventIsAdding(isAdding);
    }, [isAdding])

    async function getEventsList() {
        const dbRef = collection(db, `societies/${societyID}/events`);
        const docsData = await getDocs(dbRef);
        const docs = await docsData.docs.map((doc) => ({ ...doc.data() }));
        setEventDocs(docs);
    }

    const handleEdit = async (societyID, eventID) => {
        const docRef = await doc(db, `societies/${societyID}/events`, eventID);
        const docSnap = await getDoc(docRef);
        setSelectedEvent(docSnap.data());
        setIsEditing(true);
    }

    const handleDelete = (societyID,eventID) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(async (result) => {
            if (result.value) {
                await deleteDoc(doc(db, `societies/${societyID}/events`, eventID));
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `Event's data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                getEventsList();
            }
        });
    }


    return (
        <div className='container'>
            {/* List */}
            {!isAdding && !isEditing && (
                <>
                    <Header
                        setIsAdding={setIsAdding} headingText="Events"
                    />
                    <EventList
                        eventDocs={eventDocs}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        getEventsList={getEventsList}
                    />
                </>
            )}
            {/* Add */}
            {isAdding && (
                <EventAdd
                    societyID={societyID}
                    setIsAdding={setIsAdding}
                />
            )}
            {/* Edit */}
            {isEditing && (
                <EventEdit
                    selectedEvent={selectedEvent}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    )
}

export default Events;