$(function(){
    
});

function login(){
    var lo;

    lo = $.ajax({
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
    success: function(msg, status, xhr){
        alert('로그인 성공');  
        var token = msg.token;
        var user = msg.user;
        console.log(xhr.getAllResponseHeader());
        sessionStorage.setItem("user", JSON.stringify(user));
        
        $.ajax({
            url: 'https://bca-proxy.accuniq.com/bodyComposition/find?query={%22where%22:{%22owner%22:' + user._id + '}}',
            type: 'GET',
            dataType: 'JSON',
            async: false,
            cache: false,
            xhrFields:{
                withCredentials: true
            },
            success: function(msg){
                console.log('체성분 데이터 로딩 성공');
    
                if(msg.bodyCompositions.length == 0){
                    alert('측정 데이터가 존재하지 않습니다.');
                }
    
                else if(msg.bodyCompositions.length == 1){
                    var result = msg.bodyCompositions[0];
                    sessionStorage.setItem("body_one", JSON.stringify(result));
                    console.log(result);
                    alert('측정 데이터 불러오기 성공');
            }
            },
            error: function(request, status, error){
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });
        location.href = "index.html";
    }, error: function(){
        alert('로그인 정보 오류');
        console.log('실패');
    } 
    });  
}
