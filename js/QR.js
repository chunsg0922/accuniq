$(function(){
    
    var result;
    // var barcode;
    // var urlData;
    var user = JSON.parse(sessionStorage.getItem("user"));
    var login = JSON.parse(sessionStorage.getItem("login"));
    var video = document.createElement("video");
    var canvasElement = document.getElementById("canvas");
    var canvas = canvasElement.getContext("2d");
    var loadingMessage = document.getElementById("loadingMessage");
    var outputContainer = document.getElementById("output");
    var outputMessage = document.getElementById("outputMessage");
    var outputData = document.getElementById("outputData");
    document.getElementById('nickname').innerHTML = user.nickname;

    function drawLine(begin, end, color) {
        canvas.beginPath();
        canvas.moveTo(begin.x, begin.y);
        canvas.lineTo(end.x, end.y);
        canvas.lineWidth = 4;
        canvas.strokeStyle = color;
        canvas.stroke();
    }

    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
    video.srcObject = stream;
    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
    video.play();
    requestAnimationFrame(tick);
    });

    function tick() {
        loadingMessage.innerText = "⌛ 카메라 불러오는중.."
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
        loadingMessage.hidden = true;
        canvasElement.hidden = false;
        outputContainer.hidden = false;

        // 비디오 화면 크기
        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
        });

        // QR코드 인식에 성공한 경우
        if (code) {
            drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
            drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
            drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
            drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
            outputMessage.hidden = true;
            outputData.parentElement.hidden = false;
            var barcode = code.data; // 변수 barcode에 QR코드 URL 저장

            var parse = barcode.split('bcadata='); // 변수 parse에 URL을 'bcadata=' 기준으로 파싱한다.
            var urlData = parse[1]; // 변수 urlData에 잘리진 URL 데이터의 두번째 인덱스를 저장한다.
            outputData.innerText = urlData;
            var send = getData(urlData); // getData()로 데이터 파싱
            console.log(typeof(send));
            console.log(send);
            measureData(send);


        } else {
            outputMessage.hidden = false;
            outputData.parentElement.hidden = true;
        }
    }
        requestAnimationFrame(tick);
    }

    function make_date(date){
        var local_date = parseInt(20 + date);
        var value_time = local_date - 197001010000;
        var time = value_time.toString();

        var year = parseInt(time.slice(0,2));
        var month = parseInt(time.slice(2,4));
        var day = parseInt(time.slice(4,6));
        var hour = parseInt(time.slice(6,8));
        var minute = parseInt(time.slice(8,10));

        year = year * 365 * 24 * 60 * 60 * 1000;
        month = month * 30 * 24 * 60 * 60 * 1000;
        day = day * 24 * 60 * 60 * 1000;
        hour = hour * 60 * 60 * 1000;
        minute = minute * 60 * 1000;

        var unix_time = year + month + day + hour + minute;

        return unix_time;
    }

    function measureData(qr){

        var time = make_date(qr[2]);

                $.ajax({
                    url: 'https://bca-proxy.accuniq.com/bodyComposition',
                    type: 'POST',
                    xhrFields:{
                        withCredentials: true
                    },
                    data: {
                        selectKg : 0, // 0: A4&Kg , 1: Letter&Lb , 2: A4&Lb
                        owner : user._id, // 회원의 ID
                        createdBy : user._id, // 회원의 ID
                        updatedBy : user._id, // 회원의 ID
                        date : time, // 측정 날짜
                        weight : parseInt(qr[7]) / 10, // 체중
                        weightMin : parseInt(qr[8]) / 10,
                        weightMax : parseInt(qr[12]) / 10,
                        weightLow : parseInt(qr[9]) / 10,
                        weightTop : parseInt(qr[11]) / 10,
                        muscle : parseInt(qr[17]) / 10, // 근육량
                        muscleMin : parseInt(qr[18]) / 10,
                        muscleMax : parseInt(qr[22]) / 10, 
                        muscleLow : parseInt(qr[19]) / 10,
                        muscleTop : parseInt(qr[21]) / 10,
                        fatmass : parseInt(qr[34]) / 10, // 체지방량
                        fatmassMin : parseInt(qr[35]) / 10,
                        fatmassMax : parseInt(qr[39]) / 10,
                        fatmassLow : parseInt(qr[36]) / 10,
                        fatmassTop : parseInt(qr[38]) / 10,
                        fatper : parseInt(qr[51]) / 10, // 체지방률
                        fatperMin : parseInt(qr[52]) / 10,
                        fatperMax : parseInt(qr[56]) / 10,
                        fatperLow : parseInt(qr[53]) / 10,
                        fatperTop : parseInt(qr[55]) / 10,
                        fatLevel : parseInt(qr[68]), // 내장지방레벨
                        bmi : parseInt(qr[45]) / 10, // 체질량지수
                        bmiMin : parseInt(qr[46]) / 10,
                        bmiMax : parseInt(qr[50]) / 10,
                        bmiLow : parseInt(qr[47]) / 10,
                        bmiTop : parseInt(qr[48]) / 10,
                        moisture : parseInt(qr[23]) / 10, // 체수분
                        moistureMin : parseInt(qr[24]) / 10,
                        moistureMax : parseInt(qr[27]) / 10,
                        moistureLow : parseInt(qr[25]) / 10,
                        moistureTop : parseInt(qr[26]) / 10,
                        protein : parseInt(qr[28]) / 10, // 단백질
                        proteinMin : parseInt(qr[29]) / 10,
                        proteinMax : parseInt(qr[30]) / 10,
                        proteinLow : parseInt(qr[29]) / 10,
                        proteinTop : parseInt(qr[30]) / 10,
                        mineral : parseInt(qr[31]) / 10, // 무기질
                        mineralMin : parseInt(qr[32]) / 10,
                        mineralMax : parseInt(qr[33]) / 10,
                        mineralLow : parseInt(qr[32]) / 10,
                        mineralTop : parseInt(qr[33]) / 10,
                        fat : parseInt(qr[34]) / 10, // 체지방량
                        fatMin : parseInt(qr[35]) / 10,
                        fatMax : parseInt(qr[39]) / 10,
                        fatLow : parseInt(qr[36]) / 10,
                        fatTop : parseInt(qr[38]) / 10,
                        bodyJudge : parseInt(qr[84]) + 75, // 체형판정
                        bodyAge : parseInt(qr[86]), // 신체연령
                        showBmr : parseInt(qr[87]), // 기초대사량
                        showDayCal : parseInt(qr[88]), // 일일 필요열량
                        encourageWeight : parseInt(qr[13]) / 10, // 권장체중
                        weightControl : parseInt(qr[91]) / 10, // 체중 조절치
                        fatAdjust : parseInt(qr[93]) / 10, // 체지방량 조절치
                        muscleAdjust : parseInt(qr[92]) / 10, // 근육량 조절치
                        sex : parseInt(qr[4]),
                        age : parseInt(qr[5]),
                        height : parseInt(qr[6]) / 10,
                        isDeleted : false // 삭제 여부
                    },
                    dataType: 'JSON',
                    success: function(msg){
                        alert('데이터 전송 성공');
                        console.log(msg);
                        // location.href = "data.html";
                    },
                    error : function(request, status, error){
                        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                    }
                });
        
    }

    function getData(barcodeqr) {
        var qrData = [
            barcodeqr.slice(0, 2),
            barcodeqr.slice(2, 8),
            barcodeqr.slice(8, 18),
            barcodeqr.slice(18, 38),
            barcodeqr.slice(38, 39),
            barcodeqr.slice(39, 42),
            barcodeqr.slice(42, 46),
            barcodeqr.slice(46, 50),
            barcodeqr.slice(50, 54),
            barcodeqr.slice(54, 58),
            barcodeqr.slice(58, 62),
            barcodeqr.slice(62, 66),
            barcodeqr.slice(66, 70),
            barcodeqr.slice(70, 74),
            barcodeqr.slice(74, 78),
            barcodeqr.slice(78, 82),
            barcodeqr.slice(82, 86),
            barcodeqr.slice(86, 90),
            barcodeqr.slice(90, 94),
            barcodeqr.slice(94, 98),
            barcodeqr.slice(98, 102),
            barcodeqr.slice(102, 106),
            barcodeqr.slice(106, 110),
            barcodeqr.slice(110, 114),
            barcodeqr.slice(114, 118),
            barcodeqr.slice(118, 122),
            barcodeqr.slice(122, 126),
            barcodeqr.slice(126, 130),
            barcodeqr.slice(130, 134),
            barcodeqr.slice(134, 138),
            barcodeqr.slice(138, 142),
            barcodeqr.slice(142, 146),
            barcodeqr.slice(146, 150),
            barcodeqr.slice(150, 154),
            barcodeqr.slice(154, 158),
            barcodeqr.slice(158, 162),
            barcodeqr.slice(162, 166),
            barcodeqr.slice(166, 170),
            barcodeqr.slice(170, 174),
            barcodeqr.slice(174, 178),
            barcodeqr.slice(178, 182),
            barcodeqr.slice(182, 186),
            barcodeqr.slice(186, 190),
            barcodeqr.slice(190, 194),
            barcodeqr.slice(194, 198),
            barcodeqr.slice(198, 202),
            barcodeqr.slice(202, 206),
            barcodeqr.slice(206, 210),
            barcodeqr.slice(210, 214),
            barcodeqr.slice(214, 218),
            barcodeqr.slice(218, 222),
            barcodeqr.slice(222, 226),
            barcodeqr.slice(226, 230),
            barcodeqr.slice(230, 234),
            barcodeqr.slice(234, 238),
            barcodeqr.slice(238, 242),
            barcodeqr.slice(242, 246),
            barcodeqr.slice(246, 249),
            barcodeqr.slice(249, 252),
            barcodeqr.slice(252, 255),
            barcodeqr.slice(255, 258),
            barcodeqr.slice(258, 261),
            barcodeqr.slice(261, 264),
            barcodeqr.slice(264, 267),
            barcodeqr.slice(267, 270),
            barcodeqr.slice(270, 273),
            barcodeqr.slice(273, 276),
            barcodeqr.slice(276, 277),
            barcodeqr.slice(277, 279),
            barcodeqr.slice(279, 282),
            barcodeqr.slice(282, 285),
            barcodeqr.slice(285, 288),
            barcodeqr.slice(288, 291),
            barcodeqr.slice(291, 294),
            barcodeqr.slice(294, 298),
            barcodeqr.slice(298, 302),
            barcodeqr.slice(302, 306),
            barcodeqr.slice(306, 310),
            barcodeqr.slice(310, 314),
            barcodeqr.slice(314, 317),
            barcodeqr.slice(317, 320),
            barcodeqr.slice(320, 323),
            barcodeqr.slice(323, 326),
            barcodeqr.slice(326, 330),
            barcodeqr.slice(330, 332),
            barcodeqr.slice(332, 334),
            barcodeqr.slice(334, 337),
            barcodeqr.slice(337, 341),
            barcodeqr.slice(341, 345),
            barcodeqr.slice(345, 346),
            barcodeqr.slice(346, 350),
            barcodeqr.slice(350, 355),
            barcodeqr.slice(355, 360),
            barcodeqr.slice(360, 365),
            barcodeqr.slice(365, 370),
            barcodeqr.slice(370, 375),
            barcodeqr.slice(375, 376),
            barcodeqr.slice(376, 379),
            barcodeqr.slice(379, 384),
            barcodeqr.slice(384, 389),
            barcodeqr.slice(389, 393),
            barcodeqr.slice(393, 397),
            barcodeqr.slice(397, 401),
            barcodeqr.slice(401, 404),
            barcodeqr.slice(404, 407),
            barcodeqr.slice(407, 410),
            barcodeqr.slice(410, 413),
            barcodeqr.slice(413, 416),
            barcodeqr.slice(416, 419),
            barcodeqr.slice(419, 422),
            barcodeqr.slice(422, 425),
            barcodeqr.slice(425, 428),
            barcodeqr.slice(428, 431),
            barcodeqr.slice(431, 434),
            barcodeqr.slice(434, 437),
            barcodeqr.slice(437, 440),
            barcodeqr.slice(440, 443),
            barcodeqr.slice(443, 446),
            barcodeqr.slice(446, 450),
            barcodeqr.slice(450, 453),
            barcodeqr.slice(453, 456),
            barcodeqr.slice(456, 459),
            barcodeqr.slice(459, 465),
            barcodeqr.slice(465, 466),
            barcodeqr.slice(466, 467),
            barcodeqr.slice(467, 468),
            barcodeqr.slice(468, 473),
            barcodeqr.slice(473, 478),
            barcodeqr.slice(478, 479),
            barcodeqr.slice(479, 482),
            barcodeqr.slice(482, 485),
            barcodeqr.slice(485, 488),
            barcodeqr.slice(488, 491),
            barcodeqr.slice(491, 494),
            barcodeqr.slice(494, 497),
            barcodeqr.slice(497, 500),
            barcodeqr.slice(500, 505),
            barcodeqr.slice(505, 508),
            barcodeqr.slice(508, 511),
            barcodeqr.slice(511, 514),
            barcodeqr.slice(514, 523),
            barcodeqr.slice(523, 524),
            barcodeqr.slice(524, 525),
            barcodeqr.slice(525, 526),
            barcodeqr.slice(526, 527)
    ]
        
        console.log(qrData);
        return qrData;
   // qr.kidney_dialysis = qr.mode.slice(4, 5);

    }

});


