
function Btnfunctions(){

let hintbtn = document.querySelector(".hint");
hintbtn.addEventListener("click", (x) => {
    x.preventDefault()
    
})

let markbtn = document.querySelector(".markbtn");
markbtn.addEventListener("click", (x) => {
    x.preventDefault()
    console.log(`&#123534`)
})

let Submit = document.querySelector("#btnsumbit");
Submit.addEventListener("click", (x) => {
    x.preventDefault()
    console.log(`Hmmmm`)
})

let Reset = document.querySelector("#btnreset");
Reset.addEventListener("click", (x) => {
    x.preventDefault()
    console.log(`Wowoowow`)
})
}

export {Btnfunctions as default}