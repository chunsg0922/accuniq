/****************
 * 변수 설정하기 *
 ****************/
 Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
 Chart.defaults.global.defaultFontColor = '#858796';
 var body = JSON.parse(sessionStorage.getItem("body_one"));
  var fatmass = body.fatmass / body.weight * 100;
  var moisture = body.moisture / body.weight * 100;
  var mineral = body.mineral / body.weight * 100;
  var protein = body.protein / body.weight * 100;
 
  // 도넛차트 데이터 만들기
 var ctx = document.getElementById("myPieChart");
 var myPieChart = new Chart(ctx, {
     type: 'doughnut',
     data: {
     labels: ["체지방", "체수분", "무기질", "단백질"],
     datasets: [{
     data: [fatmass.toFixed(1) , moisture.toFixed(1) , mineral.toFixed(1) , protein.toFixed(1)],
     backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e' ],
     hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#f4b619'],
     hoverBorderColor: "rgba(234, 236, 244, 1)",
     }],
 },
     options: {
     maintainAspectRatio: false,
     tooltips: {
         backgroundColor: "rgb(255,255,255)",
         bodyFontColor: "#858796",
         borderColor: '#dddfeb',
         borderWidth: 1,
         xPadding: 15,
         yPadding: 15,
         displayColors: false,
         caretPadding: 10,
     },
     legend: {
         display: false
     },
     cutoutPercentage: 80,
 },
 });
 