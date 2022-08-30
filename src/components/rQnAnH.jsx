import '../assests/styles/rQnAnH.css'
import Btnfunctions from "./btn_functions"

export default function RQnAnH(){
  return (
    <section className="RQnAnH">
      <section className="rebusQues">
      </section>
      <input type="text" className="rebusAns"/>
      <section className="btns">
        <button type="button" className='btn' id='btnsumbit' onClick={Btnfunctions}> Submit </button>
        <button type="button" className='btn' id='btnreset' onClick={Btnfunctions}> Reset </button>
      </section>
      <section className='hint'></section>
    </section>
  )
}