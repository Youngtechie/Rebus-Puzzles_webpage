import '../assests/styles/rQnAnH.css'
import rebuses from '../Rebuses.jsx'

export default function RQnAnH(){
  const final = rebuses.map(rebus => {
  return (
    <section className="RQnAnH">
      <section className="rebusQues">
        {rebus.rebus}
      </section>
      <input type="text" className="rebusAns"/>
      <section className="btns">
        <button type="button" className='btn'> Submit </button>
        <button type="button" className='btn'> Reset </button>
      </section>
      <section className='hint'>Ade is sa mdndmn ans mnss kndd kd d,dd kjd, d,d d,j,d ddkd dkdk dkjd dkjd kjdj kjd kd ld,o dm, dld, dk dk</section>
    </section>
  )
  })
  return final;
}