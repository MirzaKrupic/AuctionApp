package com.example.auctionapp;

import com.example.auctionapp.entity.Item;
import com.example.auctionapp.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class ItemDataLoader implements CommandLineRunner {

    private final SimpleDateFormat DATE_TIME_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Autowired
    ItemRepository itemRepository;

    @Override
    public void run(String... args) throws Exception {
        loadItemData();
    }

    private void loadItemData(){
        if(itemRepository.count() == 0){
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime now = LocalDateTime.now();
            for(int i = 0; i<101; i++ ) {
                itemRepository.save(Item.builder().name("Shoes").startingPrice(22).photo("../../assets/lowersectpic.png").auctionEndDate(parseTimestamp("2020-05-01 12:30:00")).build());
            }
            }
    }

    private Timestamp parseTimestamp(String timestamp) {
        try {
            return new Timestamp(DATE_TIME_FORMAT.parse(timestamp).getTime());
        } catch (ParseException e) {
            throw new IllegalArgumentException(e);
        }
    }
}