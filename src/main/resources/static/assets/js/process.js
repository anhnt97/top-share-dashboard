 var urlAPI = "http://45.124.95.231:2000/";

/**
 *  Total function using in time play video
 * @type {{getTimePlayChartTotal: timePlay.getTimePlayChartTotal, getTimePlayChartById: timePlay.getTimePlayChartById, getDataFromApi: timePlay.getDataFromApi, getListVideo: timePlay.getListVideo, displayListVideo: timePlay.displayListVideo, updateTimeTypeSelect: timePlay.updateTimeTypeSelect, updateDateSelect: timePlay.updateDateSelect, paginationPage: timePlay.paginationPage}}
 */
timePlay = {
    getChartDefault: function () {
        var dateNow = moment().format('MM/DD/YYYY');
        var yesterday = moment().add(-1, 'days').format('MM/DD/YYYY');
        $('#start-date').val(yesterday);
        $('#end-date').val(yesterday);
        timePlay.getTimePlayChartTotal();
    },
    /**
     *  Time play chart total
     */
    getTimePlayChartTotal: function () {
        var startDate = $('#start-date').val();
        var endDate = $('#end-date').val();
        if (startDate !== "") {
            var newStartDate = new Date(startDate).getTime();
            var newEndDate = new Date(endDate).getTime();
            var url = urlAPI + "play-video?start=" + newStartDate + "&end=" + newEndDate;
            console.log(url);
            $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',
                success: function (data) {
                    try {
                        var dataDuration = data.content.data;
                        var typeTime = data.content.time;
                        var listDurationAvg = [];
                        var listHour = [];
                        var listDay = [];
                        var listMonth = [];
                        for (var i = 0; i < dataDuration.length; i++) {
                            listDurationAvg.push(dataDuration[i].duration_avg / 60000);
                            listDay.push(convertDateToDayMonth(dataDuration[i].dt));
                            listHour.push(convertDateToHour(dataDuration[i].dt));
                            listMonth.push(convertDateToMonthYear(dataDuration[i].dt));
                        }
                        if (typeTime === "HOUR") {
                            $(".time-type").text("giờ");
                            timePlayChart.everyHour(listDurationAvg, listHour);
                        }
                        else if (typeTime === "DAY") {
                            $(".time-type").text("ngày");
                            timePlayChart.dailyTime(listDurationAvg, listDay);
                        }
                        else {
                            $(".time-type").text("tháng");
                            timePlayChart.monthlyTime(listDurationAvg, listMonth);
                        }
                    } catch (e) {
                        console.log("Không có dữ liệu!");
                    }
                },
                error: function () {
                    console.log("Error!");
                }
            });
        }
    },
    /**
     *  Time play chart by id video
     * @param idVideo
     */
    getTimePlayChartById: function (idVideo) {
        var startDate = $('#start-date').val();
        var endDate = $('#end-date').val();
        if (startDate !== "" && endDate !== "") {
            var newStartDate = new Date(startDate).getTime();
            var newEndDate = new Date(endDate).getTime();
            var urlDayAPI = urlAPI + "play-video?start=" + newStartDate + "&end=" + newEndDate + "&post_id=" + idVideo;
            console.log(urlDayAPI);
            timePlay.getDataFromApi(urlDayAPI);
        }
    },
    /**
     *  Call api get data
     * @param urlApi
     */
    getDataFromApi: function (urlApi) {
        console.log(urlApi);
        $.ajax({
            type: "GET",
            url: urlApi,
            dataType: 'json',
            success: function (data) {
                try {
                    var dataDuration = data.content.data;
                    var listDurationAvg = [];
                    var listHour = [];
                    var listDay = [];
                    var listMonth = [];
                    for (var i = 0; i < dataDuration.length; i++) {
                        listDurationAvg.push(dataDuration[i].duration_avg / 60000);
                        listDay.push(convertDateToDayMonth(dataDuration[i].dt));
                        listHour.push(convertDateToHour(dataDuration[i].dt));
                        listMonth.push(convertDateToMonthYear(dataDuration[i].dt));
                    }
                    switch (data.content.time) {
                        case "HOUR" :
                            $(".time-type").text("giờ");
                            timePlayChart.everyHour(listDurationAvg, listHour);
                            break;
                        case "DAY" :
                            $(".time-type").text("ngày");
                            timePlayChart.dailyTime(listDurationAvg, listDay);
                            break;
                        case "MONTH" :
                            $(".time-type").text("tháng");
                            timePlayChart.monthlyTime(listDurationAvg, listMonth);
                            break;
                    }
                } catch (e) {
                    console.log("Không có dữ liệu");
                }
            }
        });
    },
    /**
     *
     */
    updateListVideo: function () {
        var pageId = $('.page-number').text();
        timePlay.getListVideo(pageId);
        $('#sort-video').on('change', function () {
            timePlay.getListVideo(pageId);
        });
    },
    /**
     *  get type and url api list video
     * @param pageId
     */
    getListVideo: function (pageId) {
        var timeType = $('.time-type').text();
        var typeList = $('#sort-video').find(":selected").val();
        if (typeList === "increase") {
            timePlay.displayListVideo(urlAPI + "play-video?page=" + pageId + "&sort=ASC");
        } else {
            timePlay.displayListVideo(urlAPI + "play-video?page=" + pageId + "&sort=DESC");
        }

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
    displayListVideo: function (urlListVideo) {
        var displayVideo = $('.display-list-video');
        var output = "";
        console.log(urlListVideo);

        $.ajax({
            type: "GET",
            url: urlListVideo,
            dataType: 'json',
            success: function (result) {
                var listVideo = result.content.data;
                for (var i in listVideo) {
                    output += "<tr><td>" + listVideo[i].post_id + "</td><td>" + listVideo[i].duration_avg + "</td>" +
                        "</td><td><button class='btn btn-primary'  onclick=\" timePlay.getTimePlayChartById( '" + listVideo[i].post_id + "'); " +
                        "updateNameVideo( '" + listVideo[i].post_id + "'); \">Xem thống kê</button></td></tr>";
                }
                displayVideo.html(output);
            }
        });
    },
    /**
     *  update data after click time type
     */
    updateTimeTypeSelect: function () {
        var valueTimeType = $('#time-select').find(":selected").text();
        if (valueTimeType === "Giờ") {
            $('.end-date-form').hide();
        }
        $('#time-select').on('change', function () {
            var valueSelected = $('#time-select').find(":selected").text();
            // hien thi time type tren tieu de bieu do
            $('.time-type').text(" " + valueSelected);
            var idVideo = $('.name-video').text();
            if (valueSelected === "Giờ") {
                $('.end-date-form').hide();
            } else {
                $('.end-date-form').show();
            }
            if (idVideo !== "") {
                timePlay.getTimePlayChartById(idVideo);
            } else {
                console.log("Bạn chưa chọn video!");
            }
        });
    },
    /**
     * Update data after click select date time
     */
    updateDateSelect: function () {
        $('#start-date').datepicker({
            maxDate: moment().format('MM/DD/YYYY'),
            onSelect: function (dateText, inst) {
                var idVideo = $('.name-video').text();
                var startDate = $('#start-date').val();
                var endDate = $('#end-date').val();
                if (idVideo === "" && endDate !== "") {
                    timePlay.getTimePlayChartTotal();
                }
                else {
                    timePlay.getTimePlayChartById(idVideo);
                }
                $("#end-date").datepicker("change", { minDate: moment(startDate).format('MM/DD/YYYY') });
            }
        });
        $('#end-date').datepicker({
            minDate:moment().add(-1,'days').format('MM/DD/YYYY'),
            maxDate: moment().format('MM/DD/YYYY'),
            onSelect: function (dateText, inst) {
                var idVideo = $('.name-video').text();
                var startDate = $('#start-date').val();
                var endDate = $('#end-date').val();

                if (startDate !== "" && idVideo !== "") {
                    timePlay.getTimePlayChartById(idVideo);
                }
                else {
                    timePlay.getTimePlayChartTotal();
                }
                $("#start-date").datepicker("change", { maxDate: moment(endDate).format('MM/DD/YYYY') });
            },
        });
    },
    /**
     *  Pagination page after get data list video
     */
    paginationPage: function () {
        $.ajax({
            type: "GET",
            url: urlAPI + "play-video?page=0",
            dataType: 'json',
            success: function (data) {
                var pageNumber = data.content.total_size / 10;
                var pagination = "";
                $('.pagination').twbsPagination({
                    totalPages: pageNumber,
                    visiblePages: 6,
                    next: 'Next',
                    prev: 'Prev',
                    onPageClick: function (event, page) {
                        //fetch content and render here
                        timePlay.getListVideo(page -1 );
                    }
                });
                // for (var i = 0; i < pageNumber; i++) {
                //     pagination += " <li><a href=\"#\" onclick='timePlay.getListVideo(" + i + ")'>" + (i + 1) + "</a></li>";
                // }
                // $(".pagination").html(pagination);
                // $('.pagination li:first').addClass('active');
                // $('.page-number').val(0);
                // $('.pagination li').on('click', function () {
                //     $(this).parent().find('li.active').removeClass('active');
                //     $(this).addClass('active');
                //     $('.page-number').val($(this).children().text());
                // });
            },
            error: function () {
                console.log("Error get list video!");
            }
        });
    }
};
/**
 *  Total function using in time view video
 * @type {{getTimeViewChartTotal: timeView.getTimeViewChartTotal, getTimeViewChartById: timeView.getTimeViewChartById, getDataFromApi: timeView.getDataFromApi, getListVideo: timeView.getListVideo, displayListVideo: timeView.displayListVideo, updateTimeTypeSelect: timeView.updateTimeTypeSelect, updateDateSelect: timeView.updateDateSelect, paginationPage: timeView.paginationPage}}
 */
timeView = {
    getChartDefault: function () {
        var dateNow = moment().format('MM/DD/YYYY');
        var yesterday = moment().add(-1, 'days').format('MM/DD/YYYY');
        $('#start-date').val(yesterday);
        $('#end-date').val(yesterday);
        timeView.getTimeViewChartTotal();
    },
    /**
     *  Time view chart total
     */
    getTimeViewChartTotal: function () {
        var startDate = $('#start-date').val();
        var endDate = $('#end-date').val();
        if (startDate !== "") {
            var newStartDate = new Date(startDate).getTime();
            var newEndDate = new Date(endDate).getTime();
            var url = urlAPI + "watch-time?start=" + newStartDate + "&end=" + newEndDate;
            console.log(url);
            $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',
                success: function (data) {
                    try {
                        var dataDuration = data.content.data;
                        var typeTime = data.content.time;
                        var listDurationAvg = [];
                        var listHour = [];
                        var listDay = [];
                        var listMonth = [];
                        for (var i = 0; i < dataDuration.length; i++) {
                            listDurationAvg.push(dataDuration[i].duration_avg / 60000);
                            listDay.push(convertDateToDayMonth(dataDuration[i].dt));
                            listHour.push(convertDateToHour(dataDuration[i].dt));
                            listMonth.push(convertDateToMonthYear(dataDuration[i].dt));
                        }
                        if (typeTime === "HOUR") {
                            $(".time-type").text("giờ");
                            timeViewChart.everyHour(listDurationAvg, listHour);
                        }
                        else if (typeTime === "DAY") {
                            $(".time-type").text("ngày");
                            timeViewChart.dailyTime(listDurationAvg, listDay);
                        }
                        else {
                            $(".time-type").text("tháng");
                            timeViewChart.monthlyTime(listDurationAvg, listMonth);
                        }
                    } catch (e) {
                        console.log("Không có dữ liệu");
                    }
                },
                error: function () {
                    console.log("Error call api !");
                }
            });
        }
    },
    /**
     *  Time view chart by id video
     *  @param idVideo
     */
    getTimeViewChartById: function (idVideo) {
        var startDate = $('#start-date').val();
        var endDate = $('#end-date').val();
        if (startDate !== "" && endDate !== "") {
            var newStartDate = new Date(startDate).getTime();
            var newEndDate = new Date(endDate).getTime();
            var urlDayAPI = urlAPI + "watch-time?start=" + newStartDate + "&end=" + newEndDate + "&post_id=" + idVideo;
            console.log(urlDayAPI);
            timeView.getDataFromApi(urlDayAPI);
        }
    },
    /**
     *  call api get data
     *  @param urlApi
     */
    getDataFromApi: function (urlApi) {
        $.ajax({
            type: "GET",
            url: urlApi,
            dataType: 'json',
            success: function (data) {
                try {
                    var dataDuration = data.content.data;
                    var listDurationAvg = [];
                    var listDay = [];
                    var listHour = [];
                    var listMonth = [];
                    for (var i = 0; i < dataDuration.length; i++) {
                        listDurationAvg.push(dataDuration[i].duration_avg / 60000);
                        listDay.push(convertDateToDayMonth(dataDuration[i].dt));
                        listHour.push(convertDateToHour(dataDuration[i].dt));
                        listMonth.push(convertDateToMonthYear(dataDuration[i].dt));
                    }
                    console.log(listDay);
                    switch (data.content.time) {
                        case "HOUR" :
                            $(".time-type").text("giờ");
                            timeViewChart.everyHour(listDurationAvg, listHour);
                            break;
                        case "DAY" :
                            $(".time-type").text("ngày");
                            timeViewChart.dailyTime(listDurationAvg, listDay);
                            break;
                        case "MONTH" :
                            $(".time-type").text("tháng");
                            timeViewChart.monthlyTime(listDurationAvg, listMonth);
                            break;
                    }
                } catch (e) {
                    console.log("Không có dữ liệu");
                }
            }
        });
    },
    /**
     * get url and id video
     * @param idPage
     */
    getListVideo: function (pageId) {
        // var timeType = $('.time-type').text();
            var typeList = $('#sort-video').find(":selected").val();
            if (typeList === "increase") {
                timeView.displayListVideo(urlAPI + "videos?page=" + pageId + "&sort=ASC");
            } else {
                timeView.displayListVideo(urlAPI + "videos?page=" + pageId + "&sort=DESC");
            }
        // switch (timeType){
        //     case "HOUR" :
        //         var urlHourAPI = "http://192.168.100.8:1999/videos?page=" + idPage;
        //         timeView.displayListVideo(urlHourAPI);
        //         break;
        //     case "DAY" :
        //         var urlDayAPI = "http://www.mocky.io/v2/5b29c3f12f00008d00f56210" + idPage;
        //         timeView.displayListVideo(urlDayAPI);
        //         break;
        //     case "MONTH" :
        //         var urlMonthAPI = "http://www.mocky.io/v2/5b29c4f42f00008d00f5621b" + idPage;
        //         timeView.displayListVideo(urlMonthAPI);
        //         break;
        // }
    },
    updateListVideo: function () {
        var pageId = $('.page-number').text();
        timeView.getListVideo(pageId);
        $('#sort-video').on('change', function () {
            timeView.getListVideo(pageId);
        });
    },
    /**
     *  call api get list video and display in client
     * @param urlListVideo
     */
    displayListVideo: function (urlListVideo) {
        var displayVideo = $('.display-list-video');
        var output = "";
        $.ajax({
            type: "GET",
            url: urlListVideo,
            dataType: 'json',
            success: function (result) {
                var result_data = result.content.data;
                for (var i in result_data) {
                    output += "<tr><td>" + result_data[i].post_id + "</td><td>" + result_data[i].total_view + "</td><td>" + result_data[i].duration_avg + "</td>" +
                        "</td><td><button class='btn btn-primary'  onclick=\" timeView.getTimeViewChartById( '" + result_data[i].post_id + "'); updateNameVideo('" + result_data[i].post_id + "'); \">Xem thống kê</button></td></tr>";
                }
                displayVideo.html(output);
            }
        });
    },
    /**
     *  update data after click change type time
     */
    updateTimeTypeSelect: function () {
        var valueTimeType = $('#time-select').find(":selected").text();
        if (valueTimeType === "Giờ") {
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
    updateDateSelect: function () {
        $('#start-date').datepicker({
            maxDate: moment().format('MM/DD/YYYY'),
            onSelect: function (dateText, inst) {
                var idVideo = $('.name-video').text();
                var startDate = $('#start-date').val();
                var endDate = $('#end-date').val();
                if (idVideo === "" && endDate !== "") {
                    timeView.getTimeViewChartTotal();
                }
                else {
                    timeView.getTimeViewChartById(idVideo);
                }
                $("#end-date").datepicker("change", { minDate: moment(startDate).format('MM/DD/YYYY') });
            }
        });
        $('#end-date').datepicker({
            minDate: moment().add(-1,'days').format('MM/DD/YYYY'),
            maxDate: moment().format('MM/DD/YYYY'),
            onSelect: function (dateText, inst) {
                var idVideo = $('.name-video').text();
                var startDate = $('#start-date').val();
                var endDate = $('#end-date').val();
                if (startDate !== "" && idVideo !== "") {
                    timeView.getTimeViewChartById(idVideo);
                }
                else {
                    timeView.getTimeViewChartTotal();
                }
                $("#start-date").datepicker("change", { maxDate: moment(endDate).format('MM/DD/YYYY') });
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
                var pageNumber = data.content.total_size/10;
                $('.pagination').twbsPagination({
                    totalPages: pageNumber,
                    visiblePages: 6,
                    next: 'Next',
                    prev: 'Prev',
                    onPageClick: function (event, page) {
                        //fetch content and render here
                        timeView.getListVideo(page - 1 );
                    }
                });
                // var pagination = "";
                // for (var i = 0; i < pageNumber; i++) {
                //     pagination += "<li><a href=\"#\" onclick='timeView.getListVideo(" + i + ")'>" + (i + 1) + "</a></li>";
                // }
                // $(".pagination").html(pagination);
                // $('.pagination li:first').addClass('active');
                // $('.pagination li').on('click', function () {
                //     $(this).parent().find('li.active').removeClass('active');
                //     $(this).addClass('active');
                //     $('.page-number').val($(this).children().text());
                // });
            },
            error: function () {
                console.log("Error get list video!");
            }
        });
    }

};
/**
 *  Total function using time timeApiResponse
 * @type {{getTimeApiResponseChartById: timeApiResponse.getTimeApiResponseChartById, getDataFromApi: timeApiResponse.getDataFromApi, getListVideo: timeApiResponse.getListVideo, displayListVideo: timeApiResponse.displayListVideo, updateTimeTypeSelect: timeApiResponse.updateTimeTypeSelect, updateDateSelect: timeApiResponse.updateDateSelect, paginationPage: timeApiResponse.paginationPage}}
 */
timeApiResponse = {
    getChartDefault: function () {
        var dateNow = moment().format('MM/DD/YYYY');
        var yesterday = moment().add(-1, 'days').format('MM/DD/YYYY');
        $('#start-date').val(yesterday);
        $('#end-date').val(yesterday);
        timeApiResponse.getTimeApiResponseChartTotal();
    },
    /**
     *  Time api response chart total
     */
    getTimeApiResponseChartTotal: function () {
        var startDate = $('#start-date').val();
        var endDate = $('#end-date').val();
        if (startDate !== "") {
            var newStartDate = new Date(startDate).getTime();
            var newEndDate = new Date(endDate).getTime();
            var url = urlAPI + "api-response?start=" + newStartDate + "&end=" + newEndDate;
            console.log(url);
            $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',
                success: function (data) {
                    try {
                        var dataDuration = data.content.data;
                        var typeTime = data.content.time;
                        var listDurationAvg = [];
                        var listDay = [];
                        var listHour = [];
                        var listMonth = [];
                        for (var i = 0; i < dataDuration.length; i++) {
                            listDurationAvg.push(dataDuration[i].duration_avg / 60000);
                            listDay.push(convertDateToDayMonth(dataDuration[i].dt));
                            listHour.push(convertDateToHour(dataDuration[i].dt));
                            listMonth.push(convertDateToMonthYear(dataDuration[i].dt));
                        }
                        if (typeTime === "HOUR") {
                            $('.time-type').text("giờ");
                            timeApiResponseChart.everyHour(listDurationAvg, listHour);
                        }
                        else if (typeTime === "DAY") {
                            $('.time-type').text("ngày");
                            timeApiResponseChart.dailyTime(listDurationAvg, listDay);
                        }
                        else {
                            $('.time-type').text("tháng");
                            timeApiResponseChart.monthlyTime(listDurationAvg, listMonth);
                        }

                    } catch (e) {
                        console.log("Không có dữ liệu");
                    }
                },
                error: function () {
                    console.log("Error!");
                }
            });
        }
    },
    /**
     *  Time feedback chart by id video
     * @param idVideo
     */
    getTimeApiResponseChartById: function (idVideo) {
        var startDate = $('#start-date').val();
        var endDate = $('#end-date').val();
        if (startDate !== "" && endDate !== "") {
            var newStartDate = new Date(startDate).getTime();
            var newEndDate = new Date(endDate).getTime();
            var urlDayAPI = urlAPI + "api-response?start=" + newStartDate + "&end=" + newEndDate + "&api=" + idVideo;
            console.log(urlDayAPI);
            timeApiResponse.getDataFromApi(urlDayAPI);
        }
    },
    /**
     *  Call api get data
     * @param urlApi
     */
    getDataFromApi: function (urlApi) {
        console.log(urlApi);
        $.ajax({
            type: "GET",
            url: urlApi,
            dataType: 'json',
            success: function (data) {
                try {
                    var dataDuration = data.content.data;
                    var listDurationAvg = [];
                    var listDay = [];
                    var listHour = [];
                    var listMonth = [];
                    for (var i = 0; i < dataDuration.length; i++) {
                        listDurationAvg.push(parseFloat(dataDuration[i].duration_avg / 60000).toFixed(2));
                        listDay.push(convertDateToDayMonth(dataDuration[i].dt));
                        listHour.push(convertDateToHour(dataDuration[i].dt));
                        listMonth.push(convertDateToMonthYear(dataDuration[i].dt));
                    }
                    switch (data.content.time) {
                        case "HOUR" :
                            $(".time-type").text("giờ");
                            timeApiResponseChart.everyHour(listDurationAvg, listHour);
                            break;
                        case "DAY" :
                            $(".time-type").text("ngày");
                            timeApiResponseChart.dailyTime(listDurationAvg, listDay);
                            break;
                        case "MONTH" :
                            $(".time-type").text("tháng");
                            timeApiResponseChart.monthlyTime(listDurationAvg, listMonth);
                            break;
                    }
                } catch (e) {
                    console.log("Không có dữ liệu");
                }

            }
        });
    },
    updateListApi: function () {
        var pageId = $('.page-number').text();
        timeApiResponse.getListApi(pageId);
        $('#sort-video').on('change', function () {
            timeApiResponse.getListApi(pageId);
        });
    },
    /**
     *  get type and url api list api
     * @param pageId
     */
    getListApi: function (pageId) {
        // var timeType = $('.time-type').text();
            var typeList = $('#sort-video').find(":selected").val();
            if (typeList === "increase") {
                timeApiResponse.displayListApi(urlAPI + "api-response?page=" + pageId + "&sort=ASC");
            } else {
                timeApiResponse.displayListApi(urlAPI + "api-response?page=" + pageId + "&sort=DESC");
            }
        // switch (timeType){
        //     case "giờ" :
        //         var urlHourAPI = urlAPI + "?page=" + pageId;
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
     *
     * @param urlListApi
     */
    displayListApi: function (urlListApi) {
        var displayVideo = $('.display-list-api');
        var output = "";
        console.log(urlListApi);
        $.ajax({
            type: "GET",
            url: urlListApi,
            dataType: 'json',
            success: function (result) {
                var listApi = result.content.data;
                for (var i in listApi) {
                    output += "<tr><td>" + listApi[i].api + "</td><td>" + listApi[i].duration_avg + "</td>" +
                        "</td><td><button class='btn btn-primary'  onclick=\" timeApiResponse.getTimeApiResponseChartById( '" + listApi[i].api + "'); " +
                        "updateNameVideo( '" + listApi[i].api + "'); \">Xem thống kê</button></td></tr>";
                }
                displayVideo.html(output);
            }
        });
    },
    /**
     *  update data after click time type
     */
    updateTimeTypeSelect: function () {
        var valueTimeType = $('#time-select').find(":selected").text();
        if (valueTimeType === "Giờ") {
            $('.end-date-form').hide();
        }
        $('#time-select').on('change', function () {
            var valueSelected = $('#time-select').find(":selected").text();
            // hien thi time type tren tieu de bieu do
            $('.time-type').text(" " + valueSelected);
            var idApi = $('.name-api').text();
            if (valueSelected === "Giờ") {
                $('.end-date-form').hide();
            } else {
                $('.end-date-form').show();
            }
            if (idApi !== "") {
                timeApiResponse.getTimeApiResponseChartById(idApi);
            } else {
                console.log("Bạn chưa chọn video!");
            }

        });
    },
    /**
     * Update data after click select date time
     */
    updateDateSelect: function () {
        var startDate = $('#start-date').val();
        $('#start-date').datepicker({
            maxDate: moment().format('MM/DD/YYYY'),
            onSelect: function (dateText, inst) {
                var idApi = $('.name-api').text();
                var startDate = $('#start-date').val();
                var endDate = $('#end-date').val();
                if (idApi === "" && endDate !== "") {
                    timeApiResponse.getTimeApiResponseChartTotal();
                }
                else {
                    timeApiResponse.getTimeApiResponseChartById(idApi);
                }
                $("#end-date").datepicker("change", { minDate: moment(startDate).format('MM/DD/YYYY') });
            }
        });
        $('#end-date').datepicker({
            minDate: moment().add(-1,'days').format('MM/DD/YYYY'),
            maxDate: moment().format('MM/DD/YYYY'),
            onSelect: function (dateText, inst) {
                var idApi = $('.name-video').text();
                var startDate = $('#start-date').val();
                var endDate = $('#end-date').val();
                if (startDate !== "" && idApi !== "") {
                    timeApiResponse.getTimeApiResponseChartById(idApi);
                }
                else {
                    timeApiResponse.getTimeApiResponseChartTotal();
                }
                $("#start-date").datepicker("change", { maxDate: moment(endDate).format('MM/DD/YYYY') });
            }
        });
    },
    /**
     *  Pagination page after get data list video
     */
    paginationPage: function () {
        $.ajax({
            type: "GET",
            url: urlAPI + "api-response?page=0",
            dataType: 'json',
            success: function (data) {
                var pageNumber = data.content.total_size/10;
                $('.pagination').twbsPagination({
                    totalPages: pageNumber,
                    visiblePages: 6,
                    next: 'Next',
                    prev: 'Prev',
                    onPageClick: function (event, page) {
                        //fetch content and render here
                        timeApiResponse.getListApi(page -1 );
                    }
                });
                // var pagination = "";
                //
                // for (var i = 0; i < pageNumber; i++) {
                //     pagination += " <li><a href=\"#\" onclick='timeApiResponse.getListApi(" + i + ")'>" + (i + 1) + "</a></li>";
                // }
                // $(".pagination").html(pagination);
                // $('.pagination li:first').addClass('active');
                // $('.pagination li').on('click', function () {
                //     $(this).parent().find('li.active').removeClass('active');
                //     $(this).addClass('active');
                //     $('.page-number').val($(this).children().text());
                // });
            },
            error: function () {
                console.log("Error get list video!");
            }
        });
    }
};
/**
 *  Total function using in dashboard link die
 * @type {{getDataLinkDie: linkDie.getDataLinkDie, getDataFromApi: linkDie.getDataFromApi, getlistVideo: linkDie.getlistVideo, dashboardLinkDie: linkDie.dashboardLinkDie, displaylistVideo: linkDie.displaylistVideo, updateTimeTypeSelect: linkDie.updateTimeTypeSelect, updateDateSelect: linkDie.updateDateSelect, paginationPage: linkDie.paginationPage}}
 */
linkDie = {
    getChartDefault: function () {
        var dateNow = moment().format('MM/DD/YYYY');
        var yesterday = moment().add(-1, 'days').format('MM/DD/YYYY');
        $('#start-date').val(yesterday);
        $('#end-date').val(yesterday);
        // linkDie.getLinkDieChartTotal();
        linkDieChart.everyHour();
    },
    getLinkDieChartTotal: function () {
        var startDate = $('#start-date').val();
        var endDate = $('#end-date').val();
        if (startDate !== "") {
            var newStartDate = new Date(startDate).getTime();
            var newEndDate = new Date(endDate).getTime();
            var url = urlAPI + "link-die?start=" + newStartDate + "&end=" + newEndDate;
            console.log(url);
            $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',
                success: function (data) {
                    try {
                        var dataLinkDie = data.content.data;
                        var typeTime = data.content.time;
                        var listDailymotion = [];
                        var listYoutube = [];
                        var listStream = [];
                        var listWZ = [];
                        var listVideoError = [];
                        var listHour = [];
                        var listDay = [];
                        var listMonth = [];
                        for (var i = 0; i < dataLinkDie.length; i++) {
                            listDailymotion.push(dataLinkDie[i].dailymotion);
                            listYoutube.push(dataLinkDie[i].youtube);
                            listStream.push(dataLinkDie[i].stream);
                            listWZ.push(dataLinkDie[i].wz);
                            listVideoError.push(dataLinkDie[i].die);
                            listDay.push(convertDateToDayMonth(dataLinkDie[i].dt));
                            listHour.push(convertDateToHour(dataLinkDie[i].dt));
                            listMonth.push(convertDateToMonthYear(dataLinkDie[i].dt));
                        }
                        if (typeTime === "HOUR") {
                            $(".time-type").text("giờ");
                            linkDieChart.everyHour(listDailymotion,listYoutube,listStream,listWZ,listVideoError, listHour);
                        }
                        else if (typeTime === "DAY") {
                            $(".time-type").text("ngày");
                            linkDieChart.dailyTime(listDailymotion,listYoutube,listStream,listWZ,listVideoError, listDay);
                        }
                        else {
                            $(".time-type").text("tháng");
                            linkDieChart.monthlyTime(listDailymotion,listYoutube,listStream,listWZ,listVideoError, listMonth);
                        }
                    } catch (e) {
                        console.log("Không có dữ liệu!");
                    }
                },
                error: function () {
                    console.log("Error!");
                }
            });
        }
    },
    /**
     *
     */
    getDataLinkDie: function () {
        var startDate = $('#start-date').val();
        var endDate = $('#end-date').val();
        if (startDate !== "") {
            var timeType = $('#time-select').find(":selected").val();
            var newStartDate = new Date(startDate).getTime();
            var newEndDate = new Date(endDate).getTime();
            switch (timeType) {
                case "HOUR" :
                    var urlHourAPI = "link-die?type=" + timeType + "&day=" + newStartDate;
                    linkDie.getDataFromApi(urlHourAPI);
                    break;
                case "DAY" :
                    var urlDayAPI = "link-die?type=" + timeType + "&startDay=" + newStartDate + "&endDay=" + newEndDate;
                    linkDie.getDataFromApi(urlDayAPI);
                    break;
                case "MONTH" :
                    var urlMonthAPI = "link-die";
                    linkDie.getDataFromApi(urlMonthAPI);
                    break;
            }
        } else {
            console.log("Ngày chưa được chọn");
        }

    },
    getLinkDieById: function (idVideo) {
        var startDate = $('#start-date').val();
        var endDate = $('#end-date').val();
        if (startDate !== "" && endDate !== "") {
            var newStartDate = new Date(startDate).getTime();
            var newEndDate = new Date(endDate).getTime();
            var urlDayAPI = urlAPI + "link-die?start=" + newStartDate + "&end=" + newEndDate + "&post_id=" + idVideo;
            console.log(urlDayAPI);
            linkDie.getDataFromApi(urlDayAPI);
        }
    },
    /**
     * call api get data
     * @param urlApi
     */
    getDataFromApi: function (urlApi) {
        $.ajax({
            type: "GET",
            url: urlApi,
            dataType: 'json',
            success: function (data) {
                try {
                    var dataLinkDie = data.content.data;
                    var listDailymotion = [];
                    var listYoutube = [];
                    var listStream = [];
                    var listWZ = [];
                    var listVideoError = [];
                    var listDay = [];
                    var listHour = [];
                    var listMonth = [];
                    for (var i = 0; i < dataLinkDie.length; i++) {
                        listDailymotion.push(dataLinkDie[i].dailymotion);
                        listYoutube.push(dataLinkDie[i].youtube);
                        listStream.push(dataLinkDie[i].stream);
                        listWZ.push(dataLinkDie[i].wz);
                        listVideoError.push(dataLinkDie[i].die);
                        listDay.push(convertDateToDayMonth(dataLinkDie[i].dt));
                        listHour.push(convertDateToHour(dataLinkDie[i].dt));
                        listMonth.push(convertDateToMonthYear(dataLinkDie[i].dt));
                    }
                    console.log(listDay);
                    switch (data.content.time) {
                        case "HOUR" :
                            $(".time-type").text("giờ");
                            linkDie.everyHour(listDailymotion,listYoutube,listStream,listWZ,listVideoError, listHour);
                            break;
                        case "DAY" :
                            $(".time-type").text("ngày");
                            linkDie.dailyTime(listDailymotion,listYoutube,listStream,listWZ,listVideoError, listDay);
                            break;
                        case "MONTH" :
                            $(".time-type").text("tháng");
                            linkDie.monthlyTime(listDailymotion,listYoutube,listStream,listWZ,listVideoError, listMonth);
                            break;
                    }
                } catch (e) {
                    console.log("Không có dữ liệu");
                }
            }
        });
    },
    /**
     *  get list video
     */
    getListVideo: function (pageId) {
        linkDie.displayListVideo(urlAPI + "videos?page=" + pageId);
        var timeType = $('.time-type').text();
        $('#sort-video').on('change', function () {
            var typeList = $('#sort-video').find(":selected").val();
            if (typeList === "increase") {
                linkDie.displayListVideo(urlAPI + "videos?page=" + pageId + "&sort=ASC");
            } else {
                linkDie.displayListVideo(urlAPI + "videos?page=" + pageId + "&sort=DESC");
            }
        });
        // switch (timeType) {
        //     case "HOUR" :
        //         var urlHourAPI = "http://www.mocky.io/v2/5b2885122f00002c00f55d1a";
        //         linkDie.displaylistVideo(urlHourAPI);
        //         break;
        //     case "DAY" :
        //         var urlDayAPI = "http://www.mocky.io/v2/5b29c3f12f00008d00f56210";
        //         linkDie.displaylistVideo(urlDayAPI);
        //         break;
        //     case "MONTH" :
        //         var urlMonthAPI = "http://www.mocky.io/v2/5b29c4f42f00008d00f5621b";
        //         linkDie.displaylistVideo(urlMonthAPI);
        //         break;
        // }
    },
    /**
     *
     * @param urlListVideo
     */
    displayListVideo: function (urlListVideo) {
        var displayVideo = $('.display-list-video');
        var output = "";
        $.ajax({
            type: "GET",
            url: urlListVideo,
            success: function (result) {
                for (var i in result) {
                    output += "<tr><td>" + result[i].id + "</td><td>" + result[i].name + "</td><td>" + result[i].duration_avg + "</td>" + "</td><td>" + result[i].name + "</td><td>" +
                        "</td><td><button class='btn btn-primary'  onclick=\" linkDie.getLinkDieById( " + result[i].id + "); updateNameVideo(  " + result[i].id + " , '" + result[i].name + "'); \">Xem thống kê</button></td></tr>";
                }
                displayVideo.html(output);
            }
        });
    },
    /**
     * update data after change type time
     */
    updateTimeTypeSelect: function () {
        var valueTimeType = $('#time-select').find(":selected").text();
        if (valueTimeType === "Giờ") {
            $('.end-date-form').hide();
        }
        $('#time-select').on('change', function () {
            var valueSelected = $('#time-select').find(":selected").text();
            $('.time-type').text(" " + valueSelected);
            linkDie.getlistVideo(0);
            var idVideo = $('.name-video').text();
            if (valueSelected === "Giờ") {
                $('.end-date-form').hide();
            } else {
                $('.end-date-form').show();
            }
            if (idVideo !== "") {
                linkDie.linkDieChartById(idVideo);
            }

        });
    },
    /**
     * update data after select date time
     */
    updateDateSelect: function () {
        $('#start-date').datepicker({
            maxDate: moment().format('MM/DD/YYYY'),
            onSelect: function (dateText, inst) {
                var idVideo = $('.name-video').text();
                var startDate = $('#start-date').val();
                var endDate = $('#end-date').val();
                if (idVideo === "" && endDate !== "") {
                    linkDie.getLinkDieChartTotal();
                }
                else {
                    linkDie.getLinkDieChartById(idVideo);
                }
                $("#end-date").datepicker("change", { minDate: moment(startDate).format('MM/DD/YYYY') });
            }
        });
        $('#end-date').datepicker({
            minDate: moment().add(-1,'days').format('MM/DD/YYYY'),
            maxDate: moment().format('MM/DD/YYYY'),
            onSelect: function (dateText, inst) {
                var idVideo = $('.name-video').text();
                var startDate = $('#start-date').val();
                var endDate = $('#end-date').val();
                if (startDate !== "" && idVideo !== "") {
                    linkDie.getLinkDieChartById(idVideo);
                }
                else {
                    linkDie.getLinkDieChartTotal();
                }
                $("#start-date").datepicker("change", { maxDate: moment(endDate).format('MM/DD/YYYY') });
            }
        });
    },
    /**
     * pagination page after get list video
     */
    paginationPage: function () {
        $.ajax({
            type: "GET",
            url: urlAPI + "api-response?page=0",
            dataType: 'json',
            success: function (data) {
                var pageNumber = data.content.total_size/10;
                $('.pagination').twbsPagination({
                    totalPages: pageNumber,
                    visiblePages: 6,
                    next: 'Next',
                    prev: 'Prev',
                    onPageClick: function (event, page) {
                        //fetch content and render here
                        linkDie.getListVideo(page -1 );
                    }
                });
                // var pagination = "";
                //
                // for (var i = 0; i < pageNumber; i++) {
                //     pagination += " <li><a href=\"#\" onclick='timeApiResponse.getListApi(" + i + ")'>" + (i + 1) + "</a></li>";
                // }
                // $(".pagination").html(pagination);
                // $('.pagination li:first').addClass('active');
                // $('.pagination li').on('click', function () {
                //     $(this).parent().find('li.active').removeClass('active');
                //     $(this).addClass('active');
                //     $('.page-number').val($(this).children().text());
                // });
            },
            error: function () {
                console.log("Error get list video!");
            }
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
    var newDate = (date.getMonth() + 1) + "/" + date.getFullYear();
    return newDate;
}