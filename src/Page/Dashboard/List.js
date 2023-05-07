import React from 'react'
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function List({ societyID, handleEdit, handleDelete }) {

    const [members, setMembers] = useState([]);
    useEffect(() => {
        console.log("useEffect");
        async function getdoc() {
            const dbRef = collection(db, `societies/${societyID}/members`);
            const docsData = await getDocs(dbRef);
            const docs = await docsData.docs.map((doc) => ({ ...doc.data() }));
            setMembers(docs);
        }
        getdoc();
    },[societyID])

    return (
        <div className='contain-table'>
            <table className='striped-table'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Deparement</th>
                        <th>Position</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th colSpan={2} className="text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {members.length > 0 ? (
                        members.map((member, i) => (
                            <tr key={member.memID}>
                                <td>{i + 1}</td>
                                <td>{member.fullName}</td>
                                <td>{member.deparement}</td>
                                <td>{member.position}</td>
                                <td>{member.email}</td>
                                <td>{member.contactNumber} </td>
                                <td className="text-right">
                                    <button
                                        onClick={() => handleEdit(societyID,member.memID)}
                                        className="button muted-button"
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="text-left">
                                    <button
                                        onClick={() => handleDelete(societyID,member.memID)}
                                        className="button muted-button"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>No Members</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default List