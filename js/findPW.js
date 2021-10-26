function findPW(){
    $.ajax({
        url: 'http://bca-app2.accuniq.com/forgotPassword',
    type: 'POST',
    xhrFields : {
        withCredentials: true
    },
    data: {
        email: $('#FindPWEmail').val(),
        lang: "ko"
    },
    dataType: 'JSON',
    success: function(msg){
        alert('이메일로 비밀번호 재설정 코드를 보냈습니다.');

    },
    error: function(msg){

    }
    });
}