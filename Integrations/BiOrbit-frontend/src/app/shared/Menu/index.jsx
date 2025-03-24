import React from 'react'
import './Menu.scss'

import brand from '../../../assets/images/brand-light.svg'
import { Link } from 'react-router-dom'
import { Wallet } from './Wallet'

export function Menu() {
	return (
		<header>
			<div className='collapse bg-dark' id='navbarHeader'>
				<div className='container'></div>
			</div>
			<div className='navbar navbar-dark bg-dark shadow-sm'>
				<div className='container'>
					<Link to='/' className='navbar-brand'>
						<strong>BIOrbit | DeSci</strong>
						<figure>
							<img src={brand} alt='brand' />
						</figure>
					</Link>
					<Wallet />
				</div>
			</div>
		</header>
	)
}
