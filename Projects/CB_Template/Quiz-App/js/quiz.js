import { qtn, shuffleArr, testUnit } from "./qobj.js";
import { Submit } from "./submit.js";
// test unit
const unitHead = document.querySelector(".test_part p");
const unitHead1 = document.querySelector(".h2 h2");
unitHead.innerHTML = testUnit;
unitHead1.innerHTML = testUnit;
// for ready to start countdown--
export let ongo = "";
// selected quiz mode obo/all
let qs_type = "";
// qtn target to wrap ans and options.
let pos = 0;
// quiz route
const container_1 = document.querySelector(".container__main1");
// sticky head
const sticky = document.querySelector("#sticky_rela");
// single parent-(qtns and ans)
export let lander = document.querySelector(".lander");
export class Lander {
  static showAll() {
    // mix up array
    shuffleArr();
    qtn.forEach(showall);
    lander.classList.remove("o_b_o");
    sticky.classList.add("sticky_rela");
    container_1.style.height = "max-content";

    MathJax.typeset();
    // submit (act)
    submitEvent();
  }
  static showOne() {
    // mix up array
    shuffleArr();
    //show Q- one bye one
    lander.classList.add("o_b_o");
    lander.classList.remove("a_l_l");
    qtn.forEach(showone);
    container_1.style.height = "100vh";
    MathJax.typeset();
    // submit (act)
    submitEvent();
    const final_submit = document.querySelector(".submit");
    final_submit.style.display = "none";
    document.addEventListener("click", (e) => {
      try {
        [
          ...lander.children[lander.children.length - 1].firstElementChild
            .nextElementSibling.children,
        ].forEach((item) => {
          if (item.firstElementChild.checked) {
            final_submit.style.display = "block";
          }
        });
      } catch (error) {
        console.log(":)");
      }
    });
  }
}
//template(Show All)
function showall(obj) {
  if (pos == 0) {
    let qtns = `
    <div class="qa border_2px">
    <div class="title border_2px_bg_b"><span class="border_2px_wht_b">${
      pos + 1
    }</span><div class="eqnbox">${obj["question"]}</div></div>
    <div id="${pos}">
    <label class="opta border_2px_b ptr"><input type="radio" value='a' name="option${pos}">
    <p>
    ${obj["answers"]["a"]} 
    </p></label>
    <label class="optb border_2px_b ptr"><input type="radio" value='b' name="option${pos}"><p>${
      obj["answers"]["b"]
    }</p></label>
    <label class="optc border_2px_b ptr"><input type="radio" value='c' name="option${pos}"><p>${
      obj["answers"]["c"]
    }</p></label>
    <label class="optd border_2px_b ptr"><input type="radio" value='d' name="option${pos}"><p>${
      obj["answers"]["d"]
    }</p></label>
    </div>
    
    <div class="sign_wr">
    <div class="sign_k red_bg_wht">Created By: www.Kalvithugal.in</div>
    </div>
    </div>`;
    lander.innerHTML += qtns;
    pos = pos + 1;
  } else if (pos == qtn.length - 1) {
    let qtns = `
      <div class="qa border_2px">
      <div class="title border_2px_bg_b"><span class="border_2px_wht_b">${
        pos + 1
      }</span><div class="eqnbox">${obj["question"]}</div></div>
      <div id="${pos}">
      <label class="opta border_2px_b ptr"><input type="radio" value='a' name="option${pos}"><p>${
      obj["answers"]["a"]
    }</p></label>
      <label class="optb border_2px_b ptr"><input type="radio" value='b' name="option${pos}"><p>${
      obj["answers"]["b"]
    }</p></label>
      <label class="optc border_2px_b ptr"><input type="radio" value='c' name="option${pos}"><p>${
      obj["answers"]["c"]
    }</p></label>
      <label class="optd border_2px_b ptr"><input type="radio" value='d' name="option${pos}"><p>${
      obj["answers"]["d"]
    }</p></label>
      </div>
      <div class="sel_que">
      <button class='q_next submit b_2px_bg_b'>Submit</button>
      </div>
      <div class="sign_wr">
      <div class="sign_k red_bg_wht">Created By: www.Kalvithugal.in</div>
      </div>
      </div>`;
    lander.innerHTML += qtns;
    pos = pos + 1;
  } else {
    let qtns = `
    <div class="qa border_2px">
    <div class="title border_2px_bg_b"><span class="border_2px_wht_b">${
      pos + 1
    }</span><div class="eqnbox">${obj["question"]}</div></div>
    <div id="${pos}">
    <label class="opta border_2px_b ptr"><input type="radio" value='a' name="option${pos}"><p>${
      obj["answers"]["a"]
    }</p></label>
    <label class="optb border_2px_b ptr"><input type="radio" value='b' name="option${pos}"><p>${
      obj["answers"]["b"]
    }</p></label>
    <label class="optc border_2px_b ptr"><input type="radio" value='c' name="option${pos}"><p>${
      obj["answers"]["c"]
    }</p></label>
    <label class="optd border_2px_b ptr"><input type="radio" value='d' name="option${pos}"><p>${
      obj["answers"]["d"]
    }</p></label>
    </div>

    <div class="sign_wr">
    <div class="sign_k red_bg_wht">Created By: www.Kalvithugal.in</div>
    </div>
    </div>`;
    lander.innerHTML += qtns;
    pos = pos + 1;
  }
}
// template(1/1)
function showone(obj) {
  lander.classList.add(".o_b_o");
  if (pos == 0) {
    let qtns = `
    <div class="qa border_2px" style="display:block;">
    <div class="title border_2px_bg_b"><span class="border_2px_wht_b">${
      pos + 1
    }</span><div class="eqnbox">${obj["question"]}</div></div>
    <div id="${pos}">
    <label class="opta border_2px_b ptr"><input type="radio" value='a' name="option${pos}"><p>${
      obj["answers"]["a"]
    }</p></label>
    <label class="optb border_2px_b ptr"><input type="radio" value='b' name="option${pos}"><p>${
      obj["answers"]["b"]
    }</p></label>
    <label class="optc border_2px_b ptr"><input type="radio" value='c' name="option${pos}"><p>${
      obj["answers"]["c"]
    }</p></label>
    <label class="optd border_2px_b ptr"><input type="radio" value='d' name="option${pos}"><p>${
      obj["answers"]["d"]
    }</p></label>
    </div>
    <div class="sel_que">
    <button class='q_next b_2px_bg_b' onclick="QtnNav.nextQtn()">Next</button>
    </div>
    <div class="sign_wr">
    <div class="sign_k red_bg_wht">Created By: www.Kalvithugal.in</div>
    </div>
    </div>`;
    lander.innerHTML += qtns;
    pos = pos + 1;
  } else if (pos == qtn.length - 1) {
    let qtns = `
      <div class="qa border_2px" style="display:none;">
      <div class="title border_2px_bg_b"><span class="border_2px_wht_b">${
        pos + 1
      }</span><div class="eqnbox">${obj["question"]}</div></div>
      <div id="${pos}">
      <label class="opta border_2px_b ptr"><input type="radio" value='a' name="option${pos}"><p>${
      obj["answers"]["a"]
    }</p></label>
      <label class="optb border_2px_b ptr"><input type="radio" value='b' name="option${pos}"><p>${
      obj["answers"]["b"]
    }</p></label>
      <label class="optc border_2px_b ptr"><input type="radio" value='c' name="option${pos}"><p>${
      obj["answers"]["c"]
    }</p></label>
      <label class="optd border_2px_b ptr"><input type="radio" value='d' name="option${pos}"><p>${
      obj["answers"]["d"]
    }</p></label>
      </div>
      <div id="sel_que_obo" class="sel_que">
      <button class='q_next submit b_2px_bg_b' >Submit</button>
      <button class='q_prev b_2px_bg_b' onclick="QtnNav.prevQtn()">Prev</button>
      </div>
      <div class="sign_wr">
      <div class="sign_k red_bg_wht">Created By: www.Kalvithugal.in</div>
      </div>
      </div>`;
    lander.innerHTML += qtns;
    pos = pos + 1;
  } else {
    let qtns = `
    <div class="qa border_2px" style="display:none;">
    <div class="title border_2px_bg_b"><span class="border_2px_wht_b">${
      pos + 1
    }</span><div class="eqnbox">${obj["question"]}</div></div>
    <div id="${pos}">
    <label class="opta border_2px_b ptr"><input type="radio" value='a' name="option${pos}"><p>${
      obj["answers"]["a"]
    }</p></label>
    <label class="optb border_2px_b ptr"><input type="radio" value='b' name="option${pos}"><p>${
      obj["answers"]["b"]
    }</p></label>
    <label class="optc border_2px_b ptr"><input type="radio" value='c' name="option${pos}"><p>${
      obj["answers"]["c"]
    }</p></label>
    <label class="optd border_2px_b ptr"><input type="radio" value='d' name="option${pos}"><p>${
      obj["answers"]["d"]
    }</p></label>
    </div>
    <div class="sel_que">
    <button class='q_next b_2px_bg_b' onclick="QtnNav.nextQtn()">Next</button>
    <button class='q_prev b_2px_bg_b' onclick="QtnNav.prevQtn()">Prev</button>
    </div>
    <div class="sign_wr">
    <div class="sign_k red_bg_wht">Created By: www.Kalvithugal.in</div>
    </div>
    </div>`;
    lander.innerHTML += qtns;
    pos = pos + 1;
  }
}

let obo = document.querySelector(".obo");
let s_all = document.querySelector(".q_all");
// Q-type click events
//click 1/1
obo.addEventListener("click", () => {
  lander.innerHTML = "";
  pos = 0;
  Lander.showOne();
  qs_type = "obo";
  ongo = "go";
});

//click *
s_all.addEventListener("click", () => {
  lander.innerHTML = "";
  pos = 0;
  Lander.showAll();
  qs_type = "all";
  ongo = "go";
});
// Display results...:)
function submitEvent() {
  Submit.showCorrect();
}
//reset all-1/1 types.(marks,lander children positions,)
export function scback() {
  let replay = document.querySelector(".replay");
  replay.addEventListener("click", () => {
    // reset all
    switch (qs_type) {
      case "obo":
        lander.innerHTML = "";
        pos = 0;
        shuffleArr();
        Lander.showOne();
        qs_type = "obo";
        break;
      case "all":
        lander.innerHTML = "";
        pos = 0;
        shuffleArr();
        Lander.showAll();
        qs_type = "all";
        break;
      default:
        break;
    }
  });
}
// 1/1 -show all-(reset)
function oneByoneReply() {
  lander.innerHTML = "";
  pos = 0;
  shuffleArr();
  Lander.showOne();
  qs_type = "obo";
  ongo = "go";
}

export { qs_type, oneByoneReply };
