import React from 'react'
import styles from './Headers.module.css'

function Header({ setIsAdding, headingText }) {
    return (
        <header className={styles.headerTextAndButton}>
            <h1 style={{'color':'#26292c'}}>{headingText}</h1>
            <div style={{ marginTop: '6px', marginBottom: '10px' }}>
                <button onClick={() => setIsAdding(true)} className='round-button'>Add Button</button>
            </div>
        </header>
    )
}

export default Header;