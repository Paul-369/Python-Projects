// target position
let posqn=0;
const lander=document.querySelector(".lander").children
const obo_alrt=document.querySelector("#warn-alerts")
//qtn navigation.
class QtnNav{
  // move nxt by conditions.
  static nextQtn(){
    let fc=0;
    [...lander[posqn].firstElementChild.nextElementSibling.children].forEach(element => {
      if(element.firstElementChild.checked == false){
        fc=fc+1
      }
    });
     if(fc!=4){
        if(posqn==lander.length-1){
          posqn=0
        }
        if(posqn<lander.length-1){
          lander[posqn].style.display="none"
          lander[posqn+1].style.display="block"
          posqn=posqn+1
        }
      }else{
          obo_alrt.innerHTML="U can't Move Until Answer the Question"
          obo_alrt.classList.add("obo-alert")
          const modal_bg1=document.querySelector("#modal_bg1")
          modal_bg1.className="modal_bg1"
          setTimeout(()=>{
            obo_alrt.innerHTML=""
            obo_alrt.classList.remove("obo-alert")
            modal_bg1.className=""
          },3000)
        }
      }
  static prevQtn(){
    if(posqn>0){
      lander[posqn].style.display="none"
      lander[posqn-1].style.display="block"
      posqn=posqn-1
    }
  }
}

const get_cert=document.querySelector(".get_cert")
//data list for timer 
const m=document.querySelector("#m")
const s=document.querySelector("#s")
const opt=document.createElement("select")
for (let count=0 ; count < 60; count++) {
  const lists=document.createElement("option")
  if(count<10){
    lists.value="0"+count
    lists.innerHTML="0"+count
    s.append(lists)
  }else{
    lists.value=count
    lists.innerHTML=count
    s.append(lists)
  }
 }
//hide get certficate btn and move back qtns to first.
document.addEventListener("click",(e)=>{
  e.target.classList.forEach((element)=>{
    if(element=="replay"){
      posqn=0
      get_cert.style.display="none";
      window.scrollTo(0,0);
      [...lander].forEach(element => {
        if(posqn>0){
          lander[posqn].style.display="none"
          lander[posqn-1].style.display="block"
          posqn=posqn-1
        }
      })
    }
  })
})
//once submit event happen- move back qtns to first.
document.addEventListener("click",(e)=>{
  e.target.classList.forEach((item)=>{
    if(item=="submit"){
      [...lander].forEach(element => {
        if(posqn>0){
          lander[posqn].style.display="none"
          lander[posqn-1].style.display="block"
          posqn=posqn-1
        }
      })
    }
  })
})