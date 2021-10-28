$(function(){
    var user = JSON.parse(sessionStorage.getItem("user"));
    document.getElementById('info_nickname').innerHTML = user.nickname + '님!';
    document.getElementById('info_email').innerHTML = user.email;


    function modify_()
});
