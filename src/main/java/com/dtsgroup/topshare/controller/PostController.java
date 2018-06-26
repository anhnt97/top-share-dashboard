package com.dtsgroup.topshare.controller;

import com.dtsgroup.topshare.restclient.CallRestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostController {
    @Autowired
    CallRestService callRestService;
    @RequestMapping(value = "/test", produces = MediaType.APPLICATION_JSON_VALUE,  method = RequestMethod.GET)
    public String getDataJSON()
    {
       return callRestService.callRestService();
    }
}
