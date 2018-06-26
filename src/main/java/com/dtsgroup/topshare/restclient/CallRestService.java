package com.dtsgroup.topshare.restclient;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
public class CallRestService {
    private ResponseEntity<String> responseEntity;
    public String callRestService(){
        String uri = "https://jsonplaceholder.typicode.com/posts/1";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
        responseEntity = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);
        return responseEntity.getBody();
    }
}
