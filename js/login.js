
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
        location.href = "index.html";
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
        localStorage.setItem("user", JSON.stringify(user));

        
    }, error: function(){
        alert('로그인 정보 오류');
        console.log('실패');
    } 
    });  
}
