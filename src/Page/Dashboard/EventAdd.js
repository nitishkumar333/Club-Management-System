import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import styles from './Container.module.css'
import { storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytesResumable,uploadBytes } from 'firebase/storage';
import { AuthContext } from '../context';

function EventAdd({ societyID, setIsAdding, getEventsList }) {
    const {currentUser} = useContext(AuthContext);
    const [submitBtn,setSubmitBtn] = useState(true);
    const [nameOfEvent, setNameOfEvent] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [file, setFile] = useState();
    const [progress,setProgress] = useState(null);
    
    const reportUploadHandler = (e)=>{
        const file = e.target.files[0];
        const fileSize = ((file.size/1024)/1024).toFixed(4);
        const filetype = file.type;
        if(filetype !== 'application/pdf'){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Only PDFs are allowed',
                showConfirmButton: true
            });
            setIsAdding(false);
        }else if(fileSize>20){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'File Size should be less than 20mb',
                showConfirmButton: true
            });
            setIsAdding(false);
        } else{
            setFile(file);
        }
    }
    const afterFileUploaded = async (fileurl,eventID)=>{
        const newEventPath = `societies/${societyID}/events`;
        const userId = currentUser.uid;
        const newEventData = {
            eventID,
            societyID,
            nameOfEvent,
            date,
            fileurl,
            description,
            userId
            // societyName
        }
        try{
            await onAdd(newEventPath, newEventData, eventID);
        } catch(err){
            console.log(err.message);
        }
        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${nameOfEvent}'s data has been Added.`,
            showConfirmButton: false,
            timer: 1500
        });
        getEventsList();
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
            try{
                await uploadReport(file,societyID,eventID);
            } catch(err){
                return Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: `${err.message}`,
                    showConfirmButton: true
                });
            }
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
        <div className={styles.smallContainerParent}>
            <div className={styles.smallContainer}>
            <form onSubmit={handleAdd}>
                <h1>Add Event Details</h1>
                <label htmlFor="nameOfEvent">Name Of Event</label>
                <input
                    id="nameOfEvent"
                    type="text"
                    name="nameOfEvent"
                    value={nameOfEvent}
                    placeholder="Enter Name Of Event"
                    onChange={e => setNameOfEvent(e.target.value)}
                />
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="text"
                    name="date"
                    value={date}
                    placeholder="Enter Date Of Event"
                    onChange={e => setDate(e.target.value)}
                />
                <label htmlFor="description">Description</label>
                <input
                    id="description"
                    type="text"
                    name="description"
                    value={description}
                    placeholder="Enter Small Description"
                    onChange={e => setDescription(e.target.value)}
                />
                <label htmlFor="report">Upload Report</label>
                    <input type="file" onChange={reportUploadHandler} accept='.pdf'/>
                    {progress && <label style={{display:'inline-block', margin:'0', padding:'0'}}>{progress}%</label>}
                    
                <div style={{ marginTop: '20px' }}>
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