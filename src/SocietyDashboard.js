import { useEffect, useState } from 'react';
import { db } from './config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import MembersDashboard from './Page/Dashboard/MembersDashboard';
import Events from './Page/Dashboard/Events';
import Homepage from './Page/Dashboard/homepage/Homepage';
import { useParams } from 'react-router-dom';

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
  const [memIsEditing, setMemIsEditing] = useState(false);
  const [eventIsEditing, setEventIsEditing] = useState(false);
  const [memIsAdding, setMemIsAdding] = useState(false);
  const [eventIsAdding, setEventIsAdding] = useState(false);

  const {name, id} = useParams();
  // const { name, id } = location.state;
  
  return (
    <div>
      { (!eventIsAdding) && <MembersDashboard
        societyID={params.societyID}
        societyName={name}
        isEditing={memIsEditing}
        setIsEditing={setMemIsEditing}
        setMemIsAdding={setMemIsAdding}
        setMemIsEditing={setMemIsEditing} />}
        
      { !memIsEditing && !memIsAdding && <Events
        societyID={params.societyID}
        isEditing={eventIsEditing}
        setIsEditing={setEventIsEditing}
        setEventIsAdding={setEventIsAdding}
        setEventIsEditing={setEventIsEditing} />}
    </div>
  );
}

export default SocietyDashboard;
