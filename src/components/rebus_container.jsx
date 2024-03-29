import "../assests/styles/rebus_container.css";
import "../assests/styles/header.css";
import "../assests/styles/rebuses_container.css";
import "../assests/styles/point.css";
import "../assests/styles/QnA.css";
import "../assests/styles/rebusSection.css";
import "../assests/styles/rQnAnH.css";
import "../assests/styles/footer.css";
import { useState, useEffect } from "react";
import rebuses from "../Rebuses";

export default function RebusesContainer() {
  // declarations
  const [counter, setCounter] = useState(1);
  const [page, setPage] = useState(0);
  const [pointD, setPointD] = useState(window.localStorage.getItem('Points') || 1000)
  var rebus = rebuses[page].pattern;
  var rebusAnswer = rebuses[page].answer;
  var rebusHint = rebuses[page].hint;
  if (window.localStorage.length === 0) {
    window.localStorage.setItem('Answered', JSON.stringify([]))
    window.localStorage.setItem('Hinted', JSON.stringify([]))
    window.localStorage.setItem('Points', pointD)
  }
 
  useEffect(()=>{
    let done = window.localStorage.getItem('Answered')
    let hint = window.localStorage.getItem('Hinted')
      if (done.includes(page)) {
        document.querySelector(".rebusAns").value = rebusAnswer;
        document.querySelector(".rebusAns").setAttribute('id', 'rebusAnsD')
        document.querySelector(".hint p").style.display = "block";
        document.querySelector(".hint").style.backgroundColor = "#fff";
        document.querySelector('.btns').style.display = 'none'
      }
      else if (hint.includes(page)) {
        document.querySelector(".hint p").style.display = "block";
        document.querySelector(".hint").style.backgroundColor = "#fff";
      }
      else{
        document.querySelector('.btns').style.display = 'flex'
        document.querySelector(".rebusAns").removeAttribute('id')
      }
      
  }, [page])

  // function for the render rebus pattern as innerHTML
  function rebusInput() {
    return { __html: rebus };
  }

  // function for the previous button
  const handlerprev = (x) => {
    x.preventDefault();
    if (counter > 1) {
      setCounter((prev) => prev - 1);
      setPage((prev) => prev - 1);
      document.querySelector(".hint p").style.display = "none";
      document.querySelector(".hint").style.backgroundColor = "inherit";
      document.querySelector(".rebusAns").value = "";
    }
    if (counter == 1) {
      let TutorialPage = document.querySelector(".TutorialPage");
      TutorialPage.style.zIndex = "200";
    }
  };

  // function for the next button
  const handlernxt = (x) => {
    x.preventDefault();
    if (counter < rebuses.length) {
      setCounter((prev) => prev + 1);
      setPage((prev) => prev + 1);
      document.querySelector(".hint p").style.display = "none";
      document.querySelector(".hint").style.backgroundColor = "inherit";
      document.querySelector(".rebusAns").value = "";
    }
    if (counter == rebuses.length) {
      let res = document.querySelector("#result");
      let resP = document.querySelector("#result p");
      let resImg = document.querySelector("#result img");

      resP.innerHTML = "That's all Champ &#128076;";
      resP.style.color = "white";

      setTimeout(() => {
        res.setAttribute("style", "visibility: visible;");
        resImg.remove();
        document
          .querySelector(".result_container")
          .setAttribute("style", "display: flex");
      }, 0);
      setTimeout(() => {
        res.setAttribute("style", "visibility: hidden;");
        res.appendChild(resImg);
        res.appendChild(resP);
        document
          .querySelector(".result_container")
          .setAttribute("style", "display: none");
      }, 4000);
    }
  };

  // function for the hint button
  let hintbtn = (x) => {
    x.preventDefault();
    let point = localStorage.getItem("Points")
    let hintp = document.querySelector(".hint p").style.display;
    if (point > 49 && hintp == "none") {
      point -= 50
      window.localStorage.setItem('Points', point)
      setPointD((p)=> p = point)
      let hints =JSON.parse(localStorage.getItem('Hinted'))
      hints.push(page)
      localStorage.setItem('Hinted', JSON.stringify(hints))
      document.querySelector(".hint p").style.display = "block";
      document.querySelector(".hint").style.backgroundColor = "#fff";
    }
    // else if (point < 49){
    //   alert(`You don't have enough points, ${50-point} points is needed`)
    // }
  };
  //function for the getAnswer button
  let markbtn = (x) => {
    x.preventDefault();
    let point = localStorage.getItem("Points")
    let rebA = document.querySelector(".rebusAns");
    if (point > 249 && rebA.value != rebusAnswer) {
      point -= 250
      setPointD((prev) => prev = point);
      window.localStorage.setItem('Points', point)
      rebA.value = rebusAnswer;
      let Answereds =JSON.parse(localStorage.getItem('Answered'))
      Answereds.push(page)
      localStorage.setItem('Answered', JSON.stringify(Answereds))
      document.querySelector(".hint p").style.display = "block";
      document.querySelector(".hint").style.backgroundColor = "#fff";
      document.querySelector('.btns').style.display = 'none'
      document.querySelector(".rebusAns").setAttribute('id', 'rebusAnsD')
    }else if (pointD < 249){
      alert(`You don't have enough points, ${250-point} points is needed`)
    }
  };

  //function for the submit button
  let Submit = (x) => {
    x.preventDefault();
    let ansV = document.querySelector(".rebusAns").value;
    let rebansL = rebusAnswer.toLowerCase();
    let ansL = ansV.toLowerCase();
    let rebansS = rebansL.trim();
    let ansVS = ansL.toString().trim();

    let result = document.querySelector("#result");
    let resultP = document.querySelector("#result p");
    let resultImg = document.querySelector("#result img");

    if (ansVS == rebansS) {
      resultP.innerHTML =
        "You are great Champ!! &#128525; <br/><br/> Continue &#9889; ";
      resultImg.setAttribute("src", "/images/correct.png");
      
      let point = Number(localStorage.getItem("Points"))
      point = point + 200
      setPointD((prev) => prev = point);
      window.localStorage.setItem('Points', point)

      let Answereds =JSON.parse(localStorage.getItem('Answered'))
      Answereds.push(page)
      localStorage.setItem('Answered', JSON.stringify(Answereds))

      if (counter < rebuses.length) {
        setCounter((prev) => prev + 1);
        setPage((prev) => prev + 1);
        document.querySelector(".hint p").style.display = "none";
        document.querySelector(".hint").style.backgroundColor = "inherit";
        document.querySelector(".rebusAns").value = "";
      }
      if (counter == rebuses.length) {
        resultP.innerHTML =
          "You are great Champ!! &#128525; <br/><br/> Finished!! &#11088;";
      }
    } else {
      resultP.innerHTML = "You can try again Champ &#128522;";
      resultImg.setAttribute("src", "/images/incorrect.png");
    }

    setTimeout(() => {
      result.setAttribute("style", "visibility: visible;");
      document
        .querySelector(".result_container")
        .setAttribute("style", "display: flex");
    }, 0);
    setTimeout(() => {
      result.setAttribute("style", "visibility: hidden;");
      document
        .querySelector(".result_container")
        .setAttribute("style", "display: none");
    }, 2000);
  };

  // Page rendering
  return (
    <main className="rebuses_container">
      <header>
        <section className="Name">ReBuS</section>
        <section className="icons">
          <img src="/images/hint.png" className="hintbtn" onClick={hintbtn} />
          <img
            src="/images/checkAnswer.png"
            className="markbtn"
            onClick={markbtn}
          />
        </section>
      </header>

      <section className="rebusSetup">
        <section className="point">Your point is : {pointD}</section>

        <section className="QnA">
          <section className="pages">
            Rebus {counter} of {rebuses.length}
          </section>

          <section className="rebusSection">
            <img
              src="/images/arrow.png"
              className="prev"
              onClick={handlerprev}
            />

            <section className="RQnAnH_container">
              <section className="RQnAnH">
                <section
                  className="rebusQues"
                  dangerouslySetInnerHTML={rebusInput()}
                ></section>
                <input type="text" className="rebusAns" />

                <section className="btns">
                  <button
                    type="button"
                    className={"btn"}
                    id="btnsumbit"
                    onClick={Submit}
                  >
                    {" "}
                    Submit{" "}
                  </button>
                  </section>
                <section className="hint">
                  <p style={{ display: "none" }}>{rebusHint}</p>
                </section>
              </section>
            </section>

            <img src="/images/arrow.png" className="nxt" onClick={handlernxt} />
          </section>
        </section>
      </section>

      <footer className="lastPart">
        <marquee>Olaegbe Abdul-Rahmon &copy; 2022</marquee>
      </footer>
    </main>
  );
}
