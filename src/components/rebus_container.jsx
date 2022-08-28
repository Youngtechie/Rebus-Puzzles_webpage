import '../assests/styles/rebus_container.css'
import Header from './header.jsx'
import RebusSetup from './rebuses_container.jsx'
import Footer from './footer.jsx'

export default function RebusesContainer(){
  return ( 
    <main className="rebuses_container">
      <Header/>
      <RebusSetup/>
      <Footer/>
    </main>
  )
}