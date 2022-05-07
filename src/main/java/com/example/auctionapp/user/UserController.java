package com.example.auctionapp.user;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1")
@AllArgsConstructor
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping(method = RequestMethod.GET, path = "/user")
    public @ResponseBody Optional<User> fetchItems(HttpServletRequest httpServletRequest){
        return userService.getUserByToken(httpServletRequest);
    }
}
