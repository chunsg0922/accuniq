$(function(){
    document.cookie = "crossCookie=bar; SameSite=None; Secure;"
});

function login(){
    var xhr = new XMLHttpRequest();
    var pw = $('#password').val();

    var cookies;
    cookies = $.ajax({
    url: 'https://bca-app2.accuniq.com/login',
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
  //      location.href = "index.html";
        console.log(cookies.getResponseHeader('Content-Length'));
        alert(cookies.getResponseHeader('set-cookie'));
        localStorage.setItem("passwd", pw);
        // document.cookie = xhr.getResponseHeader("Cookie");
        // xhr.onreadystatechange = function(){
        //     if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
        //         console.log(xhr.getAllResponseHeaders());
            console.log(document.cookie);
        //     }
        // };
        // xhr.open("POST", "https://bca-app2.accuniq.com/login?identifier=" + $('#email').val() + "&password=" + $('#password').val(), true);
        // xhr.send();


        var user={
            "_id" : msg.user._id,
            "username" : msg.user.username,
            "updatedAt" : msg.user.updatedAt,
            "email" : msg.user.email,
            "__v" : msg.user.__v,
            "nickname" : msg.user.nickname,
            "age" : msg.user.age,
            "fatperPush" : msg.user.fatperPush,
            "musclePush" : msg.user.musclePush,
            "weigthPush" : msg.user.weigthPush,
            "lastUpdatedAt" : msg.user.lastUpdatedAt,
            "createdAt" : msg.user.createdAt,
            "isDeleted" : msg.user.isDeleted,
            "likes" : msg.user.likes,
            "view" : msg.user.views,
            "roles" : msg.user.roles,
            "photos" : msg.user.photos,
            "password_reset_request_time" : 0
        }
        localStorage.setItem("user", JSON.stringify(user));

        
    }, error: function(){
        alert('로그인 정보 오류');
        console.log('실패');
    } 
    });  
}
