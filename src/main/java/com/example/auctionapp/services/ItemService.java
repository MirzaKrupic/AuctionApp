package com.example.auctionapp.services;

import com.example.auctionapp.bid.Bid;
import com.example.auctionapp.bid.BidRepository;
import com.example.auctionapp.bid.BiddingRequest;
import com.example.auctionapp.entity.Item;
import com.example.auctionapp.repository.ItemRepository;
import com.example.auctionapp.security.config.JWTTokenHelper;
import com.example.auctionapp.user.User;
import com.example.auctionapp.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Service
@AllArgsConstructor
public class ItemService {

    ItemRepository itemRepository;
    BidRepository bidRepository;
    JWTTokenHelper jwtTokenHelper;
    UserService userService;

    public Page<Item> getAllItems(int page, int size, String order, String orderColumn) {
        PageRequest pageable;
        if (order != null && orderColumn != null) {
            if (order.equals("asc")) {
                pageable = PageRequest.of(page, size, Sort.by(orderColumn).ascending());
            } else {
                pageable = PageRequest.of(page, size, Sort.by(orderColumn).descending());
            }
        } else {
            pageable = PageRequest.of(page, size);
        }
        Page<Item> statePage = itemRepository.findAll(pageable);

        for (Item item : statePage) {
            item.setBids(null);
        }
        return statePage;
    }

    public Item fetchItemsById(long itemId) {
        return itemRepository.getByItemId(itemId);
    }

    public ResponseEntity<?> itemBid(HttpServletRequest httpServletRequest, BiddingRequest biddingRequest) {
        String token = jwtTokenHelper.getToken(httpServletRequest);
        Optional<User> user = userService.loadUserByEmail(jwtTokenHelper.getUsernameFromToken(token));
        Long itemId = Long.parseLong(biddingRequest.getItemId());
        double amount = Double.parseDouble(biddingRequest.getAmount());

        Item item = itemRepository.getByItemId(itemId);

        if (!item.getBids().isEmpty()) {
            Bid maxBid = Arrays.stream(item.getBids().toArray(new Bid[0]))
                    .max(Comparator.comparingDouble(Bid::getAmount))
                    .orElseThrow(NoSuchElementException::new);

            if (maxBid.getAmount() >= amount) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You entered invalid amount");
            }
            Bid bid = new Bid(amount, user.get(), itemId);
            bidRepository.save(bid);
        } else {
            if (item.getStartingPrice() >= amount) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You entered invalid amount");
            }
            Bid bid = new Bid(amount, user.get(), itemId);
            bidRepository.save(bid);
        }

        return ResponseEntity.ok("Bid successfull");
    }
}
