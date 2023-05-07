import React from 'react'
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function EventList({ societyID, handleEdit, handleDelete }) {
    const [eventDocs, setEventDocs] = useState([]);
    useEffect(() => {
        console.log("useEffect");
        async function getdoc() {
            const dbRef = collection(db, `societies/${societyID}/events`);
            const docsData = await getDocs(dbRef);
            const docs = await docsData.docs.map((doc) => ({ ...doc.data() }));
            setEventDocs(docs);
        }
        getdoc();
    }, [societyID])

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
                                        onClick={() => handleDelete(event.id)}
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