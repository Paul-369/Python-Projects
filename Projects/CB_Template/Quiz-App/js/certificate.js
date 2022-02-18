import {sts,stm,sth,timerState} from "./timer.js";
import {subTitle,subTitle1,subTitle2,subTitle3,txt_S} from "./qobj.js";
const {jsPDF}=window.jspdf
// taken time
let taken_time=''
// date
let date=new Date().getDate()
let month=new Date().getMonth()+1
let year=new Date().getFullYear()
let certified_date=`${date}/${month}/${year}`
// Certificate
export class GetCertificate{
  static render(tq,aq,percentage){
    // random digit "4-3"
    let qktID=Math.floor(Math.random() * (10000 - 100) + 100)
      if(sth!=0){
        taken_time=`${sth!=0 ? sth+"Hr": ""} ${stm!=0 ? stm+"Min": ""} ${sts!=0 ? sts+"s": ""} `
      }else if(stm!=0){
        taken_time=`${stm!=0 ? stm+"Min": ""} ${sts!=0 ? sts+"s": ""} `
      }else if(sts!=0){
        taken_time=`${sts!=0 ? sts+"s":""} `
      }
      timerState()
    // student Name
    const stuName=document.querySelector(".user_wr input").value
    // jpg from dom
    let img=document.getElementById("cert-img")
    const canva=document.getElementById("certificate-canva")
    canva.width=img.width
    canva.height=img.height
    let context=canva.getContext("2d")
    // bg img
    context.drawImage(img,0,0,canva.width,canva.height)
    // controls 
			let mid=canva.width/2
			let mid1=(canva.width/2)+90
			let mid2=(canva.height/2)
    // ----
		context.font="bold 55px Arial"
		context.fillStyle="green"
		context.textAlign="center"
    // name
		context.fillText(stuName.toUpperCase(),mid+80,mid1-100)
    // -----
    context.font=`bold ${txt_S} Arial`
    context.fillStyle="blue"
    context.textAlign="center"
    // title
    context.fillText(subTitle,mid+40,590)
    // title1
    context.fillText(subTitle1,mid+40,645)
    // title2
    context.fillText(subTitle2,mid+40,700)
    // title3
    context.font="bold 40px Arial"
    context.fillStyle="black"
    context.fillText(subTitle3,mid+40,760)
    // -----
    context.font="bold 50px Arial"
    context.fillStyle="purple" 
    context.textAlign="left"
    // scored
    context.fillText(`${aq}/${tq}`,mid1,mid2+182)
    // percentage
    context.fillText(`${percentage}%`,mid1,mid2+245)
    // time taken
    context.fillText(taken_time,mid1,mid2+312)
    // certificate ID
    context.fillText(`QKT-${qktID}`,mid1,mid2+375)
    // certified On
    context.fillText(certified_date,mid1,mid2+440)
  }
}
//img Download Action.
function download_image(){
  const canva=document.getElementById("certificate-canva")
  let a=document.createElement('a')
  let image=canva.toDataURL("image/png")
  a.href=image
  a.download="certificate.png"
  a.click()
}
//pdf Download Action.
function download_pdf(){
  const canva=document.getElementById("certificate-canva")
  let image=canva.toDataURL("image/png")
  let pdf=new jsPDF()
  let pdfH=pdf.internal.pageSize.getHeight()
  let pdfW=pdf.internal.pageSize.getWidth()
  pdf.addImage(image,"png",0,0,pdfW,pdfH)
  pdf.save("certificate.pdf")
}

// download btn dom
const img_dnld=document.querySelector("#img-dnld")
const pdf_dnld=document.querySelector("#pdf-dnld")
const container2=document.querySelector(".container__main1")
const container3=document.querySelector(".cert_container")
const close=document.querySelector(".close")
// img ,pdf,close -btn events
img_dnld.addEventListener("click",()=>{
  download_image()
})
pdf_dnld.addEventListener("click",()=>{
  download_pdf()
})
close.addEventListener("click",()=>{
  container3.style.display="none"
  container2.style.display="block"
})
