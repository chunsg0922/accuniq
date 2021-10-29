$(function(){

});
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
        var token = msg.token;
        var user = msg.user;
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

                if(msg.bodyCompositions.length == 0){
                    alert('측정 데이터가 존재하지 않습니다.');
                }

                else if(msg.bodyCompositions.length == 1){
                    var result = msg.bodyCompositions[0];
                    sessionStorage.setItem("body_one", JSON.stringify(result));
                    console.log(result);
            }
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
