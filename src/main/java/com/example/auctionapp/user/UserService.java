package com.example.auctionapp.user;

import com.example.auctionapp.authentication.AuthenticationRequest;
import com.example.auctionapp.authentication.AuthenticationResponse;
import com.example.auctionapp.registration.EmailValidator;
import com.example.auctionapp.registration.RegistrationRequest;
import com.example.auctionapp.security.config.JWTTokenHelper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.HashMap;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private EmailValidator emailValidator;

    private static final String USER_EXISTS_RESPONSE = "User with this email already exists";
    private static final String ACCOUNT_CREATED_RESPONSE = "Account successfully created";
    private static final String INVALID_EMAIL_RESPONSE = "Email not valid";

    //We are using email instead of username that is why we have seperate loadUserByEmail method
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return this.loadUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User with that email does not exist"));
    }

    public Optional<User> loadUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public String signUpUser(User user){
        boolean userExists = userRepository.findByEmail(user.getEmail()).isPresent();
        if(userExists){
            return USER_EXISTS_RESPONSE;
        }
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
        return ACCOUNT_CREATED_RESPONSE;
    }

    public ResponseEntity<?> register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());
        HashMap<String, String> responseJson = new HashMap<>();
        if(!isValidEmail){
            responseJson.put("response", INVALID_EMAIL_RESPONSE);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseJson);
        }
        String signUpResponseMessage= this.signUpUser(new User(request.getFirstName(), request.getLastName(), request.getEmail(), request.getPassword(), UserRole.USER));
        responseJson.put("response", signUpResponseMessage);
        if(signUpResponseMessage.equals(USER_EXISTS_RESPONSE)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseJson);
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseJson);
    }

}
