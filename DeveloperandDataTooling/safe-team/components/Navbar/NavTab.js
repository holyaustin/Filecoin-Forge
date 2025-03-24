import Link from 'next/link'
import React from 'react'
import styles from '../../styles/Navbar.module.css'

const NavTab = ({ label, active, href }) => {
    return (
        <Link href={href} className={active ? `${styles.tab} ${styles.active}` : styles.tab}>
            {label}
        </Link>
    )
}

export default NavTab