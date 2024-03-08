
const start = document.getElementById("start");
const reset = document.getElementById("reset");
const pause = document.getElementById("pause");

let cycle = document.getElementById("cycle");

let wm = document.getElementById("work_min");
let ws = document.getElementById("work_sec");
let bm = document.getElementById("break_min");
let bs = document.getElementById("break_sec");

let alarmAudio = new Audio("pomodoroAlarm.mp3")


let workAlarmPlayed = false;
let breakAlarmPlayed = false;


function alarm() {
   if (parseInt(ws.innerText) == 0 && parseInt(wm.innerText) == 0 && !workAlarmPlayed) {
       alarmAudio.play();
       workAlarmPlayed = true;
   } else if (bs.innerText == 0 && bm.innerText == 0 && !breakAlarmPlayed) {
       alarmAudio.play();
       breakAlarmPlayed = true;
   }
}



//---------- start timer----------------------
let startTimer;
start.addEventListener("click", function () {
   
   if (startTimer === undefined) {

      startTimer = setInterval(timer, 1000)
   } else {
      alert("Timer is already running");
   }
   
})


//---------- Reset timer----------------------

reset.addEventListener("click", function () {
   setTimer(25, 0, 5, 0, 0)
   stoptimer()
   startTimer = undefined;
   workAlarmPlayed = false;
   breakAlarmPlayed = false;
})

//---------- Pause timer----------------------


pause.addEventListener("click", function () {
   stoptimer()
   startTimer = undefined;
   
})




function timer() {

   // -----------WORK TIME Decrementation------------
   if (parseInt(ws.innerText) != 0) {
      ws.innerText = leadingZero(parseInt(ws.innerText) - 1)
   } else if (parseInt(wm.innerText) != 0 && parseInt(ws.innerText) == 0) {
      ws.innerText = "59"
      wm.innerText = leadingZero(parseInt(wm.innerText) - 1)
   }
   // -----------Break TIME Decrementation------------
   if (parseInt(ws.innerText) == 0 && parseInt(wm.innerText) == 0) {
      alarm()
      if (bs.innerText != 0) {
         bs.innerText = leadingZero(parseInt(bs.innerText) - 1)
      } else if (bm.innerText != 0 && bs.innerText == 0) {
         bs.innerText = "59"
         bm.innerText = leadingZero(parseInt(bm.innerText) - 1)
      }
   }
   // -----------Cycle Incrementation--------~----
   if (bs.innerText == 0 && bm.innerText == 0 && parseInt(ws.innerText) == 0 && parseInt(wm.innerText) == 0) {
      alarm();
      setTimer(25, 0, 5, 0, parseInt(cycle.innerText) + 1)
      
   }

}


function leadingZero(num) {
   return num < 10 ? "0" + num : num
}

function setTimer(wmVal, wsVal, bmVal, bsVal, cycleVal) {
   wm.innerText = leadingZero(wmVal);
   ws.innerText = leadingZero(wsVal);
   bm.innerText = leadingZero(bmVal);
   bs.innerText = leadingZero(bsVal);
   cycle.innerText = leadingZero(cycleVal)
}


function stoptimer() {
   clearInterval(startTimer)
}




