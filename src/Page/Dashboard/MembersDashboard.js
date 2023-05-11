import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';

import { db } from '../../config/firebase';
import { doc, getDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

function MembersDashboard({ societyID, societyName }) {
    
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    async function getMembersList() {
        const dbRef = collection(db, `societies/${societyID}/members`);
        const docsData = await getDocs(dbRef);
        const docs = await docsData.docs.map((doc) => ({ ...doc.data() }));
        setMembers(docs);
    }

    const handleEdit = async (societyID, memID) => {
        const dbRef = await doc(db, `societies/${societyID}/members`, memID);
        const docSnap = await getDoc(dbRef);
        setSelectedMember(docSnap.data());
        setIsEditing(true);
    }

    const handleDelete = (societyID, memID) => {
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
                    await deleteDoc(doc(db, `societies/${societyID}/members`, memID));
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
                    title: 'Deleted!',
                    text: `Member's Data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                getMembersList();
            }
        });
    }


    return (
        <div className='container'>
            {/* List */}
            {(
                <>
                    <Header
                        setIsAdding={setIsAdding} headingText="Members"
                    />
                    <List
                        members={members}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        getMembersList={getMembersList}
                    />
                </>
            )}
            {/* Add */}
            {isAdding && (
                <Add
                    societyID={societyID}
                    setIsAdding={setIsAdding}
                    getMembersList={getMembersList}
                />
            )}
            {/* Edit */}
            {isEditing && (
                <Edit
                    selectedMember={selectedMember}
                    setIsEditing={setIsEditing}
                    getMembersList={getMembersList}
                />
            )}
        </div>
    )
}

export default MembersDashboard;