import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Header from './Header';
import EventList from './EventList';
import EventAdd from './EventAdd';
import EventEdit from './EventEdit';

function Events({ societyID }) {
    
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // useEffect(()=>{
    //     setEmployees(societies);
    // },[societies])

    const handleEdit = async (societyID, eventID) => {
        const docRef = await doc(db, `societies/${societyID}/events`, eventID );
        const docSnap = await getDoc(docRef);
        // const res = await setDoc(docRef, employee);
        setSelectedEvent(docSnap.data());
        setIsEditing(true);
    }

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.value) {
                // const [employee] = employees.filter(employee => employee.id === id);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    // text: `${employee.firstName}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                // setEmployees(employees.filter(employee => employee.id !== id));
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
                        societyID={societyID}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
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