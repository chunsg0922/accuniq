$(function(){
    var user = JSON.parse(sessionStorage.getItem("user"));
    document.getElementById('nickname').innerHTML = user.nickname;

    $.ajax({
        url: 'https://bca-proxy.accuniq.com/bodyComposition/findone?query={%22where%22:{%22owner%22:' + user._id + '}}',
            type: 'GET',
            dataType: 'JSON',
            async: false,
            cache: false,
            xhrFields:{
                withCredentials: true
            },
            success: function(msg){
                console.log('체성분 데이터 로딩 성공');
                pp = msg.bodyComposition;

                if(msg.bodyComposition == null){
                    alert('측정 데이터가 존재하지 않습니다.');
                }
    
                else if(msg.bodyComposition != null){
                    var result = msg.bodyComposition;
                    sessionStorage.setItem("body_one", JSON.stringify(result));
                    console.log(result);
                    alert('측정 데이터 불러오기 성공');
            }
            },
            error: function(request, status, error){
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
    });
})