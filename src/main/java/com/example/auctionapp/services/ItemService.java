package com.example.auctionapp.services;

import com.example.auctionapp.bid.Bid;
import com.example.auctionapp.bid.BidRepository;
import com.example.auctionapp.entity.Category;
import com.example.auctionapp.entity.Item;
import com.example.auctionapp.repository.CategoryRepository;
import com.example.auctionapp.repository.ItemRepository;
import com.example.auctionapp.security.config.JWTTokenHelper;
import com.example.auctionapp.user.User;
import com.example.auctionapp.user.UserService;
import lombok.AllArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Pageable;
import java.util.*;

@Service
@AllArgsConstructor
public class ItemService {

    ItemRepository itemRepository;
    BidRepository bidRepository;
    JWTTokenHelper jwtTokenHelper;
    UserService userService;
    CategoryRepository categoryRepository;

    public Page<Item> getAllItems(int page, int size, String order, String orderColumn, Long superCategoryId) {
        PageRequest pageable;
        if (superCategoryId != null){
            pageable = PageRequest.of(page, size, Sort.by(orderColumn).ascending());
            return itemRepository.getBySupercategory(superCategoryId, pageable);
        }else if (order != null && orderColumn != null) {
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

    public ResponseEntity<?> itemBid(HttpServletRequest httpServletRequest, Long itemId, double amount) {
        String token = jwtTokenHelper.getToken(httpServletRequest);
        Optional<User> user = userService.loadUserByEmail(jwtTokenHelper.getUsernameFromToken(token));

        Item item = itemRepository.getByItemId(itemId);

        if (CollectionUtils.isNotEmpty(item.getBids())) {
            Optional<Bid> maxBid = item.getBids().stream()
                    .max(Comparator.comparingDouble(Bid::getAmount));

            if (maxBid.get().getAmount() >= amount) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Amount you entered is too low!");
            }
        } else {
            if (item.getStartingPrice() >= amount) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Amount you entered is too low!");
            }
        }
        Bid bid = new Bid(amount, user.get(), itemId);
        bidRepository.save(bid);
        return ResponseEntity.ok("Bid successfull");
    }
}
