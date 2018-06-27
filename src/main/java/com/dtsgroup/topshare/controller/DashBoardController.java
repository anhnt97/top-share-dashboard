package com.dtsgroup.topshare.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class DashBoardController {
    @GetMapping(value = {"/","/dashboard"})
    public String dashboard(){
     return "dashboard";
    }
    @GetMapping("/time-play")
    public String timePlay(){
        return "time_play";
    }
    @GetMapping("/time-view")
    public String timeView(){ return "time_view"; }
    @GetMapping("/time-api-response")
    public String timeFeedback(){
        return "time_api_response";
    }
    @GetMapping("/link-die")
    public String linkDie(){
        return "link_die";
    }
}
