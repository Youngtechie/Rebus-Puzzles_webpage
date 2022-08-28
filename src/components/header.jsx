import '../assests/styles/header.css'

export default function Header(){
  return(
    <header>
      <section className="Name">ReBuS</section>
      <section className='icons'>
        <img src="/images/hint.png"/>
        <img src="/images/checkAnswer.png"/>
      </section>
    </header>
  )
}