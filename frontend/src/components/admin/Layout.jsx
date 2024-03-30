import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout() {
	return (
		<div className="bg-neutral-100 min-h-screen flex flex-col lg:flex-row">
			<Sidebar />
			<div className="flex flex-col flex-1 min-h-0">
				<Header />
				<div className="flex-1 p-4 overflow-auto">
					<Outlet />
				</div>
			</div>
		</div>
	)
}
