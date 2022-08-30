import '../assests/styles/QnA.css'
import '../assests/styles/rebusSection.css'
import { useState } from "react"
import RQnAnH from './rQnAnH.jsx'
import rebuses from '../Rebuses'

export default function QnA() {
  const  [counter, setCounter] = useState(1)
  
  const handlerprev = (x) => {
    x.preventDefault()
    setCounter(prev => prev - 1)
  }

  const handlernxt = (x) => {
    x.preventDefault()
    if(counter < rebuses.length){
      setCounter(prev => prev + 1)
    }
    
  }
  return (
    <section className='QnA'>
      <section className="pages">
        Rebus {counter} of {rebuses.length}
      </section>
      <section className="rebusSection">
        <img src="/images/arrow.png" className='prev' onClick={handlerprev}/>
        <section className="RQnAnH_container">
          <RQnAnH/>
        </section>
        <img src='/images/arrow.png' className='nxt' onClick={handlernxt}/>
      </section>
    </section>
  )
}