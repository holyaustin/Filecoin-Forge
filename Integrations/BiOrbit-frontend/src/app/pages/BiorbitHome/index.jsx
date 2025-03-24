import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { firebaseApi } from '../../../services/firebaseApi'
import { setLoading } from '../../../store/actions/uiActions'
import './BiorbitHome.scss'
import { ProtectedAreaCard } from './ProtectedAreaCard'
import { ProtectedAreaForm } from './ProtectedAreaForm'

export function BioOrbitHome() {
	const dispatch = useDispatch()
	const user = useSelector(state => state.auth)
	const contracts = useSelector(store => store.contracts)
	const [protectedAreas, setProtectedAreas] = useState([])
	const [sincronized, setSincronized] = useState(false)
	const [loading, setLoading] = useState(true)
	const { getAllItems, createItem } = firebaseApi()

	const onError = error => {
		console.log('❌ error: ', error)
		window.alert('There war an error, look the console')
		setLoading(false)
	}

	useEffect(() => {
		const fetch = async () => {
			setProtectedAreas(await getAllItems())
			setLoading(false)
			setSincronized(true)
		}

		fetch()
	}, [sincronized])

	return (
		<>
			<section className='py-5 text-center container'>
				<div className='home-banner row py-lg-5'>
					<div className=' col-lg-6 col-md-8 mx-auto'>
						<h1 className='fw-light'>Eyes on the forest</h1>
						<p className='lead' style={{ color: '#222222' }}>
							SMonitor the forest areas you want, we help you combat
							deforestation in green areas, together we will protect the planet
							through data of scientific value; Once you select the desired
							area, return in 24 hours and you will have available the NFT's
							resulting from the assigned monitoring.
						</p>
						<div className='home-buttons'>
							<a
								href='https://geojson.io/#map=2/0/20'
								target='_blank'
								className='btn btn-primary my-2'
								rel='noreferrer'
							>
								Get coordinates
							</a>
							<ProtectedAreaForm
								user={user}
								contracts={contracts}
								dispatch={dispatch}
								onError={onError}
								createItem={createItem}
							></ProtectedAreaForm>
						</div>
					</div>
				</div>
			</section>
			<div className='album py-5 bg-light'>
				<div className='container  '>
					<div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
						{loading ? (
							<Spinner />
						) : protectedAreas.length === 0 ? (
							'There are not protected areas monitored 😢😢'
						) : (
							protectedAreas.map((protectedArea, index) => (
								<ProtectedAreaCard
									key={index}
									protectedArea={protectedArea}
									user={user}
									contracts={contracts}
									dispatch={dispatch}
									onError={onError}
									createItem={createItem}
								/>
							))
						)}
					</div>
				</div>
			</div>
		</>
	)
}
