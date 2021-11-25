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
                itemRepository.save(Item.builder().name("Shoes").startingPrice(22).details("Note: The Jackets is US standard size, Please choose size as your\n" +
                        "            usual wear Material: 100% Polyester Detachable Liner Fabric: Warm\n" +
                        "            Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and\n" +
                        "            Warm. Stand Collar Liner jacket, keep you warm in cold weather.\n" +
                        "            Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on\n" +
                        "            Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.\n" +
                        "            Zippered Hand Pockets and Hidden Pocket keep your things secure.\n" +
                        "            Humanized Design: Adjustable and Detachable Hood and Adjustable cuff\n" +
                        "            to prevent the wind and water,for a comfortable fit. 3 in 1\n" +
                        "            Detachable Design provide more convenience, you can separate the\n" +
                        "            coat and inner as needed, or wear it together. It is suitable for\n" +
                        "            different season and help you adapt to different climates").photo("/images/lowersectpic.png;").auctionEndDate(parseTimestamp("2022-05-01 12:30:00")).build());
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
