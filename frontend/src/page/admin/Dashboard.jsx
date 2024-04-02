
import Header from '../../components/admin/Header'
import Asidebar from '../../components/admin/Asidebar'
import Dashome from '../../components/admin/Dashome'


function Dashboard() {

  return (
    <div className='grid-container'>
      <Header />
      <Asidebar />
      <Dashome />
    </div>
  )
}

export default Dashboard