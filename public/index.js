// This function is usefull to run on server side for updating te rating question wise
// var Chart = require('chart.js');
// const fs = require('fs')
var candidate_data;
var get_data = function () {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {

      var obj = this.responseText;
      obj1 = JSON.parse(obj);
      document.getElementById("extra_cont").innerHTML = JSON.stringify(obj1);
      set();
      // window.candidate_data = obj1;
      // console.log(document.getElementById("extra_cont").innerHTML);
    }

  };
  xhttp.open("GET", "./resources/candidate_data.json", true);
  xhttp.send();

};

function set() {
  candidate_data = JSON.parse(document.getElementById("extra_cont").innerHTML);
  console.log(candidate_data);
  fillwindow();
}
var save_grade = function () {
  ques_no = parseInt(document.getElementById('ques').classList[0]);
  rating = document.getElementsByClassName('checked').length;
  comment = document.getElementById('comment').value;
  console.log(ques_no + '' + rating + '' + comment);

  // candidate_data.response[ques_no-1].grade = rating;
  var obj = {
    "ques_no": ques_no,
    "rating": rating,
    "comment": comment
  };
  console.log(obj);
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(obj));
  if (obj.ques_no == candidate_data.response.length) {
    nextpage();
  };
};

function nextpage() {
  document.getElementById('result_popup').style.bottom = "11vh";
  document.getElementById('fallback').style.display = "block";

  // var xhttp = new XMLHttpRequest();
  // xhttp.open("POST", "/result", true);
  // xhttp.setRequestHeader("Content-type", "text/html");
  // xhttp.send();
  // setTimeout( function(){
  //   window.location.pathname = '/result';},4000);

}
var check = function (id) {
  console.log(id);
  let t = parseInt(id.split("")[1]);
  // console.log(t+1);
  for (i = 1; i <= t; i++) {
    // document.getElementById('s'+i).classList.add("checked");
    document.getElementById('s' + i).classList.remove("checked");
    void document.getElementById('s' + i).offsetWidth;
    document.getElementById('s' + i).classList.add("checked");
    // document.getElementById('s'+i).classList.add("staranm");
  }
  for (i = t + 1; i <= 5; i++) {
    var ele = document.getElementById('s' + i);
    if (ele.classList.contains("checked"))
      // console.log(i)
      ele.classList.remove("checked");
  }
  // save_grade(t);
};
var insert_radar = function () {
  // document.getElementById("chart_canva").classList.add("checked");

  var radarCanvas = document.getElementById("chart_canvas");
  radarCanvas.classList.remove("chartjs-size-monitor");
  var marksData = {
    labels: ["O", "C", "E", "A", "N"],
    datasets: [{
      label: "Candidate",
      // backgroundColor: "rgba(255, 242, 0, 0.5)",
      borderColor: "rgba(200,0,0,0.6)",
      fill: false,
      radius: 4,
      // pointRadius: 2,
      pointBorderWidth: 3,
      lineBackgroundColor: "red",
      pointBackgroundColor: "#502f7e",
      pointBorderColor: "blue",
      pointHoverRadius: 8,
      data: [3, 1, 4, 2, 5]
    }]
  };
  // Chart.defaults.global.elements.line.borderWidth = 10;
  // Chart.defaults.global.elements.line.backgroundColor = rgba(0,0, 10, 0.2);
  Chart.defaults.global.defaultFontColor = 'red';
  Chart.defaults.global.defaultFontFamily = "sans-serif";


  var radarChart = new Chart(radarCanvas, {
    type: 'radar',
    data: marksData,
    options: {
      responsive: true,

      title: {
        display: false,
        position: "top",
        fontStyle: "bold",
        fontSize: 0,
        fullWidth: false,
        padding: 0
      },
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 5,
          stepSize: 1
        },
        pointLabels: {
          fontSize: 15

        }
      },
      legend: {
        display: false,
        position: "top",
        fullWidth: false,
        labels: {
          display: false,
          usePointStyle: true,
          fontSize: 15,
          fontStyle: "bold"
        }

      }
    }
  });
};

var quesfill = function () {
  var queslist = candidate_data.response;
  console.log(queslist.length);
  document.getElementById('ques').innerHTML = queslist[0].ques;
  var prevques = function () {
    var ele = document.getElementById('ques');
    var curr = parseInt(ele.classList[0]);
    console.log(curr);
    if (curr > 1) {
      prev = String(curr - 1);
      curr = String(curr);
      ele.classList.remove(curr);
      ele.classList.add(prev);
      ele.innerHTML = queslist[prev - 1].ques;

      var stars = document.getElementsByClassName('checked');
      while (stars.length)
        stars[0].classList.remove("checked");

      // console.log(stars.length)
      document.getElementById('comment').value = "";
      console.log(ele.classList);
    }
  };
  var nextques = function () {
    var ele = document.getElementById('ques');
    var curr = parseInt(ele.classList[0]);
    console.log(curr);

    if (curr < queslist.length) {
      next = String(curr + 1);
      curr = String(curr);
      ele.classList.remove(curr);
      ele.classList.add(next);
      ele.innerHTML = queslist[curr].ques;
    }
    var stars = document.getElementsByClassName('checked');
    while (stars.length)
      stars[0].classList.remove("checked");

    document.getElementById('comment').value = "";
    console.log(ele.classList);
  };

  document.getElementById('prev').addEventListener("click", prevques);
  document.getElementById('next').addEventListener("click", nextques);
};

// var save_button = ;

function updateButtonMsg() {
  document.getElementById('save_button').classList.add('state-1', 'animated');
  setTimeout(finalButtonMsg, 1500);
}

function finalButtonMsg() {
  document.getElementById('save_button').classList.add('state-2');
  setTimeout(setInitialButtonState, 1500);
}

function setInitialButtonState() {
  document.getElementById('save_button').classList.remove('state-1', 'state-2', 'animated');
}

function show_chart() {
  if(document.getElementById('chart_cont').classList.contains('hidem'))
  { document.getElementById('chart_cont').classList.remove('hidem');
    document.getElementById('candidate').style.backgroundColor = "rgba(248, 176, 46,0.92)";
  }
  else{
    document.getElementById('chart_cont').classList.add('hidem');
    document.getElementById('candidate').style.backgroundColor = "rgba(248, 176, 46,1)";
  }

}

function edit() {
  window.location.pathname = '/';

}

function result() {
  window.location.pathname = '/result';

}

function fillwindow() {

  console.log(candidate_data);
  document.getElementById('candidate_name').innerHTML = candidate_data.name;
  document.getElementById('candidate_dp').src = candidate_data.dp;
  document.getElementById('cname').innerHTML = candidate_data.cname;
  document.getElementById('rlogo').src = candidate_data.clogo;
  quesfill();
  insert_radar();
  document.getElementById('save_button').addEventListener("click", updateButtonMsg);
  document.getElementById('save_button').addEventListener("click", save_grade);
  document.getElementById('view_chart').addEventListener("click", show_chart);
  document.getElementById('edit_button').addEventListener("click", edit);
  document.getElementById('result_button').addEventListener("click", result);

  var stars = document.getElementsByClassName('fa-star');

  for (i = 0; i < stars.length; i++) {
    stars[i].addEventListener("click", function () {
      check(this.id);
    })
  }; // document.getElementById("comment").defaultValue = "Goofy";
  // document.getElementById('candidatename') = candidate_data.name;
  // document.getElementById('candidate_name') = candidate_data.name;
}
document.addEventListener("DOMContentLoaded", get_data());