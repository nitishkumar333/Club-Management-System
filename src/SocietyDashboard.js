import { useEffect, useState } from 'react';
import { db } from './config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Dashboard from './Page/Dashboard/MembersDashboard';
import Events from './Page/Dashboard/Events';
import Homepage from './Page/Dashboard/homepage/Homepage';

function SocietyDashboard() {
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

  return (
    <div>
      <Dashboard societyID="rTCiwEE1hnDMwnFy78p1"/>
      <Events societyID="rTCiwEE1hnDMwnFy78p1"/>
    </div>
  );
}

export default SocietyDashboard;
