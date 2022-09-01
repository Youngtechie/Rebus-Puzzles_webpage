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
  var rebus = rebuses[page].pattern
  var rebusAnswer = rebuses[page].answer
  var rebusHint = rebuses[page].hint

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
      document.querySelector(".hint").style.backgroundColor = 'inherit'
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
      document.querySelector(".hint").style.backgroundColor = 'inherit'
      document.querySelector('.rebusAns').value = ""
    }
    if(counter == rebuses.length){
      let res = document.querySelector("#result")
      let resP = document.querySelector("#result p")
      let resImg = document.querySelector("#result img")

      
      resP.innerHTML = "That's all Champ &#128076;"
      resP.style.color = "white"

      setTimeout(() => {
        res.setAttribute('style', 'visibility: visible;')
        resImg.remove()
        document.querySelector('.result_container').setAttribute("style", "display: flex")
      }, 0);
      setTimeout(() => {
        res.setAttribute('style', 'visibility: hidden;')
        res.appendChild(resImg)
        res.appendChild(resP)
        document.querySelector('.result_container').setAttribute("style", "display: none")
      }, 4000);

    }
  }
    
  // function for the hint button
  let hintbtn = (x) => {
    x.preventDefault()
    let hintp = document.querySelector('.hint p').style.display
    if(hintp == 'none'){
      setPoint(prev => prev - 50)
      document.querySelector('.hint p').style.display = 'block'
      document.querySelector(".hint").style.backgroundColor = '#fff'
    }
  }
  //function for the getAnswer button
  let markbtn = (x) => {
    x.preventDefault()
    let hintp = document.querySelector('.hint p').style.display
    let rebA =  document.querySelector('.rebusAns')
    if(point > 0 && rebA.value != rebusAnswer ){
    setPoint(prev => prev - 200)
    rebA.value = rebusAnswer
    document.querySelector('.hint p').style.display = 'block'
    document.querySelector(".hint").style.backgroundColor = '#fff'
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
    let rebansS = rebansL.trim()
    let ansVS = ansL.toString().trim()
    
    let result = document.querySelector("#result")
    let resultP = document.querySelector("#result p")
    let resultImg = document.querySelector("#result img")

    if(ansVS == rebansS){
      resultP.innerHTML = "You are great Champ!! &#128525; <br/><br/> Continue &#9889; "
      resultImg.setAttribute("src", "/images/correct.png")
      setPoint(prev => prev + 200)
      if(counter < rebuses.length){
      setCounter(prev => prev + 1)
      setPage(prev => prev + 1)
      document.querySelector('.hint p').style.display = 'none'
      document.querySelector(".hint").style.backgroundColor = 'inherit'
      document.querySelector('.rebusAns').value = ""
      }
      if(counter == rebuses.length){
        resultP.innerHTML = "You are great Champ!! &#128525; <br/><br/> Finished!! &#11088;"
      }
    }
    else{
      resultP.innerHTML = "You can try again Champ &#128522;"
      resultImg.setAttribute("src", "/images/incorrect.png")
    }

    setTimeout(() => {
      result.setAttribute('style', 'visibility: visible;')
      document.querySelector('.result_container').setAttribute("style", "display: flex")
    }, 0);
    setTimeout(() => {
      result.setAttribute('style', 'visibility: hidden;')
      document.querySelector('.result_container').setAttribute("style", "display: none")
    }, 4000);
  }

  //function for reset button
  let Reset = (x) => {
    x.preventDefault()
    document.querySelector('.rebusAns').value = ''
    document.querySelector('.hint p').style.display = 'none'
    document.querySelector(".hint").style.backgroundColor = 'inherit'
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
                  <button type="button" className={ 'btn'} id='btnsumbit' onClick={Submit}> Submit </button>
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