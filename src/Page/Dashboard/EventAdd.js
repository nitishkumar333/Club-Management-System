import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import FileUpload from './FileUpload';
import styles from './Container.module.css'
import { storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytesResumable,uploadBytes } from 'firebase/storage';

function EventAdd({ societyID, setIsAdding }) {

    const [submitBtn,setSubmitBtn] = useState(true);
    const [nameOfEvent, setNameOfEvent] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [file, setFile] = useState();
    const [progress,setProgress] = useState(null);
    
    const reportUploadHandler = (e)=>{
        const file = e.target.files[0];
        setFile(file);
    }
    const afterFileUploaded = async (fileurl,eventID)=>{
        const newEventPath = `societies/${societyID}/events`;
        const newEventData = {
            eventID,
            societyID,
            nameOfEvent,
            date,
            fileurl,
            description
            // societyName
        }
        await onAdd(newEventPath, newEventData, eventID);
        setIsAdding(false);
    }
    const uploadReport = async (file,societyID, eventID)=>{
        if(!file) return;
        const storageRef = ref(storage,`/reports/${societyID}/${eventID}/${file.name}`);
        const UploadTask = uploadBytesResumable(storageRef,file);
        UploadTask.on('state_changed',(snapshot)=>{
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
            setProgress(prog);
        },(err)=>console.log(err),
        ()=>{
            getDownloadURL(UploadTask.snapshot.ref).then((url)=>{afterFileUploaded(url,eventID)});
        })
    }

    const onAdd = async (path, newEventData ,eventID) => {
        const dbRef = doc(db, path,eventID);
        await setDoc(dbRef,newEventData);
        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${nameOfEvent}'s data has been Added.`,
            showConfirmButton: false,
            timer: 1500
        });
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!nameOfEvent || !date || !description || !file) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }
        setSubmitBtn(false);
        
        if (societyID != null) {
            const eventID = uuidv4();
            await uploadReport(file,societyID,eventID);
            // const newEventData = {
            //     eventID,
            //     societyID,
            //     nameOfEvent,
            //     date,
            //     fileurl
            //     // societyName
            // }
            // await onAdd(newEventPath, newEventData, eventID);
            // setIsAdding(false);
        }

    }


    return (
        <div className='small-container-parent'>
            <div className={styles.smallContainer}>
            <form onSubmit={handleAdd}>
                <h1>Add Event Details</h1>
                <label htmlFor="nameOfEvent">Name Of Event</label>
                <input
                    id="nameOfEvent"
                    type="text"
                    name="nameOfEvent"
                    value={nameOfEvent}
                    onChange={e => setNameOfEvent(e.target.value)}
                />
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="text"
                    name="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
                <label htmlFor="description">Description</label>
                <input
                    id="description"
                    type="text"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <label htmlFor="report">Upload Report</label>
                    <input type="file" onChange={reportUploadHandler}/>
                    {progress && <label style={{display:'inline-block', margin:'0', padding:'0'}}>{progress}%</label>}
                {/* <input
                    id="report"
                    type="file"
                    name="report"
                    value={report}
                    onChange={e => setReport(e.target.value)}
                /> */}
                <div style={{ marginTop: '30px' }}>
                    { submitBtn && <input type="submit" value="Add"/>}
                    { submitBtn && <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsAdding(false)}
                    />}
                </div>
            </form>
        </div>
        </div>
    );
}

export default EventAdd;