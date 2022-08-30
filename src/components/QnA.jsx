import '../assests/styles/QnA.css'
import '../assests/styles/rebusSection.css'
import '../assests/styles/rQnAnH.css'
import Btnfunctions from './btn_functions'
import { useState } from "react"
import rebuses from '../Rebuses'

export default function QnA() {
  var  [counter, setCounter] = useState(1)
  const [page, setPage] = useState(0)
  
  var pages = page

 let rebus = rebuses[pages].pattern
 let rebusAnswer = rebuses[pages].answer
 let rebusHint = rebuses[pages].hint

  const handlerprev = (x) => {
    x.preventDefault()
    if(counter > 1){
      setCounter(prev => prev - 1)
      setPage(prev => prev - 1)
    }
 }

  const handlernxt = (x) => {
    x.preventDefault()
    if(counter < rebuses.length){
      setCounter(prev => prev + 1)
      setPage(prev => prev + 1)
    }
  }
function rebusInput() {
  return {__html: rebus };
}

  return (
    <section className='QnA'>
      <section className="pages">
        Rebus {counter} of {rebuses.length}
      </section>
      <section className="rebusSection">
        <img src="/images/arrow.png" className='prev' onClick={handlerprev}/>
        <section className="RQnAnH_container">
          <section className="RQnAnH">
            <section className="rebusQues" dangerouslySetInnerHTML={rebusInput()}></section>
            <input type="text" className="rebusAns" value={rebusAnswer} onChange={QnA}/>
            <section className="btns">
              <button type="button" className='btn' id='btnsumbit' onClick={Btnfunctions}> Submit </button>
              <button type="button" className='btn' id='btnreset' onClick={Btnfunctions}> Reset </button>
            </section>
            <section className='hint'><p>{rebusHint}</p></section>
          </section>
        </section>
        <img src='/images/arrow.png' className='nxt' onClick={handlernxt}/>
      </section>
    </section>
  )
}