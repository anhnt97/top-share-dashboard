timePlayChart = {
    everyHour: function (msgEveryHour,listHour) {
        /* ----------==========     Every hour play Chart initialization    ==========---------- */
        var dataEveryHour = {
            labels: listHour,
            series: [
                msgEveryHour
            ]
        };

        var optionsEveryHour = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            height: 500 ,
            axisY: {
                chartPadding: {
                    left: 5
                },
                labelInterpolationFnc: function(value) {
                    return value + 'm';
                }
            },
            axisX: {
                labelInterpolationFnc: function skipLabels(value, index, labels) {
                    if(labels.length > 24) {
                        return  null;
                    } else {
                        return value;
                    }
                }
            }
        };

        var everyHourPlayChart = new Chartist.Line('.ct-chart',dataEveryHour, optionsEveryHour);

        md.startAnimationForLineChart(everyHourPlayChart);
    },
    dailyTime: function (msgDailyTime,listDay) {
        /* ----------==========     Daily Time play Chart initialization    ==========---------- */
        var dataDailyTime = {
            labels: listDay,
            series: [
                msgDailyTime
            ]
        };
        var optionsDailyTime = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            height: 500 ,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value + 'm';
                }
            }
        };

        var dailyTimePlayChart = new Chartist.Line('.ct-chart',dataDailyTime, optionsDailyTime);

        md.startAnimationForLineChart(dailyTimePlayChart);
    },
    monthlyTime: function (msgMonthTime) {

        var dataMonthlyTime = {
            labels: ['January', 'February', 'March', 'April', 'May',
                'June', 'July','August','September','October','November','December'],
            series: [
                msgMonthTime
            ]
        };

        var optionsMonthlyTime = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            height: 500 ,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value + 'm';
                }
            }
        };

        var monthlyTimePlayChart = new Chartist.Line('.ct-chart',dataMonthlyTime, optionsMonthlyTime);

        md.startAnimationForLineChart(monthlyTimePlayChart);
    }
};
timeViewChart = {
  everyHour: function (msgEveryHour) {
      /* ----------==========     Every hour  view Chart initialization    ==========---------- */

      var dataEveryHourViewChart = {
          labels: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
          series: [
              msgEveryHour
          ]
      };

      var optionsEveryHourViewChart = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          height: 500,
          axisY: {
              labelInterpolationFnc: function(value) {
                  return value + 'ms';
              }
          }
      };
      var everyHourViewChart = new Chartist.Line('#timeViewChart',dataEveryHourViewChart, optionsEveryHourViewChart);
        animation.animationForLine(everyHourViewChart);
  },
  dailyTime: function (listDuration,listDay) {
      /* ----------==========     Daily time view Chart initialization    ==========---------- */

      var dataDailyTime = {
          labels: listDay,
          series: [
              listDuration
          ]
      };

      var optionsDailyTime = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          height: 500,
          axisY: {
              labelInterpolationFnc: function(value) {
                  return value + 'ms';
              }
          }
      };

      var dailyTimeViewChart = new Chartist.Line('#timeViewChart',dataDailyTime, optionsDailyTime);

      animation.animationForLine(dailyTimeViewChart);
  },
  monthlyTime: function (msgMonthTime) {
      /* ----------==========     Monthly time view Chart initialization    ==========---------- */

      var dataMonthlyTimeViewChart = {
          labels: ['January', 'February', 'March', 'April', 'May',
              'June', 'July','August','September','October','November','December'],
          series: [
              msgMonthTime
          ]
      };

      var optionsMonthlyTimeViewChart = {
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

      var monthlyTimeViewChart = new Chartist.Line('#timeViewChart',dataMonthlyTimeViewChart, optionsMonthlyTimeViewChart);

      animation.animationForLine(monthlyTimeViewChart);
  }
};
timeFeedbackAPIChart = {
    everyHour: function (msgEveryHour) {
        /* ----------==========     Every hour  view Chart initialization    ==========---------- */
        console.log(msgEveryHour);
        var dataEveryHour = {
            labels: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
            series: [
                msgEveryHour
            ]
        };

        var optionsEveryHour = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            height: 500,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value + 'm';
                }
            }
        };
        var everyHourFeedbackAPIChart = new Chartist.Line('#timeFeedbackAPIChart',dataEveryHour, optionsEveryHour);
        animation.animationForLine(everyHourFeedbackAPIChart);
    },
    dailyTime: function (listDuration,listDay) {
        /* ----------==========     Daily time feedback Chart initialization    ==========---------- */

        var dataDailyTimeFeedbackChart = {
            labels: listDay,
            series: [
                listDuration
            ]
        };

        var optionsDailyTimeFeedbackChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            height: 500 ,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value + 'm';
                }
            }
        };

        var dailyTimeFeedbackChart = new Chartist.Line('#timeFeedbackChart',dataDailyTimeFeedbackChart, optionsDailyTimeFeedbackChart);

        animation.animationForLine(dailyTimeFeedbackChart);
    },
    monthlyTime: function (msgMonthTime) {
        /* ----------==========     Monthly time feed back API Chart initialization    ==========---------- */

        var dataMonthlyTimeFeedbackChart = {
            labels: ['January', 'February', 'March', 'April', 'May',
                'June', 'July','August','September','October','November','December'],
            series: [
                msgMonthTime
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

        var monthlyTimeFeedbackChart = new Chartist.Line('#timeFeedbackChart',dataMonthlyTimeFeedbackChart, optionsMonthlyTimeFeedbackChart);

        md.startAnimationForLineChart(monthlyTimeFeedbackChart);
    }
};
linkDieChart = {
    dailyTime: function (msgDaily) {
        /* ----------==========     Daily number link die Chart initialization    ==========---------- */

        var dataDailyNumberLinkDieChart = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            series: [
                [1, 2, -5,-3, 6, 4, 5],
                [2, 3, -2,-3, 4, 2, 3],
                [3, 5, -4,-3, 5, 3, 4],
                [5, 4, -2,-3, 5, 6, 3]
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

        var dailyNumberLinkDieChart = new Chartist.Bar('#dailyTimeLinkDieChart',dataDailyNumberLinkDieChart,
            optionsDailyNumberLinkDieChart,responsiveOptions);
        animation.animationUpForBar(dailyNumberLinkDieChart);
    },
    monthlyTime: function (msgMonth) {
        /* ----------==========     Monthly number link die Chart initialization    ==========---------- */

        var dataMonthlyTime = {
            labels: ['January', 'February', 'March', 'April', 'May',
                'June', 'July','August','September','October','November','December'],
            series: [
                [1, 2, 5, 3, 6, 4, 5, 3, 5, 6, 1, 5],
                [3, 3, 2, 3, 4, 2, 3, 5, 3, 6, 4, 5],
                [2, 5, 4, 3, 5, 3, 4, 2, 3, 4, 2, 3],
                [5, 4, 2, 3, 5, 6, 3, 4, 3, 5, 3, 4]
            ]
        };

        var optionsMonthlyTime = {
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
        var monthlyTimeLinkDieChart = new Chartist.Bar('#monthlyTimeLinkDieChart',dataMonthlyTime,
            optionsMonthlyTime,responsiveOptions);
       animation.animationUpForBar(monthlyTimeLinkDieChart);
    }
};
