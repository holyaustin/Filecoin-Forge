import React from 'react'
import './Collection.scss'
import { Plot } from './Plot'

export function Collection(props) {
	const { collection } = props
	return (
		<div>
			<Plot collection={collection} />
		</div>
	)
}
