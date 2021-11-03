$(function(){
    var qrData;
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
            var barcode = code.data;

           // location.href = "data.html";

            var parse = barcode.split('bcadata=');
            var urlData = parse[1];
            outputData.innerText = urlData;
            alert(urlData);
            getData(urlData);
            measureData();


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

    function measureData(){

        var time = make_date(qrData[2]);
        $.ajax({
            url: 'https://bca-proxy.accuniq.com/login',
            type: 'POST',
            xhrFields : {
                withCredentials: true
            },
            data: {
                identifier : user.email,
                password : login
            },
            dataType: 'JSON',
            success: function(){
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
                        weight : parseInt(qrData[7]) / 10, // 체중
                        weightMin : parseInt(qrData[8]) / 10,
                        weightMax : parseInt(qrData[12]) / 10,
                        weightLow : parseInt(qrData[9]) / 10,
                        weightTop : parseInt(qrData[11]) / 10,
                        muscle : parseInt(qrData[17]) / 10, // 근육량
                        muscleMin : parseInt(qrData[18]) / 10,
                        muscleMax : parseInt(qrData[22]) / 10, 
                        muscleLow : parseInt(qrData[19]) / 10,
                        muscleTop : parseInt(qrData[21]) / 10,
                        fatmass : parseInt(qrData[34]) / 10, // 체지방량
                        fatmassMin : parseInt(qrData[35]) / 10,
                        fatmassMax : parseInt(qrData[39]) / 10,
                        fatmassLow : parseInt(qrData[36]) / 10,
                        fatmassTop : parseInt(qrData[38]) / 10,
                        fatper : parseInt(qrData[51]) / 10, // 체지방률
                        fatperMin : parseInt(qrData[52]) / 10,
                        fatperMax : parseInt(qrData[56]) / 10,
                        fatperLow : parseInt(qrData[53]) / 10,
                        fatperTop : parseInt(qrData[55]) / 10,
                        fatLevel : parseInt(qrData[68]), // 내장지방레벨
                        bmi : parseInt(qrData[45]) / 10, // 체질량지수
                        bmiMin : parseInt(qrData[46]) / 10,
                        bmiMax : parseInt(qrData[50]) / 10,
                        bmiLow : parseInt(qrData[47]) / 10,
                        bmiTop : parseInt(qrData[48]) / 10,
                        moisture : parseInt(qrData[23]) / 10, // 체수분
                        moistureMin : parseInt(qrData[24]) / 10,
                        moistureMax : parseInt(qrData[27]) / 10,
                        moistureLow : parseInt(qrData[25]) / 10,
                        moistureTop : parseInt(qrData[26]) / 10,
                        protein : parseInt(qrData[28]) / 10, // 단백질
                        proteinMin : parseInt(qrData[29]) / 10,
                        proteinMax : parseInt(qrData[30]) / 10,
                        proteinLow : parseInt(qrData[29]) / 10,
                        proteinTop : parseInt(qrData[30]) / 10,
                        mineral : parseInt(qrData[31]) / 10, // 무기질
                        mineralMin : parseInt(qrData[32]) / 10,
                        mineralMax : parseInt(qrData[33]) / 10,
                        mineralLow : parseInt(qrData[32]) / 10,
                        mineralTop : parseInt(qrData[33]) / 10,
                        fat : parseInt(qrData[34]) / 10, // 체지방량
                        fatMin : parseInt(qrData[35]) / 10,
                        fatMax : parseInt(qrData[39]) / 10,
                        fatLow : parseInt(qrData[36]) / 10,
                        fatTop : parseInt(qrData[38]) / 10,
                        bodyJudge : parseInt(qrData[84]) + 75, // 체형판정
                        bodyAge : parseInt(qrData[86]), // 신체연령
                        showBmr : parseInt(qrData[87]), // 기초대사량
                        showDayCal : parseInt(qrData[88]), // 일일 필요열량
                        encourageWeight : parseInt(qrData[13]) / 10, // 권장체중
                        weightControl : parseInt(qrData[91]) / 10, // 체중 조절치
                        fatAdjust : parseInt(qrData[93]) / 10, // 체지방량 조절치
                        muscleAdjust : parseInt(qrData[92]) / 10, // 근육량 조절치
                        sex : parseInt(qrData[4]),
                        age : parseInt(qrData[5]),
                        height : parseInt(qrData[6]) / 10,
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
            },
            error: function(){
                console.log('로그인 정보 오류');
            }
        })
        
    }

    function getData(barcodeQrData) {
        qrData = {
            protocol_command: barcodeQrData.slice(0, 2),
            ap_version: barcodeQrData.slice(2, 8),
            received_date: barcodeQrData.slice(8, 18),
            id_number: barcodeQrData.slice(18, 38),
            sex: barcodeQrData.slice(38, 39),
            age: barcodeQrData.slice(39, 42),
            height: barcodeQrData.slice(42, 46),
            weight: barcodeQrData.slice(46, 50),
            weight_min_limit: barcodeQrData.slice(50, 54),
            weight_low_limit: barcodeQrData.slice(54, 58),
            std_weight: barcodeQrData.slice(58, 62),
            weight_top_limit: barcodeQrData.slice(62, 66),
            weight_max_limit: barcodeQrData.slice(66, 70),
            weight_recommend: barcodeQrData.slice(70, 74),
            lbm_quantity: barcodeQrData.slice(74, 78),
            lbm_low_limit: barcodeQrData.slice(78, 82),
            lbm_top_limit: barcodeQrData.slice(82, 86),
            muscle_quantity: barcodeQrData.slice(86, 90),
            muscle_min_limit: barcodeQrData.slice(90, 94),
            muscle_low_limit: barcodeQrData.slice(94, 98),
            muscle_standard: barcodeQrData.slice(98, 102),
            muscle_top_limit: barcodeQrData.slice(102, 106),
            muscle_max_limit: barcodeQrData.slice(106, 110),
            tbw_quantity: barcodeQrData.slice(110, 114),
            tbw_min_limit: barcodeQrData.slice(114, 118),
            tbw_low_limit: barcodeQrData.slice(118, 122),
            tbw_top_limit: barcodeQrData.slice(122, 126),
            tbw_max_limit: barcodeQrData.slice(126, 130),
            protein_quantity: barcodeQrData.slice(130, 134),
            protein_low_limit: barcodeQrData.slice(134, 138),
            protein_top_limit: barcodeQrData.slice(138, 142),
            mineral_quantity: barcodeQrData.slice(142, 146),
            mineral_low_limit: barcodeQrData.slice(146, 150),
            mineral_top_limit: barcodeQrData.slice(150, 154),
            mbf_quantity: barcodeQrData.slice(154, 158),
            mbf_min_limit: barcodeQrData.slice(158, 162),
            mbf_low_limit: barcodeQrData.slice(162, 166),
            mbf_standard: barcodeQrData.slice(166, 170),
            mbf_top_limit: barcodeQrData.slice(170, 174),
            mbf_max_limit: barcodeQrData.slice(174, 178),
            bone_slim: barcodeQrData.slice(178, 182),
            bone_slim_min: barcodeQrData.slice(182, 186),
            bone_slim_low: barcodeQrData.slice(186, 190),
            bone_slim_top: barcodeQrData.slice(190, 194),
            bone_slim_max: barcodeQrData.slice(194, 198),
            bmi: barcodeQrData.slice(198, 202),
            bmi_min_limit: barcodeQrData.slice(202, 206),
            bmi_low_limit: barcodeQrData.slice(206, 210),
            bmi_top_limit: barcodeQrData.slice(210, 214),
            bmi_topmax_limit: barcodeQrData.slice(214, 218),
            bmi_max_limit: barcodeQrData.slice(218, 222),
            pbf_rate: barcodeQrData.slice(222, 226),
            pbf_min_limit: barcodeQrData.slice(226, 230),
            pbf_low_limit: barcodeQrData.slice(230, 234),
            pbf_top_limit: barcodeQrData.slice(234, 238),
            pbf_topmax_limit: barcodeQrData.slice(238, 242),
            pbf_max_limit: barcodeQrData.slice(242, 246),
            whr_rate: barcodeQrData.slice(246, 249),
            whr_min: barcodeQrData.slice(249, 252),
            whr_low: barcodeQrData.slice(252, 255),
            whr_top: barcodeQrData.slice(255, 258),
            whr_max: barcodeQrData.slice(258, 261),
            vsr: barcodeQrData.slice(261, 264),
            VSR_min_limit: barcodeQrData.slice(264, 267),
            VSR_low_limit: barcodeQrData.slice(267, 270),
            VSR_top_limit: barcodeQrData.slice(270, 273),
            VSR_max_limit: barcodeQrData.slice(273, 276),
            whr_type: barcodeQrData.slice(276, 277),
            whr_level: barcodeQrData.slice(277, 279),
            vfa: barcodeQrData.slice(279, 282),
            vfa_min: barcodeQrData.slice(282, 285),
            vfa_low: barcodeQrData.slice(285, 288),
            vfa_top: barcodeQrData.slice(288, 291),
            vfa_max: barcodeQrData.slice(291, 294),
            mvf_quantity: barcodeQrData.slice(294, 298),
            msf_quantity: barcodeQrData.slice(298, 302),
            sfm_top: barcodeQrData.slice(302, 306),
            bcm_in_water: barcodeQrData.slice(306, 310),
            bcm_out_water: barcodeQrData.slice(310, 314),
            edema: barcodeQrData.slice(314, 317),
            bujong_judge_min: barcodeQrData.slice(317, 320),
            bujong_judge_low: barcodeQrData.slice(320, 323),
            bujong_judge_top: barcodeQrData.slice(323, 326),
            bujong_judge_max: barcodeQrData.slice(326, 330),
            fat_type: barcodeQrData.slice(330, 332),
            fat_xy: barcodeQrData.slice(332, 334),
            body_age: barcodeQrData.slice(334, 337),
            bmr: barcodeQrData.slice(337, 341),
            calory: barcodeQrData.slice(341, 345),
            mbf_control_step: barcodeQrData.slice(345, 346),
            bcm: barcodeQrData.slice(346, 350),
            weight_control_value: barcodeQrData.slice(350, 355),
            muscle_control_value: barcodeQrData.slice(355, 360),
            mbf_control_value: barcodeQrData.slice(360, 365),
            lbm_control_value: barcodeQrData.slice(365, 370),
            target_to_control: barcodeQrData.slice(370, 375),
            control_guide_for_me: barcodeQrData.slice(375, 376),
            week_time_for_calory: barcodeQrData.slice(376, 379),
            fat: barcodeQrData.slice(379, 384),
            fat_low: barcodeQrData.slice(384, 389),
            fat_top: barcodeQrData.slice(389, 393),
            waist_measurement: barcodeQrData.slice(393, 397),
            impedance: barcodeQrData.slice(397, 401),
            left_hand_impedance_5k: barcodeQrData.slice(401, 404),
            right_hand_impedance_5k: barcodeQrData.slice(404, 407),
            left_foot_impedance_5k: barcodeQrData.slice(407, 410),
            right_foot_impedance_5k: barcodeQrData.slice(410, 413),
            trunk_impedance_5k: barcodeQrData.slice(413, 416),
            left_hand_impedance_50k: barcodeQrData.slice(416, 419),
            right_hand_impedance_50k: barcodeQrData.slice(419, 422),
            left_foot_impedance_50k: barcodeQrData.slice(422, 425),
            right_foot_impedance_50k: barcodeQrData.slice(425, 428),
            trunk_impedance_50k: barcodeQrData.slice(428, 431),
            left_hand_impedance_250k: barcodeQrData.slice(431, 434),
            right_hand_impedance_250k: barcodeQrData.slice(434, 437),
            left_foot_impedance_250k: barcodeQrData.slice(437, 440),
            right_foot_impedance_250k: barcodeQrData.slice(440, 443),
            trunk_impedance_250k: barcodeQrData.slice(443, 446),
            beauty_weight: barcodeQrData.slice(446, 450),
            total_score: barcodeQrData.slice(450, 453),
            pa_quantity: barcodeQrData.slice(453, 456),
            slm_graph_percent: barcodeQrData.slice(456, 459),
            mode: barcodeQrData.slice(459, 465),
            protein_grade: barcodeQrData.slice(465, 466),
            mineral_grade: barcodeQrData.slice(466, 467),
            bujong_judge: barcodeQrData.slice(467, 468),
            muscle_grade_i: barcodeQrData.slice(468, 473),
            mbf_grade_i: barcodeQrData.slice(473, 478),
            kiko_kids_state: barcodeQrData.slice(478, 479),
            Kiko_fatXY: barcodeQrData.slice(479, 482),
            weight_for_kiko: barcodeQrData.slice(482, 485),
            height_for_kiko: barcodeQrData.slice(485, 488),
            sys: barcodeQrData.slice(488, 491),
            mean: barcodeQrData.slice(491, 494),
            dias: barcodeQrData.slice(494, 497),
            pulse: barcodeQrData.slice(497, 500),
            prp: barcodeQrData.slice(500, 505),
            sys_se: barcodeQrData.slice(505, 508),
            mean_se: barcodeQrData.slice(508, 511),
            dias_se: barcodeQrData.slice(511, 514),
            bca_main_set: barcodeQrData.slice(514, 523),
            dex_mode: barcodeQrData.slice(523, 524),
            bmr_mode: barcodeQrData.slice(524, 525),
            IsKgLb: barcodeQrData.slice(525, 526),
            end_mark: barcodeQrData.slice(526, 527)
        }

   // qrData.kidney_dialysis = qrData.mode.slice(4, 5);

    }

});


