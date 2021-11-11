package com.example.auctionapp.user;

import com.example.auctionapp.registration.EmailValidator;
import com.example.auctionapp.registration.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private EmailValidator emailValidator;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userRepository.findByEmail(s).orElseThrow(() -> new UsernameNotFoundException("User with that email does not exist"));
    }

    public String signUpUser(User user){
        boolean userExists = userRepository.findByEmail(user.getEmail()).isPresent();
        if(userExists){
            return("User with this email already exists");
        }
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
        return "Account successfully created";
    }

    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());
        if(!isValidEmail){
            return("Email not valid");
        }
        return this.signUpUser(new User(request.getFirstName(), request.getLastName(), request.getEmail(), request.getPassword(), UserRole.USER));
    }
}
