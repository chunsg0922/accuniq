
function register(){
    $.ajax({
        url: 'https://bca-proxy.accuniq.com/register',
    type: 'POST',
    xhrFields : {
        withCredentials: true
    },
    data: {
        username: $('#RegisterEmail').val(),
        email: $('#RegisterEmail').val(),
        nickname: "웹가입 회원",
        password: $('#RegisterPassword').val()
    },
    dataType: 'JSON',
    success: function(msg){
        alert('회원가입 성공');
        location.href = "login.html";

    },
    error: function(msg){

    }
    });
}