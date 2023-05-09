import { useState } from "react";
import { storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function FileUpload(){
    const [progress,setProgress] = useState(null);
    const uploadReport = (file)=>{
        if(!file) return;
        const storageRef = ref(storage,`/reports/${file.name}`);
        const UploadTask = uploadBytesResumable(storageRef,file);
        UploadTask.on('state_changed',(snapshot)=>{
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
            setProgress(prog);
        },(err)=>console.log(err),
        ()=>{
            getDownloadURL(UploadTask.snapshot.ref).then((url)=>console.log(url));
        })
    }
    const reportUploadHandler = (e)=>{
        e.preventDefault();
        const file = e.target.files[0];
        uploadReport(file);
    }
    return(
        <>
            <input type="file" onChange={reportUploadHandler} accept=".pdf"/>
            {progress && <label style={{display:'inline-block', margin:'0', padding:'0'}}>{progress}%</label>}
        </>
    )
}

export default FileUpload;