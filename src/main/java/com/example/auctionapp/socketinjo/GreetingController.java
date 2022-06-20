package com.example.auctionapp.socketinjo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.util.HtmlUtils;

import javax.servlet.http.HttpServletRequest;

@Controller
public class GreetingController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    private static final String WS_MESSAGE_TRANSFER_DESTINATION = "/topic/greetings/1";

    @MessageMapping("/hello")
    public void greet(HelloMessage message) throws InterruptedException {
        Thread.sleep(2000);
        simpMessagingTemplate.convertAndSend(WS_MESSAGE_TRANSFER_DESTINATION,
                new Greeting("Hello, " +
                        HtmlUtils.htmlEscape(message.getName())));
    }

}
