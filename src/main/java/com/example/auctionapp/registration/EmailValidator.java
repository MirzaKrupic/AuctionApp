package com.example.auctionapp.registration;

import org.springframework.stereotype.Service;

import java.util.function.Predicate;
import java.util.regex.Pattern;

@Service
public class EmailValidator implements Predicate<String> {

    private final String regexPattern = "^(.+)@(\\S+)$";

    @Override
    public boolean test(String s) {
        return Pattern.compile(regexPattern).matcher(s).matches();
    }
}
