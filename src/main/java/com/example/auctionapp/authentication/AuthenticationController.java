package com.example.auctionapp.authentication;

import com.example.auctionapp.registration.RegistrationRequest;
import com.example.auctionapp.security.config.JWTTokenHelper;
import com.example.auctionapp.user.User;
import com.example.auctionapp.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;
import java.util.HashMap;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JWTTokenHelper jwtTokenHelper;

    @Autowired
    private UserService userService;

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {
        final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = (User) authentication.getPrincipal();
        String jwtToken = jwtTokenHelper.generateToken(user.getEmail());

        AuthenticationResponse response = new AuthenticationResponse();
        response.setToken(jwtToken);
        return ResponseEntity.ok(response);
    }

    @GetMapping("auth/userinfo")
    public ResponseEntity<?> getUserInfo(Principal user){
        User userObj = (User) userDetailsService.loadUserByUsername(user.getName());

        UserInfo userInfo = new UserInfo();
        userInfo.setFirstName(userObj.getFirstName());
        userInfo.setLastName(userObj.getLastName());
        userInfo.setRoles(userObj.getAuthorities().toArray());

        return ResponseEntity.ok(userInfo);
    }

    @PostMapping("registration")
    public ResponseEntity<?> register(@RequestBody RegistrationRequest request){
        HashMap<String, String> response = new HashMap<>();
        response.put("response", userService.register(request));
        return ResponseEntity.ok(response);
    }
}
