import React from 'react'
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function List({ members, handleEdit, handleDelete, getMembersList }) {

    useEffect(() => {
        console.log("useEffect");
        getMembersList();
    }, [])

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
                                <td className="text-center">
                                    <button style={{'border':'2px solid #007bff','color':'#007bff'}}
                                        onClick={() => handleEdit(member.societyID, member.memID)}
                                        className="button muted-button"
                                    >
                                        Edit
                                    </button>
                                    <button style={{marginLeft:'15px','background':'#e01d1d','color':'white'}}
                                        onClick={() => handleDelete(member.societyID, member.memID)}
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