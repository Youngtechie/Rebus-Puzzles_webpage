import '../assests/styles/header.css'
import Btnfunctions from "./btn_functions"


export default function Header(){
  return(
    <header>
      <section className="Name">ReBuS</section>
      <section className='icons'>
        <img src="/images/hint.png" className='hint' onClick={Btnfunctions}/>
        <img src="/images/checkAnswer.png" className='markbtn' onClick={Btnfunctions}/>
      </section>
    </header>
  )
}