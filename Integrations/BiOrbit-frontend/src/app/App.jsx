import { Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import { BioOrbitHome } from './pages/BiorbitHome'
import { BiorbitProtectedArea } from './pages/BiorbitProtectedArea'
import { Footer } from './shared/Footer'
import { Menu } from './shared/Menu'

function App() {
	return (
		<>
			<Menu />
			<main>
				<Routes>
					<Route path='/' element={<BioOrbitHome />} />
					<Route path='/:slug' element={<BiorbitProtectedArea />} />
					<Route path='*' element={<Navigate replace to='/' />} />
				</Routes>
			</main>
			<Footer />
		</>
	)
}

export default App
