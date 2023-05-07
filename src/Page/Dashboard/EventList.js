import React from 'react'
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function EventList({ eventDocs, handleEdit, handleDelete, getEventsList }) {
    
    useEffect(() => {
        console.log("useEffect");
        getEventsList();
    }, [])

    return (
        <div className='contain-table'>
            <table className='striped-table'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name Of Event</th>
                        <th>Date</th>
                        <th colSpan={2} className="text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {eventDocs.length > 0 ? (
                        eventDocs?.map((event, i) => (
                            <tr key={event.eventID}>
                                <td>{i + 1}</td>
                                <td>{event.nameOfEvent}</td>
                                <td>{event.date}</td>
                                <td className="text-right">
                                    <button
                                        onClick={() => handleEdit(event.societyID, event.eventID)}
                                        className="button muted-button"
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="text-left">
                                    <button
                                        onClick={() => handleDelete(event.societyID, event.eventID)}
                                        className="button muted-button"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>No Events Listed</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default EventList;