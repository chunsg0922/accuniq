
var login;
function login(){

    login = $.ajax({
    url: 'https://bca-proxy.accuniq.com/login',
    type: 'POST',
    xhrFields : {
        withCredentials: true
    },
    data: {
        identifier: $('#email').val(),
        password: $('#password').val()
    },
    dataType: 'JSON',
    success: function(msg){
        alert('로그인 성공');        
        var info = msg.user;
        var user={
            "_id" : info._id,
            "username" : info.username,
            "updatedAt" : info.updatedAt,
            "email" : info.email,
            "__v" : info.__v,
            "nickname" : info.nickname,
            "age" : info.age,
            "fatperPush" : info.fatperPush,
            "musclePush" : info.musclePush,
            "weigthPush" : info.weigthPush,
            "lastUpdatedAt" : info.lastUpdatedAt,
            "createdAt" : info.createdAt,
            "isDeleted" : info.isDeleted,
            "likes" : info.likes,
            "view" : info.views,
            "roles" : info.roles,
            "photos" : info.photos,
            "password_reset_request_time" : info.password_reset_request_time
        }
        sessionStorage.setItem("user", JSON.stringify(user));

        $.ajax({
            url: 'https://bca-proxy.accuniq.com/bodyComposition/find?query={%22where%22:{%22owner%22:' + user._id + '}}',
            type: 'GET',
            dataType: 'JSON',
            xhrFields:{
                withCredentials: true
            },
            success: function(msg){
                console.log('체성분 데이터 로딩 성공');
                console.log(msg);
                var result = msg.bodyCompositions[0];

                var bodyComposition_findone={
                    "age" : result.age,
                    "bmi" : result.bmi,
                    "bmiLow" : result.bmiLow,
                    "bmiMax" : result.bmiMax,
                    "bmiMin" : result.bmiMin,
                    "bmiTop" : result.bmiTop,
                    "bodyAge" : result.bodyAge,
                    "bodyJudge" : result.bodyJudge,
                    "createdAt" : result.createdAt,
                    "createdBy" : result.createdBy,
                    "date" : result.date,
                    "encourageWeigth" : result.encourageWeigth,
                    "fat" : result.fat,
                    "fatAdjust" : result.fatAdjust,
                    "fatLevel" : result.fatLevel,
                    "fatLow" : result.fatLow,
                    "fatMax" : result.fatMax,
                    "fatMin" : result.fatMin,
                    "fatTop" : result.fatTop,
                    "fatmass" : result.fatmass,
                    "fatmassLow" : result.fatmassLow,
                    "fatmassMax" : result.fatmassMax,
                    "fatmassMin" : result.fatmassMin,
                    "fatmassTop" : result.fatmassTop,
                    "fatper" : result.fatper,
                    "fatperLow" : result.fatperLow,
                    "fatperMax" : result.fatperMax,
                    "fatperMin" : result.fatperMin,
                    "fatperTop" : result.fatperTop,
                    "height" : result.height,
                    "id" : result.id,
                    "isDeleted" : result.isDeleted,
                    "lastUpdatedAt" : result.lastUpdatedAt,
                    "mineral" : result.mineral,
                    "mineralLow" : result.mineralLow,
                    "mineralMax" : result.mineralMax,
                    "mineralMin" : result.mineralMin,
                    "mineralTop" : result.mineralTop,
                    "moisture" : result.moisture,
                    "moistureLow" : result.moistureLow,
                    "moistureMax" : result.moistureMax,
                    "moistureMin" : result.moistureMin,
                    "moistureTop" : result.moistureTop,
                    "muscle" : result.muscle,
                    "muscleAdjust" : result.muscleAdjust,
                    "muscleLow" : result.muscleLow,
                    "muscleMax" : result.muscleMax,
                    "muscleMin" : result.muscleMin,
                    "muscleTop" : result.muscleTop,
                    "owner" : result.owner,
                    "protein" : result.protein,
                    "proteinLow" : result.proteinLow,
                    "proteinMax" : result.proteinMax,
                    "proteinMin" : result.proteinMin,
                    "proteinTop" : result.proteinTop,
                    "selectKg" : result.selectKg,
                    "sex" : result.sex,
                    "showBmr" : result.showBmr,
                    "showDayCal" : result.showDayCal,
                    "updatedAt" : result.updatedAt,
                    "updatedBy" : result.updatedBy,
                    "weight" : result.weight,
                    "weightControl" : result.weightControl,
                    "weightLow" : result.weightLow,
                    "weightMax" : result.weightMax,
                    "weightMin" : result.weightMin,
                    "weightTop" : result.weightTop,
                    "__v" : result.__v,
                    "_id" : result._id
                };
                sessionStorage.setItem("bodyComposition_findone", JSON.stringify(bodyComposition_findone));
                console.log(bodyComposition_findone);
            },
            error: function(){
                alert('체성분 정보를 불러오는데 실패했습니다.');
            }
        });
        location.href = "index.html";
    }, error: function(){
        alert('로그인 정보 오류');
        console.log('실패');
    } 
    });  
}
