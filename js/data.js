$(function(){
    var user = JSON.parse(sessionStorage.getItem("user"));
    var result = JSON.parse(sessionStorage.getItem("QRdata"));
    document.getElementById('nickname').innerHTML = user.nickname;

    var timestamp = parseInt(result.date);
    var date = new Date(timestamp);
    var show_date = date.getFullYear() +'년 ' + (date.getMonth()+1) + '월 ' + date.getDate() + '일';
    var show_time = date.getHours() + ':' + date.getMinutes();

    var bar_weight = document.getElementById('show_bar_weight');
    var bar_muscle = document.getElementById('show_bar_muscle');
    var bar_fatper = document.getElementById('show_bar_fatper');

    console.log(user);
    console.log(result);
    document.getElementById('nickname').innerHTML=user.nickname;
    document.getElementById('show_weight').innerHTML= result.weight + ' kg';
    document.getElementById('show_muscle').innerHTML= result.muscle + ' kg';
    document.getElementById('show_fatper').innerHTML= result.fatper + ' %';
    document.getElementById('show_date').innerHTML=show_date;
    document.getElementById('show_time').innerHTML=show_time;

    /*********************************************
    *  도넛 그래프를 나타내기 위한 Attribute 설정  *
    **********************************************/
    bar_weight.setAttribute('aria-valuenow', result.weight);
    bar_weight.setAttribute('aria-valuemin', result.weightMin);
    bar_weight.setAttribute('aria-valuemax', result.weightMax);
    bar_muscle.setAttribute('aria-valuenow', result.muscle);
    bar_muscle.setAttribute('aria-valuemin', result.muscleMin);
    bar_muscle.setAttribute('aria-valuemax', result.muscleMax);
    bar_muscle.setAttribute('aria-valuenow', result.fatper);
    bar_muscle.setAttribute('aria-valuemin', result.fatperMin);
    bar_muscle.setAttribute('aria-valuemax', result.fatperMax);

    w_min = result.weightMin - result.weightMin;
    w_max = result.weightMax - result.weightMin;
    w = result.weight - result.weightMin;
    
    mu_min = result.muscleMin - result.muscleMin;
    mu_max = result.muscleMax - result.muscleMin;
    mu = result.muscle - result.muscleMin;

    fp_min = result.fatperMin - result.fatperMin;
    fp_max = result.fatperMax - result.fatperMin;
    fp = result.fatper - result.fatperMin;

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
    var bodyJudge = result.bodyJudge;
    switch(bodyJudge){
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

    $.ajax({
        url: 'https://bca-proxy.accuniq.com/bodyComposition/find?query={%22where%22:{%22owner%22:' + user._id + '}, "sort":{"_id":-1}, "limit":1}',
        type: 'GET',
        dataType: 'JSON',
        async: false,
        cache: false,
        xhrFields:{
            withCredentials: true
        },
        success: function(msg){
            console.log('체성분 데이터 로딩 성공');
            pp = msg.bodyCompositions[0];
            console.log(pp);


            if(msg.bodyCompositions.length == 0){
                alert('측정 데이터가 존재하지 않습니다.');
            }

            else {
                var body_one = msg.bodyCompositions[0];
                sessionStorage.setItem("body_one", JSON.stringify(body_one));
                console.log(body_one);

                // 여기에 데이터 표시할 항목들 넣어주기!
                
        }
        },
        error: function(request, status, error){
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
})