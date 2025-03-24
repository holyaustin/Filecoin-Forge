import React from 'react'
import styles from '../../styles/Dashboard.module.css'
import Navbar from '../Navbar/Navbar'

const DashboardLayout = ({children}) => {
  return (
    <div className={styles.app}>
        <Navbar />
        {children}
    </div>
  )
}

export default DashboardLayout