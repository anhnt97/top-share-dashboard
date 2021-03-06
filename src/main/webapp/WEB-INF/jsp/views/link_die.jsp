<!doctype html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-icon.png" />
    <link rel="icon" type="image/png" href="assets/img/favicon.png" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>Thống kê link hỏng</title>
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <meta name="viewport" content="width=device-width" />
    <!--  CSS     -->
    <link href="assets/css/chartist-plugin-tooltip.css" rel="stylesheet" />
    <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">-->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
    <!--  Material Dashboard CSS    -->
    <link href="assets/css/material-dashboard.css?v=1.2.0" rel="stylesheet" />
    <!--  CSS for Demo Purpose, don't include it in your project     -->
    <link href="assets/css/demo.css" rel="stylesheet" />
    <link href="assets/css/style.css" rel="stylesheet" />
    <!--     Fonts and icons     -->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700,300|Material+Icons" rel='stylesheet'>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
</head>

<body>
<div class="wrapper">
    <div class="sidebar" data-color="purple" data-image="../assets/img/sidebar-1.jpg">
        <!--
    Tip 1: You can change the color of the sidebar using: data-color="purple | blue | green | orange | red"

    Tip 2: you can also add an image using data-image tag
-->
        <div class="logo">
            <a href="#" class="simple-text">
                TOP SHARE
            </a>
        </div>
        <div class="sidebar-wrapper">
            <ul class="nav">
                <li>
                    <a href="${contextPath}/dashboard">
                        <i class="material-icons">dashboard</i>
                        <p>Thống kê</p>
                    </a>
                </li>

                <li>
                    <a href="${contextPath}/time-play">
                        <i class="material-icons">play_arrow</i>
                        <p>Thời gian play video</p>
                    </a>
                </li>
                <li>
                    <a href="${contextPath}/time-view">
                        <i class="material-icons">remove_red_eye</i>
                        <p>Thời gian xem video</p>
                    </a>
                </li>
                <li>
                    <a href="${contextPath}/time-api-response">
                        <i class="material-icons">feedback</i>
                        <p>Thời gian phản hồi API</p>
                    </a>
                </li>
                <li class="active">
                    <a href="${contextPath}/link-die">
                        <i class="material-icons">bug_report</i>
                        <p>Link hỏng</p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div class="main-panel">
        <nav class="navbar navbar-transparent navbar-absolute">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <h6 class="simple-text"> <strong>THỐNG KÊ LINK HỎNG </strong></h6>
                </div>
            </div>
        </nav>
        <div class="content custom-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="select-time">
                            <div class="col-sm-6"></div>
                            <div class="col-sm-6">
                                <p class="dashboard-by-text">Thống kê từ</p>
                            </div>
                            <%--<div class="col-sm-6">--%>
                                <%--<div class="form-group dashboard-by">--%>
                                    <%--<select class="form-control" name="time-select" id="time-select">--%>
                                        <%--<option name="HOUR" value="HOUR">Giờ</option>--%>
                                        <%--<option name="DAY" value="DAY">Ngày</option>--%>
                                        <%--<option name="MONTH" value="MONTH">Tháng</option>--%>
                                    <%--</select>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <form action="#" class="form-horizontal" method="post">
                            <div class="form-group">
                                <label class="control-label col-sm-2 requiredField" for="start-date">
                                    Date
                                    <span class="asteriskField">
                                          from
                                    </span>
                                </label>
                                <div class="col-sm-8">
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                            <i class="fa fa-calendar">
                                            </i>
                                        </div>
                                        <div class="input-date">
                                            <input class="form-control" id="start-date" name="start-date" placeholder="DD/MM/YYYY" type="text"/>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-sm-4">
                        <form action="#" class="form-horizontal end-date-form" method="post">
                            <div class="form-group">
                                <label class="control-label col-sm-2 requiredField" for="start-date">
                                    Date
                                    <span class="asteriskField">
                                          to
                                    </span>
                                </label>
                                <div class="col-sm-8">
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                            <i class="fa fa-calendar">
                                            </i>
                                        </div>
                                        <div class="input-date">
                                            <input class="form-control" id="end-date" name="end-date" placeholder="DD/MM/YYYY" type="text"/>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-2">
                        <div class="dailymotion-box"></div>
                        <p>Link dailymotion</p>
                    </div>
                    <div class="col-sm-2">
                        <div class="youtube-box"></div>
                        <p>Link youtube</p>
                    </div>
                    <div class="col-sm-2">
                        <div class="stream-box"></div>
                        <p>Link stream</p>
                    </div>
                    <div class="col-sm-2">
                        <div class="wz-box"></div>
                        <p>Link WZ</p>
                    </div>
                    <div class="col-sm-2">
                        <div class="link-error"></div>
                        <p>Video lỗi</p>
                    </div>
                </div>
                <div class="row">
                    <div class="card">
                        <div class="card-header card-chart" data-background-color="blue">
                            <div class="ct-chart" id="linkDieChart"></div>
                        </div>
                        <div class="card-content">
                            <h4 class="title">Thống kê số link hỏng theo <span class="time-type">giờ</span></h4>
                        </div>
                        <div class="card-footer">
                            <div class="stats">
                                <i class="material-icons">access_time</i> cập nhật vừa xong
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header" data-background-color="purple">
                                <h4 class="title">Tổng hợp link hỏng</h4>
                                <%--<p class="category">Here is a subtitle for this table</p>--%>
                            </div>
                            <div class="card-content table-responsive">
                                <table class="table">
                                    <div class="nav navbar-right">
                                        <span class="sort-text">Sắp xếp theo </span>
                                        <select class="form-control" id="sort-video">
                                            <option value="reduction">Giảm dần</option>
                                            <option value="increase">Tăng dần</option>
                                        </select>
                                    </div>
                                    <thead class="text-primary">
                                    <th>Tên video</th>
                                    <th>Link dailymotion</th>
                                    <th>Link youtube</th>
                                    <th>Link stream</th>
                                    <th>Link WZ</th>
                                    <th>Video lỗi</th>
                                    <th>Thống kê</th>
                                    </thead>
                                    <tbody class="display-list-video">
                                    <tr>
                                        <td>video 1</td>
                                        <td>10</td>
                                        <td>23</td>
                                        <td>13</td>
                                        <td>32</td>
                                        <td>15</td>
                                        <td><button class="btn btn-primary">Xem thống kê</button></td>
                                    </tr>
                                    <tr>
                                        <td>video 2</td>
                                        <td>34</td>
                                        <td>22</td>
                                        <td>35</td>
                                        <td>22</td>
                                        <td>11</td>
                                        <td><button class="btn btn-primary">Xem thống kê</button></td>
                                    </tr>
                                    <tr>
                                        <td>video 3</td>
                                        <td>18</td>
                                        <td>22</td>
                                        <td>11</td>
                                        <td>37</td>
                                        <td>25</td>
                                        <td><button class="btn btn-primary">Xem thống kê</button></td>
                                    </tr>
                                    <tr>
                                        <td>video 4</td>
                                        <td>25</td>
                                        <td>12</td>
                                        <td>55</td>
                                        <td>33</td>
                                        <td>15</td>
                                        <td><button class="btn btn-primary">Xem thống kê</button></td>
                                    </tr>
                                    <tr>
                                        <td>video 5</td>
                                        <td>13</td>
                                        <td>21</td>
                                        <td>13</td>
                                        <td>11</td>
                                        <td>25</td>
                                        <td><button class="btn btn-primary">Xem thống kê</button></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                    <div class="row text-center">
                        <p class="page-number" hidden></p>
                        <ul class="pagination">
                        </ul>
                    </div>
            </div>
        </div>
        <footer class="footer">
            <div class="container-fluid">
                <p class="copyright">
                    &copy;
                    <script>
                        document.write(new Date().getFullYear())
                    </script>
                    <a href="http://dtsgroup.com.vn">DTS group</a>
                </p>
            </div>
        </footer>
    </div>
</div>
</body>
<!--   Core JS Files   -->
<script src="assets/js/jquery-3.2.1.min.js" type="text/javascript"></script>
<script src="assets/js/bootstrap.min.js" type="text/javascript"></script>
<script src="assets/js/material.min.js" type="text/javascript"></script>
<!--  Charts Plugin -->
<script src="assets/js/chartist.min.js"></script>
<script src="assets/js/chartist-plugin-tooltip.js"></script>
<!--  Dynamic Elements plugin -->
<script src="assets/js/arrive.min.js"></script>
<!--  PerfectScrollbar Library -->
<script src="assets/js/perfect-scrollbar.jquery.min.js"></script>
<!--  Notifications Plugin    -->
<script src="assets/js/bootstrap-notify.js"></script>
<!-- Material Dashboard javascript methods -->
<script src="assets/js/material-dashboard.js?v=1.2.0"></script>
<!-- Material Dashboard DEMO methods, don't include it in your project! -->
<script src="assets/js/draw-chart.js"></script>
<script src="assets/js/process.js"></script>
<script src="assets/js/moment.js"></script>
<!-- Include Date Range Picker -->
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twbs-pagination/1.4.1/jquery.twbsPagination.min.js"></script>
<script type="text/javascript">
    $(document).ready(function() {
        // Javascript method's body can be found in assets/js/demos.js
        //callAllApiLinkDie();
        //linkDie.getListVideo(0);
        //linkDie.updateTimeTypeSelect();
       linkDie.updateDateSelect();
        linkDie.getChartDefault();
    });
</script>

</html>