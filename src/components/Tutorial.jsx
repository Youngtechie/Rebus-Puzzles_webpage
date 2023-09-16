import '../assests/styles/Tutorial.css'

let skip = () => {
    let TutorialPage = document.querySelector('.TutorialPage');
    TutorialPage.style.zIndex = "-200"
}
export default function TutorialPage(){
    return(
        <section className="TutorialPage">
            <section className='eachT'>
                <img src="/images/hint.png" className='Thintbtn'/> 
                <span><strong>Hint button:</strong> This button will deduct 50 points 
                    from your points to render onto the screen the hint 
                    for the current rebus.</span>
            </section>

            <section className='eachT'>
                <img src="/images/checkAnswer.png" className='Tmarkbtn'/>
                <span><strong>Get answer button:</strong> This button will deduct 250 points 
                    from your points to render onto the screen the correct answer 
                    for the current rebus.</span>
            </section>

            <section className='eachT'>
                <img src="/images/arrow.png" className='Tprev'/>
                <span><strong>Previous button:</strong> This button take you -1 rebus to the current rebus.</span>
            </section>

            <section className='eachT'>
                <img src='/images/arrow.png' className='Tnxt'/>
                <span><strong>Next button:</strong> This button take you +1 rebus to the current rebus.</span>
            </section>
            
            <section className='eachT'>
                <button type="button" className={ 'Tbtn'} id='Tbtnsumbit'> Submit </button>
                <span><strong>Submit button:</strong> This button will submit the answer you input, if answer is correct, 200
                    will be added to your points.</span>
            </section>

            <button className="Tbtn" id='Tbtnskip' onClick={skip}>Skip</button>
        </section>
    )
}
