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
                        location.href = "data.html";
                    },
                    error : function(request, status, error){
                        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                    }
                });
        
    }

    function getData(barcodeqr) {
        var qrData = {
            protocol_command: barcodeqr.slice(0, 2),
            ap_version: barcodeqr.slice(2, 8),
            received_date: barcodeqr.slice(8, 18),
            id_number: barcodeqr.slice(18, 38),
            sex: barcodeqr.slice(38, 39),
            age: barcodeqr.slice(39, 42),
            height: barcodeqr.slice(42, 46),
            weight: barcodeqr.slice(46, 50),
            weight_min_limit: barcodeqr.slice(50, 54),
            weight_low_limit: barcodeqr.slice(54, 58),
            std_weight: barcodeqr.slice(58, 62),
            weight_top_limit: barcodeqr.slice(62, 66),
            weight_max_limit: barcodeqr.slice(66, 70),
            weight_recommend: barcodeqr.slice(70, 74),
            lbm_quantity: barcodeqr.slice(74, 78),
            lbm_low_limit: barcodeqr.slice(78, 82),
            lbm_top_limit: barcodeqr.slice(82, 86),
            muscle_quantity: barcodeqr.slice(86, 90),
            muscle_min_limit: barcodeqr.slice(90, 94),
            muscle_low_limit: barcodeqr.slice(94, 98),
            muscle_standard: barcodeqr.slice(98, 102),
            muscle_top_limit: barcodeqr.slice(102, 106),
            muscle_max_limit: barcodeqr.slice(106, 110),
            tbw_quantity: barcodeqr.slice(110, 114),
            tbw_min_limit: barcodeqr.slice(114, 118),
            tbw_low_limit: barcodeqr.slice(118, 122),
            tbw_top_limit: barcodeqr.slice(122, 126),
            tbw_max_limit: barcodeqr.slice(126, 130),
            protein_quantity: barcodeqr.slice(130, 134),
            protein_low_limit: barcodeqr.slice(134, 138),
            protein_top_limit: barcodeqr.slice(138, 142),
            mineral_quantity: barcodeqr.slice(142, 146),
            mineral_low_limit: barcodeqr.slice(146, 150),
            mineral_top_limit: barcodeqr.slice(150, 154),
            mbf_quantity: barcodeqr.slice(154, 158),
            mbf_min_limit: barcodeqr.slice(158, 162),
            mbf_low_limit: barcodeqr.slice(162, 166),
            mbf_standard: barcodeqr.slice(166, 170),
            mbf_top_limit: barcodeqr.slice(170, 174),
            mbf_max_limit: barcodeqr.slice(174, 178),
            bone_slim: barcodeqr.slice(178, 182),
            bone_slim_min: barcodeqr.slice(182, 186),
            bone_slim_low: barcodeqr.slice(186, 190),
            bone_slim_top: barcodeqr.slice(190, 194),
            bone_slim_max: barcodeqr.slice(194, 198),
            bmi: barcodeqr.slice(198, 202),
            bmi_min_limit: barcodeqr.slice(202, 206),
            bmi_low_limit: barcodeqr.slice(206, 210),
            bmi_top_limit: barcodeqr.slice(210, 214),
            bmi_topmax_limit: barcodeqr.slice(214, 218),
            bmi_max_limit: barcodeqr.slice(218, 222),
            pbf_rate: barcodeqr.slice(222, 226),
            pbf_min_limit: barcodeqr.slice(226, 230),
            pbf_low_limit: barcodeqr.slice(230, 234),
            pbf_top_limit: barcodeqr.slice(234, 238),
            pbf_topmax_limit: barcodeqr.slice(238, 242),
            pbf_max_limit: barcodeqr.slice(242, 246),
            whr_rate: barcodeqr.slice(246, 249),
            whr_min: barcodeqr.slice(249, 252),
            whr_low: barcodeqr.slice(252, 255),
            whr_top: barcodeqr.slice(255, 258),
            whr_max: barcodeqr.slice(258, 261),
            vsr: barcodeqr.slice(261, 264),
            VSR_min_limit: barcodeqr.slice(264, 267),
            VSR_low_limit: barcodeqr.slice(267, 270),
            VSR_top_limit: barcodeqr.slice(270, 273),
            VSR_max_limit: barcodeqr.slice(273, 276),
            whr_type: barcodeqr.slice(276, 277),
            whr_level: barcodeqr.slice(277, 279),
            vfa: barcodeqr.slice(279, 282),
            vfa_min: barcodeqr.slice(282, 285),
            vfa_low: barcodeqr.slice(285, 288),
            vfa_top: barcodeqr.slice(288, 291),
            vfa_max: barcodeqr.slice(291, 294),
            mvf_quantity: barcodeqr.slice(294, 298),
            msf_quantity: barcodeqr.slice(298, 302),
            sfm_top: barcodeqr.slice(302, 306),
            bcm_in_water: barcodeqr.slice(306, 310),
            bcm_out_water: barcodeqr.slice(310, 314),
            edema: barcodeqr.slice(314, 317),
            bujong_judge_min: barcodeqr.slice(317, 320),
            bujong_judge_low: barcodeqr.slice(320, 323),
            bujong_judge_top: barcodeqr.slice(323, 326),
            bujong_judge_max: barcodeqr.slice(326, 330),
            fat_type: barcodeqr.slice(330, 332),
            fat_xy: barcodeqr.slice(332, 334),
            body_age: barcodeqr.slice(334, 337),
            bmr: barcodeqr.slice(337, 341),
            calory: barcodeqr.slice(341, 345),
            mbf_control_step: barcodeqr.slice(345, 346),
            bcm: barcodeqr.slice(346, 350),
            weight_control_value: barcodeqr.slice(350, 355),
            muscle_control_value: barcodeqr.slice(355, 360),
            mbf_control_value: barcodeqr.slice(360, 365),
            lbm_control_value: barcodeqr.slice(365, 370),
            target_to_control: barcodeqr.slice(370, 375),
            control_guide_for_me: barcodeqr.slice(375, 376),
            week_time_for_calory: barcodeqr.slice(376, 379),
            fat: barcodeqr.slice(379, 384),
            fat_low: barcodeqr.slice(384, 389),
            fat_top: barcodeqr.slice(389, 393),
            waist_measurement: barcodeqr.slice(393, 397),
            impedance: barcodeqr.slice(397, 401),
            left_hand_impedance_5k: barcodeqr.slice(401, 404),
            right_hand_impedance_5k: barcodeqr.slice(404, 407),
            left_foot_impedance_5k: barcodeqr.slice(407, 410),
            right_foot_impedance_5k: barcodeqr.slice(410, 413),
            trunk_impedance_5k: barcodeqr.slice(413, 416),
            left_hand_impedance_50k: barcodeqr.slice(416, 419),
            right_hand_impedance_50k: barcodeqr.slice(419, 422),
            left_foot_impedance_50k: barcodeqr.slice(422, 425),
            right_foot_impedance_50k: barcodeqr.slice(425, 428),
            trunk_impedance_50k: barcodeqr.slice(428, 431),
            left_hand_impedance_250k: barcodeqr.slice(431, 434),
            right_hand_impedance_250k: barcodeqr.slice(434, 437),
            left_foot_impedance_250k: barcodeqr.slice(437, 440),
            right_foot_impedance_250k: barcodeqr.slice(440, 443),
            trunk_impedance_250k: barcodeqr.slice(443, 446),
            beauty_weight: barcodeqr.slice(446, 450),
            total_score: barcodeqr.slice(450, 453),
            pa_quantity: barcodeqr.slice(453, 456),
            slm_graph_percent: barcodeqr.slice(456, 459),
            mode: barcodeqr.slice(459, 465),
            protein_grade: barcodeqr.slice(465, 466),
            mineral_grade: barcodeqr.slice(466, 467),
            bujong_judge: barcodeqr.slice(467, 468),
            muscle_grade_i: barcodeqr.slice(468, 473),
            mbf_grade_i: barcodeqr.slice(473, 478),
            kiko_kids_state: barcodeqr.slice(478, 479),
            Kiko_fatXY: barcodeqr.slice(479, 482),
            weight_for_kiko: barcodeqr.slice(482, 485),
            height_for_kiko: barcodeqr.slice(485, 488),
            sys: barcodeqr.slice(488, 491),
            mean: barcodeqr.slice(491, 494),
            dias: barcodeqr.slice(494, 497),
            pulse: barcodeqr.slice(497, 500),
            prp: barcodeqr.slice(500, 505),
            sys_se: barcodeqr.slice(505, 508),
            mean_se: barcodeqr.slice(508, 511),
            dias_se: barcodeqr.slice(511, 514),
            bca_main_set: barcodeqr.slice(514, 523),
            dex_mode: barcodeqr.slice(523, 524),
            bmr_mode: barcodeqr.slice(524, 525),
            IsKgLb: barcodeqr.slice(525, 526),
            end_mark: barcodeqr.slice(526, 527)
        }

        return qrData;
   // qr.kidney_dialysis = qr.mode.slice(4, 5);

    }

});


