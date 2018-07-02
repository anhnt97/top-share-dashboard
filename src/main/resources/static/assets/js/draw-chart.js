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
            chartPadding: {
               top: 0,
               right: 0,
               bottom: 0,
               left: 25

            },
            height: 300,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value + 'm';
                }
            },
            axisX: {
                labelInterpolationFnc: function skipLabels(value, index, labels) {
                    if(labels.length > 48) {
                        return  null;
                    } else {
                        return value;
                    }
                }
            },
            plugins: [
                Chartist.plugins.tooltip()
            ]
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
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 25

            },
            height: 300 ,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value + 'm';
                }
            },
            axisX: {
                labelInterpolationFnc: function skipLabels(value, index, labels) {
                    if(labels.length > 30) {
                        return  null;
                    } else {
                        return value;
                    }
                }
            },
            plugins: [
                Chartist.plugins.tooltip()
            ]
        };

        var dailyTimePlayChart = new Chartist.Line('.ct-chart',dataDailyTime, optionsDailyTime);

        md.startAnimationForLineChart(dailyTimePlayChart);
    },
    monthlyTime: function (msgMonthTime,listMonth) {

        var dataMonthlyTime = {
            labels: listMonth,
            series: [
                msgMonthTime
            ]
        };

        var optionsMonthlyTime = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 25

            },
            height: 300 ,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value + 'm';
                }
            },
            axisX: {
                labelInterpolationFnc: function skipLabels(value, index, labels) {
                    if(labels.length > 12) {
                        return  null;
                    } else {
                        return value;
                    }
                }
            },
            plugins: [
                Chartist.plugins.tooltip()
            ]
        };

        var monthlyTimePlayChart = new Chartist.Line('.ct-chart',dataMonthlyTime, optionsMonthlyTime);

        md.startAnimationForLineChart(monthlyTimePlayChart);
    }
};
timeViewChart = {
  everyHour: function (msgEveryHour,listHour) {
      /* ----------==========     Every hour  view Chart initialization    ==========---------- */

      var dataEveryHourViewChart = {
          labels: listHour,
          series: [
              msgEveryHour
          ]
      };

      var optionsEveryHourViewChart = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 25

          },
          height: 300,
          axisY: {
              labelInterpolationFnc: function(value) {
                  return value + 'm';
              }
          },
          axisX: {
              labelInterpolationFnc: function skipLabels(value, index, labels) {
                  if(labels.length > 48) {
                      return  null;
                  } else {
                      return value;
                  }
              }
          },
          plugins: [
              Chartist.plugins.tooltip()
          ]
      };
      var everyHourViewChart = new Chartist.Line('#timeViewChart',dataEveryHourViewChart, optionsEveryHourViewChart);
        md.startAnimationForLineChart(everyHourViewChart);
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
          chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 25

          },
          height: 300,
          axisY: {
              labelInterpolationFnc: function(value) {
                  return value + 'm';
              }
          },
          axisX: {
              labelInterpolationFnc: function skipLabels(value, index, labels) {
                  if(labels.length > 30) {
                      return  null;
                  } else {
                      return value;
                  }
              }
          },
          plugins: [
              Chartist.plugins.tooltip()
          ]
      };

      var dailyTimeViewChart = new Chartist.Line('#timeViewChart',dataDailyTime, optionsDailyTime);
      md.startAnimationForLineChart(dailyTimeViewChart);
  },
  monthlyTime: function (msgMonthTime,listMonth) {
      /* ----------==========     Monthly time view Chart initialization    ==========---------- */

      var dataMonthlyTimeViewChart = {
          labels: listMonth,
          series: [
              msgMonthTime
          ]
      };

      var optionsMonthlyTimeViewChart = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 25

          },
          height: 300 ,
          axisY: {
              labelInterpolationFnc: function(value) {
                  return value + 'm';
              }
          },
          axisX: {
              labelInterpolationFnc: function skipLabels(value, index, labels) {
                  if(labels.length > 12) {
                      return  null;
                  } else {
                      return value;
                  }
              }
          },
          plugins: [
              Chartist.plugins.tooltip()
          ]
      };

      var monthlyTimeViewChart = new Chartist.Line('#timeViewChart',dataMonthlyTimeViewChart, optionsMonthlyTimeViewChart);

      animation.animationForLine(monthlyTimeViewChart);
  }
};
timeApiResponseChart = {
    everyHour: function (msgEveryHour,listHour) {
        /* ----------==========     Every hour  Api Response Chart initialization    ==========---------- */
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
            chartPadding: {
                top: 5,
                right: 0,
                bottom: 0,
                left: 25

            },
            height: 300,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value + 'm';
                }
            },
            axisX: {
                labelInterpolationFnc: function skipLabels(value, index, labels) {
                    if(labels.length > 48) {
                        return  null;
                    } else {
                        return value;
                    }
                }
            },
            plugins: [
                Chartist.plugins.tooltip()
            ]
        };
        var everyHourFeedbackAPIChart = new Chartist.Line('#timeApiResponseChart',dataEveryHour, optionsEveryHour);
        md.startAnimationForLineChart(everyHourFeedbackAPIChart);
    },
    dailyTime: function (listDuration,listDay) {
        /* ----------==========     Daily time ApiResponse Chart initialization    ==========---------- */

        var dataDailyTimeApiResponseChart = {
            labels: listDay,
            series: [
                listDuration
            ]
        };

        var optionsDailyTimeApiResponseChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            chartPadding: {
                top: 10,
                right: 0,
                bottom: 0,
                left: 25

            },
            height: 300 ,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value + 'm';
                }
            },
            axisX: {
                labelInterpolationFnc: function skipLabels(value, index, labels) {
                    if(labels.length > 30) {
                        return  null;
                    } else {
                        return value;
                    }
                }
            },
            plugins: [
                Chartist.plugins.tooltip()
            ]
        };

        var dailyTimeApiResponseChart = new Chartist.Line('#timeApiResponseChart',dataDailyTimeApiResponseChart, optionsDailyTimeApiResponseChart);
        md.startAnimationForLineChart(dailyTimeApiResponseChart);
    },
    monthlyTime: function (msgMonthTime,listMonth) {
        /* ----------==========     Monthly time Api Response API Chart initialization    ==========---------- */

        var dataMonthlyTimeApiResponseChart = {
            labels: listMonth,
            series: [
                msgMonthTime
            ]
        };

        var optionsMonthlyTimeApiResponseChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 25

            },
            height: 300 ,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value + 'm';
                }
            }
        };

        var monthlyTimeApiResponseChart = new Chartist.Line('#timeApiResponseChart',dataMonthlyTimeApiResponseChart, optionsMonthlyTimeApiResponseChart);

        md.startAnimationForLineChart(monthlyTimeApiResponseChart);
    }
};
linkDieChart = {
    everyHour: function () {
        /* ----------==========     Daily number link die Chart initialization    ==========---------- */

        var dataDailyNumberLinkDieChart = {
            // labels: listHour,
            // series: [
            //     lDailymotion,
            //     lYoutube,
            //     lStream,
            //     lWZ,
            //     lVideoDie
            // ]
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            series: [
                [1, 2, 5,3, 6, 4, 5],
                [2, 3, 2,3, 4, 2, 3],
                [3, 5, 4,3, 5, 3, 4],
                [5, 4, 2,3, 5, 6, 3],
                [3, 2, 1,6, 3, 1, 4]
            ]
        };

        var optionsDailyNumberLinkDieChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            height: 400 ,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value;
                },
                onlyInteger: true
            },
            axisX: {
                labelInterpolationFnc: function skipLabels(value, index, labels) {
                    if(labels.length > 48) {
                        return  null;
                    } else {
                        return value;
                    }
                }
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

        var dailyNumberLinkDieChart = new Chartist.Bar('#linkDieChart',dataDailyNumberLinkDieChart,
            optionsDailyNumberLinkDieChart,responsiveOptions);
        animation.animationUpForBar(dailyNumberLinkDieChart);
    },
    dailyTime: function (lDailymotion,lYoutube,lStream,lWZ,lVideoDie,listDay) {
        /* ----------==========     Daily number link die Chart initialization    ==========---------- */

        var dataDailyNumberLinkDieChart = {
            labels: listDay,
            series: [
                lDailymotion,
                lYoutube,
                lStream,
                lWZ,
                lVideoDie
            ]
        };

        var optionsDailyNumberLinkDieChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            height: 400 ,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value;
                },
                onlyInteger: true
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
    monthlyTime: function (lDailymotion,lYoutube,lStream,lWZ,lVideoDie,listMonth) {
        /* ----------==========     Monthly number link die Chart initialization    ==========---------- */

        var dataMonthlyTime = {
            labels: listMonth,
            series: [
                lDailymotion,
                lYoutube,
                lStream,
                lWZ,
                lVideoDie
            ]
        };

        var optionsMonthlyTime = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            height: 400 ,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value;
                },
                onlyInteger: true
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
function testChart() {
    var chart = new Chartist.Line('#timeApiResponseChart', {
        labels: [1, 2, 3],
        series: [
            [
                {meta: 'description', value: 1 },
                {meta: 'description', value: 5},
                {meta: 'description', value: 3}
            ],
            [
                {meta: 'other description', value: 2},
                {meta: 'other description', value: 4},
                {meta: 'other description', value: 2}
            ]
        ]
    }, {
        low: 0,
        high: 8,
        fullWidth: true,
        plugins: [
            Chartist.plugins.tooltip()
        ]
    });

}