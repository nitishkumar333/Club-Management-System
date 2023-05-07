import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../rkgitLogo.jpg'
import styles from './Homepage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

function Homepage() {

    const [societies, setSocieties] = useState([]);
    const [inputText, setInputText] = useState('');
    const [searchList, setSearchList] = useState();
    const navigate = useNavigate();
    const listClickHandler = (society) => {
        console.log("clicked");
        navigate(`${society.id}`,{state:{ name: society.societyName, id: society.id }});
        // <Link to={`${society.id}`} state={{ name: society.societyName, id: society.id }}></Link>
    }

    useEffect(async () => {
        console.log("useEffect emptyDependency");
        let result = [];
        const dbRef = collection(db, "societies");
        const docsData = await getDocs(dbRef);
        const filteredSocieties = await docsData.docs.map((doc) => ({
            societyName: doc.data().societyName.toUpperCase(),
            id: doc.id
        }));
        setSearchList(getSearchList(filteredSocieties));
        setSocieties(filteredSocieties);
    }, [])

    function getSearchList(resultArr){
        const content = resultArr.map((society) => {
            return <li key={society.id} onClick={()=>listClickHandler(society)}>
                <Link>{society.societyName}</Link>
            </li>
        })
        const unorderedList = <ul>{content}</ul>
        return unorderedList;
    }

    const inputHandler = (e) => {
        setInputText(e.target.value);
    }
   
    useEffect(() => {
        console.log("useEffect");
        let result = [];
        if (inputText.length) {
            result = societies.filter((society) => {
                const name = society.societyName.toUpperCase();
                const id = society.id;
                return name.toLowerCase().includes(inputText.toLowerCase());
            });
            console.log(result);
        }
        setSearchList(getSearchList(result));
    }, [inputText])

    return (
        <div className={`container ${styles.homepage}`}>
            <div className={styles.imageContainer}>
                <img src={logo} alt="" />
            </div>
            <div>
                <label>Clubs in Raj Kumar Goel Institue Of Technology</label>
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