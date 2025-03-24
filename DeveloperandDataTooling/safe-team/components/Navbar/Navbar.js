import React from 'react'
import styles from '../../styles/Navbar.module.css'
import { EthHashInfo, Identicon, Tab } from '../GnosisReact'
import NavTab from './NavTab'

const Navbar = () => {

    return (
        <div className={styles.container}>
            <Identicon address="0x4FD3d5db6691c94DBe26302A1b49dE25410bCCb5" className={styles.avatar}/>
            <EthHashInfo
                shortName="matic"
                hash={"0x4FD3d5db6691c94DBe26302A1b49dE25410bCCb5"}
                showCopyBtn
                explorerUrl={() => ({  url: 'https://explorer-mumbai.maticvigil.com/address/0x4FD3d5db6691c94DBe26302A1b49dE25410bCCb5', name: 'Matic' })}
                shortenHash={4}
                className={styles.ethHashInfo}
            />
            <NavTab label={'Manage'} active={location.pathname == '/dashboard'} href='/dashboard' />
            <NavTab label={'Wallet'} active={location.pathname == '/dashboard/wallet'} href='/dashboard/wallet' />
            <NavTab label={'Submit'} active={location.pathname == '/dashboard/submit'} href='/dashboard/submit' />
        </div>
    )
}

export default Navbar