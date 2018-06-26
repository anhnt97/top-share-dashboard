var urlAPI = "http://b05227b4.ngrok.io/";

/**
 *  Total function using in time play video
 * @type {{getTimePlayChartTotal: timePlay.getTimePlayChartTotal, getTimePlayChartById: timePlay.getTimePlayChartById, getDataFromApi: timePlay.getDataFromApi, getListVideo: timePlay.getListVideo, displayListVideo: timePlay.displayListVideo, updateTimeTypeSelect: timePlay.updateTimeTypeSelect, updateDateSelect: timePlay.updateDateSelect, paginationPage: timePlay.paginationPage}}
 */
timePlay = {
    /**
     *  Time play chart total
     */
    getTimePlayChartTotal: function () {
      var startDate =  $('#start-date').val();
      var endDate =  $('#end-date').val();
      if (startDate !== ""){
          var newStartDate = new Date(startDate).getTime();
          var newEndDate = new Date(endDate).getTime();
          var url = urlAPI +  "videos?start=" + newStartDate + "&end=" + newEndDate;
          console.log(url);
          $.ajax({
              type: "GET",
              url: url,
              dataType: 'json',
              success: function (data) {
                  var dataDuration = data.content.data;
                  var typeTime = data.content.time;
                  var listDurationAvg=[];
                  var listHour = [];
                  var listDay = [];
                  var listMonth = [];
                  for(var i = 0; i < dataDuration.length ; i++) {
                      listDurationAvg.push(dataDuration[i].duration_avg/60000);
                      listDay.push(convertDateToDayMonth(dataDuration[i].dt));
                      listHour.push(convertDateToHour(dataDuration[i].dt));
                      listMonth.push(convertDateToMonthYear(dataDuration[i].dt));
                  }
                  if(typeTime === "HOUR"){
                      $(".time-type").text("giờ");
                      timePlayChart.everyHour(listDurationAvg,listHour);
                  }
                  else if (typeTime === "DAY"){
                      $(".time-type").text("ngày");
                      timePlayChart.dailyTime(listDurationAvg,listDay);
                  }
                  else {
                      $(".time-type").text("tháng");
                     timePlayChart.monthlyTime(listDurationAvg,listMonth);
                  }

              },
              error: function () {
                  alert("Error!");
              }
          });
      }
    },
    /**
     *  Time play chart by id video
     * @param idVideo
     */
    getTimePlayChartById: function(idVideo) {
    var startDate = $('#start-date').val();
    var endDate = $('#end-date').val();
        if (startDate !== "" && endDate !== ""){
            var newStartDate = new Date(startDate).getTime();
            var newEndDate = new Date(endDate).getTime();
            var urlDayAPI = urlAPI + "videos/watchtime?start=" + newStartDate + "&end=" + newEndDate + "&post_id=" + idVideo;
            console.log(urlDayAPI);
            timePlay.getDataFromApi(urlDayAPI);
        }
    },
    /**
     *  Call api get data
     * @param urlApi
     */
    getDataFromApi: function(urlApi) {
        console.log(urlApi);
    $.ajax({
        type: "GET",
        url: urlApi,
        dataType: 'json',
        success: function (data) {
            var dataDuration = data.content.data;
            $('.page-number').text(dataDuration.page_len);
            var listDurationAvg=[];
            var listHour = [];
            var listDay = [];
            var listMonth = [];
            for(var i = 0; i < dataDuration.length ; i++) {
                listDurationAvg.push(dataDuration[i].duration_avg/60000);
                listDay.push(convertDateToDayMonth(dataDuration[i].dt));
                listHour.push(convertDateToHour(dataDuration[i].dt));
                listMonth.push(convertDateToDayMonth(dataDuration[i].dt));
            }
            console.log(listHour);
            switch (data.content.time){
                case "HOUR" :
                    $(".time-type").text("giờ");
                    timePlayChart.everyHour(listDurationAvg,listHour);
                    break;
                case "DAY" :
                    $(".time-type").text("ngày");
                    timePlayChart.dailyTime(listDurationAvg,listDay);
                    break;
                case "MONTH" :
                    $(".time-type").text("tháng");
                    timePlayChart.monthlyTime(listDurationAvg,listMonth);
                    break;
            }
        }
    });
},
    /**
     *  get type and url api list video
     * @param pageId
     */
    getListVideo: function(pageId) {
    var timeType = $('.time-type').text();
        timePlay.displayListVideo(urlAPI + "videos?page=" + pageId);
    // switch (timeType){
    //     case "giờ" :
    //         var urlHourAPI = urlAPI + "videos?page=" + pageId;
    //         timePlay.displayListVideo(urlHourAPI);
    //         break;
    //     case "ngày" :
    //         var urlDayAPI = urlAPI + "videos?page=" + pageId;
    //         timePlay.displayListVideo(urlDayAPI);
    //         break;
    //     case "tháng" :
    //         var urlMonthAPI = urlAPI + "videos?page=" + pageId;
    //         timePlay.displayListVideo(urlMonthAPI);
    //         break;
    // }
},
    /**
     *  call api get list video
     * @param urlListVideo
     */
    displayListVideo: function(urlListVideo) {
    var displayVideo = $('.display-list-video');
    var output = "";
    console.log(urlListVideo);

    $.ajax({
        type: "GET",
        url: urlListVideo,
        dataType: 'json',
        success: function (result) {
            var listVideo = result.content.data;
            for(var i in listVideo){
                output+="<tr><td>" + listVideo[i].post_id + "</td><td>" + listVideo[i].total_view + "</td><td>" + listVideo[i].duration_avg + "</td>" +
                    "</td><td><button class='btn btn-primary'  onclick=\" timePlay.getTimePlayChartById( '" + listVideo[i].post_id+ "'); " +
                    "updateNameVideo( '"+ listVideo[i].post_id +"'); \">Xem thống kê</button></td></tr>";
            }
            displayVideo.html(output);
        }
    });
},
    /**
     *  update data after click time type
     */
    updateTimeTypeSelect: function() {
        var valueTimeType = $('#time-select').find(":selected").text();
        if (valueTimeType === "Giờ"){
            $('.end-date-form').hide();
        }
    $('#time-select').on('change', function () {
        var valueSelected = $('#time-select').find(":selected").text();
        // hien thi time type tren tieu de bieu do
        $('.time-type').text(" " + valueSelected);
        var idVideo = $('.name-video').text();
        if (valueSelected === "Giờ"){
            $('.end-date-form').hide();
        }else {
            $('.end-date-form').show();
        }
        if (idVideo !== ""){
            timePlay.getTimePlayChartById(idVideo);
        }else {
            alert("Bạn chưa chọn video!");
        }

    });
},
    /**
     * Update data after click select date time
     */
    updateDateSelect: function() {
        var startDate = $('#start-date').val();
    $('#start-date').datepicker({
        onSelect: function(dateText, inst) {
            var idVideo = $('.name-video').text();
            var endDate = $('#end-date').val();
            if(idVideo === "" && endDate !== ""){
                timePlay.getTimePlayChartTotal();
            }
            else{
                timePlay.getTimePlayChartById(idVideo);
            }
        }
    });
    $('#end-date').datepicker({
        minDate: new Date(startDate).getTime(),
        onSelect: function(dateText, inst) {
            var idVideo = $('.name-video').text();
            var startDate = $('#start-date').val();
            if (startDate !== "" && idVideo !== ""){
                timePlay.getTimePlayChartById(idVideo);
            }
            else {
                timePlay.getTimePlayChartTotal();
            }
        }
    });
},
    /**
     *  Pagination page after get data list video
     */
    paginationPage: function () {
        $.ajax({
            type: "GET",
            url: urlAPI + "videos?page=0",
            dataType: 'json',
            success: function (data) {
               var pageNumber = data.content.total_size;
               console.log(pageNumber);
                var pagination  = "";
                for (var i = 0 ; i < pageNumber ; i++){
                    pagination+= " <li><a href=\"#\" onclick='timePlay.getListVideo("+ i +")'>"+ (i + 1) +"</a></li>";
                }
                $(".pagination").html(pagination);
                $('.pagination li:first').addClass('active');
                $( '.pagination li' ).on( 'click', function() {
                    $( this ).parent().find( 'li.active' ).removeClass( 'active' );
                    $( this ).addClass( 'active' );
                });
            },
            error: function () {
                alert("Error get list video!");
            }
        });
    }
};
/**
 *  Total function using in time view video
 * @type {{getTimeViewChartTotal: timeView.getTimeViewChartTotal, getTimeViewChartById: timeView.getTimeViewChartById, getDataFromApi: timeView.getDataFromApi, getListVideo: timeView.getListVideo, displayListVideo: timeView.displayListVideo, updateTimeTypeSelect: timeView.updateTimeTypeSelect, updateDateSelect: timeView.updateDateSelect, paginationPage: timeView.paginationPage}}
 */
timeView = {
    /**
     *  Time view chart total
     */
    getTimeViewChartTotal: function () {
        var startDate =  $('#start-date').val();
        var endDate =  $('#end-date').val();
        if (startDate !== ""){
            var newStartDate = new Date(startDate).getTime();
            var newEndDate = new Date(endDate).getTime();
            var url = urlAPI +  "videos?start=" + newStartDate + "&end=" + newEndDate;
            console.log(url);
            $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',
                success: function (data) {
                    var dataDuration = data.content.data;
                    var typeTime = data.content.time;
                    var listDurationAvg=[];
                    var listHour = [];
                    var listDay = [];
                    var listMonth = [];
                    for(var i = 0; i < dataDuration.length ; i++) {
                        listDurationAvg.push(dataDuration[i].duration_avg/60000);
                        listDay.push(convertDateToDayMonth(dataDuration[i].dt));
                        listHour.push(convertDateToHour(dataDuration[i].dt));
                        listMonth.push(convertDateToMonthYear(dataDuration[i].dt));
                    }
                    if(typeTime === "HOUR"){
                        $(".time-type").text("giờ");
                        timeViewChart.everyHour(listDurationAvg,listDay);
                    }
                    else if (typeTime === "DAY"){
                        $(".time-type").text("ngày");
                        timeViewChart.dailyTime(listDurationAvg,listDay);
                    }
                    else {
                        $(".time-type").text("tháng");
                        timeViewChart.monthlyTime(listDurationAvg,listDay);
                    }

                },
                error: function () {
                    alert("Error!");
                }
            });
        }
    },
    /**
     *  Time view chart by id video
     *  @param idVideo
     */
    getTimeViewChartById: function(idVideo) {
        var startDate = $('#start-date').val();
        var endDate = $('#end-date').val();
        if (startDate !== "" && endDate !== ""){
            var newStartDate = new Date(startDate).getTime();
            var newEndDate = new Date(endDate).getTime();
            var urlDayAPI = urlAPI + "videos/watchtime?start=" + newStartDate + "&end=" + newEndDate + "&post_id=" + idVideo;
            console.log(urlDayAPI);
            timeView.getDataFromApi(urlDayAPI);
        }
    },
    /**
     *  call api get data
     *  @param urlApi
     */
    getDataFromApi: function(urlApi) {
        $.ajax({
            type: "GET",
            url: urlApi,
            dataType: 'json',
            success: function (data) {
                var dataDuration = data.content.data;
                $('.page-number').text(dataDuration.page_len);
                var listDurationAvg=[];
                var listDay = [];
                var listHour = [];
                var listMonth = [];
                for(var i = 0; i < dataDuration.length ; i++) {
                    listDurationAvg.push(dataDuration[i].duration_avg/60000);
                    listDay.push(convertDateToDayMonth(dataDuration[i].dt));
                    listHour.push(convertDateToHour(dataDuration[i].dt));
                    listMonth.push(convertDateToMonthYear(dataDuration[i].dt));
                }
                console.log(listDay);
                switch (data.content.time){
                    case "HOUR" :
                        $(".time-type").text("giờ");
                        timeViewChart.everyHour(listDurationAvg,listDay);
                        break;
                    case "DAY" :
                        $(".time-type").text("ngày");
                        timeViewChart.dailyTime(listDurationAvg,listDay);
                        break;
                    case "MONTH" :
                        $(".time-type").text("tháng");
                        timeViewChart.monthlyTime(listDurationAvg);
                        break;
                }
            }
        });
    },
    /**
     * get url and id video
     * @param idPage
     */
    getListVideo: function(idPage) {
        var timeType = $('.time-type').val();
        if(idPage === ""){
            idPage = 0;
        }
        switch (timeType){
            case "HOUR" :
                var urlHourAPI = "http://192.168.100.8:1999/videos?page=" + idPage;
                timeView.displayListVideo(urlHourAPI);
                break;
            case "DAY" :
                var urlDayAPI = "http://www.mocky.io/v2/5b29c3f12f00008d00f56210" + idPage;
                timeView.displayListVideo(urlDayAPI);
                break;
            case "MONTH" :
                var urlMonthAPI = "http://www.mocky.io/v2/5b29c4f42f00008d00f5621b" + idPage;
                timeView.displayListVideo(urlMonthAPI);
                break;
        }
    },
    /**
     *  call api get list video and display in client
     * @param urlListVideo
     */
    displayListVideo: function(urlListVideo) {
        var displayVideo = $('.display-list-video');
        var output = "";
        $.ajax({
            type: "GET",
            url: urlListVideo,
            success: function (result) {
                var result_data = result.content.data;
                for(var i in result_data){
                    output+="<tr><td>" + result_data[i].post_id + "</td><td>" + result_data[i].total_view + "</td><td>" + result_data[i].duration_avg + "</td>" +
                        "</td><td><button class='btn btn-primary'  onclick=\" timeView.getTimeViewChartById( '" + result_data[i].post_id+ "'); updateNameVideo('"+ result_data[i].post_id +"'); \">Xem thống kê</button></td></tr>";
                }
                displayVideo.html(output);
            }
        });
    },
    /**
     *  update data after click change type time
     */
    updateTimeTypeSelect: function() {
        var valueTimeType = $('#time-select').find(":selected").text();
        if (valueTimeType === "Giờ"){
            $('.end-date-form').hide();
        }
        $('#time-select').on('change', function () {
            var valueSelected = $('#time-select').find(":selected").text();
            $('.time-type').text(" " + valueSelected);
            var idVideo = $('.name-video').text();
            timeView.getListVideo(0);
            if (valueSelected === "Giờ") {
                $('.end-date-form').hide();
            } else {
                $('.end-date-form').show();
            }
            if (idVideo !== "")
                timeView.getTimeViewChartById(idVideo);
        })
    },
    /**
     * update data after click change date time
     */
    updateDateSelect: function() {
        var startDate = $('#start-date').val();
        $('#start-date').datepicker({
            onSelect: function(dateText, inst) {
                var idVideo = $('.name-video').text();
                var endDate = $('#end-date').val();
                if(idVideo === "" && endDate !== ""){
                    timeView.getTimeViewChartTotal();
                }
                else{
                    timeView.getTimeViewChartById(idVideo);
                }
            }
        });
        $('#end-date').datepicker({
            minDate: new Date(startDate).getTime(),
            onSelect: function(dateText, inst) {
                var idVideo = $('.name-video').text();
                var startDate = $('#start-date').val();
                if (startDate !== "" && idVideo !== ""){
                    timeView.getTimeViewChartById(idVideo);
                }
                else {
                    timeView.getTimeVIewChartTotal();
                }
            }
        });
    },
    /**
     *  pagination page after get data
     */
    paginationPage: function () {
        $.ajax({
            type: "GET",
            url: urlAPI + "videos?page=0",
            dataType: 'json',
            success: function (data) {
                var pageNumber = data.content.total_size;
                console.log(pageNumber);
                var pagination  = "";
                for (var i = 0 ; i < pageNumber ; i++){
                    pagination+= " <li><a href=\"#\" onclick='timeView.getListVideo("+ i +")'>"+ (i + 1) +"</a></li>";
                }
                $(".pagination").html(pagination);
                $('.pagination li:first').addClass('active');
                $( '.pagination li' ).on( 'click', function() {
                    $( this ).parent().find( 'li.active' ).removeClass( 'active' );
                    $( this ).addClass( 'active' );
                });
            },
            error: function () {
                alert("Error get list video!");
            }
        });
    }

};
/**
 *  Total function using time feedback api video
 * @type {{getTimeFeedbackChartById: timeFeedbackAPI.getTimeFeedbackChartById, getDataFromApi: timeFeedbackAPI.getDataFromApi, getListVideo: timeFeedbackAPI.getListVideo, displayListVideo: timeFeedbackAPI.displayListVideo, updateTimeTypeSelect: timeFeedbackAPI.updateTimeTypeSelect, updateDateSelect: timeFeedbackAPI.updateDateSelect, paginationPage: timeFeedbackAPI.paginationPage}}
 */
timeFeedbackAPI = {
    /**
     *  Time feedback chart total
     */
    getTimeFeedbackChartTotal: function () {
        var startDate =  $('#start-date').val();
        var endDate =  $('#end-date').val();
        if (startDate !== ""){
            var newStartDate = new Date(startDate).getTime();
            var newEndDate = new Date(endDate).getTime();
            var url = urlAPI +  "videos?start=" + newStartDate + "&end=" + newEndDate;
            console.log(url);
            $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',
                success: function (data) {
                    var dataDuration = data.content.data;
                    var typeTime = data.content.time;
                    var listDurationAvg=[];
                    var listDay = [];
                    var listHour = [];
                    var listMonth = [];
                    for(var i = 0; i < dataDuration.length ; i++) {
                        listDurationAvg.push(dataDuration[i].duration_avg/60000);
                        listDay.push(convertDateToDayMonth(dataDuration[i].dt));
                        listHour.push(convertDateToHour(dataDuration[i].dt));
                        listMonth.push(convertDateToMonthYear(dataDuration[i].dt));
                    }
                    if(typeTime === "HOUR"){
                        $('.time-type').text("giờ");
                        timeFeedbackAPIChart.everyHour(listDurationAvg,listHour);
                    }
                    else if (typeTime === "DAY"){
                        $('.time-type').text("ngày");
                        timeFeedbackAPIChart.dailyTime(listDurationAvg,listDay);
                    }
                    else {
                        $('.time-type').text("tháng");
                        timeFeedbackAPIChart.monthlyTime(listDurationAvg,listMonth);
                    }

                },
                error: function () {
                    alert("Error!");
                }
            });
        }
    },
    /**
     *  Time feedback chart by id video
     * @param idVideo
     */
    getTimeFeedbackChartById: function(idVideo) {
        var startDate = $('#start-date').val();
        var endDate = $('#end-date').val();
        if (startDate !== "" && endDate !== ""){
            var newStartDate = new Date(startDate).getTime();
            var newEndDate = new Date(endDate).getTime();
            var urlDayAPI = urlAPI + "videos/watchtime?start=" + newStartDate + "&end=" + newEndDate + "&post_id=" + idVideo;
            console.log(urlDayAPI);
            timeFeedbackAPI.getDataFromApi(urlDayAPI);
        }
    },
    /**
     *  Call api get data
     * @param urlApi
     */
    getDataFromApi: function(urlApi) {
        console.log(urlApi);
        $.ajax({
            type: "GET",
            url: urlApi,
            dataType: 'json',
            success: function (data) {
                var dataDuration = data.content.data;
                $('.page-number').text(dataDuration.page_len);
                var listDurationAvg=[];
                var listDay = [];
                var listHour = [];
                var listMonth = [];
                for(var i = 0; i < dataDuration.length ; i++) {
                    listDurationAvg.push(dataDuration[i].duration_avg/60000);
                    listDay.push(convertDateToDayMonth(dataDuration[i].dt));
                    listHour.push(convertDateToHour(dataDuration[i].dt));
                    listMonth.push(convertDateToMonthYear(dataDuration[i].dt));
                }
                console.log(listDay);
                switch (data.content.time){
                    case "HOUR" :
                        $(".time-type").text("giờ");
                        timeFeedbackAPIChart.everyHour(listDurationAvg,listHour);
                        break;
                    case "DAY" :
                        $(".time-type").text("ngày");
                        timeFeedbackAPIChart.dailyTime(listDurationAvg,listDay);
                        break;
                    case "MONTH" :
                        $(".time-type").text("tháng");
                        timeFeedbackAPIChart.monthlyTime(listDurationAvg,listMonth);
                        break;
                }
            }
        });
    },
    /**
     *  get type and url api list video
     * @param pageId
     */
    getListVideo: function(pageId) {
        var timeType = $('.time-type').text();
        timeFeedbackAPI.displayListVideo(urlAPI + "videos?page=" + pageId);
        // switch (timeType){
        //     case "giờ" :
        //         var urlHourAPI = urlAPI + "videos?page=" + pageId;
        //         timePlay.displayListVideo(urlHourAPI);
        //         break;
        //     case "ngày" :
        //         var urlDayAPI = urlAPI + "videos?page=" + pageId;
        //         timePlay.displayListVideo(urlDayAPI);
        //         break;
        //     case "tháng" :
        //         var urlMonthAPI = urlAPI + "videos?page=" + pageId;
        //         timePlay.displayListVideo(urlMonthAPI);
        //         break;
        // }
    },
    /**
     *  call api get list video
     * @param urlListVideo
     */
    displayListVideo: function(urlListVideo) {
        var displayVideo = $('.display-list-video');
        var output = "";
        console.log(urlListVideo);

        $.ajax({
            type: "GET",
            url: urlListVideo,
            dataType: 'json',
            success: function (result) {
                var listVideo = result.content.data;
                for(var i in listVideo){
                    output+="<tr><td>" + listVideo[i].post_id + "</td><td>" + listVideo[i].total_view + "</td><td>" + listVideo[i].duration_avg + "</td>" +
                        "</td><td><button class='btn btn-primary'  onclick=\" timeFeedbackAPI.getTimeFeedbackChartById( '" + listVideo[i].post_id+ "'); " +
                        "updateNameVideo( '"+ listVideo[i].post_id +"'); \">Xem thống kê</button></td></tr>";
                }
                displayVideo.html(output);
            }
        });
    },
    /**
     *  update data after click time type
     */
    updateTimeTypeSelect: function() {
        var valueTimeType = $('#time-select').find(":selected").text();
        if (valueTimeType === "Giờ"){
            $('.end-date-form').hide();
        }
        $('#time-select').on('change', function () {
            var valueSelected = $('#time-select').find(":selected").text();
            // hien thi time type tren tieu de bieu do
            $('.time-type').text(" " + valueSelected);
            var idVideo = $('.name-video').text();
            if (valueSelected === "Giờ"){
                $('.end-date-form').hide();
            }else {
                $('.end-date-form').show();
            }
            if (idVideo !== ""){
                timeFeedbackAPI.getTimeFeedbackChartById(idVideo);
            }else {
                alert("Bạn chưa chọn video!");
            }

        });
    },
    /**
     * Update data after click select date time
     */
    updateDateSelect: function() {
        var startDate = $('#start-date').val();
        $('#start-date').datepicker({
            onSelect: function(dateText, inst) {
                var idVideo = $('.name-video').text();
                var endDate = $('#end-date').val();
                if(idVideo === "" && endDate !== ""){
                    timeFeedbackAPI.getTimeFeedbackChartTotal();
                }
                else{
                    timeFeedbackAPI.getTimeFeedbackChartById(idVideo);
                }
            }
        });
        $('#end-date').datepicker({
            minDate: new Date(startDate).getTime(),
            onSelect: function(dateText, inst) {
                var idVideo = $('.name-video').text();
                var startDate = $('#start-date').val();
                if (startDate !== "" && idVideo !== ""){
                    timeFeedbackAPI.getTimeFeedbackChartById(idVideo);
                }
                else {
                    timeFeedbackAPI.getTimeFeedbackChartTotal();
                }
            }
        });
    },
    /**
     *  Pagination page after get data list video
     */
    paginationPage: function () {
        $.ajax({
            type: "GET",
            url: urlAPI + "videos?page=0",
            dataType: 'json',
            success: function (data) {
                var pageNumber = data.content.total_size;
                console.log(pageNumber);
                var pagination  = "";
                for (var i = 0 ; i < pageNumber ; i++){
                    pagination+= " <li><a href=\"#\" onclick='timePlay.getListVideo("+ i +")'>"+ (i + 1) +"</a></li>";
                }
                $(".pagination").html(pagination);
                $('.pagination li:first').addClass('active');
                $( '.pagination li' ).on( 'click', function() {
                    $( this ).parent().find( 'li.active' ).removeClass( 'active' );
                    $( this ).addClass( 'active' );
                });
            },
            error: function () {
                alert("Error get list video!");
            }
        });
    }
};
/**
 *  Total function using in dashboard link die
 * @type {{getDataLinkDie: linkDie.getDataLinkDie, getDataFromApi: linkDie.getDataFromApi, getListLinkDie: linkDie.getListLinkDie, dashboardLinkDie: linkDie.dashboardLinkDie, displayListLinkDie: linkDie.displayListLinkDie, updateTimeTypeSelect: linkDie.updateTimeTypeSelect, updateDateSelect: linkDie.updateDateSelect, paginationPage: linkDie.paginationPage}}
 */
linkDie = {
    /**
     *
     */
    getDataLinkDie: function() {
        var startDate = $('#start-date').val();
        var endDate = $('#end-date').val();
        if (startDate !== ""){
            var timeType = $('#time-select').find(":selected").val();
            var newStartDate = new Date(startDate).getTime();
            var newEndDate = new Date(endDate).getTime();
            switch (timeType){
                case "HOUR" :
                    var urlHourAPI = "api?type=" + timeType + "&day=" + newStartDate;
                    linkDie.getDataFromApi(urlHourAPI);
                    break;
                case "DAY" :
                    var urlDayAPI = "api?type=" + timeType + "&startDay=" + newStartDate + "&endDay=" + newEndDate;
                    linkDie.getDataFromApi(urlDayAPI);
                    break;
                case "MONTH" :
                    var urlMonthAPI = "api";
                    linkDie.getDataFromApi(urlMonthAPI);
                    break;
            }
        }else {
            alert("Ngày chưa được chọn");
        }

    },
    /**
     * call api get data
     * @param urlApi
     */
    getDataFromApi: function(urlApi) {
        $.ajax({
            type: "GET",
            url: urlApi,
            dataType: 'json',
            success: function (data) {
                var dataDuration = data.data;
                var listDurationAvg=[];
                var listDay = [];
                for(var i = 0; i < dataDuration.length ; i++) {
                    listDurationAvg.push(dataDuration[i].duration_avg);
                    listDay.push(convertDateToDayMonth(dataDuration[i].dt));
                }
                switch (data.type){
                    case "HOUR" :
                        linkDieChart.everyHour(listDurationAvg);
                        break;
                    case "DAY" :
                        linkDieChart.dailyTime(listDurationAvg,listDay);
                        break;
                    case "MONTH" :
                        linkDieChart.monthlyTime(listDurationAvg);
                        break;
                }
            }
        });
    },
    /**
     *  get list link die
     */
    getListLinkDie: function() {
        var timeType = $('#time-select').find(":selected").val();
        switch (timeType){
            case "HOUR" :
                var urlHourAPI = "http://www.mocky.io/v2/5b2885122f00002c00f55d1a";
                linkDie.displayListLinkDie(urlHourAPI);
                break;
            case "DAY" :
                var urlDayAPI = "http://www.mocky.io/v2/5b29c3f12f00008d00f56210";
                linkDie.displayListLinkDie(urlDayAPI);
                break;
            case "MONTH" :
                var urlMonthAPI = "http://www.mocky.io/v2/5b29c4f42f00008d00f5621b";
                linkDie.displayListLinkDie(urlMonthAPI);
                break;
        }
    },
    /**
     *
     */
    dashboardLinkDie: function () {
      $('#dashboard-link-die').on('click',function () {
          linkDie.getDataLinkDie();
      })
    },
    /**
     *
     * @param urlListLinkDie
     */
    displayListLinkDie: function(urlListLinkDie) {
        var displayVideo = $('.display-list-link-die');
        var output = "";
        $.ajax({
            type: "GET",
            url: urlListLinkDie,
            success: function (result) {
                for(var i in result){
                    output+="<tr><td>" + result[i].id + "</td><td>" + result[i].name + "</td><td>" + result[i].duration_avg + "</td>" +
                        "</td><td><button class='btn btn-primary'  onclick=\" linkDie.linkDieChartById( " + result[i].id+ "); updateNameVideo(  " + result[i].id+ " , '"+ result[i].name +"'); \">Xem thống kê</button></td></tr>";
                }
                displayVideo.html(output);
            }
        });
    },
    /**
     * update data after change type time
     */
    updateTimeTypeSelect: function() {
        var valueTimeType = $('#time-select').find(":selected").text();
        if (valueTimeType === "Giờ"){
            $('.end-date-form').hide();
        }
        $('#time-select').on('change', function () {
            var valueSelected = $('#time-select').find(":selected").text();
            $('.time-type').text(" " + valueSelected);
            linkDie.getListLinkDie(0);
            var idVideo = $('.name-video').text();
            if(valueSelected === "Giờ"){
                $('.end-date-form').hide();
            }else {
                $('.end-date-form').show();
            }
            if (idVideo !== ""){
                linkDie.linkDieChartById(idVideo);
            }

        });
    },
    /**
     * update data after select date time
     */
    updateDateSelect: function() {
        $('#start-date').datepicker({
            onSelect: function(dateText, inst) {
                var idVideo = $('.name-video').text();
                var endDate = $('#end-date').val();
                var valueTimeType = $('#time-select').find(":selected").text();
                if (endDate !== "" || valueTimeType === "Giờ" && idVideo !== ""){
                    // linkDie.(idVideo);
                }
            }
        });
        $('#end-date').datepicker({
            onSelect: function(dateText, inst) {
                var idVideo = $('.name-video').text();
                var startDate = $('#start-date').val();
                if (startDate !== "" && idVideo !== ""){
                    // linkDie.getTimePlayChartById(idVideo);
                }
            }
        });
    },
    /**
     * pagination page after get list video
     */
    paginationPage: function () {
        var pagination  = "";
        var numberPage = $('.page-number').text();
        for (var i = 0 ; i < numberPage ; i++){
            pagination+= " <li><a href=\"#\" onclick='timePlay.getListVideo("+ i +")'>"+ (i + 1) +"</a></li>";
        }
        $(".pagination").html(pagination);
        $('.pagination li:first').addClass('active');
        $( '.pagination li').on( 'click', function() {
            $( this ).parent().find('li.active').removeClass('active');
            $( this ).addClass('active');
        });
    }
};

/**
 *  Update name video after click button " xem thống kê "
 * @param nameVideo
 */
function updateNameVideo(nameVideo) {
    $('.name-video').text(nameVideo);
}

/**
 *  Update data dashboard total
 */
function dashboardTotal() {
    var urlApi = "http://192.168.0.100:1999/videos";
    $.ajax({
        type: "GET",
        url: urlApi,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            $('.total_video').text(data.total_video);
            $('.total-view').text(data.total_view);
            $('.total-link-die').text(data.total_link_die);
        }
    });
}

/**
 *  Convert date format from timestamp to only day and month
 * @param datetimeStamp
 * @returns {string}
 */
function convertDateToDayMonth(datetimeStamp) {
    var date = new Date(datetimeStamp);
    var newDate = date.getDate() + "/" + (date.getMonth() + 1);
    return newDate;
}

function convertDateToHour(datetimeStamp) {
    var date = new Date(datetimeStamp);
    return date.getHours();
}
function convertDateToMonthYear(datetimeStamp) {
    var date = new Date(datetimeStamp);
    var newDate = (date.getMonth() + 1 ) + "/" + date.getFullYear();
    return newDate;
}