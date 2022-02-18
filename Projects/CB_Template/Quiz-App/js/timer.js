import {ongo} from "./quiz.js";
import {Submit,clearClicks} from "./submit.js";
// timer state
let tState=''
// deprecated spinner:(
const up=document.querySelector('#up_clk')
const down=document.querySelector('#d_clk')
//input fields
const hh=document.querySelector('#h')
const mm=document.querySelector('#m')
const ss=document.querySelector('#s')
let ls=0
let lm=0
let lh=0
// deprecated :(
let focus=''
let focus1=''
let h=0;
let m=0;
let s=0;
// time counter local
let sss=0
let mmm=0
let hhh=0
let log_t;
let ts=0
let tm=0
let th=0
// default
const p_on=document.querySelector("#p_on")
const p_off=document.querySelector("#p_off")
const time_set_wr=document.querySelector(".time_set_wr")
const time_txt=document.querySelector(".clock_icon p")
// timer_backdrop
const modalBg=document.querySelector("#timer_backdrop")
time_set_wr.style.display="none"
p_on.style.display="none"
p_off.style.display="block"

const state=document.querySelector('.switch')
const on=document.querySelector(".btn_switch")
class Gros{
  static on(){

      state.classList.forEach((item)=>{
        if('s_on'==item){
          state.classList.add("s_off")
          state.classList.add("b_off")
          state.classList.remove("b_on")
          state.classList.remove("s_on")
          on.classList.add("b_on")
          on.classList.remove("b_off")
          p_on.style.display="none"
          p_off.style.display="block"
          time_set_wr.style.display="none"
          time_txt.innerText='Timer (Optional)'
          ls=0
          lm=0
          lh=0
          h=0;
          m=0;
          s=0;
          // time counter local
          sss=0
          mmm=0
          hhh=0
          ts=''
          tm=''
          th=''        
        }else if('s_off'==item){
          state.classList.add("s_on")
          state.classList.add("b_on")
          state.classList.remove("b_off")
          state.classList.remove("s_off") 
          on.classList.add("b_off")
          on.classList.remove("b_on")
          p_on.style.display="block"
          p_off.style.display="none"
          time_set_wr.style.display="block"
          modalBg.className="timer_backdrop"
        }
      })
  }

  // seconds Minutes hours -- up counter(click) --
  static smhUp(){
  ss.addEventListener('click',()=>{
    focus="s_up"
  })
  mm.addEventListener('click',()=>{
    focus="m_up"
  })
  hh.addEventListener('click',()=>{
    focus="h_up"
  })   
  up.addEventListener('click',()=>{
    switch (focus) {
      case 'm_up':
        if(m<59){
          let len=m.toString()
          if(len.length==1){
            mm.value=`${0}${m}`
          }else{
            mm.value=`${m}`
          }
          m=m+1
        }else{
          m=0
        }
        break;
      case 's_up':
        if(s<59){
          let len=s.toString()
          if(len.length==1){
            ss.value=`${0}${s}`
          }else{
            ss.value=`${s}`
          }
          s=s+1
        }else{
          s=0
        }
        break;
      case 'h_up':
        if(h<11){
          let len=h.toString()
          if(len.length==1){
            hh.value=`${0}${h}`
          }else{
            hh.value=`${h}`
          }
          h=h+1
        }else{
          h=0
        }
        break;
      default:
        break;
    }
  })
  }
  // seconds Minutes hours -- up counter(click) --
  static smhDown(){
    ss.addEventListener('click',()=>{
      focus1="s_down"
    })
    mm.addEventListener('click',()=>{
      focus1="m_down"
    })
    hh.addEventListener('click',()=>{
      focus1="h_down"
    })   
    down.addEventListener('click',()=>{
      switch (focus1) {
        case 'm_down':
          if(m>0){
          let len=m.toString()
          if(len.length==1){
            mm.value=`${0}${m}`
          }else{
            mm.value=`${m}`
          }
            m=m-1
          }else{
            m=59
          }
          break;
        case 's_down':
          if(s>0){
            let len=s.toString()
          if(len.length==1){
            ss.value=`${0}${s}`
          }else{
            ss.value=`${s}`
          }
            s=s-1
          }else{
            s=59
          }
          break;
        case 'h_down':
          if(h>0){
            let len=h.toString()
            if(len.length==1){
              hh.value=`${0}${h}`
            }else{
              hh.value=`${h}`
            }
            h=h-1
          }else{
            h=11
          }
          break;
        default:
          break;
      }
    })
  }
}

// init time set
// Gros.smhUp()
// Gros.smhDown()
// counter fn
// taken time counter
let sts=0
let stm=0
let sth=0
function counterPt(foo){
  // from timer count fix
  // function timer(){
    // ls=30 lm=4 lh=1 ls-1 if ls=0 lm-1 if
  if(lh!=0 || lm!=0){
    if(sss>0 && sss<60){
      sss=sss-1
    }else if(sss==0 ){
      sss=59
      if(mmm>0 && mmm<60){
        mmm=mmm-1
      }else if(mmm==0){
        mmm=59
        if(hhh==0){
          hhh=0
        }else{
          hhh=hhh-1
        } 
      }
    }
    
  }else{
    if(sss<59){
      sss=sss+1
    }else if(sss==59){
      mmm=mmm+1
      sss=0
      if(mmm==59){
        hhh=hhh+1
        mmm=0
      }
    }
  }
   // taken time counter
   if(sts<59){
    sts=sts+1
  }else if(sts==59){
    stm=stm+1
    sts=0
    if(stm==59){
      sth=sth+1
      stm=0
    }
  }

  const timer=document.querySelector(".timer")
    let len=sss.toString()
        if(len.length==1){
          ts=`${0}${sss}`
        }else{
          ts=`${sss}`
        }
        let len1=mmm.toString()
        if(len1.length==1){
          tm=`${0}${mmm}`
        }else{
          tm=`${mmm}`
        }
        let len2=hhh.toString()
        if(len2.length==1){
          th=`${0}${hhh}`
        }else{
          th=`${hhh}`
        }
    timer.innerHTML=`<span class="hh">${th=="" ? "00":th}</span>:<span class="mm">${tm=="" ? "00":tm}</span>:<span class="ss">${ts=="" ? "00":ts}</span>`
    if(sss==ls && mmm==lm && hhh==lh){
      clearInterval(log_t)
      Submit.showCorrect(0)
    }
    if(sss==s && mmm==m && hhh==h){
      clearInterval(log_t)
      Submit.showCorrect(0)
    }
    if(tState="init"){
      if(calc_ST=="timer"){
        if(sss==30 && mmm==0 &&hhh==0){
          popSub()
          pauseTime(1)
        }
      }
    }
}

state.addEventListener("click",()=>{
  Gros.on()
})
let rls=0
let rlm=0
let rlh=0

// set timer for quiz{set click event}
const set_time=document.querySelector(".set_time")
let calc_ST=""
set_time.addEventListener("click",()=>{
  const time_alert=document.querySelector(".alert_enter_time")
  const time_txt=document.querySelector(".clock_icon p")
  if(hh.value!=0 || mm.value!=0){
  // from time part--------
  ls=ss.value
  lh=hh.value
  lm=mm.value
// reserved play time
  rls=ss.value
  rlh=hh.value
  rlm=mm.value
  // 
  sss=ls
  mmm=lm
  hhh=lh
  ss.value='00'
  mm.value='00'
  hh.value='00'
  // last sec alert...initer
  tState="init"
}
//  changed to 3 hour
if((lh==3 && lm==0 && ls==0) || ((lh<3 && lh>0) && (lm!=0 && ls!=0)) ||((lh<3 && lh>0) && (lm!=0))  || ((lh<3 && lh>0) && (lm!=0)) || ((lh<3 && lh==0) && (lm!=0)) || ((lh<3 && lh>0))){
  time_set_wr.style.display="none"
  modalBg.className=""
  calc_ST="timer"
}else{
  time_alert.innerText='*Max (Hour=03) || *Min (Minutes=01)'
}
time_txt.innerText=`Timer ( ${lh!=0 ? lh+"Hr":""} ${lm!=0 ? lm+"Min":""} ${ls!=0 ? ls+"s":""} )`
})

// submit quiz
const sub_q=document.querySelector(".submit_q")
const alert_sq=document.querySelector(".alert_sq")
// intro
const container1=document.querySelector(".container__main")
const container2=document.querySelector(".container__main1")
const container3=document.querySelector(".cert_container")
container2.style.display="none"
container3.style.display="none"
setInterval(() => {
  let type_check=document.querySelector(".user_wr input").value
  if(ongo==""){
    alert_sq.innerHTML="*Check Q-type is Selected !!!"
  }
  if(ongo!="" &&  type_check!=""){
    alert_sq.innerHTML=""
  }
  if( type_check==""){
    alert_sq.innerHTML="*Please Enter Your Name !!!"
  }
}, 1);
  
sub_q.addEventListener("click",()=>{
  let type_check=document.querySelector(".user_wr input").value
  if(ongo=="go" && type_check!=""){
  window.scrollTo(0,0)    
  log_t=setInterval(counterPt,1000);
  // route quiz page
  container1.style.display="none"
  container2.style.display="block"
  alert_sq.innerHTML=""
  }
})
export function clearTimeout(){
  ls=rls
  lh=rlh
  lm=rlm
  h=0;
  m=0;
  s=0;
  sss=ls
  mmm=lm
  hhh=lh
  ts=''
  tm=''
  th=''
  log_t=setInterval(counterPt,1000);
}

// sumitted pop
function popSub(){
  const pop_time=document.querySelector("#submitted")
  pop_time.className='submitted'
  pop_time.style.display="flex"
  setTimeout(()=>{
    pop_time.className='0'
    pop_time.style.display="none"
  },3000)
}
// timer set -close button
const tclose_btn=document.querySelector(".modal-bg-close")
tclose_btn.onclick=()=>{
  modalBg.className=""
  state.classList.add("s_off")
  state.classList.add("b_off")
  state.classList.remove("b_on")
  state.classList.remove("s_on")
  on.classList.add("b_on")
  on.classList.remove("b_off")
  p_on.style.display="none"
  p_off.style.display="block"
  time_set_wr.style.display="none"
  time_txt.innerText='Timer (Optional)'
}
export function timerState(){
  sts=0
  stm=0
  sth=0
}
export function pauseTime(clicks){
  clearInterval(log_t)
  clearInterval(log_t)
  clearInterval(log_t)
  if(clicks==1){
    setTimeout(() => {
      clearInterval(log_t)
      log_t=setInterval(counterPt,1000);
    }, 2000);
  }
  clearClicks()
}
export{log_t,ts,tm,th,sts,stm,sth,calc_ST}
// freeze time
document.addEventListener("click",(e)=>{
  let fc=0
  e.target.classList.forEach((items)=>{
    if(items=="q_next"){
      try {
        [...e.target.parentElement.parentElement.firstElementChild.nextElementSibling.children].forEach((items)=>{
          if(items.firstElementChild.checked==false){
            fc+=1
          }
        })
        if(fc==4){
          pauseTime(1)
        }
      } catch (error) {
        console.log(error)
      }
    }
  })
})
