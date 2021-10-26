$(function(){
    document.cookie = " SameSite=None;"
    var user = JSON.parse(localStorage.getItem("user"));
    var pw = localStorage.getItem("passwd");

            $.ajax({
                url: 'http://bca-app2.accuniq.com/bodyComposition/find?query={%22where%22:{%22_id%22:' + user._id + '}}',
                type: 'GET',
                dataType: 'JSON',
                beforeSend: function(xhr){
                    xhr.setRequestHeader("set-cookie", "connect.sid=s%3Af1IOwtjcfjdK0vlbtap23fX470Dl8rf0.%2FEBBWc4k5MzlVwHhngsFOmGboUav1Psmm5cOM%2F9q8dc; Path=/; Expires=Mon, 25 Oct 2021 01:30:30 GMT; HttpOnly");
                },
                xhrFields:{
                    withCredentials: true
                },
                success: function(msg){
                    var bodyComposition1={
                        "_id" : msg.bodyComposition._id,
                        "selectKg" : msg.bodyComposition.selectKg
                    }
                    localStorage.setItem("bodyComposition1", JSON.stringify(bodyComposition1));
                    console.log(bodyComposition1);
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


