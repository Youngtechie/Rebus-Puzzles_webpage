import '../assests/styles/rebusSection.css'
import RQnAnH from './rQnAnH.jsx'

export default function RebusSection() {
  return (
    <section className="rebusSection">
      <img src="/images/arrow.png" className='prev'/>
      <section class="RQnAnH_container">
        <RQnAnH/>
      </section>
      <img src='/images/arrow.png' className='nxt'/>
    </section>
  )
}