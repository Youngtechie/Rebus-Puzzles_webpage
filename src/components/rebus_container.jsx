import '../assests/styles/rebus_container.css'
import '../assests/styles/header.css'
import '../assests/styles/rebuses_container.css'
import '../assests/styles/point.css'
import '../assests/styles/QnA.css'
import '../assests/styles/rebusSection.css'
import '../assests/styles/rQnAnH.css'
import '../assests/styles/footer.css'
import { useState } from "react"
import rebuses from '../Rebuses'


export default function RebusesContainer(){
// declarations
  const  [counter, setCounter] = useState(1)
  const [page, setPage] = useState(0)
  const [point, setPoint] = useState(1000)
  let rebus = rebuses[page].pattern
  let rebusAnswer = rebuses[page].answer
  let rebusHint = rebuses[page].hint

  // function for the render rebus pattern as innerHTML
  function rebusInput() {
  return {__html: rebus };
  }
  
  // function for the previous button
  const handlerprev = (x) => {
    x.preventDefault()
    if(counter > 1){
      setCounter(prev => prev - 1)
      setPage(prev => prev - 1)
      document.querySelector('.hint p').style.display = 'none'
      document.querySelector('.rebusAns').value = ""
    }
  }

  // function for the next button
  const handlernxt = (x) => {
    x.preventDefault()
    if(counter < rebuses.length){
      setCounter(prev => prev + 1)
      setPage(prev => prev + 1)
      document.querySelector('.hint p').style.display = 'none'
      document.querySelector('.rebusAns').value = ""
    }
  }
    
  // function for the hint button
  let hintbtn = (x) => {
    x.preventDefault()
    let hintp = document.querySelector('.hint p').style.display
    if(hintp == 'none'){
      document.querySelector('.hint p').style.display = 'block'
    }
  }
  //function for the getAnswer button
  let markbtn = (x) => {
    x.preventDefault()
    let hintp = document.querySelector('.hint p').style.display
    if(point > 0 && hintp == 'none' ){
    setPoint(prev => prev - 200)
    document.querySelector('.rebusAns').value = rebusAnswer
    document.querySelector('.hint p').style.display = 'block'
    }
  }

  function whitespaces(value){
    return value != ' '
  }

  //function for the submit button
  let Submit = (x) => {
    x.preventDefault()
    let ansV = document.querySelector('.rebusAns').value
    let rebansL = rebusAnswer.toLowerCase()
    let ansL = ansV.toLowerCase()
    let rebansS = rebansL.split('')
    let ansVS = ansL.split('')
    let rebansF = rebansS.filter(whitespaces)
    let ansF = ansVS.filter(whitespaces)
    let ansJ = ansF.join("")
    let rebansJ = rebansF.join("")
    if(ansJ == rebansJ){
      alert("You are good champ")
    }
    else{
      alert("Try again champ")

    }
  }

  //function for reset button
  let Reset = (x) => {
    x.preventDefault()
    document.querySelector('.rebusAns').value = ''
  }
  
  // Page rendering
  return ( 
    <main className="rebuses_container">
      <header>
        <section className="Name">ReBuS</section>
        <section className='icons'>
          <img src="/images/hint.png" className='hintbtn' onClick={hintbtn}/>
          <img src="/images/checkAnswer.png" className='markbtn' onClick={markbtn}/>
        </section>
      </header>

      <section className='rebusSetup'>
        <section className="point">
          Your point is : {point}
        </section>
      
        <section className='QnA'>
          <section className="pages">
            Rebus {counter} of {rebuses.length}
          </section>
        
          <section className="rebusSection">
            <img src="/images/arrow.png" className='prev' onClick={handlerprev}/>
            
            <section className="RQnAnH_container">
              <section className="RQnAnH">
                <section className="rebusQues" dangerouslySetInnerHTML={rebusInput()}></section>
                <input type="text" className="rebusAns"/>
              
                <section className="btns">
                  <button type="button" className='btn' id='btnsumbit' onClick={Submit}> Submit </button>
                  <button type="button" className='btn' id='btnreset' onClick={Reset}> Reset </button>
                </section>
              
                <section className='hint'><p style={{display: "none"}}>{rebusHint}</p></section>
              </section>
            </section>
          
            <img src='/images/arrow.png' className='nxt' onClick={handlernxt}/>
          </section>
        </section>
      </section>
      
      <footer className="lastPart">
        <marquee>Olaegbe Abdul-Rahmon &copy; 2022</marquee>
      </footer>
    </main>
  )
}