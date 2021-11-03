$(function(){
    var user = JSON.parse(sessionStorage.getItem("user"));
    document.getElementById('nickname').innerHTML = user.nickname;
    document.getElementById('info_nickname').innerHTML = user.nickname + '님!';
    document.getElementById('info_email').innerHTML = user.email;
    document.getElementById('info_age').innerHTML = user.age;
});
    function modify_age(){

    }

    function modify_password(){
        var input_password = document.createElement("input");
        var btn_password = document.createElement("input");

        input_password.setAttribute("type", "password");
        input_password.setAttribute("style", "font-size: 14px;");
        input_password.setAttribute("id", "input_pw");
        btn_password.setAttribute("type", "button");
        btn_password.setAttribute("class", "btn btn-success");
        btn_password.setAttribute("value", "변경하기");
        btn_password.setAttribute("onclick", "password_change()");

        var info_password = document.getElementById('info_password');
        var btn_area = document.getElementById('btn_area');
        info_password.appendChild(input_password);
        btn_area.appendChild(btn_password);

        function password_change(){
            $.ajax({
                url: 'https://bca-proxy.accuniq.com/forgotpasswordcomplete',
                type: 'PUT',
                dataType: 'JSON',
                data: {
                    email: user.email,
                    newPassword: $('#info_password').val()
                },
                success: function(msg){
                    alert('성공적으로 변경되었습니다.');
                    info_password.removeChild(input_password);
                    info_password.removeChild(btn_password);
                }
            });
        }
    }

