import { qtn } from "./qobj.js"

// the qtn was answered
let po_ansrd=0
//Amount Question 
let q_len=qtn.length
// correct answers
export let crct_ans=0

export class AnsCrctn{
  //Answer selection event Display it "r" or "w"
  static selAns(t_element,t_id,sd_ans){
    // Answer Correction :) UI
    // if(qtn[t_id].correctAnswer==sd_ans){
    //   // real time Show out
    //   // t_lement.style.backgroundColor ="#8CFF70"e
    //   // Score Count :)
    //   // crct_ans=crct_ans+1
    // }else{
    //   // will use soon
    //   /*[...t_element.parentElement.children].forEach((element,pos) => {
    //     remove red_wr 
    //     element.classList.remove('red_wr')
    //     if(element.firstElementChild.value==qtn[t_id].correctAnswer){
    //       fit answer. when option goes wrong :)
    //       element.style.backgroundColor ="#8CFF70"
    //     }
    //   });
    //   add target :)
    //   t_element.classList.add("red_wr")*/
    // }
  }
  // the qtn was answered
  static presentOpt(){
    qtn.forEach((item,pos1)=>{
      let opt_list=document.getElementById(`${pos1}`)
      Array.from(opt_list.children).forEach((item,pos)=>{
        if(item.firstElementChild.checked){
          po_ansrd=po_ansrd+1
        }
      })
    })
    po_chked(po_ansrd)
    po_ansrd=0
  }
  // check correct answers
  static correctAnswer(){
    qtn.forEach((item,pos1)=>{
      let opt_list=document.getElementById(`${pos1}`)
      Array.from(opt_list.children).forEach((item,pos)=>{
        if(item.firstElementChild.checked){
          if(qtn[pos1].correctAnswer==item.firstElementChild.value){
            crct_ans=crct_ans+1
          };
        }
      })
    })
  }
}

//Option Click Events
let opt=["opta","optb","optc","optd"]
const opt_click=document.querySelector(".lander")
opt_click.addEventListener("click",opt_select)

// option selection
function opt_select(eve){

  try {
    if (eve.target.tagName=="P"){
      // present Option
      AnsCrctn.presentOpt()
      eve.target.previousSibling.checked=true
    }
  } catch (error) {
    console.log(":)");
  }
  try {
    if(eve.target.id=="opt"){
      eve.target.firstElementChild.checked=true
      // present Option
      AnsCrctn.presentOpt()
    }
  } catch (error){
    console.log(error);
  }
  try {
    if(eve.target.tagName=="INPUT"){
      eve.target.checked=true
      // present Option
      AnsCrctn.presentOpt()
    }
  } catch (error) {
    console.log(":)");
  }
}
// set po is 0 :)
po_chked(0)
//figure qtn was answered.
function  po_chked(count) {
  let qnty=document.querySelector(".q_qty p")
  qnty.innerHTML=`Ques:<span>${count}/${q_len}</span>`
}

export function clearMark(){
  displayMark()
  crct_ans=0
  po_ansrd=0
}

//Display Mark
function displayMark(){
  let qnty=document.querySelector(".q_qty p")
  qnty.innerHTML=`Mark:<span>${crct_ans}/${qtn.length}</span>`
}

export function disableSelection(){
  opt_click.removeEventListener("click",opt_select)
}

export{po_ansrd}
// get present option to "0"
document.addEventListener("click",(e)=>{
  e.target.classList.forEach((element)=>{
    if(element=="replay"){
      opt_click.addEventListener("click",opt_select)
      po_chked(0)
    }
  })
})