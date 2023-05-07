import React, { useState } from 'react'
import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';

import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

function MembersDashboard({ societyID }) {
    
    const [selectedMember, setSelectedMember] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = async (societyID, memID) => {
        const dbRef = await doc(db,`societies/${societyID}/members`,memID);
        const docSnap = await getDoc(dbRef);
        setSelectedMember(docSnap.data());
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
                        setIsAdding={setIsAdding} headingText="Society Management Software"
                    />
                    <List
                        societyID={societyID}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {/* Add */}
            {isAdding && (
                <Add
                    societyID={societyID}
                    setIsAdding={setIsAdding}
                />
            )}
            {/* Edit */}
            {isEditing && (
                <Edit
                    selectedMember={selectedMember}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    )
}

export default MembersDashboard;