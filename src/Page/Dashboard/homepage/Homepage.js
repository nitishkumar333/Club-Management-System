import { Link, useNavigate, useLoaderData } from 'react-router-dom'
import logo from '../../../rkgitLogo.jpg'
import styles from './Homepage.module.css'
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { auth, db } from '../../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { AuthContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import AddClub from './AddClub';

function Homepage() {
    const {currentUser} = useContext(AuthContext);
    
    const [societies, setSocieties] = useState([]);
    // const societies = useLoaderData();
    const [inputText, setInputText] = useState('');
    const [searchList, setSearchList] = useState();
    const [clubIsAdding, setClubIsAdding] = useState(false);

    async function loader(){
        console.log("useEffect emptyDependency");
        let result = [];
        const dbRef = collection(db, "societies");
        const docsData = await getDocs(dbRef);
        const filteredSocieties = await docsData.docs.map((doc) => ({
            societyName: doc.data().societyName.toUpperCase(),
            id: doc.id,
            logoURL: doc.data().logoURL
        }));
        setSearchList(getSearchList(filteredSocieties));
        setSocieties(filteredSocieties);
    }
    useEffect(()=>{
        loader();
    },[]);
    function getSearchList(resultArr) {
        const content = resultArr.map((society) => {
            return <Link key={society.id} to={`${society.id}`} state={{ name: society.societyName, id: society.id, logoURL: society.logoURL }}>
                <li>{society.societyName}</li>
            </Link>
        })
        const unorderedList = <ul>{content}</ul>
        return unorderedList;
    }

    const inputHandler = (e) => {
        setInputText(e.target.value);
    }
    const signOutHandler=()=>{
        signOut(auth).then(()=>{console.log("success logout")}).catch(err=>console.log(err.message))
    }

    useEffect(() => {
        console.log("useEffect");
        let result = [];
        if(inputText.length || inputText===''){
            result = societies.filter((society) => {
                const name = society.societyName;
                const id = society.id;
                return name.toLowerCase().includes(inputText.toLowerCase());
            });
        }
        setSearchList(getSearchList(result));
    }, [inputText])

    return (
        <>
            <div className={`container ${styles.homepage}`}>
            <div className={styles.homepageContainer}>
            <div className={styles.imageContainer}>
                <img src={logo} alt="" />
            </div>
            <div>
                <button onClick={()=>setClubIsAdding(true)} style={{'marginRight':'10px','backgroundColor':'#13ae4b', 'color':'white'}}>+ Add Club</button>
                <button onClick={signOutHandler} style={{'backgroundColor':'#e01d1d', 'color':'white'}}>Sign Out <FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
            </div>
            <div>
                <label>Clubs in Raj Kumar Goel Institute Of Technology</label>
                <div className={styles['search-bar']}>
                    <input type="text" id='input-box' placeholder='Search Club' autoComplete='off' onChange={inputHandler} />
                    {/* <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button> */}
                </div>
                <div className={styles["result-box"]}>
                    {searchList}
                </div>
            </div>
            </div>
        </div>
        <div className='container'>{clubIsAdding && <AddClub setClubIsAdding={setClubIsAdding} loader={loader}/>}</div>
        </>
    )
}

export default Homepage;

// export async function loader(){
//         console.log("useEffect emptyDependency");
//         let result = [];
//         const dbRef = collection(db, "societies");
//         const docsData = await getDocs(dbRef);
//         const filteredSocieties = await docsData.docs.map((doc) => ({
//             societyName: doc.data().societyName.toUpperCase(),
//             id: doc.id
//         }));
//         return filteredSocieties;
//         // setSearchList(getSearchList(filteredSocieties));
//         // setSocieties(filteredSocieties);
//     }