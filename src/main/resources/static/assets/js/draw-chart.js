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

        var dailyTimePlayChart = new Chartist.Line('.ct-chart',dataDailyTime, optionsDailyTime);

        md.startAnimationForLineChart(dailyTimePlayChart);
    },
    monthlyTime: function (msgMonthTime,listMonth) {

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
          height: 500,
          axisY: {
              labelInterpolationFnc: function(value) {
                  return value + 'ms';
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

      var dailyTimeViewChart = new Chartist.Line('#timeViewChart',dataDailyTime, optionsDailyTime);

      animation.animationForLine(dailyTimeViewChart);
  },
  monthlyTime: function (msgMonthTime,listMonth) {
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

      var monthlyTimeViewChart = new Chartist.Line('#timeViewChart',dataMonthlyTimeViewChart, optionsMonthlyTimeViewChart);

      animation.animationForLine(monthlyTimeViewChart);
  }
};
timeFeedbackAPIChart = {
    everyHour: function (msgEveryHour,listHour) {
        /* ----------==========     Every hour  view Chart initialization    ==========---------- */
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
            height: 500,
            axisY: {
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

        var dailyTimeFeedbackChart = new Chartist.Line('#timeFeedbackChart',dataDailyTimeFeedbackChart, optionsDailyTimeFeedbackChart);

        animation.animationForLine(dailyTimeFeedbackChart);
    },
    monthlyTime: function (msgMonthTime,listMonth) {
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
    everyHour: function (lDailymotion,lYoutube,lStream,lWZ,lVideoDie,listHour) {
        /* ----------==========     Daily number link die Chart initialization    ==========---------- */

        var dataDailyNumberLinkDieChart = {
            labels: listHour,
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
            height: 500 ,
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
            height: 500 ,
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
            height: 500 ,
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
