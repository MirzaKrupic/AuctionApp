package com.example.auctionapp.user;

import com.example.auctionapp.registration.EmailValidator;
import com.example.auctionapp.registration.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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
            return(USER_EXISTS_RESPONSE);
        }
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
        return ACCOUNT_CREATED_RESPONSE;
    }

    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());
        if(!isValidEmail){
            return(INVALID_EMAIL_RESPONSE);
        }
        return this.signUpUser(new User(request.getFirstName(), request.getLastName(), request.getEmail(), request.getPassword(), UserRole.USER));
    }
}
