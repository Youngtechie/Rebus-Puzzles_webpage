import '../assests/styles/rebuses_container.css'
import PointDesign from './point.jsx'
import QnA from './QnA.jsx'
import Footer from './footer.jsx'

export default function RebusSetup(){
  return(
    <section className='rebusSetup'>
      <PointDesign/>
      <QnA/>
      <Footer/>
    </section>
  )
  
}