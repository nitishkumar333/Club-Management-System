import React from 'react'
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

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
                        <th>Description</th>
                        <th style={{backgroudColor:'black',textAlign:'center'}} colSpan={1}>Report</th>
                        <th className="text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {eventDocs.length > 0 ? (
                        eventDocs?.map((event, i) => (
                            <tr key={event.eventID}>
                                <td>{i + 1}</td>
                                <td style={{wordWrap:'break-word',maxWidth:'10vw'}}>{event.nameOfEvent}</td>
                                <td>{event.date}</td>
                                <td style={{wordWrap:'break-word',maxWidth:'17vw'}}>{event.description}</td>
                                <td className="text-left" style={{ textAlign:'center'}}>
                                    {event.fileurl && <a href={event.fileurl}>
                                        <button>Report <FontAwesomeIcon icon={faDownload}/></button>
                                    </a> }
                                </td>
                                <td className="text-center" >
                                    <button style={{'border':'2px solid #007bff','color':'#007bff'}}
                                        onClick={() => handleEdit(event.societyID, event.eventID)}
                                        className="button muted-button"
                                    >
                                        Edit
                                    </button>
                                    <button style={{marginLeft:'15px','background':'#e01d1d','color':'white'}}
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