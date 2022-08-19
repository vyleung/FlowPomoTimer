$(document).ready(function() {
  const hour = document.querySelector(".hours");
  const min = document.querySelector(".minutes");
  const sec = document.querySelector(".seconds");
  
  let pause = false;
  let stopwatch;
  let reminderAlert;
  let num_of_pomo = 0;

  let start_time;
  let current_time;

  // enter = starts the timer
  $("#duration").keydown(function(event) {
    if (event.which === 13) {
      $("#start-button").click();
      $("#duration").trigger("blur");
      event.preventDefault();
    }
  });

  $(window).keydown(function(event) {
    // escape
    if (event.which === 27) {
      event.preventDefault();
    }

    // enter
    else if (event.which === 13) {
      $("#start-button").click();
      event.preventDefault();
    }
  });

  $("#start-button").click(function() {
    pause = false;
    start_time = Math.round(new Date().getTime()/1000);

    $("#stop-button").show();
    $("#start-button").hide();
    $(".notif").css({
      "display":"flex",
      "opacity":"0.5"
    });

    stopwatch = setCorrectingInterval(() => updateStopwatch(), 1000);
    notifyMe();
  });

  $("#stop-button").click(function() {
    pause = true;
    resetTimer();

    $("#start-button").show();
    $("#stop-button").hide();
    $(".notif").css({
      "display":"flex",
      "opacity":"1"
    });

    clearCorrectingInterval(stopwatch);
    clearCorrectingInterval(reminderAlert);
    document.title = "FlowPomoTimer";
  });

  function resetTimer() {
    sec.textContent = "00";
    min.textContent = "00";
    hour.textContent = "00";

    num_of_pomo = 0;
    document.querySelector("#pomo-num").textContent = "";
  }

  function notifyMe() {
    let user_duration_min = parseInt(document.querySelector("#duration").value);

    if (Number.isInteger(user_duration_min)) {
      reminderAlert = setCorrectingInterval(() => playSound(), parseInt(user_duration_min) * 60000);
    }
    else {
      if (!user_duration_min == "") {
        pause = true;
        console.log("ERROR: enter an integer");
      }
    }
  }

  // updates stopwatch time
  function updateStopwatch() {
    current_time = Math.round(new Date().getTime()/1000);

    // TODO: simplify code
    let time_elapsed = current_time - start_time;
    let time_elapsed_1 = (time_elapsed/60).toFixed(4);
    let updated_min_1 = time_elapsed_1.split(".")[0];
    let updated_sec_1 = ((parseInt(time_elapsed_1.split(".")[1])*60)/10000).toFixed();
    let time_elapsed_2 = (time_elapsed/3600).toFixed(4);
    let updated_hour = time_elapsed_2.split(".")[0];
    let update_to_minutes = ((parseInt(time_elapsed_2.split(".")[1])*60)/10000).toFixed(4);
    let updated_min_2 = update_to_minutes.split(".")[0];
    let updated_sec_2 = ((parseInt(update_to_minutes.toString().split(".")[1])*60)/10000).toFixed();
    
    if ((Number.isInteger(start_time)) && (pause == false)) {
      // 00:00:seconds
      if (time_elapsed <= 59) {
        if ((time_elapsed.toString().length == 1)) {
          sec.textContent = `0${time_elapsed}`;
        }
        else  {
          sec.textContent = `${time_elapsed}`;
        }
        
      }

      // 00:minutes:seconds
      else if ((time_elapsed >= 60) && (time_elapsed <= 3599)) {
        // minutes
        if (updated_min_1.length == 1) {
          min.textContent = `0${updated_min_1}`;
        }
        else {
          min.textContent = updated_min_1;
        }

        // seconds
        if (updated_sec_1.length == 1) {
          sec.textContent = `0${updated_sec_1}`;
        }
        else {
          sec.textContent = updated_sec_1;
        }
      }

      // hours:minutes:seconds
      else if (time_elapsed >= 3600) {
        // hours
        if (updated_hour.length == 1) {
          hour.textContent =`0${updated_hour}`;
        }
        else {
          hour.textContent = updated_hour;
        }

        // minutes
        if (updated_min_2.length == 1) {
          min.textContent = `0${updated_min_2}`;
        }
        else {
          min.textContent = updated_min_2;
        }

        // seconds
        if (updated_sec_2.length == 1) {
          sec.textContent =`0${updated_sec_2}`;
        }

        else if (updated_sec_2 == "60") {
          sec.textContent = "00";

          if (updated_min_2.length == 1) {
            min.textContent = "0" + (parseInt(updated_min_2) + 1).toString();
          }
          
          else {
            min.textContent = (parseInt(updated_min_2) + 1).toString();
          }
        }

        else {
          sec.textContent = updated_sec_2;
        }
      } 
    // update the window title w/ the stopwatch text
    document.title = hour.textContent + ":" + min.textContent + ":" + sec.textContent;
    }
  }

  function playSound() {
    $('#alert-sound').trigger("play");
    
    num_of_pomo++;
    document.querySelector("#pomo-num").textContent = num_of_pomo;
  }
});