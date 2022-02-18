import {qtn} from "./qobj.js";
import { AnsCrctn,crct_ans,clearMark,disableSelection} from "./ans_crctn.js";
import { log_t ,clearTimeout, pauseTime} from "./timer.js";
import { GetCertificate } from "./certificate.js";
import {lander,scback,qs_type,oneByoneReply} from "./quiz.js";
// count clicks for nxt btn.
let click_points=0
// alert
const alert_ao=document.querySelector("#warn-alerts")
export class Submit{
    static showCorrect(dummie){
      //qa
      let clk_count=0
      const sub=document.querySelector(".submit")
      sub.addEventListener("click",sumt)
      function sumt(){
        let state=0
        // not answered
        let not_answered=[]
      const qtn_ans_arr=document.querySelectorAll(".qa")
      // check answers for right
      qtn_ans_arr.forEach((items,target)=>{
        [...qtn_ans_arr[target].firstElementChild.nextElementSibling.children].forEach((items)=>{
          if(items.firstElementChild.checked==true){
            clk_count+=1
          }
        })  
      })
      // check ans for right.
      qtn_ans_arr.forEach((items,target)=>{
       [...items.firstElementChild.nextElementSibling.children].forEach((items,pos)=>{
        if(items.firstElementChild.checked==false){
          state+=1
        }
       })
       if(state==4){
         not_answered.push(target+1)
       }
       state=0
      })
      if(clk_count==qtn.length){
        // show correct ans
        AnsCrctn.correctAnswer()
        // qtn quantity
        let total=qtn.length
        let percentage=((crct_ans/total)*100).toFixed(2);
        qtn.forEach(showAns)
        Submit.rankOne(qs_type)
        // stop counter interval
        clearInterval(log_t)
        clearInterval(log_t)
        // show get certificate
        const get_cert=document.querySelector(".get_cert")
        get_cert.style.display="flex";
        GetCertificate.render(total,crct_ans,percentage)
        // event of get cert
        get_cert.addEventListener("click",()=>{
          const container2=document.querySelector(".container__main1")
          const container4=document.querySelector(".main__countdown-plate")
          container4.style.display="block";
          container2.style.display="none"
          countDownForCert()
        })
        sub.removeEventListener("click",sumt)
        disableSelection()
        unClickable()
        window.scrollTo(0,0)
        if(qs_type=="obo"){
          showByAll()
        }
        clearMark()
      }else{
        clk_count=0
        alert_ao.style.textAlign="center"
        alert_ao.innerHTML=`Answer the All the Questions!!!<br>*Not Answered Yet-${not_answered}`
        alert_ao.classList.add("q-all-alert")
        alert_ao.style.top='62vh'
        const modal_bg1=document.querySelector("#modal_bg1")
        modal_bg1.className="modal_bg1"
        click_points+=1
        pauseTime(click_points)
        setTimeout(()=>{
          alert_ao.style.top='140%'
          alert_ao.innerHTML=""
          alert_ao.classList.remove("q-all-alert")
          modal_bg1.className=""
        },3000)
      } 
    }
      if(dummie==0){
        pauseTime(click_points)

        AnsCrctn.correctAnswer()
        let total=qtn.length
        let percentage=((crct_ans/total)*100).toFixed(2);
        qtn.forEach(showAns)
        Submit.rankOne(qs_type)

        clearInterval(log_t)
        clearInterval(log_t)
        // show get certificate
        const get_cert=document.querySelector(".get_cert")
        get_cert.style.display="flex";
        GetCertificate.render(total,crct_ans,percentage)
        get_cert.addEventListener("click",()=>{
          const container2=document.querySelector(".container__main1")
          const container4=document.querySelector(".main__countdown-plate")
          container4.style.display="block";
          container2.style.display="none"
          countDownForCert()
        })
        // clear mark
        clearMark()
        sub.removeEventListener("click",sumt)
        disableSelection()
        unClickable()
        window.scrollTo(0,0)
        if(qs_type=="obo"){
          clearBackObo()
          showByAll()
        }
      }
    }

    static rankOne(type){
      let pr_rply=document.querySelectorAll(".sel_que")
      switch (type) {
        case "obo":
          let pr_rply1=[...pr_rply][pr_rply.length-1]
          pr_rply1.innerHTML=`<button class='q_prev replay b_2px_bg_b'>Replay</button><button id="sel_que_obo_prev" class='q_prev b_2px_bg_b' onclick="QtnNav.prevQtn()">Prev</button>`
          break;
        case "all":
          let pr_rply2=[...pr_rply][pr_rply.length-1]
          pr_rply2.innerHTML=`<button class='q_prev replay b_2px_bg_b'>Replay</button>`
          break;
        default:
          break;
      }
      let replay=document.querySelector(".replay")
      replay.addEventListener("click",()=>{
        clearTimeout();
        clearMark()
      })
      // reset -all-mark,time
      scback()
    }
}
//show Answers. . .:(
function showAns(qa,pos) {
  let qa_id=document.getElementById(`${pos}`)
  let qa_arr=new Array(qa_id.children)[0]
  Array.from(qa_arr).forEach((element,place)=>{
    if(element.firstElementChild.value==qtn[pos].correctAnswer){
      element.style.backgroundColor="#8CFF70"
    }
    let chked=document.querySelectorAll(`input[name=option${pos}]`)
    if(chked[place].checked==true){
      if(chked[place].value==qtn[pos].correctAnswer){
        chked[place].parentElement.style.backgroundColor="#8CFF70"
      }else{
        chked[place].parentElement.style.backgroundColor="#FF8C76"
      }
    }
  })
}
// make radio un-clickable
function unClickable(){
  const qa_radio=document.querySelectorAll(".qa")
  qa_radio.forEach((item)=>{
    [...item.firstElementChild.nextElementSibling.children].forEach((item)=>{
      if(item.firstElementChild.checked==true){
      }else{
        item.firstElementChild.disabled=true
      }
    })
  })
}
// ----------------------------------------------------------------
// 1/1 -show by all once submit event occur...
function showByAll(){
  const s_all=document.querySelectorAll(".qa")
  const main1=document.querySelector(".container__main1")
  main1.style.height="100%";
  s_all.forEach((items,pos)=>{
    if(pos==s_all.length-1){
      items.lastElementChild.previousElementSibling.innerHTML=`<button class='q_prev sel_que_obo replay b_2px_bg_b'>Replay</button>`
    }else{
      items.lastElementChild.previousElementSibling.remove()
    }
  items.style.display="block"
  lander.innerHTML+=items.outerHTML
  })
  lander.firstElementChild.outerHTML="<div></div>"
  const replay=document.querySelector(".sel_que_obo")
  replay.addEventListener("click",()=>{
    oneByoneReply()
    clearTimeout()
    clearMark()
  })
  const qa_chkd=document.querySelectorAll(".qa")
  qa_chkd.forEach((items)=>{
   [...items.firstElementChild.nextElementSibling.children].forEach((items)=>{
     if(items.firstElementChild.disabled!=true){
       items.firstElementChild.checked=true
     }
   })
  })
}
// clear clicks
export function clearClicks(){
  click_points=0
}
// clear back
function clearBackObo(){
  [...lander.children].forEach(element => {
    if(posqn>0){
      element.style.display="none"
    }
  })
}
// countdown for certificate Generation
 function countDownForCert(){
  const spinnerLeft=document.querySelector(".spinner-left")
  const spinnerLeftJoin=document.querySelector(".spinner-left-join")
  const counts=document.querySelector(".counts h1")
  const txtLoader=document.querySelector(".second-dot")
  spinnerLeftJoin.style.zIndex=0
  spinnerLeft.style.transform=`rotate(${0}deg)`
  let count=15
  let SLdegree=0
  let points=0
  const pins=setInterval(()=>{
    if (points==0) {
      txtLoader.innerHTML="Your Certificate is Generating."
      points=1
    } 
    // else if(points==1){
    //   txtLoader.innerHTML="Your Certificate is Generating. "
    //   points=2
    // }else if(points==2){
    //   txtLoader.innerHTML="Your Certificate is Generating.."
    //   points=3
    // }else if(points==3){
    //   txtLoader.innerHTML="Your Certificate is Generating..."
    //   points=0
    // }
  },500)
  
  const second=setInterval(()=>{
    counts.innerHTML=count.toString().length<2 ? '0'+count :count ;
    if(SLdegree<=180){
      spinnerLeft.style.transform=`rotate(${SLdegree}deg)`
      spinnerLeftJoin.style.transform=`rotate(${SLdegree}deg)`
    }else if(SLdegree==360){
      SLdegree=0
      spinnerLeftJoin.style.zIndex=0
    }
    if(SLdegree>180){
      spinnerLeftJoin.style.transform=`rotate(${SLdegree}deg)`
      spinnerLeftJoin.style.zIndex=3
    }
    if (count==0) {
      spinnerLeft.style.transform=`rotate(${180}deg)`
      spinnerLeftJoin.style.zIndex=3
      spinnerLeftJoin.style.transform=`rotate(${360}deg)`
      clearInterval(pins)
      clearInterval(second)
      txtLoader.innerHTML="Certificate Ready To Download."
      setTimeout(()=>{
        const container4=document.querySelector(".main__countdown-plate")
        container4.style.display="none";
        const container3=document.querySelector(".cert_container")
        container3.style.display="flex"
      },2000)
    }
    count--
    SLdegree+=24
  },1000)
 }