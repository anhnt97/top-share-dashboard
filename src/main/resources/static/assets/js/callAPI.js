/**
 *  Time Play
 */
function callAllApiTimePlay() {
    var listAPI = [
        "http://www.mocky.io/v2/5b20d2b830000084005c71ac",
        "http://www.mocky.io/v2/5b20c91e30000088005c7178",
        "http://www.mocky.io/v2/5b21c06e300000e4275c7574"
    ];
    var i = 0;
    while (i < listAPI.length) {
        callApiTimePlay(listAPI[i]);
        i++;
    }
}
function callApiTimePlay(urlAPI) {
    $.ajax({
        url: urlAPI
    }).then(function(data) {
        $('.time-play-name-video').text(data.post_id);
        $('.time-play-type').text(data.type);
        var dataDuration = data.data;
        var listDurationAvg=[];
        for(var i = 0; i < dataDuration.length ; i++) {
            listDurationAvg.push(dataDuration[i].duration.duration_avg);
        }
        switch (data.type){
            case "HOUR" :
                timePlayChart.everyHour(listDurationAvg);
                break;
            case "DAY" :
                timePlayChart.dailyTime(listDurationAvg);
                break;
            case "MONTH" :
                timePlayChart.monthlyTime(listDurationAvg);
                break;
        }
    });
}
/**
 * Time View
 */
function callAllApiTimeView() {
    var listAPI = [
        "http://www.mocky.io/v2/5b21c3e3300000d4265c7577",
        "http://www.mocky.io/v2/5b21cb352e00007b00e31396",
        "http://www.mocky.io/v2/5b21cbba2e00007b00e31398"
    ];
    var i = 0;
    while (i < listAPI.length) {
        callApiTimeView(listAPI[i]);
        i++;
    }
}
function callApiTimeView(urlAPI) {
    $.ajax({
        url: urlAPI
    }).then(function(data) {
        $('.time-view-id').text(data.post_id);
        $('.time-view-type').text(data.type);
        var dataReview = data.reviews;
        var listDuration=[];
        for(var i = 0; i < dataReview.length ; i++){
            listDuration.push(dataReview[i].duration.duration_avg);
        }
        switch (data.type){
            case "HOUR" :
                timeViewChart.everyHour(listDuration);
                break;
            case "DAY" :
                timeViewChart.dailyTime(listDuration);
                break;
            case "MONTH" :
                timeViewChart.monthlyTime(listDuration);
                break;
        }
    });
}

/**
 * Time Feedback API
 */
function callAllApiTimeFeedback() {
    var listAPI = [
        "http://www.mocky.io/v2/5b21cdab2e00007f00e3139c",
        "http://www.mocky.io/v2/5b21d1592e00002a00e313a1",
        "http://www.mocky.io/v2/5b21d1f22e00006000e313a2"
    ];
    var i = 0;
    while (i < listAPI.length) {
        callApiTimeFeedback(listAPI[i]);
        i++;
    }
}
function callApiTimeFeedback(urlAPI) {
    $.ajax({
        url: urlAPI
    }).then(function(data) {
        $('.time-feedback-id').text(data._id);
        $('.time-feedback-type').text(data.type);
        var dataDuration = data.data;
        var listDurationTotal=[];
        for(var i = 0; i < dataDuration.length ; i++) {
            listDurationTotal.push(dataDuration[i].duration.duration_avg);
        }
        switch (data.type){
            case "HOUR" :
                timeFeedbackAPIChart.everyHour(listDurationTotal);
                break;
            case "DAY" :
                timeFeedbackAPIChart.dailyTime(listDurationTotal);
                break;
            case "MONTH" :
                timeFeedbackAPIChart.monthlyTime(listDurationTotal);
                break;
        }
    });
}

/**
 * Link die
 */
function callAllApiLinkDie() {
    var listAPI = [
        "http://www.mocky.io/v2/5b20d2b830000084005c71ac",
        "http://www.mocky.io/v2/5b20c91e30000088005c7178",
        "http://www.mocky.io/v2/5b20c97c3000004f005c717c"
    ];
    var i = 0;
    while (i < listAPI.length) {
        callApiLinkDie(listAPI[i]);
        i++;
    }
}
function callApiLinkDie(urlAPI) {
    $.ajax({
        url: urlAPI
    }).then(function(data) {
        $('.time-play-id').text(data.post_id);
        $('.time-play-type').text(data.type);
        var dataDuration = data.data;
        console.log(dataDuration);
        var listDurationTotal=[];
        for(var i = 0; i < dataDuration.length ; i++) {
            listDurationTotal.push(dataDuration[i].duration.duration_avg);
        }
        switch (data.type){
            case "HOUR" :
                linkDieChart.everyHour(listDurationTotal);
                break;
            case "DAY" :
                linkDieChart.dailyTime(listDurationTotal);
                break;
            case "MONTH" :
                linkDieChart.monthlyTime(listDurationTotal);
                break;
        }
    });
}