import { useEffect, useState } from 'react';
import { db } from './config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import MembersDashboard from './Page/Dashboard/MembersDashboard';
import Events from './Page/Dashboard/Events';
import Homepage from './Page/Dashboard/homepage/Homepage';
import { useParams } from 'react-router-dom';
import Navbar from './Page/Dashboard/Navbar';
import { useLocation } from "react-router-dom";
import styles from './Page/Dashboard/Container.module.css'

function SocietyDashboard() {
  const params = useParams();
  // const [societies, setSocieties] = useState([]);
  // const moviesCollectionRef = collection(db, "societies");
  // useEffect(() => {
  //   const getSocietiesList = async () => {
  //     try {
  //       const getMembersData = async (path) => {
  //         const membersRef = collection(db, path);
  //         const membersData = await getDocs(membersRef);
  //         const filteredMembers = await membersData.docs.map((doc) => ({ ...doc.data() }));
  //         return filteredMembers;
  //       }
  //       const data = await getDocs(moviesCollectionRef);
  //       const filteredData = await data.docs.map(async (doc) => {
  //         const members = await getMembersData(`societies/${doc.id}/members`);
  //         setSocieties(members);
  //         // return members;
  //       });
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   getSocietiesList();
  // }, [])

  const location = useLocation();
  const url = location.state?.logoURL;
  return (
    <div className='container'>
      <Navbar/>
    <div className={styles.containerParent}>
      <div className='societyLogo'>
        <img src={url} alt="" style={{'borderRadius':'50%'}}/>
        <h1 style={{'margin':'0'}}>{location.state?.name.toUpperCase()}</h1>
      </div>
      { <MembersDashboard
        societyID={params.societyID}
        societyName={location.state?.societyName}
        />}
        
      { <Events
        societyID={params.societyID}
        />}
    </div>
    </div>
  );
}

export default SocietyDashboard;
