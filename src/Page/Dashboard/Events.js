import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { db } from '../../config/firebase';
import { doc, getDoc, collection,getDocs, deleteDoc } from 'firebase/firestore';
import Header from './Header';
import EventList from './EventList';
import EventAdd from './EventAdd';
import EventEdit from './EventEdit';
import { storage } from '../../config/firebase';
import { deleteObject, listAll, ref } from 'firebase/storage';


function Events({ societyID, societyName, isEditing, setIsEditing, setEventIsAdding }) {

    const [eventDocs, setEventDocs] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
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

    async function deleteFolder(path: string) {
        console.log(path);
        const folderRef = ref(storage, path);
        const fileList = await listAll(folderRef);
        return deleteObject(fileList.items[0]);
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
                try{
                    await deleteFolder(`reports/${societyID}/${eventID}`)
                    await deleteDoc(doc(db, `societies/${societyID}/events`, eventID));
                } catch (error){
                    return Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: `${error.message}`,
                        showConfirmButton: true
                    });
                }
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
            {!isAdding && (
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
                    getEventsList={getEventsList}
                />
            )}
        </div>
    )
}

export default Events;