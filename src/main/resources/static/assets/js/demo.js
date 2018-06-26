type = ['', 'info', 'success', 'warning', 'danger'];


demo = {
    initTimePlayPageCharts: function(dataTimePlay) {
        var dataDuration = dataTimePlay.data;
        var listDurationTotal=[];
        for(var i = 0; i < dataDuration.length ; i++) {
            listDurationTotal.push(dataDuration[i].duration.duration_avg);
        }
        /* ----------==========     Daily Time play Chart initialization    ==========---------- */
        var dataDailyTimePlayChart = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            series: [
                listDurationTotal
            ]
        };

        var optionsDailyTimePlayChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            height: 500 ,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value + 'ms';
                }
            }
        };

        var dailyTimePlayChart = new Chartist.Line('#dailyTimePlayChart',dataDailyTimePlayChart, optionsDailyTimePlayChart);

        md.startAnimationForLineChart(dailyTimePlayChart);

        /* ----------==========     Monthly Time play Chart initialization    ==========---------- */

        var dataMonthlyTimePlayChart = {
            labels: ['January', 'February', 'March', 'April', 'May',
                'June', 'July','August','September','October','November','December'],
            series: [
                [1, 1.25, 0.7, 2, 2.25, 1.5, 1.25, 3, 1.5, 2, 1.75, 0.9]
            ]
        };

        var optionsMonthlyTimePlayChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            height: 500 ,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value + 's';
                }
            }
        };

        var monthlyTimePlayChart = new Chartist.Line('#monthlyTimePlayChart',dataMonthlyTimePlayChart, optionsMonthlyTimePlayChart);

        md.startAnimationForLineChart(monthlyTimePlayChart);



        /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

        var dataEmailsSubscriptionChart = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
                [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

            ]
        };
        var optionsEmailsSubscriptionChart = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: {
                top: 0,
                right: 5,
                bottom: 0,
                left: 0
            }
        };
        var responsiveOptions = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function(value) {
                        return value[0];
                    }
                }
            }]
        ];
        var emailsSubscriptionChart = Chartist.Bar('#emailsSubscriptionChart', dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions);

        //start animation for the Emails Subscription Chart
        md.startAnimationForBarChart(emailsSubscriptionChart);

    },
    initTimeViewPageCharts: function (data) {
        var dataReview = data.reviews;
        var listLongTime=[];
        for(var i = 0; i < dataReview.length ; i++){
            listLongTime.push(dataReview[i].long_time);

        }
        /* ----------==========     Every hour  view Chart initialization    ==========---------- */

        var dataEveryHourViewChart = {
            labels: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
            series: [
                listLongTime
            ]
        };

        var optionsEveryHourViewChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            height: 500,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value + 'h';
                }
            }
        };
        var everyHourViewChart = new Chartist.Line('#everyHourViewChart',dataEveryHourViewChart, optionsEveryHourViewChart);

        md.startAnimationForLineChart(everyHourViewChart);
        /* ----------==========     Daily time view Chart initialization    ==========---------- */

        var dataDailyTimeViewChart = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            series: [
                [1, 1.25, 0.7,2, 2.25, 1.5, 1.25]
            ]
        };

        var optionsDailyTimeViewChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            height: 500,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value + 'h';
                }
            }
        };

        var dailyTimeViewChart = new Chartist.Line('#dailyTimeViewChart',dataDailyTimeViewChart, optionsDailyTimeViewChart);

        md.startAnimationForLineChart(dailyTimeViewChart);

        /* ----------==========     Monthly time view Chart initialization    ==========---------- */

        var dataMonthlyTimeViewChart = {
            labels: ['January', 'February', 'March', 'April', 'May',
                'June', 'July','August','September','October','November','December'],
            series: [
                [100, 100.25, 70, 200, 200.25, 100.5, 100.25, 300, 100.5, 200, 100.75, 90]
            ]
        };

        var optionsMonthlyTimeViewChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            height: 500 ,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value + 'h';
                }
            }
        };

        var monthlyTimeViewChart = new Chartist.Line('#monthlyTimeViewChart',dataMonthlyTimeViewChart, optionsMonthlyTimeViewChart);

        md.startAnimationForLineChart(monthlyTimeViewChart);
    },
    initTimeFeedbackPageCharts: function (dataAPI) {
        var dataDuration = dataAPI.data;
        console.log(dataDuration);
        var listDurationTotal=[];
        for(var i = 0; i < dataDuration.length ; i++) {
            listDurationTotal.push(dataDuration[i].duration.duration_avg);
        }

        /* ----------==========     Daily time feedback Chart initialization    ==========---------- */

        var dataDailyTimeFeedbackChart = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            series: [
                listDurationTotal
            ]
        };

        var optionsDailyTimeFeedbackChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            height: 500 ,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value + 'ms';
                }
            }
        };

        var dailyTimeFeedbackChart = new Chartist.Line('#dailyTimeFeedbackChart',dataDailyTimeFeedbackChart, optionsDailyTimeFeedbackChart);

        md.startAnimationForLineChart(dailyTimeFeedbackChart);
        /* ----------==========     Monthly time feed back API Chart initialization    ==========---------- */

        var dataMonthlyTimeFeedbackChart = {
            labels: ['January', 'February', 'March', 'April', 'May',
                'June', 'July','August','September','October','November','December'],
            series: [
                [1, 1.25, 0.7, 2, 2.25, 1.5, 1.25, 3, 1.5, 2, 1.75, 0.9]
            ]
        };

        var optionsMonthlyTimeFeedbackChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            height: 500 ,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value + 'ms';
                }
            }
        };

        var monthlyTimeFeedbackChart = new Chartist.Line('#monthlyTimeFeedbackChart',dataMonthlyTimeFeedbackChart, optionsMonthlyTimeFeedbackChart);

        md.startAnimationForLineChart(monthlyTimeFeedbackChart);
    },
    initLinkDiePageCharts: function () {
        /* ----------==========     Daily number link die Chart initialization    ==========---------- */

        var dataDailyNumberLinkDieChart = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            series: [
                [1, 2, 5,3, 6, 4, 5],
                [-2, -3, -2,-3, -4, -2, -3],
                [-3, -5, -4,-3, -5, -3, -4],
                [5, 4, 2,3, 5, 6, 3]
            ]
        };

        var optionsDailyNumberLinkDieChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            height: 500 ,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value;
                },
                onlyInteger: true
            }
        };
        var responsiveOptions = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];

        var dailyNumberLinkDieChart = new Chartist.Bar('#dailyNumberLinkDieChart',dataDailyNumberLinkDieChart,
           optionsDailyNumberLinkDieChart,responsiveOptions);

        md.startAnimationForBarChart(dailyNumberLinkDieChart);
        /* ----------==========     Monthly number link die Chart initialization    ==========---------- */

        var dataMonthlyNumberLinkDieChart = {
            labels: ['January', 'February', 'March', 'April', 'May',
                'June', 'July','August','September','October','November','December'],
            series: [
                [1, 2, 5, 3, 6, 4, 5, 3, 5, 6, 1, 5],
                [3, 3, 2, 3, 4, 2, 3, 5, 3, 6, 4, 5],
                [2, 5, 4, 3, 5, 3, 4, 2, 3, 4, 2, 3],
                [5, 4, 2, 3, 5, 6, 3, 4, 3, 5, 3, 4]
            ]
        };

        var optionsMonthlyNumberLinkDieChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            height: 500 ,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value;
                },
                onlyInteger: true
            }
        };

        var monthlyNumberLinkDieChart = new Chartist.Bar('#monthlyNumberLinkDieChart',dataMonthlyNumberLinkDieChart,
            optionsMonthlyNumberLinkDieChart,responsiveOptions);

        md.startAnimationForBarChart(monthlyNumberLinkDieChart);
    },
    showNotification: function(from, align) {
        color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "notifications",
            message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

        }, {
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
    }
};
process = {
    processGetData: function () {
        $.ajax({
            method: "GET",
            url: "test",
            data: null ,
            dataType: 'json'
        })
            .done(function( msg ) {
                demo.initTimePlayPageCharts(msg);
            });
    }
};
