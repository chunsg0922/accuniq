var mm;
$(function(){
    $.ajax({
        type: "GET",
        url: "js/login.js",
        dataType : "JSON",
        success: function(msg){
            mm = msg;
            console.log(msg);
        }
    });
    var user = JSON.parse(sessionStorage.getItem("user"));
    var body = JSON.parse(sessionStorage.getItem("body_one"));
    var timestamp = parseInt(body.date);
    var date = new Date(timestamp);
    var show_date = date.getFullYear() +'년 ' + (date.getMonth()+1) + '월 ' + date.getDate() + '일';
    var show_time = date.getHours() + ':' + date.getMinutes();

    var bar_weight = document.getElementById('show_bar_weight');
    var bar_muscle = document.getElementById('show_bar_muscle');
    var bar_fatper = document.getElementById('show_bar_fatper');

    console.log(user);
    console.log(body);
    document.getElementById('nickname').innerHTML=user.nickname;
    document.getElementById('show_weight').innerHTML= body.weight + ' kg';
    document.getElementById('show_muscle').innerHTML= body.muscle + ' kg';
    document.getElementById('show_fatper').innerHTML= body.fatper + ' %';
    document.getElementById('show_date').innerHTML=show_date;
    document.getElementById('show_time').innerHTML=show_time;

    /****************************************
    *  그래프를 나타내기 위한 Attribute 설정  *
    *****************************************/
    bar_weight.setAttribute('aria-valuenow', body.weight);
    bar_weight.setAttribute('aria-valuemin', body.weightMin);
    bar_weight.setAttribute('aria-valuemax', body.weightMax);
    bar_muscle.setAttribute('aria-valuenow', body.muscle);
    bar_muscle.setAttribute('aria-valuemin', body.muscleMin);
    bar_muscle.setAttribute('aria-valuemax', body.muscleMax);
    bar_muscle.setAttribute('aria-valuenow', body.fatper);
    bar_muscle.setAttribute('aria-valuemin', body.fatperMin);
    bar_muscle.setAttribute('aria-valuemax', body.fatperMax);

    w_min = body.weightMin - body.weightMin;
    w_max = body.weightMax - body.weightMin;
    w = body.weight - body.weightMin;
    
    mu_min = body.muscleMin - body.muscleMin;
    mu_max = body.muscleMax - body.muscleMin;
    mu = body.muscle - body.muscleMin;

    fp_min = body.fatperMin - body.fatperMin;
    fp_max = body.fatperMax - body.fatperMin;
    fp = body.fatper - body.fatperMin;

    var weight_average = w / w_max * 100 ;
    console.log(weight_average);
    bar_weight.style.width = weight_average + "%";

    var muscle_average = mu / mu_max * 100;
    console.log(muscle_average);
    bar_muscle.style.width = muscle_average + "%";

    var fatper_average = fp / fp_max * 100;
    console.log(fatper_average);
    bar_fatper.style.width = fatper_average + "%";

    /***************************************
     * 체형 판정 및 행동 요령/ 식이요법 설정 *
     ***************************************/
    var bodyjudge = body.bodyJudge;
    switch(bodyjudge){
        case 76:
            document.getElementById('show_bodyjudge').innerHTML = "마른 저지방";
            document.getElementById('show_tips').innerHTML = "";
            break;
        case 77:
            document.getElementById('show_bodyjudge').innerHTML = "마름";
            break;
        case 78:
            document.getElementById('show_bodyjudge').innerHTML = "저근육";
            break;
        case 79:
            document.getElementById('show_bodyjudge').innerHTML = "마른비만 1단계";
            break;
        case 80:
            document.getElementById('show_bodyjudge').innerHTML = "마른비만 2단계";
            break;
        case 81:
            document.getElementById('show_bodyjudge').innerHTML = "표준 근육형";
            break;
        case 82:
            document.getElementById('show_bodyjudge').innerHTML = "표준";
            break;
        case 83:
            document.getElementById('show_bodyjudge').innerHTML = "과지방 1단계";
            break;
        case 84:
            document.getElementById('show_bodyjudge').innerHTML = "과지방 2단계";
            break;
        case 85:
            document.getElementById('show_bodyjudge').innerHTML = "과지방 3단계";
            break;
        case 86:
            document.getElementById('show_bodyjudge').innerHTML = "근육형";
            break;
        case 87:
            document.getElementById('show_bodyjudge').innerHTML = "근육형과체중 1ㅏㄴ계";
            break;
        case 88:
            document.getElementById('show_bodyjudge').innerHTML = "과체중";
            break;
        case 89:
            document.getElementById('show_bodyjudge').innerHTML = "경도비만";
            break;
        case 90:
            document.getElementById('show_bodyjudge').innerHTML = "비만";
            document.getElementById('show_tips').innerHTML = "적절한 식단 조절과 함께 주 4회 이상, 1회마다 30분 이상의 유산소 운동을 권장드립니다.";
            break;
        case 91:
            document.getElementById('show_bodyjudge').innerHTML = "고도비만";
            document.getElementById('show_tips').innerHTML = "적절한 식단 조절과 함께 주 4회 이상, 1회마다 30분 이상의 유산소 운동을 권장드립니다.";
            break;
        case 92:
            document.getElementById('show_bodyjudge').innerHTML = "비만";
            document.getElementById('show_tips').innerHTML = "적절한 식단 조절과 함께 주 4회 이상, 1회마다 30분 이상의 유산소 운동을 권장드립니다.";
            break;
        case 93:
            document.getElementById('show_bodyjudge').innerHTML = "경도비만";
            document.getElementById('show_tips').innerHTML = "적절한 식단 조절과 함께 주 4회 이상, 1회마다 30분 이상의 유산소 운동을 권장드립니다.";
            break;
        case 94:
            document.getElementById('show_bodyjudge').innerHTML = "근육형과체중 2단계";
            document.getElementById('show_tips').innerHTML = "적절한 식단 조절과 함께 주 4회 이상, 1회마다 30분 이상의 유산소 운동을 권장드립니다.";
            break;
        case 95:
            document.getElementById('show_bodyjudge').innerHTML = "운동선수형";
            document.getElementById('show_tips').innerHTML = "체형 유지를 잘 하고 계십니다. 추천드리는 식단 및 운동이 없습니다.";
            break;
    }
});


