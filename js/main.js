
$(function(){
    var user = JSON.parse(sessionStorage.getItem("user"));
    var bodyComposition_findone = JSON.parse(sessionStorage.getItem("bodyComposition_findone"));
    var timestamp = parseInt(bodyComposition_findone.date);
    var date = new Date(timestamp);
    var show_date = date.getFullYear() +'년 ' + (date.getMonth()+1) + '월 ' + date.getDate() + '일';
    var show_time = date.getHours() + ':' + date.getMinutes();

    var bar_weight = document.getElementById('show_bar_weight');
    var bar_muscle = document.getElementById('show_bar_muscle');
    var bar_fatper = document.getElementById('show_bar_fatper');

    console.log(user);
    console.log(bodyComposition_findone);
    document.getElementById('nickname').innerHTML=user.nickname;
    document.getElementById('show_weight').innerHTML= bodyComposition_findone.weight + ' kg';
    document.getElementById('show_muscle').innerHTML= bodyComposition_findone.muscle + ' kg';
    document.getElementById('show_fatper').innerHTML= bodyComposition_findone.fatper + ' %';
    document.getElementById('show_date').innerHTML=show_date;
    document.getElementById('show_time').innerHTML=show_time;

    /****************************************
    *  그래프를 나타내기 위한 Attribute 설정  *
    *****************************************/
    bar_weight.setAttribute('aria-valuenow', bodyComposition_findone.weight);
    bar_weight.setAttribute('aria-valuemin', bodyComposition_findone.weightMin);
    bar_weight.setAttribute('aria-valuemax', bodyComposition_findone.weightMax);
    bar_muscle.setAttribute('aria-valuenow', bodyComposition_findone.muscle);
    bar_muscle.setAttribute('aria-valuemin', bodyComposition_findone.muscleMin);
    bar_muscle.setAttribute('aria-valuemax', bodyComposition_findone.muscleMax);
    bar_muscle.setAttribute('aria-valuenow', bodyComposition_findone.fatper);
    bar_muscle.setAttribute('aria-valuemin', bodyComposition_findone.fatperMin);
    bar_muscle.setAttribute('aria-valuemax', bodyComposition_findone.fatperMax);

    w_min = bodyComposition_findone.weightMin - bodyComposition_findone.weightMin;
    w_max = bodyComposition_findone.weightMax - bodyComposition_findone.weightMin;
    w = bodyComposition_findone.weight - bodyComposition_findone.weightMin;
    
    mu_min = bodyComposition_findone.muscleMin - bodyComposition_findone.muscleMin;
    mu_max = bodyComposition_findone.muscleMax - bodyComposition_findone.muscleMin;
    mu = bodyComposition_findone.muscle - bodyComposition_findone.muscleMin;

    fp_min = bodyComposition_findone.fatperMin - bodyComposition_findone.fatperMin;
    fp_max = bodyComposition_findone.fatperMax - bodyComposition_findone.fatperMin;
    fp = bodyComposition_findone.fatper - bodyComposition_findone.fatperMin;

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
    var bodyjudge = bodyComposition_findone.bodyJudge;
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


