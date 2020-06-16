var candidate_data;
var get_data = function () {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {

			var obj = this.responseText;
			obj1 = JSON.parse(obj);
			document.getElementById("extra_cont").innerHTML = JSON.stringify(obj1);
			set();
		}
	};
	xhttp.open("GET", "./resources/updated_candidate_data.json", true);
	xhttp.send();
};

var set = function(){
	candidate_data = JSON.parse(document.getElementById("extra_cont").innerHTML);
	console.log(candidate_data);
	fillwindow();
};

var insert_radar = function () {

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

function filltable() {

	var table = document.getElementById('result_table');
	for (var i = 0; i < candidate_data.response.length; i++) {
		var tr = document.createElement('tr');

		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');

		var text1 = document.createTextNode(candidate_data.response[i].ques);
		var text2 = document.createTextNode(candidate_data.response[i].grade + "/5");
		var text3 = document.createTextNode(candidate_data.response[i].comment);

		td1.appendChild(text1);
		td2.appendChild(text2);
		td3.appendChild(text3);

		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);

		table.appendChild(tr);
	}
	// document.body.appendChild(table);
}

function fillwindow() {
	document.getElementById('candidate_name').innerHTML = candidate_data.name;
	document.getElementById('candidate_dp').src = candidate_data.dp;
	document.getElementById('cname').innerHTML = candidate_data.cname;
	document.getElementById('rlogo').src = candidate_data.clogo;

	insert_radar();
	filltable();
}
document.addEventListener("DOMContentLoaded", get_data());