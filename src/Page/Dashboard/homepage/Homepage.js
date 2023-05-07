import { createBrowserRouter } from 'react-router-dom'
import logo from '../../../rkgitLogo.jpg'
import styles from './Homepage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import SocietyDashboard from '../../../SocietyDashboard'

function Homepage() {

    const [societies, setSocieties] = useState([]);
    useEffect(async () => {
        console.log("useEffect emptyDependency");
        let result = [];
        const dbRef = collection(db, "societies");
        const docsData = await getDocs(dbRef);
        const filteredSocieties = await docsData.docs.map((doc) => ({
            societyName: doc.data().societyName,
            id: doc.id
        }));
        console.log(filteredSocieties);
        setSocieties(filteredSocieties);
    }, [])

    // const router = createBrowserRouter([
    //     {
    //         path: '/', element: <Homepage />,
    //         children: [
    //             {path: ':societyID', element: <SocietyDashboard/>}
    //         ]
    //     },
    // ])


    const [inputText, setInputText] = useState('');
    const [searchList, setSearchList] = useState();

    const inputHandler = (e) => {
        setInputText(e.target.value);
    }
    const listClickHandler = (societyName, id) => {
        console.log(societyName, id);
    }

    useEffect(() => {
        console.log("useEffect");
        let result = [];
        if (inputText.length) {
            result = societies.filter((society) => {
                const name = society.societyName;
                const id = society.id;
                return name.toLowerCase().includes(inputText.toLowerCase());
            });
            console.log(result);
        }
        const content = result.map((society) => {
            return <li onClick={() => listClickHandler(society.societyName, society.id)}>
                {society.societyName}
            </li>
        })
        const unorderedList = <ul>{content}</ul>
        setSearchList(unorderedList);
    }, [inputText])

    return (
        <div className={`container ${styles.homepage}`}>
            <div className={styles.imageContainer}>
                <img src={logo} alt="" />
            </div>
            <div>
                <label htmlFor="">Clubs in Raj Kumar Goel Institue Of Technology</label>
                <div className={styles['search-bar']}>
                    <input type="text" id='input-box' placeholder='Search Club' autoComplete='off' onChange={inputHandler} />
                    <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </div>
                <div className={styles["result-box"]}>
                    {searchList}
                </div>
            </div>

        </div>
    )
}

export default Homepage;