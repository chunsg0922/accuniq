$(function(){
    var user = JSON.parse(localStorage.getItem("user"));

            $.ajax({
                url: 'http://bca-proxy.accuniq.com/bodyComposition/find?query={%22where%22:{%22owner%22:' + user._id + '}}',
                type: 'GET',
                dataType: 'JSON',
                xhrFields:{
                    withCredentials: true
                },
                success: function(msg){
                    alert('체성분 데이터 로딩 성공');
                    var info = msg.bodyComposition[0];

                    var bodyComposition_findone={
                        "age" : info.age,
                        "bmi" : info.bmi,
                        "bmiLow" : info.bmiLow,
                        "bmiMax" : info.bmiMax,
                        "bmiMin" : info.bmiMin,
                        "bmiTop" : info.bmiTop,
                        "bodyAge" : info.bodyAge,
                        "bodyJudge" : info.bodyJudge,
                        "createdAt" : info.createdAt,
                        "createdBy" : info.createdBy,
                        "date" : info.date,
                        "encourageWeigth" : info.encourageWeigth,
                        "fat" : info.fat,
                        "fatAdjust" : info.fatAdjust,
                        "fatLevel" : info.fatLevel,
                        "fatLow" : info.fatLow,
                        "fatMax" : info.fatMax,
                        "fatMin" : info.fatMin,
                        "fatTop" : info.fatTop,
                        "fatmass" : info.fatmass,
                        "fatmassLow" : info.fatmassLow,
                        "fatmassMax" : info.fatmassMax,
                        "fatmassMin" : info.fatmassMin,
                        "fatmassTop" : info.fatmassTop,
                        "fatper" : info.fatper,
                        "fatperLow" : info.fatperLow,
                        "fatperMax" : info.fatperMax,
                        "fatperMin" : info.fatperMin,
                        "fatperTop" : info.fatperTop,
                        "height" : info.height,
                        "id" : info.id,
                        "isDeleted" : info.isDeleted,
                        "lastUpdatedAt" : info.lastUpdatedAt,
                        "mineral" : info.mineral,
                        "mineralLow" : info.mineralLow,
                        "mineralMax" : info.mineralMax,
                        "mineralMin" : info.mineralMin,
                        "mineralTop" : info.mineralTop,
                        "muscle" : info.muscle,
                        "muscleAdjust" : info.muscleAdjust,
                        "muscleLow" : info.muscleLow,
                        "muscleMax" : info.muscleMax,
                        "muscleMin" : info.muscleMin,
                        "muscleTop" : info.muscleTop,
                        "owner" : info.owner,
                        "protein" : info.protein,
                        "proteinLow" : info.proteinLow,
                        "proteinMax" : info.proteinMax,
                        "proteinMin" : info.proteinMin,
                        "proteinTop" : info.proteinTop,
                        "selectKg" : info.selectKg,
                        "sex" : info.sex,
                        "showBmr" : info.showBmr,
                        "showDayCal" : info.showDayCal,
                        "updatedAt" : info.updatedAt,
                        "updatedBy" : info.updatedBy,
                        "weight" : info.weight,
                        "weightControl" : info.weightControl,
                        "weightLow" : info.weightLow,
                        "weightMax" : info.weightMax,
                        "weightMin" : info.weightMin,
                        "weightTop" : info.weightTop,
                        "__v" : info.__v,
                        "_id" : info._id
                    }
                    localStorage.setItem("bodyComposition1", JSON.stringify(bodyComposition_findone));
                    console.log(bodyComposition_findone);
                },
                error: function(){
                    alert('체성분 정보를 불러오는데 실패했습니다.');
                }
            });


    console.log(user);
    document.getElementById('nickname').innerHTML=user.nickname;
    document.getElementById('info_email').innerHTML=user.email;
    document.getElementById('info_age').innerHTML=user.age;
});


